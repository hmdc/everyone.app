# everyone.app

A GitHub App built with [Probot](https://github.com/probot/probot) that maintains a team with all your organization members. Upon installation, an `everyone` team will be created in your organization and every member added to it. Every new member joining your organization will be added automatically. 

Click [here](https://github.com/apps/everyone-app) to install it on your org now, or deploy your own instance. 

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t everyone.app .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> everyone.app
```

## GitHub Action

See [`.github/workflows/run-action.yml`](.github/workflows/run-action.yml) for an example of how to run from this repo as an Action. This repo can also be published and run from another repo as an Action following the example in [`probot/example-github-action`](https://github.com/probot/example-github-action).

***Note:*** GitHub Actions currently cannot be granted sufficient privileges to administer Organizations, so this is essentially useless.

## Contributing

If you have suggestions for how everyone.app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 Alain Hélaïli <helaili@github.com>
