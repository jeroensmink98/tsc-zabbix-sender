# Typescript based Zabbix Sender Client

This small little utility allows you to send data packages using the trapper protocol to Zabbix. This project is a Typescript port of an already exisiting [package](https://www.npmjs.com/package/node-zabbix-sender). It was ment for me as an exercise to port some vanilla Javascript code over to Typescript. The implementation is quiet simalar to the original package, but it's not 100% the same.

## Usage

You can install this package using npm:

```bash

npm install zabbix-sender-ts

```

Afterwards you can import the package into your project:

```typescript
const SenderA = new ZabbixSender({
    host: 'xxx',
    port: xxx,
    agentHost: 'xxx'
});

// It's possible to add multiple items to your sender
SenderA.addItem('key', 1000);
SenderA.addItem('cpu_usage', 99);
SenderA.addItem('ram_usage', 1024);

SenderA.send((err, res, items) => {
    if (err) {
        console.log(err);
    }
}); 

//
// Or specify a different host for each item
//

const SenderB = new ZabbixSender({
    host: 'xxx',
    port: xxx,
});

SenderB.addItem('key', 'value', 'host-a.com');
SenderB.addItem('key', 'value', 'host-b.com');

SenderB.send((err, res, items) => {
    if (err) {
        console.log(err);
    }
}); 
```
## Instance options

Whenever you create a new instance of zabbix sender, you can pass an options object (e.g new ZabbixSender(opts)) here are the options defaults:
```javascript
{
    host: 'localhost',
    port: 10051,
    timeout: 5000,
    with_ns: false,
    with_timestamps: false,
    items_host: require('os').hostname()
}
```
- `host` and `port` are self-explanatory, the zabbix server host & port
- `timeout` is a socket timeout in milliseconds, when connecting to the zabbix server
- `with_timestamps` when you `addItem`, timestamp will be added as well
- `with_ns` implies `with_timestamps`, nanoseconds portion of the timestamp seconds will be added to the item
- `items_host` a target monitored host in zabbix. used when you don't specify the host when you `addItem`, see example above

## Instance methods

`addItem([host], key, value)`

Adds an item to the request payload. The item data won't be sent until the send method invoked. The return value is self instance, so chaining can be used.

`clearItems()`

Clears the previously added items (if any). Mostly used internally, but you can use this method, if you want to make sure no orphan items are present. The return value is self instance, so chaining can be used.

`send(callback)`

Sends all items that were added to the request payload. The callback function passes 3 arguments error (if any), the response from zabbix server (trapper), and the items array of item objects. The send method clears items that were previously added. In case of error, the previously added items will be kept, for the next send invocation.


## Protocol References
[Zabbix Trapper Protocol](https://www.zabbix.com/documentation/current/en/manual/appendix/items/trapper)