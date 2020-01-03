import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faPlus,
  faTrash,
  faSpinner,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

library.add(faGithub, faPlus, faTrash, faSpinner, faCircleNotch);

Vue.component('fa-icon', FontAwesomeIcon);
