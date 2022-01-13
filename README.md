# 42.js

[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)

## 🚧Work in progress🚧

> An small npm module to fetch the 42 api


## Table of Contents

<!-- * [Doc](#doc) -->
* [Install](#install)
* [Usage](#usage)
* [License](#license)

## Install
```sh
npm install 42.js
```
```sh
pnpm install 42.js
```

## Usage

```js
const Api42 = require('42.js');

const client = new Api42({ clientId: client_id, clientSecret: client_secret });

async function GetData() {
    const token = await client.GetToken();
    console.log(token);

    const newToken = await client.GenerateToken();
    console.log(newToken);

    const token = await client.GetToken();
    console.log(token);

    const validity = await client.RefreshToken();
    console.log(validity);


    const users = await client.GetUsers({"filter[login]": 'login'});
    console.log(users);

    const userCursus = await client.GetUserCursus('login');
    console.log(userCursus);

    const userLog = await client.GetUserLocationStats('login')
    console.log(userLog);

    const coalitions = await client.GetCoalitions();
    console.log(coalitions);
}
GetData();
```
### Or
```js
const Api42 = require('42.js');

const client = new Api42({ clientId: client_id, clientSecret: client_secret });

client.GetToken().then((data) => {
    console.log(data);
});

client.GenerateToken().then((data) => {
    console.log(data);
});

client.GetToken().then((data) => {
    console.log(data);
});

client.RefreshToken().then((data) => {
    console.log(data);
});

client.GetUsers({"filter[login]": 'login'}).then((data) => {
    console.log(data);
});

client.GetUserCursus('login').then((data) => {
    console.log(data);
});

client.GetUserLocationStats('login').then((data) => {
    console.log(data);
});

client.GetCoalitions().then((data) => {
    console.log(data);
});
```

## License

[MIT](LICENSE) © X3ne
