const fetch = require('node-fetch');

async function main(params) {
  const { 'field-1': field1, 'g-recaptcha-response': captchaToken } = params;

  if ((!field1) || (!captchaToken)) {
    return { statusCode: 400 };
  }

  // Validate Captcha
  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: params.CAPTCHA_SECRET_KEY, response: captchaToken }),
  });
  const data = await captchaResponse.json();

  if (!captchaResponse.ok || !data.success) {
    return { statusCode: 400, body: 'Captcha Invalid' };
  }

  // Here you would further process the data, after having ensured that the request is legitimate

  // In our case we just return success
  return { statusCode: 200, body: 'Success' };
}

exports.main = main;
