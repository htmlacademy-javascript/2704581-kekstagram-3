import {getRandomArrayElement, getRandomInteger} from './utils.js';

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Елена',
  'Максим',
  'Анна',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Наталья',
  'Алексей',
  'Екатерина',
  'Михаил',
  'София',
  'Павел',
];

const DESCRIPTIONS = [
  'Закат над морем',
  'Утро в горах',
  'Прогулка по старому городу',
  'Кот смотрит в окно',
  'Летний пикник в парке',
  'Дорога через лес',
  'Первый снег',
  'Чашка кофе на подоконнике',
  'Ночной город в огнях',
  'Цветущее поле',
  'Волны на побережье',
  'Вид с вершины',
  'Дождливый день',
  'Уличный музыкант',
  'Тихое озеро',
  'Велосипедная прогулка',
  'Радуга после дождя',
  'Домик в деревне',
  'Солнечный двор',
  'Поездка к водопаду',
  'Зимний лес',
  'Песчаный пляж',
  'Облака над городом',
  'Вечерняя набережная',
  'Завтрак на террасе',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_POST_COUNT = 25;

const CommentRequirements = {
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 30,
};

const LikeRequirements = {
  MIN_AMOUNT: 15,
  MAX_AMOUNT: 200,
};

const MessageRequirements = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 2,
};

const AvatarRequirements = {
  MIN_POSITION: 1,
  MAX_POSITION: 6,
};

let currentCommentId = 1;

const createMessage = () => {
  const messageCount = getRandomInteger(MessageRequirements.MIN_LENGTH, MessageRequirements.MAX_LENGTH);
  const firstMessage = getRandomArrayElement(MESSAGES);

  if (messageCount === 1) {
    return firstMessage;
  }

  let secondMessage = getRandomArrayElement(MESSAGES);

  while (firstMessage === secondMessage) {
    secondMessage = getRandomArrayElement(MESSAGES);
  }

  return `${firstMessage} ${secondMessage}`;
};

const createComment = () => ({
  id: currentCommentId++,
  avatar: `img/avatar-${getRandomInteger(AvatarRequirements.MIN_POSITION, AvatarRequirements.MAX_POSITION)}.svg`,
  name: getRandomArrayElement(NAMES),
  message: createMessage(),
});

const generateComments = () => {
  const comments = [];
  const commentCount = getRandomInteger(CommentRequirements.MIN_AMOUNT, CommentRequirements.MAX_AMOUNT);

  for (let i = 0; i < commentCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPost = (_, index) => {
  const postId = index + 1;

  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikeRequirements.MIN_AMOUNT, LikeRequirements.MAX_AMOUNT),
    comments: generateComments()
  };
};

const similarPosts = Array.from({length: SIMILAR_POST_COUNT}, createPost);

export { similarPosts };
