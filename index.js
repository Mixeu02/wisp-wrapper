const { EventEmitter } = require('events');

// Util

async function getFetch(url, token, returnJSON) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.wisp.v1+json",
      "Authorization": "Bearer " + token
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  });
  return returnJSON ? response.json() : null;
}

async function postFetch(url, token, params, returnJSON) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.wisp.v1+json",
      "Authorization": "Bearer " + token
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(params)
  });
  return returnJSON ? response.json() : null; // parses JSON response into native JavaScript objects
}

async function patchFetch(url, token, params, returnJSON) {
  const response = await fetch(url, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.wisp.v1+json",
      "Authorization": "Bearer " + token,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(params)
  });
  return returnJSON ? response.json() : null; // parses JSON response into native JavaScript objects
}

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
      
              // Wait for all async operations to complete
              await Promise.all(
                Array.from(this.servers, ([_, server]) => server).map(async (server) => {            
                      // ===== [ Change Name ] =====
                      this.servers.get(server.uuid_short).changeName = async (newName) => {
                          await patchFetch(`https://${this.name}/api/client/servers/${server.uuid_short}/details`, this.token, { name: newName }, false);
                      }
      
                      // ===== [ Send Command ] =====
                      this.servers.get(server.uuid_short).sendCommand = async (command) => {
                          await postFetch(`https://${this.name}/api/client/servers/${server.uuid_short}/command`, this.token, { command: command }, false);
                      }
      
                      // ===== [ Get Audit Logs ] =====
                      const getAuditLogs = async () => {
                          const auditLogsData = await getFetch(`https://${this.name}/api/client/servers/${server.uuid_short}/audit-logs`, this.token, true);
                          return {
                              logs: auditLogsData.data.logs,
                              quantity: auditLogsData.meta.pagination.total,
                              perPage: auditLogsData.meta.pagination.per_page,
                              pageQuantity: auditLogsData.meta.pagination.total_pages
                          };
                      }
      
                      const auditLogsData = await getAuditLogs();
                      server.auditLogs = {
                          logs: auditLogsData.logs,
                          quantity: auditLogsData.quantity,
                          perPage: auditLogsData.perPage,
                          pageQuantity: auditLogsData.pageQuantity
                      };
                  })
              );
      
              this.servers.quantity = data.meta.pagination.total;
              this.servers.perPage = data.meta.pagination.per_page;
              this.servers.pageQuantity = data.meta.pagination.total_pages;
          };
      
          // Function Call
          await getServersData();
          this.emit("ready");
      }
    }
}

module.exports = wisp;