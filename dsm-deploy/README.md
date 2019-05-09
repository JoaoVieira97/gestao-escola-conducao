# Download container images

```bash
docker image pull jboss/wildfly
docker image pull haproxy
docker image pull nginx
```

To get default config files (if they exist):

```bash
# build container with custom tag
docker build --tag=apache-tmp apache-server/.

# run container with custom name
docker run --name apache-tmp-container -p 8080:8080 -it apache-tmp

# get config file
docker cp apache-tmp-container:/usr/local/apache2/conf/httpd.conf $HOME/httpd.conf

# remove container image
docker image rm -f apache-tmp
```

# Using Docker-Compose

```bash
# create and start all containers at same time
docker-compose up --build --force-recreate

# check containers state
docker-compose ps

# check network
docker network ls
docker network inspect dsm-containers-deploy_dsmNetwork

# stop and remove all container at same time
docker-compose down

# remove unused containers images
docker image prune
```
