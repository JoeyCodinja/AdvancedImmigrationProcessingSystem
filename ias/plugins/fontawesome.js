import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// This is important we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add you icons directlyy in this plugin. SEe other examples for how you can add
// other styles or just the individual icons
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)


