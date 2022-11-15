module.exports = {
    receiver: 'webhook',
    status: 'firing',
    alerts: [
        {
            status: 'firing',
            labels: { alertname: 'This is Alert Test' },
            annotations: { description: 'zzang', summary: 'sehun' },
            startsAt: '2022-11-15T01:45:18Z',
            endsAt: '0001-01-01T00:00:00Z',
            generatorURL: '',
            fingerprint: '4026b7bb7a62297a',
        },
    ],
    groupLabels: { alertname: 'This is Alert Test' },
    commonLabels: { alertname: 'This is Alert Test' },
    commonAnnotations: { description: 'zzang', summary: 'sehun' },
    externalURL: 'http://prometheus:9093',
    version: '4',
    groupKey: '{}:{alertname="This is Alert Test"}',
    truncatedAlerts: 0,
};
