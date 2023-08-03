import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// This is important we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add you icons directly in this plugin. SEe other examples for how you can add
// other styles or just the individual icons
library.add(fas)
library.add(far)
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)


