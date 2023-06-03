FROM postgres:16beta1-alpine3.18

LABEL authors="sohamsantoshtembe"
LABEL description="Postgres image for Job Tracker extension"
LABEL version="1.0"

COPY init.sql /docker-entrypoint-initdb.d/init.sql