FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG NODE_ENV=development

WORKDIR /app

RUN pnpm install -g @nestjs/cli
RUN apt-get update && apt-get install -y procps
RUN apt-get update -y && apt-get install -y openssl