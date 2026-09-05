const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const checkStringLength = (string, number) => string.length <= number;

checkStringLength('Hello', 10);

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }

  return newString === normalizedString;
}

isPalindrome('А роза упала на лапу Азора');

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

extractingInteger('1a2b3c4d5e6f7g8h9i0j');

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

isMeetOutOfWorkHours('09:00', '18:00', '10:00', 60);

export {getRandomArrayElement, getRandomInteger};
