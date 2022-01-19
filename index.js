const superagent = require('superagent');
const Queuing = require('./lib/queue');
const Users = require('./lib/User/user');
const Campus = require('./lib/Campus/campus');
const Coalitions = require('./lib/Coalitions/coalitions');
const queue = new Queuing();

const ApiUrl = 'https://api.intra.42.fr';

class Client {
    constructor(options) {
        if (!options.clientId) throw new Error('Client Id is required');
        if (!options.clientSecret) throw new Error('Client Secret is required');
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
        return new Promise(async (resolve, reject) => {
            superagent
                .post(`${ApiUrl}/oauth/token`)
                .send(`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
                .set('accept', 'json')
                .end(async (err, res) => {
                    if (res.statusCode != 200) return resolve({
                        'error': res.status,
                        'message': res.text
                    });
                    let tokenData = JSON.parse(res.text);
                    if (tokenData.error) return resolve({ 'error': tokenData.error_description });
                    this.token = tokenData;
                    resolve(this.token);
                });
        });
    }

    async _GetToken() {
        return new Promise(async (resolve, reject) => {
            if (!this.token)
            this.token = await this._GenerateToken(this.clientId, this.clientSecret);
            resolve(this.token);
        });
    }

    async _RefreshToken() {
        return new Promise(async (resolve, reject) => {
            if (!this.token)
                await this._GenerateToken(this.clientId, this.clientSecret);
            superagent
                .get(`${ApiUrl}/oauth/token/info`)
                .set({'Authorization': `Bearer ${this.token.access_token}`})
                .set('accept', 'json')
                .end(async (err, res) => {
                    if (err || res.body.error) {
                        console.log('Refreshing Token');
                        this.token = await this._GenerateToken(this.clientId, this.clientSecret);
                    }
                    resolve(this.token);
                });
        });
    }
}

module.exports = Client;
