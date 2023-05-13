const { patchFetch } = require("../util/fetch");

const changeName = async (server, name, token, newName) => {
    if (!newName){
        throw new Error("New name not defined")
    }

    await patchFetch(`https://${name}/api/client/servers/${server.uuid_short}/details`, token, { name: newName }, false);
}

module.exports = changeName;