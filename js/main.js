import './utils.js';
import './upload-image-modal.js';
import './image-upload-preview.js';

import {getData} from './api.js';
import {renderPosts, initPostClickHandler} from './post-render.js';
import {showDataError} from './form-notification.js';
import {showFilters, initFilters } from './image-filters.js';

getData()
  .then((posts) => {
    renderPosts(posts);
    initPostClickHandler(posts);
    showFilters();
    initFilters(posts);
  })
  .catch(() => {
    showDataError();
  });
