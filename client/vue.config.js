module.exports = {
  devServer: {
    proxy: {
      "/action/login": {
        target: "https://nos-server.now.sh",
      },
      "/action/logout": {
        target: "https://nos-server.now.sh",
      },
      "/db/updateSession": {
        target: "https://nos-server.now.sh",
      },
      "/db": {
        target: "https://nos-server.now.sh",
      },
      "/rig/add": {
        target: "https://nos-server.now.sh",
      },
      "/rig/command": {
        target: "https://nos-server.now.sh",
      },
      "/rig/delete": {
        target: "https://nos-server.now.sh",
      }
    }
  }
}