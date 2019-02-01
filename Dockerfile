FROM nginx:latest

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y \
        curl \
        netcat \
    && rm -rf /var/lib/apt/lists/*

COPY wait-for wait-for

RUN chmod +x wait-for

COPY rtk /usr/share/nginx/html

COPY nginx /etc/nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=1s CMD curl -f http://localhost || exit 1

#ENTRYPOINT ["sh", "-c", "./wait-for www.google.ru:80 -- echo 123"]