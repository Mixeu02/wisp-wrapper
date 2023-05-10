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
                      // ===== [ Change Name ] =====
                      this.servers.get(server.uuid_short).changeName = require("./functions/changeName");
      
                      // ===== [ Send Command ] =====
                      this.servers.get(server.uuid_short).sendCommand = require("./functions/sendCommand");
      
                      // ===== [ Get Audit Logs ] =====
                      const getAuditLogs = require("./functions/getAuditLogs");
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