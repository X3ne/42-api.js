const { getToken } = require('../../token');
const superagent = require('superagent');

async function _GetCoalitions(url, params) {
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${url}/v2/coalitions`)
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
    _GetCoalitions,
}
