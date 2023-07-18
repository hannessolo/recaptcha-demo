# Recaptcha Franklin Demo
Demo of submission to the [franklin form service](!https://www.hlx.live/developer/forms) using a captcha, integrated directly into the forms pipeline.

To do so, you must configure the `.helix/config` folder in the content with the folowint values:

| key            | value        |
|----------------|--------------|
| captcha.secret | xyz          |
| captcha.type   | reCaptcha v2 |

Only reCaptcha v2 is supported.

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
