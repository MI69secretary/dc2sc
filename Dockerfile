FROM node:24-bookworm-slim
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--port", "4321"]
