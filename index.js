const superagent = require('superagent');
const Queuing = require('./queue');
const { storeToken, getToken } = require('./token');
const Users = require('./bin/User/user');
const Campus = require('./bin/Campus/campus');
const Coalitions = require('./bin/Coalitions/coalitions');
const queue = new Queuing();

const ApiUrl = 'https://api.intra.42.fr'

class Client {
    constructor(options) {
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
    };

    GenerateToken() {
        return queue.addToQueue({
            "value": this._GenerateToken.bind(this),
            "args": [this.clientId, this.clientSecret]
        });
    }

    GetToken() {
        return queue.addToQueue({
            "value": this._GetToken.bind(this),
            "args": []
        });
    }

    GetUserLocationStats(login, params) {
        return queue.addToQueue({
            "value": Users._GetUserLocationStats.bind(this),
            "args": [login, ApiUrl, params]
        });
    }

    GetUsers(params) {
        return queue.addToQueue({
            "value": Users._GetUsers.bind(this),
            "args": [ApiUrl, params]
        });
    }

    GetUserCursus(login, params) {
        return queue.addToQueue({
            "value": Users._GetUserCursus.bind(this),
            "args": [login, ApiUrl, params]
        });
    }

    GetCampus(id, params) {
        return queue.addToQueue({
            "value": Campus._GetCampus.bind(this),
            "args": [ApiUrl, id, params]
        });
    }

    GetCoalitions(params) {
        return queue.addToQueue({
            "value": Coalitions._GetCoalitions.bind(this),
            "args": [ApiUrl, params]
        });
    }

    async _GenerateToken(clientId, clientSecret) {
        return new Promise((resolve, reject) => {
            try {
                superagent
                    .post(`${ApiUrl}/oauth/token`)
                    .send(`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
                    .set('accept', 'json')
                    .end((err, res) => {
                        let tokenData = JSON.parse(res.text);
                        if (tokenData.error) return console.error(tokenData.error_description);
                        console.log(`New token: ${tokenData.access_token}`);
                        storeToken(tokenData);
                        resolve(tokenData);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    async _GetToken() {
        return new Promise((resolve, reject) => {
            try {
                getToken().then((token) => {
                    resolve(token);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = Client;
