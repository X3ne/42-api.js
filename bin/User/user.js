const { getToken } = require('../../token');
const superagent = require('superagent');

async function _GetUserCursus(login, url) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/users/${login}/cursus_users`)
                .set({'Authorization': `Bearer ${token}`})
                .set('accept', 'json')
                .end((err, res) => {
                    if (res.statusCode != 200) {
                        return resolve(res.status);
                    }
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

async function _GetUserLocationStats(login, url) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/users/${login}/locations_stats`)
                .set({'Authorization': `Bearer ${token}`})
                .set('accept', 'json')
                .end((err, res) => {
                    if (res.statusCode != 200) {
                        return resolve(res.status);
                    }
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
    _GetUserLocationStats,
    _GetUserCursus
}
