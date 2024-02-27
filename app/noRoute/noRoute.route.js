const noRoute = require('./noRoute.controller');
const security = require('../../middleware/security.middleware');

module.exports = (router) => {

    router.get('*', security.blocker, noRoute.noRouteFound);
    router.post('*', security.blocker, noRoute.noRouteFound);
    router.put('*', security.blocker, noRoute.noRouteFound);
    router.delete('*', security.blocker, noRoute.noRouteFound);
    router.patch('*', security.blocker, noRoute.noRouteFound);

}