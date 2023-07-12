# Recaptcha Franklin Demo
Demo for franklin [block party](https://www.hlx.live/developer/block-collection#block-party) for integrating Google ReCaptcha with franklin websites.

This uses [reCaptcha v2](https://developers.google.com/recaptcha/docs/display) to verify that a user submitting a form is not a bot.

## Environments
- Preview: https://main--recaptcha-demo--hannessolo.hlx.page/
- Live: https://main--recaptcha-demo--hannessolo.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)


# Deploying Example Backend Action

The backend example is handled through a [IO run time](https://developer.adobe.com/runtime) action.

To deploy:

1. Ensure you have access to Adobe IO Run Time
2. Install the AIO CLI tool: `npm install -g @adobe/aio-cli`
3. Set up a workspace by signing in to [the developer console](https://developer.adobe.com/console). Select create new project from template, adn select the App Builder template. Follow the instructions on screen.
4. In the directory `app-builder`, run `aio app use`. This will ask you to sign in. Then you can choose your previously created workspace in the interactive cli. Overwrite both the `.aio` and `.env` files.
5. Open the `.env` file and append the following config values, obtained from your google account:

```
CAPTCHA_SECRET_KEY=<value>
CAPTCHA_SITE_KEY=<value>
```

6. Run `aio app deploy` to deploy the action.
7. This will return the URL of the deployed action. Copy this value. Open the `configs.xlsx` spreadsheet from sharepoint. Update the value `newsletter-endpoint` to the correct endpoint. Update the value `captcha-site-key` to the same value as in the `.env` file.
