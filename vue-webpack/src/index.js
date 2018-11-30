import Vue from 'vue'; 
import router from './router/index.js';
import App from './app.vue'; 
import iview from 'iview';
import './theme/index.less';
Vue.use(iview);
new Vue({
    el: '#app',
    router:router,
    render: h => {
        return h(App);
    }
});
