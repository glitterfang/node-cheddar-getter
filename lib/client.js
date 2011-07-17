(function() {
  var Client, request, xml;
  request = require('request');
  xml = require('xml2js');
  Client = (function() {
    function Client(productCode) {
      this.productCode = productCode;
      if (!this.productCode) {
        throw new Error("Need to supply a product code.");
      }
    }
    Client.prototype.base = 'https://cheddargetter.com/xml';
    Client.prototype.make_path = function(route) {
      return "" + this.base + route;
    };
    Client.prototype.authenticate = function(username, password) {
      return this.auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    };
    Client.prototype.request = function(path, fn) {
      var opts;
      if (!this.auth) {
        throw new Error("Need to authenticate before requesting.");
      }
      opts = {
        uri: this.make_path(path),
        headers: {
          'Authorization': this.auth
        }
      };
      return request(opts, function(err, res, body) {
        var parser;
        if (err != null) {
          throw err;
        }
        parser = new xml.Parser();
        parser.addListener('end', function(obj) {
          return fn(obj, body);
        });
        return parser.parseString(body);
      });
    };
    Client.prototype.getCustomer = function(customerCode, fn) {
      return this.request("/customers/get/productCode/" + this.productCode + "/code/" + customerCode, fn);
    };
    return Client;
  })();
  module.exports = Client;
}).call(this);
