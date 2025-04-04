FROM node:20.19.0-alpine3.20 AS base
WORKDIR /base
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

FROM base AS build


ARG HOSTALIAS_CERT
ARG HOSTALIAS_ROOT_CERT
ARG AUTH_ECAS_CA
ARG LOGGING_LEVEL=info



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

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/ecas_env.crt

ARG PORT=3000
ENV PORT=${PORT}

ARG HOSTNAME=localhost
ENV HOSTNAME=${HOSTNAME}

EXPOSE ${PORT}

CMD npm run start
