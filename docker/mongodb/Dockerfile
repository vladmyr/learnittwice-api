# Dockerizing MongoDB: Dockerfile for building MongoDb images
# Based on Ubuntu 16.04
FROM ubuntu:16.04
MAINTAINER Volodymyr Khytskyi <khytsky.vladimir@gmail.com>
# 1) Import MongoDB public GPG key
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# 2) Create a MongoDB list file
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# 3) Update apt-get sources
RUN apt-get update 
# 4) Install exact version of MongoDB using 'DB_MONGODB_EXACT_VERSION' environment variable 
RUN apt-get install -y mongodb-org=3.2.11 mongodb-org-server=3.2.11 mongodb-org-shell=3.2.11 mongodb-org-mongos=3.2.11 mongodb-org-tools=3.2.11
# 5) Prevent MongoDB from updating when newer version is available
RUN echo "mongodb-org hold" | dpkg --set-selections
RUN echo "mongodb-org-server hold" | dpkg --set-selections
RUN echo "mongodb-org-shell hold" | dpkg --set-selections
RUN echo "mongodb-org-mongos hold" | dpkg --set-selections
RUN echo "mongodb-org-tools hold" | dpkg --set-selections
# 6) Create systemd service file (required by Ubuntu 16.04)
RUN touch /lib/systemd/system/mongod.service
# 8) Create the MongoDB data directory
RUN mkdir -p /data/db
ENTRYPOINT ["/usr/bin/mongod"]