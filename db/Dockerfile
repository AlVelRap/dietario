FROM mysql:8.0.31

# RUN "mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci"
ENV LANG=C.UTF-8

COPY ./initdb-v1.sql ./docker-entrypoint-initdb.d/