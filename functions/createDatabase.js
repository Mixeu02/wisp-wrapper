const { postFetch } = require("../util/fetch");

const createDatabase = async (server, name, token, host, nameDB, connections) => {
    await postFetch(`https://${name}/api/client/servers/${server.uuid_short}/databases`, token, true);
}

module.exports = createDatabase;

server.createDatabase("155.555.5.55", "lucas", "%")