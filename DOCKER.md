# Docker useful commands

```bash
# Download an image from repo
docker image pull image_name

# List of images available
docker image ls # current dir
docker image ls -all # all dir

# List of containers available
docker container ls
docker container ls --all

# Show all containers that are running
docker ps -all

# Run an image
docker run image_name
docker run -p 8080:8080 image_name

# Stop an image when is possivel
docker stop container_id
docker stop $(docker ps -a -q)

# Kill an image (if it is running)
docker kill container_id
docker kill $(docker ps -a -q)

# Remove a container
docker rm container_id
docker rm $(docker ps -a -q)

# Remove an image (if it is not being used for any container)
docker rmi image
docker rmi $(docker images -q)

# Display docker logs of a container
docker logs --follow container_id
```
