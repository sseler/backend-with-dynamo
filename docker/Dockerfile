FROM node:18 AS base

ENV HOME=/home/node
RUN mkdir -p /workspace/
WORKDIR /workspace/

FROM base AS build_fire-art-backend

WORKDIR /workspace/

COPY ./package.json /workspace/
COPY ./package-lock.json /workspace/
RUN npm install

COPY ./ /workspace/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/dist ./dist

CMD ["dist/index.js"]