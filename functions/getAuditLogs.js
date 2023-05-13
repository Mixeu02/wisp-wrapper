const { getFetch } = require("../util/fetch");

const getAuditLogs = async (server, name, token) => {
    if (!server){
        throw new Error("Server not defined.")
    }

    const auditLogsData = await getFetch(`https://${name}/api/client/servers/${server.uuid_short}/audit-logs`, token, true);
    return {
        logs: auditLogsData.data,
        quantity: auditLogsData.meta.pagination.total,
        perPage: auditLogsData.meta.pagination.per_page,
        pageQuantity: auditLogsData.meta.pagination.total_pages
    };
}

module.exports = getAuditLogs;