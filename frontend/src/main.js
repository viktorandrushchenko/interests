import { createApp } from 'vue' // Импорт метода для создания приложения
import App from './App.vue' // Импорт главного компонента
import router from './router' // Маршрутизация

const app = createApp(App); // Создание экземпляра приложения
app.use(router); // Подключение маршрутизации
app.mount('#app'); // Привязка экземпляра приложения к странице HTML (находится в public)
