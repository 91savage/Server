module.export = {
    receiver: 'webhook',
    status: 'firing',
    alerts: [
        {
            status: 'firing',
            labels: { alertname: 'test' },
            annotations: { description: 'description', summary: 'summary' },
            startsAt: '2022-11-14T01:24:17.119Z',
            endsAt: '0001-01-01T00:00:00Z',
            generatorURL: '',
            fingerprint: '1f56cb8f931d1bd4',
        },
    ],
    groupLabels: { alertname: 'test' },
    commonLabels: { alertname: 'test' },
    commonAnnotations: { description: 'description', summary: 'summary' },
    externalURL: 'http://prometheus:9093',
    version: '4',
    groupKey: '{}:{alertname="test"}',
    truncatedAlerts: 0,
};
