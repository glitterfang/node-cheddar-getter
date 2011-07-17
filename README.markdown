**node-cheddar-getter: a simple client**

Right now the project is pretty simple.  It's basically a wrapper class that combines `request` with `xml2js`.

I'll be adding convience functions as I need them.

Feel free to add your own, and I'll pull them in.

It's not on npm yet.

**usage*
Client = require 'cheddar-getter'

```coffeescript
client = new Client 'FOO' # Pass the code of the product you want to work with.
client.authenticate 'username', 'password'

client.request 'path', (obj) -> # play with object

```

Check out `src/client.coffee` for convience function like `client.getCustomer`.
