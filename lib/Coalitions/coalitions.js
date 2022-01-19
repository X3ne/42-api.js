const superagent = require('superagent');

async function _GetCoalitions(url, params) {
    return new Promise(async (resolve, reject) => {
        await this._RefreshToken();
        superagent
            .get(`${url}/v2/coalitions`)
            .set({'Authorization': `Bearer ${this.token.access_token}`})
            .query(params)
            .set('accept', 'json')
            .end((err, res) => {
                if (res.statusCode != 200) return resolve({
                    'error': res.status,
                    'message': res.text
                });
                resolve(res.body);
            });
    });
}

module.exports = {
    _GetCoalitions,
}
