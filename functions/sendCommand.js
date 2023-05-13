const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const sendCommand = async (server, name, token, command) => {
    if (!command){
        throw new Error("Command not defined")
    }
    
    await postFetch(`https://${name}/api/client/servers/${server.uuid_short}/command`, token, { command: command }, false);
}

module.exports = sendCommand;