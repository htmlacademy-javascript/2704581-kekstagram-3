import './utils.js';
import {renderPosts} from './post-render.js';
import './upload-image-modal.js';
import {getData} from './api.js';
import {showDataError} from './form-notification.js';
import {showFilters, initFilters } from './image-filters.js';

getData()
  .then((posts) => {
    renderPosts(posts);
    showFilters();
    initFilters(posts);
  })
  .catch(() => {
    showDataError();
  });
