import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListInterests from "./components/interest/ListInterests";
import AddInterest from "./components/interest/AddInterest";
import Interest from "./components/interest/Interest";
import SearchInterest from "./components/interest/SearchInterest";

// определяем маршруты
const routes = [
    {
        path: "/listInterests", // указание маршрута, по которому будем переходить к списку абитуриентов
        name: "interests", // имя маршрута
        alias: "/interests", // указание дополнительного маршрута
        component: ListInterests, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список сообществ"
        }
    },
    {
        path: "/interest/:id",
        name: "Interest-details",
        component: Interest,
        props: true, // указываем, что компонент Abiturient.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные сообщества"
        }
    },
    {
        path: "/addInterest",
        name: "add-interest",
        component: AddInterest,
        meta: {
            title: "Добавление сообщества"
        }
    },
    {
        path: "/searchInterest",
        name: "search-interest",
        component: SearchInterest,
        meta: {
            title: "Поиск абитуриентов"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});
export default router;