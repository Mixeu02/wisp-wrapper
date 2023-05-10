const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const changeName = async (server, name, token, newName) => {
    if (!server) { return; }
    await patchFetch(`https://${name}/api/client/servers/${server.uuid_short}/details`, token, { name: newName }, false);
}

module.exports = changeName;