import { log } from 'console';
import { Item, ZabbixSender } from '../src/zabbix-sender';
import { expect, test, describe } from 'vitest';


/**
 * ZabbixSender addItem tests
 */
describe('ZabbixSender addItem tests', () => {
    // Test: addItem with all three arguments
    test('addItem with host, key, and value', async () => {
        const sender = new ZabbixSender({});
        const host = 'example.com';
        const key = 'testKey';
        const value = 'testValue';

        sender.addItem(key, value, host);

        const expectedItem = {
            host: host,
            key: key,
            value: value
        };

        expect(sender['items']).toHaveLength(1);
        expect(sender['items'][0]).toMatchObject(expectedItem);
        expect(sender['items'][0]['host']).toBe(host);
    });

    // Test: addItem with only two arguments
    test('addItem with key and value (default host)', async () => {
        const sender = new ZabbixSender({ agentHost: 'defaultHost' });
        const key = 'testKey';
        const value = 'testValue';

        sender.addItem(key, value);

        const expectedItem = {
            host: 'defaultHost',
            key: key,
            value: value
        };

        expect(sender['items']).toHaveLength(1);
        expect(sender['items'][0]).toMatchObject(expectedItem);
        expect(sender['items'][0]['host']).toBe('defaultHost');
    });
});


/**
 * ZabbixSender prepareData tests
 */
describe('ZabbixSender prepareData tests', () => {
    test('prepareData with items and without timestamp', async () => {
        const sender = new ZabbixSender({});

        const items: Item[] = [
            {
                host: 'example.com',
                key: 'testKey1',
                value: 'testValue1',
            },
            {
                host: 'example.com',
                key: 'testKey2',
                value: 'testValue2',
            },
        ];

        const preparedData = sender._test_prepareData(items, false);
        const expectedDataHeader = Buffer.from('ZBXD\x01', 'binary');

        expect(preparedData.subarray(0, 5)).toEqual(expectedDataHeader);

        const payloadLength = preparedData.readInt32LE(5);
        const payload = preparedData.subarray(13);
        const payloadJson = JSON.parse(payload.toString('utf8'));

        expect(payloadLength).toBe(payload.length);
        expect(payloadJson.request).toBe('sender data');
        expect(payloadJson.data).toEqual(items);
        expect(payloadJson).not.toHaveProperty('clock');
    });

    test('prepareData with items and with timestamp', async () => {
        const sender = new ZabbixSender({});

        const items: Item[] = [
            {
                host: 'example.com',
                key: 'testKey1',
                value: 'testValue1',
            },
            {
                key: 'testKey2',
                value: 'testValue2',
            },
        ];

        const preparedData = sender._test_prepareData(items, true);
        const expectedDataHeader = Buffer.from('ZBXD\x01', 'binary');

        expect(preparedData.subarray(0, 5)).toEqual(expectedDataHeader);

        const payloadLength = preparedData.readInt32LE(5);
        const payload = preparedData.subarray(13);
        const payloadJson = JSON.parse(payload.toString('utf8'));

        expect(payloadLength).toBe(payload.length);
        expect(payloadJson.request).toBe('sender data');
        expect(payloadJson.data).toEqual(items);
        expect(payloadJson).toHaveProperty('clock');
    });
});

/**
 * ZabbixSender send tests
 */
describe('ZabbixSender send tests', () => {
    test('send with items and without timestamp', async () => {
        
    });
});






