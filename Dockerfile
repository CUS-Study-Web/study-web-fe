FROM node:24-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
# Copy template to Nginx's template folder
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
# Restrict substitution to BACKEND_API_URL only
ENV NGINX_ENVSUBST_FILTER="BACKEND_API_URL"
# Default fallback if not passed (optional)
ENV BACKEND_API_URL="http://localhost:8080"
EXPOSE 80
