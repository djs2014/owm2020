// npm install node-fetch
const fetch = require("node-fetch");
const owm = require('./owm.js');

const API_SERVICE_URL = "https://api.openweathermap.org/data/2.5/onecall";

module.exports = async function (context, req) {
    try {
        context.log('HTTP trigger function processed a request: ' + req.originalUrl);

        // lat, lon, appid must exist
        if (!req.query.lat || !req.query.lon || !req.query.appid) {
            context.res = {
                status: 400,
                body: "missing parameters lat,lon,appid"
            };
            return;
        }

        let queryString = req.originalUrl.split('?').splice(1).join('?');
        let uri = API_SERVICE_URL + '?' + queryString;

        let fetchResp = await fetch(uri);
        let resBody = await fetchResp.text();

        context.res = {
            headers: {
                "content-type": "application/json"
            },
            status: 200,
            body: JSON.stringify(owm.convertOWMdata(resBody))
        };

    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
}