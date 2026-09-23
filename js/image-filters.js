import { renderPosts } from './post-render.js';
import { debounce } from './utils.js';

const RANDOM_POST_AMOUNT = 10;

const imageFilters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const debouncedRender = debounce((filteredPosts) => {
  clearPictures();
  renderPosts(filteredPosts);
});

const initFilters = (posts) => {
  filtersForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const activeButton = filtersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    const filterId = evt.target.id;
    let filteredPosts;

    const sortRandomly = () => Math.random() - 0.5;

    switch (filterId) {
      case 'filter-default':
        filteredPosts = posts;
        break;

      case 'filter-random':
        filteredPosts = posts.toSorted(sortRandomly).slice(0, RANDOM_POST_AMOUNT);
        break;

      case 'filter-discussed':
        filteredPosts = posts.toSorted(
          (firstPost, secondPost) => secondPost.comments.length - firstPost.comments.length,
        );
        break;
    }
    debouncedRender(filteredPosts);
  });

  imageFilters.classList.remove('img-filters--inactive');
};

export { initFilters };
