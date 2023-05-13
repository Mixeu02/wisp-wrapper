const { deleteFetch } = require("../util/fetch");

const deleteDatabase = async (server, name, token, id) => {
    await deleteFetch(`https://${name}/api/client/servers/${server.uuid_short}/databases/${id}`, token, true);
}

module.exports = deleteDatabase;