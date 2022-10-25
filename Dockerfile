FROM node:18.9-alpine3.15 AS base
WORKDIR /base
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS build

# Build envs
ARG BUILD_DATE
ENV BUILD_DATE=$BUILD_DATE
ARG AEM_GRAPHQL_ENDPOINT
ENV AEM_GRAPHQL_ENDPOINT=$AEM_GRAPHQL_ENDPOINT

ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:18.9-alpine3.15 AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/next.config.js ./
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/tracing.js ./
COPY --from=build /build/certs/srv113-i-lab-hrdc-drhc-gc-ca-chain.pem ./certs/
RUN VERSION_NEXT=`node -p -e "require('./package.json').dependencies.next"`&& npm install --no-package-lock --no-save next@"$VERSION_NEXT"

# Runtime envs -- will default to build args if no env values are specified at docker run
ARG AEM_GRAPHQL_ENDPOINT
ENV AEM_GRAPHQL_ENDPOINT=$AEM_GRAPHQL_ENDPOINT

# ECAS/next-auth env start
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG CLIENT_SECRET
ENV CLIENT_SECRET=$CLIENT_SECRET

ARG CLIENT_ID
ENV CLIENT_ID=$CLIENT_ID

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
ENV AUTH_DISABLED=$AUTH_DISABLE
# ECAS/next-auth env end

CMD npm run start
