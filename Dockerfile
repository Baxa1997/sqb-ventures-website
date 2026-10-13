# syntax=docker/dockerfile:1.10
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_FOUNDER_ACCOUNT_URL
ARG UCODE_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
# The build prerenders pages from ucode content. The API key comes in as a build secret,
# so it is used during the build but never stored in an image layer:
#   docker build --secret id=ucode_api_key,env=UCODE_API_KEY .
RUN --mount=type=secret,id=ucode_api_key,env=UCODE_API_KEY yarn build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/public ./public
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
