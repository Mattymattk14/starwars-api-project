FROM centos:7

RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install nodejs \
    yum -y install npm 

WORKDIR /src

COPY . .

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm install axios

EXPOSE 3000

CMD ["npm", "run", "start"]

