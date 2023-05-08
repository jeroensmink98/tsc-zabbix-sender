# Typescript based Zabbix Sender Client

This small little utility allows you to send data packages using the trapper protocol to Zabbix. This project is a Typescript port of an already exisiting [package](https://www.npmjs.com/package/node-zabbix-sender). It was ment for me as an exercise to port some vanilla Javascript code over to Typescript.

## Usage

You can install this package using npm:

```bash

npm install zabbix-sender-ts

```

Afterwards you can import the package into your project:

```typescript
const zabbixSender = new ZabbixSender({
        host: 'xxx',
        port: xxx,
        agentHost: 'xxx'
    });

    await zabbixSender.addItem('key', 'value');

    // It's possible to add multiple items to your sender
    await zabbixSender.addItem('key', 1000);
    await zabbixSender.addItem('cpu_usage', 99);
    await zabbixSender.addItem('ram_usage', 1024);

    await zabbixSender.send((err, res, items) => {
        if (err) {
            console.log(err);
        }
    }); 
```
