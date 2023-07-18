import { loadScript } from '../../scripts/lib-franklin.js';

/* global grecaptcha */

const submissionEndpoint = '/form-submissions';

function validateFields(form) {
  // Check all fields have a value entered
  return [...form.querySelectorAll('input[type="text"]')].reduce((validSoFar, input) => {
    const thisFieldValid = !!input.value;

    if (!thisFieldValid) {
      input.setCustomValidity('Field cannot be empty.');
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();

    return validSoFar && thisFieldValid;
  }, true);
}

function executeFormSubmission(form, token, handleSubmitError) {
  // This object automatically contains the field g-recaptcha-response that the server verifies
  // If not using formData, the response token can also be accessed explicitly in the token param
  const formData = new FormData(form);

  fetch(submissionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        ...Object.fromEntries(formData),
      },
    }),
  }).then((res) => {
    if (res.ok) {
      window.location = '/success';
    } else {
      handleSubmitError();
    }
  }).catch(handleSubmitError);
}

export default function decorate(block) {
  block.innerHTML = `
    <form>
        <div id="error-outlet"></div>
        <label for="name">Enter your name</label>
        <input type="text" name="name" />
        <label for="message">Enter a message to submit</label>
        <input type="text" name="message" />
        <button type="submit">Submit</button>
        <div id="recaptcha-placeholder"></div>
    </form>
  `;

  // This lazy loads the Google captcha script as soon as a user clicks on an input in the form
  [...block.querySelectorAll('input')].forEach((input) => {
    input.addEventListener('focus', () => {
      if (!window.captchaScriptPromise) {
        window.captchaScriptPromise = loadScript('https://www.google.com/recaptcha/api.js?render=explicit', {
          name: 'captcha',
        });
      }
    });
  });

  block.querySelector('button[type="submit"]').addEventListener('click', async (e) => {
    e.preventDefault();

    // Remove error message if present
    block.querySelector('form #error-outlet').innerText = '';

    // Validate
    if (!validateFields(block.querySelector('form'))) {
      return;
    }

    // Disable the submit button
    block.querySelector('button[type="submit"]').setAttribute('disabled', 'true');

    // Ensure that captcha has been loaded
    await window.captchaScriptPromise;

    // Callback when an error occurs submitting data
    const handleSubmitError = () => {
      block.querySelector('form #error-outlet').innerText = 'An error occurred submitting. Try again.';
      block.querySelector('form button[type="submit"]').removeAttribute('disabled');
    };

    // Reset recaptcha
    if (block.querySelector('iframe[title="reCAPTCHA"]')) {
      grecaptcha.reset();
    }

    // Render recaptcha and submit on completion
    grecaptcha.render('recaptcha-placeholder', {
      sitekey: '6Ld7pxgnAAAAAMqMVe4cKYz0vM7OP9tBVnCqtlx0',
      callback: async (token) => executeFormSubmission(block.querySelector('form'), token, handleSubmitError),
    });
  });
}
