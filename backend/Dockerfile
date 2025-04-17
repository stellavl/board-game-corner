FROM mysql:latest

COPY db/schema.sql /docker-entrypoint-initdb.d/
COPY db/data.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=board_game_corner
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

EXPOSE 3306