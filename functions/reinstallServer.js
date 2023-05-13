const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const reinstallServer = async (server, name, token) => {
    await postFetch(`https://${name}/api/client/servers/${server.uuid_short}/advanced/reinstall`, token, null, false);
}

module.exports = changeName;