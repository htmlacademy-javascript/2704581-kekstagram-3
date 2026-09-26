const COMMENT_MAX_LENGTH = 140;
const HashtagRequirements = {
  MAX_LENGTH: 19,
  MIN_LENGTH: 1,
  MAX_COUNT: 5,
};

const imageUploadForm = document.querySelector('.img-upload__form');
const commentField = imageUploadForm.querySelector('.text__description');
const hashtagField = imageUploadForm.querySelector('.text__hashtags');


const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentField,
  validateComment,
  `Комментарий не может быть длиннее ${COMMENT_MAX_LENGTH} символов`,
);

const getHashtags = (value) => {
  const hashtags = value.split(/\s+/).filter((hashtag) => hashtag !== '');

  const normalizedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(normalizedHashtags);

  return { hashtags, normalizedHashtags, uniqueHashtags };
};

const validateHashtagsFormat = (value) => {
  const hashtagPattern = new RegExp(`^#[A-Za-zА-Яа-яЁё0-9]{${HashtagRequirements.MIN_LENGTH},${HashtagRequirements.MAX_LENGTH}}$`);
  const { hashtags } = getHashtags(value);

  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const validateHashtagsCount = (value) => {
  const { uniqueHashtags } = getHashtags(value);

  return uniqueHashtags.size <= HashtagRequirements.MAX_COUNT;
};

const validateHashtagsDoubleness = (value) => {
  const { normalizedHashtags, uniqueHashtags } = getHashtags(value);

  return normalizedHashtags.length === uniqueHashtags.size;
};

pristine.addValidator(
  hashtagField,
  validateHashtagsFormat,
  'Хэштег должен начинаться с символа #, содержать только буквы и цифры, и быть не длиннее 20 символов',
  10,
);

pristine.addValidator(
  hashtagField,
  validateHashtagsCount,
  `Хэштегов не может быть больше ${HashtagRequirements.MAX_COUNT}`,
  5,
);

pristine.addValidator(
  hashtagField,
  validateHashtagsDoubleness,
  'Хэштеги не должны повторяться',
  1,
);

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

const isTextFieldFocused = () =>
  document.activeElement === commentField ||
  document.activeElement === hashtagField;

export { validateForm, resetValidation, isTextFieldFocused };
