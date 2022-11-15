var express = require('express');
var router = express.Router();
var axios = require('axios');
var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* GET home page. */
router.post('/', function (req, res, next) {
    //var data = require('../data');

    var data = req.body;

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
                html:
                    `<div>${alert.annotations.description}</div>` +
                    `<a href="http://alertmanager:8080/silence/3${qs.slice(
                        0,
                        -1
                    )}"> 누르면 알람이 꺼져요</a>`,
            },
            e => {
                console.log(e);
                if (e) res.status(500).json({ result: 'fail' });
                else res.status(200).json({ result: 'success' });
            }
        );
    });
});

router.get('/silence/:hour', async (req, res, next) => {
    const hour = req.params.hour;
    var labels = req.query;

    var matchers = [];
    Object.keys(labels).forEach(k => {
        matchers.push({
            name: k,
            value: labels[k],
            isRegex: false,
            isEqual: true,
        });
    });
    try {
        await axios({
            method: 'POST',
            url: 'http://alertmanager:9093/api/v2/silences',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                matchers,
                startsAt: new Date(),
                endsAt: new Date(Date.now() + 60 * 60 * 1000 * hour),
                createdBy: 'Webhook_sehun',
                comment: 'This is silence is Created by Webhook_sehun',
            },
        });
        res.send(`<script>alert("Success"); window.close();</script>`);
    } catch (e) {
        res.send(`<script>alert("Fail"); window.close();</script>`);
        console.log(e);
    }
});

module.exports = router;
