const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const closeButton = imageUploadForm.querySelector('.img-upload__cancel');

const commentField = imageUploadForm.querySelector('.text__description');

const hashtagField = imageUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  commentField,
  validateComment,
  'Комментарий не может быть длиннее 140 символов',
);

const validateHashtags = (value) => {
  const hashtags = value.split(/\s+/).filter((hashtag) => hashtag !== '');
  const hashtagPattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const normalizedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(normalizedHashtags);

  if (normalizedHashtags.length !== uniqueHashtags.size) {
    return false;
  }

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }
  return true;

};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  'Неверный формат хэштега',
);

const openImageUploadForm = () => {
  imageEditOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

imageUploadInput.addEventListener('change', openImageUploadForm);

const closeImageUploadForm = () => {
  imageEditOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristine.reset();
};

closeButton.addEventListener('click', closeImageUploadForm);

imageUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

document.addEventListener('keydown', (evt) => {
  if (
    document.activeElement !== commentField &&
    document.activeElement !== hashtagField &&
    evt.key === 'Escape'
  ) {
    closeImageUploadForm();
  }
});
