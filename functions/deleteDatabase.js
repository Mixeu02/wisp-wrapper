const { getFetch, postFetch, patchFetch } = require("../util/fetch");

const deleteDatabase = async (server, name, token, id) => {
    const auditLogsData = await getFetch(`https://${name}/api/client/servers/${server.uuid_short}/databases/${id}`, token, true);
    return {
        logs: auditLogsData.data,
        quantity: auditLogsData.meta.pagination.total,
        perPage: auditLogsData.meta.pagination.per_page,
        pageQuantity: auditLogsData.meta.pagination.total_pages
    };
}

module.exports = getAuditLogs;