# DRIVING SCHOOL MANAGEMENT - Web Application

Application Engineering Project 2018/19, Computer and Software Engineering Course @ University of Minho, Braga - Portugal

- _Gestão de Escolas de Condução_

The main goal of this project is to **develop a web application** capable of managing any **Driving School**. In this project, we are using a lot of technologies that allow us to develop this management application, such as:

- **UML** modelation using [Visual Paradigm](https://www.visual-paradigm.com/);

- The **backend** is being developed using Java EE, [Hibernate](https://hibernate.org/) (MySQL) and Redis;

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

# Development setup

For develop and use our application, you must create a new user in your MySQL database. This user must have at least all permissions to use `dsm` database.

Please, follow the steps below:

- as root (`sudo mysql -u root`) create `dsm` user with `dsm2019EA!` password:

```sql
CREATE USER 'dsm'@'localhost' IDENTIFIED BY 'dsm2019EA!';
GRANT ALL PRIVILEGES ON *.* TO 'dsm'@'localhost';
FLUSH PRIVILEGES;
```

- with mysql client (`mysql -u dsm -p`), create `dsm` database:

```sql
CREATE DATABASE dsm CHARACTER SET utf8;
```

- create `dsm` database schema:

```bash
cd gestao-escola-conducao/docs/vpp/code
chmod +x *.sh
sh CompileAll.sh
sh RunCreateDSMDatabaseSchema.sh
```

- open IntellIj IDEA and prepare your env:

  - Setup **GlassFish** or WildFly server (File > Settings > Build ... > Application Servers)
  - Define output folder for compile and artifact files:
    - (File > Project Structure > Project
    - define output path: `gestao-escola-conducao/dsm-backend/out`
  - Add dependencies that are on _lib_ folder (File > Project Structure > Libraries) and **JUST** add:
    - orm.jar
    - all jackson jar files
    - commons-pool2-2.6.2.jar
    - jedis-3.0.1.jar
  - Add a Artifact (File > Project Structure > Artifacts) and follow this steps:
    - `+` > Web Application:Exploded > From Modules
  - Press `Apply` and `OK`
  - Now you just need to setup your `Edit Configurations` on top right menu

### Redis Service

- Download `Redis` image if is needed:

  ```bash
  docker pull redis:5.0.4
  ```

- Start `Redis` container:

  ```bash
  # without password
  docker run -p 6379:6379 redis:5.0.4

  # with password
  docker run -p 6379:6379 redis:5.0.4 --appendonly yes  --requirepass "dsmEA2019"
  ```

- To test if redis is working:

  ```bash
  # without password
  redis-cli -h 127.0.0.1 -p 6379

  # with password
  redis-cli -h 127.0.0.1 -p 6379 -a 'dsm2019EA'
  ```

- Kill it by doing `CTRL-C`
