# DRIVING SCHOOLS MANAGEMENT - Web Application

Application Engineering Project 2018/19, Computer and Software Engineering Course @ University of Minho, Braga - Portugal

- _Gestão de Escolas de Condução_

The main goal of this project is to **develop a web application** capable of managing multiple **Driving Schools**. In this project, we are using a lot of technologies that allow us to develop this management application, such as:

- **UML** modelation using [Visual Paradigm](https://www.visual-paradigm.com/);

- The **backend** is being developed using [Java Spring](https://spring.io/) and [Hibernate](https://hibernate.org/);

- Our **frontend** is being developed using [React](https://reactjs.org/) and [Redux](https://redux.js.org/introduction/getting-started).

### Contributors

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/oliveirahugo68">
        <img src="https://avatars3.githubusercontent.com/u/29900750?s=460&v=4" width="100px;" alt="Hugo Oliveira"/>
        <br />
        <sub><b>Hugo Oliveira</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/raphael28">
        <img src="https://avatars2.githubusercontent.com/u/43729094?s=460&v=4" width="100px;" alt="Raphael Oliveira"/>
        <br />
        <sub><b>Raphael Oliveira</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JoaoVieira97">
        <img src="https://avatars2.githubusercontent.com/u/34378224?s=460&v=4" width="100px;" alt="João Vieira"/>
        <br />
        <sub><b>João Vieira</b>
      </a>
    </td>
  </tr>
</table>

<br >

# Multi-Container Application

Docker integration in Intellij IDEA can be done has mentioned [here](https://www.jetbrains.com/help/idea/docker.html).

## Install Docker (Ubuntu)

Docker enables developers to deploy applications inside containers for testing code in an environment identical to production.

```bash
sudo apt-get update

sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io

sudo systemctl status docker

# Give local user access rights (need to reboot or log out after)
sudo usermod -a -G docker $USER
```

## Install Docker Compose (Ubuntu)

Docker Compose is used to run multi-container applications. This can be used to run a web server, backend database, and our application code as separate services.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

## MySQL Container

```bash
# Download docker image
docker pull mysql/mysql-server:5.7

# Running docker in background named as "mysql-server"
# Binding localhost 33006 port to 3306 contaier port
docker run --name=mysql-server -d -p 33006:3306 mysql/mysql-server:5.7

# Check docker output log
docker logs --follow mysql-server

# Check root password
docker logs mysql-server | grep 'GENERATED ROOT PASSWORD'

# Go to mysql-server
docker exec -it mysql-server bash
docker exec -it mysql-server mysql -uroot -p

# Stop mysql-server
docker stop mysql-server
```
