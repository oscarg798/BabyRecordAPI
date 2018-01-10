
var _ = require("lodash");
var routes = [];

require("./user").forEach(function(i) {
    routes.push(i);
});

require("./session").forEach(function(i) {
    routes.push(i);
});

require("./baby").forEach(function(i) {
    routes.push(i);
});


require("./record").forEach(function(i) {
    routes.push(i);
});



module.exports = _.flatten(routes);