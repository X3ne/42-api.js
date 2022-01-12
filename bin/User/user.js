const { getToken } = require('../../token');
const superagent = require('superagent');

async function _GetUsers(url, params) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/users`)
                .set({'Authorization': `Bearer ${token}`})
                .query(params)
                .set('accept', 'json')
                .end((err, res) => {
                    if (res.statusCode != 200) return resolve(res.body.message);
                    if (res.body.message === 'The access token expired')
                    {
                        this.GenerateToken().then(() => {
                            this.GetUser(login);
                        });
                    }
                    resolve(res.body);
                });
        });
    });
}

async function _GetUserCursus(login, url, params) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/users/${login}/cursus_users`)
                .set({'Authorization': `Bearer ${token}`})
                .query(params)
                .set('accept', 'json')
                .end((err, res) => {
                    if (res.statusCode != 200) return resolve(res.body.message);
                    if (res.body.message === 'The access token expired')
                    {
                        this.GenerateToken().then(() => {
                            this.GetUser(login);
                        });
                    }
                    resolve(res.body);
                });
        });
    });
}

async function _GetUserLocationStats(login, url, params) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/users/${login}/locations_stats`)
                .set({'Authorization': `Bearer ${token}`})
                .query(params)
                .set('accept', 'json')
                .end((err, res) => {
                    if (res.statusCode != 200) return resolve(res.body.message);
                    if (res.body.message === 'The access token expired')
                    {
                        this.GenerateToken().then(() => {
                            this.GetUser(login);
                        });
                    }
                    resolve(res.body);
                });
        });
    });
}

module.exports = {
    _GetUsers,
    _GetUserLocationStats,
    _GetUserCursus
}
