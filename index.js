const { EventEmitter } = require('events');
const { getFetch, postFetch, patchFetch} = require("./util/fetch");

// Main

const wisp = {
    Panel: class extends EventEmitter{
        constructor(){
           super();
        }

        connect = async (name, token) => {
          this.name = name;
          this.token = token;
      
          // Servers Data
          const getServersData = async () => {
              // ===== [ Getting Servers ] =====
              const data = await getFetch(`https://${this.name}/api/client/servers`, this.token, true);
      
              this.servers = new Map();
              for (let i = 0; i < data.data.length; i++) {
                  this.servers.set(data.data[i].attributes.uuid_short, data.data[i].attributes)
              }
      
              await Promise.all(
                Array.from(this.servers, ([_, server]) => server).map(async (server) => {      
                    // ===== [ Get Extra Info ] =====
                    const getExtraInfoFunction = require("./functions/getExtraInfo");
                    const extraInfo = await getExtraInfoFunction(server, this.name, this.token);
                    server.password = extraInfo.password;
                    server.maxplayers = extraInfo.maxplayers;
                    server.players = extraInfo.players;
                    server.bots = extraInfo.bots;
                    server.type = extraInfo.type;
                    server.version = extraInfo.version;
                    
                    // ===== [ Change Name ] =====
                    const changeNameFunction = require("./functions/changeName")
                    server.changeName = (newName) => {
                        changeNameFunction(server, this.name, this.token, newName)
                    }
      
                    // ===== [ Send Command ] =====
                    const sendCommandFunction = require("./functions/sendCommand")
                    server.sendCommand = (command) => {
                        sendCommandFunction(server, this.name, this.token, command);
                    }
      
                    // ===== [ Get Audit Logs ] =====
                    const getAuditLogsFunction = require("./functions/getAuditLogs");
                    const getAuditLogs = () => {
                        return getAuditLogsFunction(server, this.name, this.token);
                    }
                    const auditLogsData = await getAuditLogs(server, this.name, this.token);
                    server.auditLogs = new Map();
                    for (let i = 0; i < auditLogsData.logs.length; i++) {
                          server.auditLogs.set(auditLogsData.logs[i].attributes.created_at, auditLogsData.logs[i].attributes)
                    }
                })
            );
      
              this.servers.quantity = data.meta.pagination.total;
              this.servers.perPage = data.meta.pagination.per_page;
              this.servers.pageQuantity = data.meta.pagination.total_pages;
          };
      
          await getServersData();
          this.emit("ready");
      }
    }
}

module.exports = wisp;