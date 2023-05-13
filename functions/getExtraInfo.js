const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const getExtraInfo = async (server, name, token) => {
    const data = await getFetch(`https://${name}/api/client/servers/${server.uuid_short}/resources`, token, true);
    return {
        password: data.query.password,
        players: data.query.players,
        maxplayers: data.query.maxplayers,
        bots: data.query.bots,
        type: data.query.type,
        version: data.query.version
    };
}

module.exports = getExtraInfo;