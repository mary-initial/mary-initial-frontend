# Stage 1: Install all deps required to build Storybook
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY lib/package.json ./lib/package.json

RUN npm ci --workspace=lib --include-workspace-root=false --no-audit --no-fund

# Stage 2: Build Storybook static output
FROM deps AS builder

COPY lib/ ./lib

WORKDIR /app/lib

RUN npx storybook build --config-dir storybook/.storybook --output-dir /storybook-static

# Stage 3: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]