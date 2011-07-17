request = require 'request'
xml = require 'xml2js'

class Client
  constructor: (@productCode) -> throw new Error "Need to supply a product code." if !@productCode

  base: 'https://cheddargetter.com/xml'

  make_path: (route) -> "#{@base}#{route}"

  authenticate: (username, password) -> @auth = 'Basic ' + new Buffer(username + ':' + password).toString 'base64'

  request: (path, fn) ->
    throw new Error "Need to authenticate before requesting." if !@auth

    opts =
      uri: @make_path path
      headers: 'Authorization' : @auth

    request opts, (err, res, body) ->
      throw err if err?

      parser = new xml.Parser()
      parser.addListener 'end', (obj) -> fn obj, body

      parser.parseString body

  getCustomer: (customerCode, fn) -> @request "/customers/get/productCode/#{@productCode}/code/#{customerCode}", fn


module.exports = Client

