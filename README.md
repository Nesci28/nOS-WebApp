[Changelog](https://github.com/Nesci28/nOS-WebApp/blob/master/CHANGELOG.md)

# Server
### Install
```bash
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/server
sudo npm install
```

### Run
```bash
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/server; npm run dev
```

### Deploy
```bash
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/server; now --public && now alias nOS-server; now scale nos-server.now.sh 1 auto
```

# Client
### Install
```bash
sudo npm install -g @vue/cli
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/client
sudo npm install
```

### Run
```bash
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/client; npm run serve --fix
```

### Deploy
```bash
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/client; sudo npm run deploy; now scale node-os.now.sh 1 auto
```
