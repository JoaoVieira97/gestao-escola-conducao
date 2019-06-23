# [WildFly](https://wildfly.org/index.html) Installation (Ubuntu)

```bash
# Download WildFly tar.gz file
wget https://download.jboss.org/wildfly/16.0.0.Final/wildfly-16.0.0.Final.tar.gz

# Create WildFly root dir in opt directory
sudo mkdir /opt/wildfly

# Unzip file to WildFly dir
sudo tar -xvzf wildfly-16.0.0.Final.tar.gz -C /opt/wildfly --strip 1

# Add a new Management User
sudo sh /opt/wildfly/bin/add-user.sh

# Add user privileges to read/execute WildFly
sudo chown -R $USER:$USER /opt/wildfly

# Run WildFly
sudo sh /opt/wildfly/bin/standalone.sh

# Open WildFly management page
# Go to http://127.0.0.1:9990

# Open WildFly web page
# Go to http://127.0.0.1:8080
```

## Defining on [Intellij](https://www.jetbrains.com/idea/) a new Application Server

- Open the Settings/Preferences dialog `(Ctrl+Alt+S)`;

- In the left-hand pane, in the Build, Execution, Deployment category, select Application Servers;

- On the Application Servers page that opens in the right-hand part of the dialog, click `+`;

- Select the server that you are going to use;

- Click Apply and OK in the Settings dialog.
