import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import RadialProgress from "vue3-radial-progress";

import CanvasJSChart from '@canvasjs/vue-charts';

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(router)
app.use(store)
app.use(VueSweetalert2);
app.use(CanvasJSChart);
app.use(RadialProgress);
app.mount('#app')
