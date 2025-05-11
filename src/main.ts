import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'boxicons';
import 'boxicons/css/boxicons.min.css';

const app = createApp(App)
const pinia = createPinia()

// createApp(App).mount('#app')
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
