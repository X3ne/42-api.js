const superagent = require('superagent');
const Queuing = require('./lib/queue');
const { storeToken, getToken } = require('./lib/utils');
const Users = require('./lib/User/user');
const Campus = require('./lib/Campus/campus');
const Coalitions = require('./lib/Coalitions/coalitions');
const queue = new Queuing();

const ApiUrl = 'https://api.intra.42.fr';

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
            "args": [this.clientId, this.clientSecret]
        });
    }

    RefreshToken() {
        return queue.addToQueue({
            "value": this._RefreshToken.bind(this),
            "args": [ApiUrl]
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
        return new Promise(async (resolve, reject) => {
            superagent
                .post(`${ApiUrl}/oauth/token`)
                .send(`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
                .set('accept', 'json')
                .end(async (err, res) => {
                    let tokenData = JSON.parse(res.text);
                    if (tokenData.error) return resolve({ 'error': tokenData.error_description });
                    await storeToken(tokenData);
                    resolve(tokenData.access_token);
                });
        });
    }

    async _GetToken() {
        return new Promise(async (resolve, reject) => {
            let token = await getToken();
            if (!token)
                token = await this._GenerateToken(this.clientId, this.clientSecret);
            resolve(token);
        });
    }

    async _RefreshToken(url) {
        return new Promise(async (resolve, reject) => {
            const token = await this._GetToken();
            superagent
                .get(`${url}/oauth/token/info`)
                .set({'Authorization': `Bearer ${token}`})
                .set('accept', 'json')
                .end(async (err, res) => {
                    if (res.body.error || err)
                    {
                        const genToken = await this._GenerateToken(this.clientId, this.clientSecret)
                        return resolve(genToken);
                    }
                    resolve(token);
                });
        });
    }
}

module.exports = Client;
