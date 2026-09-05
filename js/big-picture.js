const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');

const likes = bigPicture.querySelector('.likes-count');

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentTotalShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = document.querySelector('.social__comments');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

function renderComments(commentsData, container) {
  commentsData.forEach((oneComment) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = oneComment.avatar;
    avatar.alt = oneComment.name;

    const message = document.createElement('p');
    message.classList.add('social__text');
    message.textContent = oneComment.message;

    comment.append(avatar, message);
    container.appendChild(comment);
  });
}

function makeShowNextComments(comments) {
  let visibleComments = COMMENTS_PER_PORTION;
  return (increment = 0) => {
    visibleComments += increment;
    const commentsPortion = comments.slice(visibleComments - COMMENTS_PER_PORTION, visibleComments);

    renderComments(commentsPortion, commentsContainer);

    if (visibleComments >= comments.length) {
      commentLoader.classList.add('hidden');
      commentTotalShownCount.textContent = comments.length;
    } else {
      commentTotalShownCount.textContent = visibleComments;
    }
  };
}

let controller;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  controller.abort();
};

function openBigPicture(data) {
  controller = new AbortController();
  const { signal } = controller;

  bigPictureImg.src = data.url;
  likes.textContent = data.likes;
  description.textContent = data.description;
  commentTotalCount.textContent = data.comments.length;

  bigPicture.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsContainer.innerHTML = '';
  const showComments = makeShowNextComments(data.comments);

  showComments();

  commentLoader.addEventListener('click', () => showComments(COMMENTS_PER_PORTION), { signal });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  },
  { signal }
  );

  closeButton.addEventListener('click', closeBigPicture, { signal });
}

export { openBigPicture };
