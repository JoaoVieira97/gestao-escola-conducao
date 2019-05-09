# Redis integration

This project will be used to store users `tokens` when they login in our application. This can be use as a cache service for store other data. The main goal is to reduce the load on the database for better application performance. 

## Redis container using `Docker`

```bash
# Download container
docker image pull redis:5.0.4

# Run redis-server container (with redis-server-container name)
docker run -p 6379:6379 --name redis-server-container -d redis:5.0.4

# Run redis-server container with config file (with redis-server-container name)
docker run -v /path/to/redis.conf:/usr/local/etc/redis/redis.conf \
    --name redis-server-container-conf \
    -p 6379:6379
    -d redis:5.0.4 \ 
    redis-server /usr/local/etc/redis/redis.conf
    
# Stop/Kill container (get container id and stop or kill it)
docker container ls
docker stop container_id
docker kill container_id

# Start again
docker start redis-server-container
```

## Redis on localhost

```bash
# Download redis tar.gz file
wget http://download.redis.io/releases/redis-5.0.4.tar.gz

# Uncompress the file
tar xvzf redis-5.0.4.tar.gz && cd redis-5.0.4

# Install tcl
sudo apt-get install -y tcl

# Install redis-server
make
make test # just for testing if everything is ok
sudo make install

# Run redis-server on localhost 
redis-server
redis-server --port 6379

# Run redis-server with config file
redis-server /path/to/redis.conf --port 6379 &
```

## Redis utils just for testing

```bash
# Install redis client
sudo apt-get install -y redis-tools

# Open redis client
redis-cli
redis-cli -h 127.0.0.1 -p 6379

# Shutdown redis
127.0.0.1:6379> shutdown
```