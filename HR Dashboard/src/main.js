import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 1. Library ko import karein
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

// 2. Library ko app mein use karein
app.use(VueApexCharts);

app.mount('#app')