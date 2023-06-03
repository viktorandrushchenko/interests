import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListInterests from "./components/interest/ListInterests";
import AddInterest from "./components/interest/AddInterest";
import Interest from "./components/interest/InteRest";
import SearchInterest from "./components/interest/SearchInterest";

import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";

import store from "./store/index";

import ListMyInterests from "./components/interest/ListMyInterests";
import ListPosts from "./components/post/ListPosts";
import AddPost from "./components/post/AddPost";
import Post from "./components/post/PosT";

import ListUsers from "./components/interest/ListUsers";

// определяем маршруты
const routes = [
    {
        path: "/listUsers/:id", // указание маршрута, по которому будем переходить к списку абитуриентов
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/post/:id/:admin/:intId",
        name: "post-details",
        component: Post,
        props: true, // указываем, что компонент Abiturient.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные поста"
        }
    },
    {
        path: "/addPost/:id",
        name: "add-post",
        component: AddPost,
        meta: {
            title: "Добавление поста"
        }
    },
    {
        path: "/listPosts", // указание маршрута, по которому будем переходить к списку абитуриентов
        name: "Posts", // имя маршрута
        alias: "/Posts", // указание дополнительного маршрута
        component: ListPosts, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список постов"
        }
    },
    {
        path: "/listMyInterests", // указание маршрута, по которому будем переходить к списку абитуриентов
        name: "Myinterests", // имя маршрута
        alias: "/myInterests", // указание дополнительного маршрута
        component: ListMyInterests, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список моих сообществ"
        }
    },
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
        name: "interest-details",
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
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});
export default router;