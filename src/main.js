import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import less from 'less'
import './plugins/vant/index'

import { Button,Search } from 'vant';

const app = createApp(App)

app.use(router)
app.use(less)
app.use(store)

app.use(Button).use(Search)

app.mount('#app')

// export default app