var express = require('express');
var router = express.Router();
var axios = require('axios');
var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* GET home page. */
router.post('/', function (req, res, next) {
    var data = require('../data');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'ekdma1403@gmail.com',
            pass: 'xqmccweihrjzbdga',
        },
    });
    data.alerts.forEach(alert => {
        const labels = alert.labels;
        var qs = '?';
        Object.keys(labels).forEach(k => {
            qs += `${k}=${labels[k]}&`;
        });
        transporter.sendMail(
            {
                from: 'Alertmanager <ekdma1403@gmail.com>',
                to: 'ekdma1403@gmail.com',
                subject: alert.annotations.summary,
                html: `<div>${alert.annotations.description}</div>` + `<a href=""> Turn off</a>`,
            },
            e => {
                if (e) res.status(500).json({ result: 'fail' });
                else res.status(200).json({ result: 'success' });
            }
        );
    });
});

module.exports = router;
