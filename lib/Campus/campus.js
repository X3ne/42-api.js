const superagent = require('superagent');

async function _GetCampus(url, id, params) {
    if (!id) endpoint = `${url}/v2/campus`;
    else endpoint = `${url}/v2/campus/${id}`;
    return new Promise(async (resolve, reject) => {
        const token = await this._RefreshToken();
        superagent
            .get(`${endpoint}`)
            .set({'Authorization': `Bearer ${token}`})
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
    _GetCampus,
}
