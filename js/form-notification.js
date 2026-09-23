const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const showDataError = () => {
  const alertContainer = dataErrorTemplate
    .content
    .querySelector('.data-error')
    .cloneNode(true);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

let controller;
const showMessage = (template, messageClass, buttonClass, innerClass) => {
  controller = new AbortController();
  const { signal } = controller;

  const message = template.content
    .querySelector(messageClass)
    .cloneNode(true);
  document.body.append(message);

  const button = message.querySelector(buttonClass);
  const messageContainer = message.querySelector(innerClass);

  const closeMessage = () => {
    message.remove();
    controller.abort();
  };

  button.addEventListener('click', closeMessage, { signal });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  },
  { signal },
  );

  document.addEventListener('click', (evt) => {
    if (!messageContainer.contains(evt.target)) {
      closeMessage();
    }
  },
  { signal },
  );
};

const showSuccessMessage = () => {
  showMessage(
    successTemplate,
    '.success',
    '.success__button',
    '.success__inner',
  );
};

const showErrorMessage = () => {
  showMessage(
    errorTemplate,
    '.error',
    '.error__button',
    '.error__inner',
  );
};

export { showDataError, showSuccessMessage, showErrorMessage };
