# 42.js

## 🚧Work in progress🚧

> An small npm module to fetch the 42 api


## Table of Contents

* [Install](#install)
* [Usage](#usage)
<!-- * [Doc](#doc) -->
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

client.GenerateToken();

client.GetToken().then(function (token) {
    console.log(token);
});

client.GetUserCursus(user).then((data) => {
    console.log(data);
});
```

## License

[MIT](LICENSE) © X3ne
