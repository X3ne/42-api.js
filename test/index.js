require('dotenv').config();
const ApiClient = require('../index');
const client = new ApiClient({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });

client.GenerateToken();
client.GetToken().then(function (token) {
    console.log(token);
});

// client.GetUserCursus('tjolivet').then((data) => {
//     console.log(data);
// });

// client.GetUsers({"filter[login]": 'tjolivet'}).then((data) => {
//     console.log(data);
// });

// client.GetCoalitions().then((data) => {
//     console.log(data);
// });
