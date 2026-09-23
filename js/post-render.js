import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const prepareOnePost = (onePostData) => {
  const picture = pictureTemplate.cloneNode(true);

  const image = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  image.id = onePostData.id;
  image.src = onePostData.url;
  image.alt = onePostData.description;

  likes.textContent = onePostData.likes;
  comments.textContent = onePostData.comments.length;

  return picture;
};

const renderPosts = (postsData) => {
  const fragment = document.createDocumentFragment();

  postsData.forEach((post) => {
    const picture = prepareOnePost(post);
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
};

const initPostClickHandler = (posts) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.className !== 'picture__img') {
      return;
    }

    evt.preventDefault();

    const id = evt.target.id;
    const currentPost = posts.find((post) => post.id === Number(id));

    openBigPicture(currentPost);
  });
};

export { renderPosts, initPostClickHandler };
