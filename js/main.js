import './utils.js';
import {renderPosts} from './post-render.js';
import './upload-image-modal.js';
import {getData} from './api.js';
import {showDataError} from './form-notification.js';

getData()
  .then((posts) => {
    renderPosts(posts);
  })
  .catch(() => {
    showDataError();
  });
