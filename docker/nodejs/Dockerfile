FROM ubuntu:16.04
MAINTAINER Volodymyr Khytskyi <khytsky.vladimir@gmail.com>
# 1) Update 
RUN apt-get update
# 2) Remove node & npm packages if any exists
RUN apt-get remove --purge node npm
# 3) install latest node 6
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs