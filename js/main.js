import './utils.js';
import './upload-image-modal.js';
import './image-upload-preview.js';

import {getData} from './api.js';
import {renderPosts} from './post-render.js';
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
