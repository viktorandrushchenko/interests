<template>
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <div class="container-fluid">
            <div class="navbar-nav" id="navbarNav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/addInterest">
                        <span class="navbar-brand mb-0 h1">Добавить сообщество</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/searchInterest">
                        <span class="navbar-brand mb-0 h1">Поиск сообщества</span>
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
    <ul class="list-group mt-3">
        <li v-for="(post, index) in posts" :key="index" class="list-group-item">
            <router-link :to="{name: 'interest-details', params: {id: post.id}}">
                {{posts[post.user_id]?.username}} {{post.title}} {{post.body}} {{post.created_at}}
            </router-link>
        </li>
    </ul>
</div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListPosts", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                posts: [],
                users: []
            };
        },
        methods: { // методы компонента
            getPosts() {
                http
                    .get("/posts/interest_id/" + 1) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.posts = response.data;
                        console.log(this.posts);
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getUsers() {
                http
                    .get("/users")
                    .then(response => {
                    this.users = response.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});
                    })
                    .catch(e => {
                    console.log(e);
                    });
            },
        },
        
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getPosts();
            this.getUsers();
        },
    }
</script>

<style scoped>
.ml-auto{
  margin-left: auto;
}
.navbar-brand{
  font-size: 12pt !important;
}
.navbar-brand-button{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.bg-custom {
    background-color: #b5d8f9;
}
</style>