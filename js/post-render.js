import { openBigPicture } from './big-picture.js';

const prepareOnePost = (onePostData, template) => {
  const pictureTemplate = template.cloneNode(true);

  const pictureItem = pictureTemplate.querySelector('.picture');
  const image = pictureItem.querySelector('.picture__img');
  const likes = pictureTemplate.querySelector('.picture__likes');
  const comments = pictureTemplate.querySelector('.picture__comments');

  image.id = onePostData.id;
  image.src = onePostData.url;
  image.alt = onePostData.description;

  likes.textContent = onePostData.likes;
  comments.textContent = onePostData.comments.length;

  return pictureTemplate;
};

function renderPosts(postsData) {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  postsData.forEach((post) => {
    const onePostData = prepareOnePost(post, pictureTemplate);

    fragment.appendChild(onePostData);
  });

  document.querySelector('.pictures').appendChild(fragment);
}

const initPostClickHandler = (posts) => {
  const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (evt) => {
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
