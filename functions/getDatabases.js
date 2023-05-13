const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const getDatabases = async (server, name, token) => {
    if (!server) {
        throw new Error("Server not defined.");
    }

    const getDatabases = await getFetch(`https://${name}/api/client/servers/${server.uuid_short}/databases`, token, true);
    return getDatabases.data;
}

module.exports = getDatabases;