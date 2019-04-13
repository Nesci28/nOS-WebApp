[Changelog]()

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
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/server; now --public && now alias nOS-server; now scale nos-server.now.sh all auto
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
webappFolder=$(find /home -type d -name Webapp 2>/dev/null); cd ${webappFolder}/client; sudo npm run deploy; now scale node-os.now.sh all auto
```
