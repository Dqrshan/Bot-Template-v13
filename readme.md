<h1 align="center">🎉 Discord Bot Template | djs v13 🎉</h1>

> Forked from [Hjuiihu/bot-template-discord.js-v13](https://github.com/Hjuiihu/bot-template-discord.js-v13)

## 📒 Description

-   This repository is customised as per my use.
-   A great thanks to the owner of repository because this is a wonderful template using **classes**!
-   I've modified the whole source to make it compatible with intellisense (auto complete - see below).
-   If you don't want slash commands,
    -   Remove the following line in [`src/Events/client/ready.js`](https://github.com/Dqrshan/bot-template-discord.js-v13/blob/main/src/Events/client/ready.js):
    ```js
    await client.initInteractions(client.guilds.cache.get(client.config.guild))
    ```

## 📝 Prerequisites

-   This repo requires the following dependencies
    -   [discord.js](https://npmjs.com/package/discord.js)
    -   [@discordjs/rest](https://npmjs.com/package/@discordjs/rest)
    -   [discord-api-types](https://npmjs.com/package/discord-api-types)
    -   [dotenv](https://npmjs.com/package/dotenv)
-   To install them, use the following command

```js
npm install discord.js @discordjs/rest discord-api-types dotenv
```

-   Dev Dependencies:
    -   [nodemon](https://npmjs.com/package/nodemon)
    -   [prettier](https://npmjs.com/package/prettier)
-   To install these, use the following command

```js
npm install nodemon prettier --save-dev
```

## 📝 Instructions

-   Rename [`.env.example`](https://github.com/Dqrshan/bot-template-discord.js-v13/blob/main/.env.example) to `.env` and fill in your bot's token.

```shell
token=AbCdEfGhIj.kLmNoPqRsTuVwXyZ.1234
```

-   Fill in more details in [`src/config.js`](https://github.com/Dqrshan/bot-template-discord.js-v13/blob/main/src/config.js).
    -   **prefix**: Main Prefix for the Bot.
    -   **token**: Don't change if already entered in `.env`.
    -   **guild**: The guild where slash commands are to be registered.

## 💫 Features

-   Supports **Message** & **Slash Commands**

    -   `run` function for Prefix Commands
    -   `exec` function for Slash Commands, in the same file!

-   Advanced registration of commands (both slash & message)
-   Advanced execution of commands (both slash & message)

## 📈 Contribution

I may or may not have made a few errors but feel free to **fork** this repository and create a [pull request](https://github.com/Dqrshan/bot-template-discord.js-v13/pulls)

## 📞 Contact Me

<table>
  <tr>
    <td align="center"><a href="https://discord.com/users/838620835282812969"><img src="https://media.discordapp.net/attachments/855069622306996255/1002811623297265764/static_img_7.jpg" width="100px">
    <br />
      <sub>
        <b>Lorenz#1337</b>
      </sub>
    </a>
  </tr>
</table>
