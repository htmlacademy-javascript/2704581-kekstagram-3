import {renderPosts} from './post-render.js';
import {debounce} from './utils.js';

const imageFilters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const showFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

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

    switch (filterId) {
      case 'filter-default':
        filteredPosts = posts;
        break;

      case 'filter-random':
        filteredPosts = [...posts].sort(() => Math.random() - 0.5).slice(0, 10);
        break;

      case 'filter-discussed':
        filteredPosts = [...posts].sort(
          (a, b) => b.comments.length - a.comments.length,
        );
        break;
    }
    debouncedRender(filteredPosts);
  });
};

export {showFilters, initFilters};
