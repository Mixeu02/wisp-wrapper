const { EventEmitter } = require('events');

// Util

async function getData(url, token) {
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
      referrerPolicy: "no-referrer"
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Main

const wisp = {
    Panel: class extends EventEmitter{
        constructor(){
          super();
          this.name = null;
          this.token = null
          this.servers = null;
        }

        connect = async (name, token) => {
          this.name = name;
          this.token = token;

          // Servers Data
            const getServersData = async () => {
                const data = await getData(`https://${this.name}/api/client/servers`, this.token);
        
                this.servers = new Map();
                for (let i = 0; i < data.data.length; i++){
                    this.servers.set(data.data[i].attributes.uuid, data.data[i].attributes)
                }
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