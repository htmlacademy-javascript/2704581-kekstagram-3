import { resetImageEditor, initializeImageEditorForm } from './image-editor.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './form-notification.js';
import { validateForm, resetValidation, isTextFieldFocused } from './form-validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const closeButton = imageUploadForm.querySelector('.img-upload__cancel');

const submitButton = imageUploadForm.querySelector('.img-upload__submit');

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const loadRealImage = () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (!matches) {
    return;
  }
  const imageUrl = URL.createObjectURL(file);

  imageUploadPreview.src = imageUrl;

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });
};

let controller;

const closeImageUploadForm = () => {
  imageEditOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  resetValidation();
  resetImageEditor();
  controller.abort();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onImageUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  blockSubmitButton();
  const formData = new FormData(imageUploadForm);
  sendData(formData)
    .then(() => {
      closeImageUploadForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(unblockSubmitButton);
};

const openImageUploadForm = () => {
  controller = new AbortController();
  const { signal } = controller;

  closeButton.addEventListener('click', closeImageUploadForm, { signal });
  imageUploadForm.addEventListener('submit', onImageUploadFormSubmit, { signal });

  document.addEventListener(
    'keydown',
    (evt) => {
      const errorMessage = document.querySelector('.error');
      if (
        !isTextFieldFocused() &&
        !errorMessage &&
        evt.key === 'Escape'
      ) {
        closeImageUploadForm();
      }
    },
    { signal },
  );

  initializeImageEditorForm({ signal });
  loadRealImage();

  imageEditOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

imageUploadInput.addEventListener('change', openImageUploadForm);


