const { getToken } = require('../../token');
const superagent = require('superagent');

async function _GetCampus(url, id, params) {
    if (!id) endpoint = `${url}/v2/campus`;
    else endpoint = `${url}/v2/campus/${id}`;
    return new Promise((resolve, reject) => {
        getToken().then((token) => {
            superagent
                .get(`${endpoint}`)
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
    _GetCampus,
}
