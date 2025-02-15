FROM node:23-bookworm

RUN npm i -g bun


# User Permission
ARG DOCKER_UID=1000
ARG DOCKER_GID=1000

USER ${DOCKER_UID}
WORKDIR /app

CMD [ "/bin/sh", "-c", "bun --bun install && bun --bun run dev" ]