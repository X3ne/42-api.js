const storage = require('node-persist');

async function storeToken(token) {
    await storage.init();
    await storage.setItem('token', token.access_token);
}

async function getToken() {
    await storage.init();
    const token = await storage.getItem('token');
    return token;
}

module.exports = {
    storeToken,
    getToken
};
