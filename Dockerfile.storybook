# Stage 1: Build Storybook
FROM node:22-alpine AS builder

WORKDIR /app

COPY lib/package.json ./

RUN npm install --no-audit --no-fund

COPY lib/ .

RUN npx storybook build --config-dir storybook/.storybook --output-dir /storybook-static

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]