// NO ROUTE FOUND
module.exports.noRouteFound = async (req, res, next) => {
    return Response.sendNoBody(res, {
        statusCode: 404
    });
}