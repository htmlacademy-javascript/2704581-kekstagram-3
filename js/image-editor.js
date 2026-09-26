const ScaleRequirements = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  START: 100,
};

const scaleControls = document.querySelector('.scale');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const effectLevelValue = document.querySelector('.effect-level__value');
const imageEffectSliderContainer = document.querySelector('.img-upload__effect-level');
const imageEffectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const setImageUploadPreviewStyle = (style = '', property = 'filter') => {
  imageUploadPreview.style[property] = style;
};

const updateScale = (scale) => {
  scaleControlValue.value = `${scale}%`;
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
};

const initializeImageFormScale = ({ signal }) => {
  scaleControls.addEventListener(
    'click',
    (evt) => {
      const currentScale = parseInt(scaleControlValue.value, 10);
      if (evt.target.classList.contains('scale__control--smaller')) {
        if (currentScale <= ScaleRequirements.MIN) {
          return;
        }

        updateScale(currentScale - ScaleRequirements.STEP);
      }

      if (evt.target.classList.contains('scale__control--bigger')) {
        if (currentScale >= ScaleRequirements.MAX) {
          return;
        }

        updateScale(currentScale + ScaleRequirements.STEP);
      }
    },
    { signal },
  );

  updateScale(ScaleRequirements.START);
};

const setEffectLevelValue = (value = 0) => {
  effectLevelValue.value = value;
};

noUiSlider.create(imageEffectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',

  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }

      return value.toFixed(1);
    },

    from: (value) => parseFloat(value),
  },
});

imageEffectSlider.noUiSlider.on('update', () => {
  const value = imageEffectSlider.noUiSlider.get();
  const currentEffect = document.querySelector('.effects__radio:checked').value;

  setEffectLevelValue(value);

  switch (currentEffect) {
    case 'chrome':
      setImageUploadPreviewStyle(`grayscale(${value})`);
      break;

    case 'sepia':
      setImageUploadPreviewStyle(`sepia(${value})`);
      break;

    case 'marvin':
      setImageUploadPreviewStyle(`invert(${value}%)`);
      break;

    case 'phobos':
      setImageUploadPreviewStyle(`blur(${value}px)`);
      break;

    case 'heat':
      setImageUploadPreviewStyle(`brightness(${value})`);
      break;

    default:
      setImageUploadPreviewStyle();
  }
});

const toggleImageEffectSliderContainer = (on = false) => {
  if (on) {
    imageEffectSliderContainer.classList.remove('hidden');
  } else {
    imageEffectSliderContainer.classList.add('hidden');
  }
};

const initializeImageFormEffects = ({ signal }) => {
  effectsList.addEventListener(
    'change',
    (evt) => {
      const effect = evt.target.value;

      toggleImageEffectSliderContainer(effect !== 'none');

      switch (effect) {
        case 'chrome':
        case 'sepia':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          break;

        case 'marvin':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          break;

        case 'phobos':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          break;

        case 'heat':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          break;

        default:
          imageUploadPreview.style.filter = '';
          effectLevelValue.value = 0;
      }
    },
    { signal },
  );
};

const initializeImageEditorForm = ({ signal }) => {
  toggleImageEffectSliderContainer();
  setImageUploadPreviewStyle();
  setEffectLevelValue();
  initializeImageFormScale({ signal });
  initializeImageFormEffects({ signal });
};

const resetImageEditor = () => {
  updateScale(ScaleRequirements.START);
  setImageUploadPreviewStyle();
  setEffectLevelValue();
  document.querySelector('.effects__radio[value="none"]').checked = true;
  toggleImageEffectSliderContainer();
};

export { resetImageEditor, initializeImageEditorForm };
