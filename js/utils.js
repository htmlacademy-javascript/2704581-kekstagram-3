const DEBOUNCE_DELAY = 500;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const checkStringLength = (string, number) => string.length <= number;

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }

  return newString === normalizedString;
}

function extractingInteger (parameter) {
  let positiveString = '';
  const normalizedParameter = parameter.toString();

  for (let i = 0; i < normalizedParameter.length; i++) {
    const parsedChar = parseInt(normalizedParameter[i], 10);
    if (!isNaN(parsedChar)) {
      positiveString += normalizedParameter[i];
    }
  }

  const positiveInteger = parseInt(positiveString, 10);
  if (isNaN(positiveInteger)) {
    return NaN;
  } else {
    return positiveInteger;
  }
}

function getTimeInMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  return hours * 60 + minutes;
}

function isMeetOutOfWorkHours(dayStart, dayEnd, meetStart, meetLength) {
  const dayStartInMinutes = getTimeInMinutes(dayStart);
  const dayEndInMinutes = getTimeInMinutes(dayEnd);
  const meetStartInMinutes = getTimeInMinutes(meetStart);
  const meetEndInMinutes = meetStartInMinutes + meetLength;

  return (
    meetStartInMinutes >= dayStartInMinutes &&
    meetEndInMinutes <= dayEndInMinutes
  );
}

function debounce(callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(
      () => callback.apply(this, rest),
      timeoutDelay
    );
  };
}

export {getRandomArrayElement, getRandomInteger, checkStringLength, extractingInteger, isMeetOutOfWorkHours, isPalindrome, debounce};
