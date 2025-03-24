FROM node:20.19.0-alpine3.20 AS base
WORKDIR /base
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

FROM base AS build

# Build envs
ARG HOSTALIAS_CERT
ENV HOSTALIAS_CERT=$HOSTALIAS_CERT
ARG HOSTALIAS_ROOT_CERT
ENV HOSTALIAS_ROOT_CERT=$HOSTALIAS_ROOT_CERT
ARG AUTH_ECAS_CA
ENV AUTH_ECAS_CA=$AUTH_ECAS_CA
ARG LOGGING_LEVEL=info
ENV LOGGING_LEVEL=$LOGGING_LEVEL
ARG AEM_GRAPHQL_ENDPOINT=https://www.canada.ca/graphql/execute.json/decd-endc/
ENV AEM_GRAPHQL_ENDPOINT=$AEM_GRAPHQL_ENDPOINT
ARG AEM_GRAPHQL_FOLDER
ENV AEM_GRAPHQL_FOLDER=$AEM_GRAPHQL_FOLDER
ARG AUTH_ECAS_BASE_URL
ENV AUTH_ECAS_BASE_URL=$AUTH_ECAS_BASE_URL
ARG MSCA_BASE_URL
ENV MSCA_BASE_URL=$MSCA_BASE_URL
ARG MSCA_EQ_BASE_URL
ENV MSCA_EQ_BASE_URL=$MSCA_EQ_BASE_URL
ARG MSCA_ECAS_RASC_BASE_URL
ENV MSCA_ECAS_RASC_BASE_URL=$MSCA_ECAS_RASC_BASE_URL

ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./

RUN mkdir -p /usr/local/share/ca-certificates/ && \
echo ${HOSTALIAS_CERT} | \
sed 's/\\n/\n/g' | \
xargs > \
/usr/local/share/ca-certificates/env.crt && \
chmod 644 /usr/local/share/ca-certificates/env.crt && \
echo ${AUTH_ECAS_CA} | \
sed 's/\\n/\n/g' | \
xargs > \
/usr/local/share/ca-certificates/ecas_env.crt && \
chmod 644 /usr/local/share/ca-certificates/ecas_env.crt && \
mkdir -p  /etc/ssl/certs/ && \
echo ${HOSTALIAS_ROOT_CERT} | \
sed 's/\\n/\n/g' | \
xargs > \
/etc/ssl/certs/root.crt && \
chmod 644  /etc/ssl/certs/root.crt && \
npm run build

FROM node:20.19.0-alpine3.20 AS production
ENV NODE_ENV=production

ARG user=nodeuser
ARG group=nodegroup
ARG home=/srv/app

ARG MSCA_NG_CERT_LOCATION=/usr/local/share/ca-certificates/env.crt
ENV MSCA_NG_CERT_LOCATION=$MSCA_NG_CERT_LOCATION

ARG ECAS_CERT_LOCATION=/usr/local/share/ca-certificates/ecas_env.crt
ENV ECAS_CERT_LOCATION=$ECAS_CERT_LOCATION

RUN addgroup \
    -S ${group} \
    --gid 1001 && \
    adduser \
    --disabled-password \
    --gecos "" \
    --uid 1001 \
    --home ${home} \
    --ingroup ${group} \
    ${user}

WORKDIR ${home}

COPY --from=build /etc/ssl/certs/root.crt /etc/ssl/certs/root.crt
COPY --from=build --chown=${user}:${group} /usr/local/share/ca-certificates/env.crt ${MSCA_NG_CERT_LOCATION}
COPY --from=build --chown=${user}:${group} /usr/local/share/ca-certificates/ecas_env.crt ${ECAS_CERT_LOCATION}

RUN apk update && \
apk add ca-certificates && \
rm -rf /var/cache/apk/* && \
update-ca-certificates

USER ${user}

COPY --from=build --chown=${user}:${group} /build/next.config.js ./
COPY --from=build --chown=${user}:${group} /build/package*.json ./
COPY --from=build --chown=${user}:${group} /build/.next ./.next
COPY --from=build --chown=${user}:${group} /build/public ./public
# COPY --from=build --chown=${user}:${group} /build/certs/srv113-i-lab-hrdc-drhc-gc-ca-chain.pem ./certs/

RUN VERSION_NEXT=`node -p -e "require('./package-lock.json').packages['node_modules/next'].version"` && npm install --no-package-lock --no-save next@"$VERSION_NEXT" && npm cache clean --force

# Runtime envs -- will default to build args if no env values are specified at docker run
ARG LOGGING_LEVEL=info
ENV LOGGING_LEVEL=$LOGGING_LEVEL
ARG AEM_GRAPHQL_ENDPOINT
ENV AEM_GRAPHQL_ENDPOINT=$AEM_GRAPHQL_ENDPOINT
ARG AEM_GRAPHQL_FOLDER
ENV AEM_GRAPHQL_FOLDER=$AEM_GRAPHQL_FOLDER
ARG MSCA_BASE_URL
ENV MSCA_BASE_URL=$MSCA_BASE_URL
ARG MSCA_EQ_BASE_URL
ENV MSCA_EQ_BASE_URL=$MSCA_EQ_BASE_URL
ARG MSCA_ECAS_RASC_BASE_URL
ENV MSCA_ECAS_RASC_BASE_URL=$MSCA_ECAS_RASC_BASE_URL

# ECAS/next-auth env start
ARG AUTH_REDIRECT_ENDPOINT
ENV AUTH_REDIRECT_ENDPOINT=$AUTH_REDIRECT_ENDPOINT

ARG AUTH_COOKIE_PREFIX
ENV AUTH_COOKIE_PREFIX=$AUTH_COOKIE_PREFIX

ARG SESSION_MAX_AGE
ENV SESSION_MAX_AGE=$SESSION_MAX_AGE

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG CLIENT_SECRET
ENV CLIENT_SECRET=$CLIENT_SECRET

ARG CLIENT_ID
ENV CLIENT_ID=$CLIENT_ID

ARG AUTH_CLIENT_ASSERTION_AUD
ENV AUTH_CLIENT_ASSERTION_AUD=$AUTH_CLIENT_ASSERTION_AUD

ARG AUTH_ECAS_BASE_URL
ENV AUTH_ECAS_BASE_URL=$AUTH_ECAS_BASE_URL

ARG AUTH_ECAS_WELL_KNOWN
ENV AUTH_ECAS_WELL_KNOWN=$AUTH_ECAS_WELL_KNOWN

ARG AUTH_ECAS_AUTHORIZATION
ENV AUTH_ECAS_AUTHORIZATION=$AUTH_ECAS_AUTHORIZATION

ARG AUTH_ECAS_TOKEN
ENV AUTH_ECAS_TOKEN=$AUTH_ECAS_TOKEN

ARG AUTH_ECAS_USERINFO
ENV AUTH_ECAS_USERINFO=$AUTH_ECAS_USERINFO

ARG AUTH_PRIVATE
ENV AUTH_PRIVATE=$AUTH_PRIVATE

ARG AUTH_DISABLED
ENV AUTH_DISABLED=$AUTH_DISABLED

ARG AUTH_ECAS_GLOBAL_LOGOUT_URL
ENV AUTH_ECAS_GLOBAL_LOGOUT_URL=$AUTH_ECAS_GLOBAL_LOGOUT_URL

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/ecas_env.crt
# ECAS/next-auth env end

ARG PORT=3000
ENV PORT=${PORT}

ARG HOSTNAME=localhost
ENV HOSTNAME=${HOSTNAME}

EXPOSE ${PORT}

CMD npm run start
