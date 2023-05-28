<template> 
    <div class="container"> 
      <nav class="navbar navbar-expand-lg navbar-light bg-custom"> 
        <div class="container-fluid"> 
          <div class="navbar-nav" id="navbarNav"> 
            <li class="nav-item"> 
              <router-link class="nav-link" to="/addPost"> 
                <span class="navbar-brand mb-0 h1">Добавить пост</span> 
              </router-link> 
            </li>  
          </div> 
        </div> 
      </nav> 
      <div class="row mt-3"> 
        <div class="col-md-8 offset-md-2"> 
          <ul class="list-group"> 
            <li v-for="(post, index) in posts" :key="index" class="list-group-item d-flex justify-content-between align-items-start"> 
              <router-link class="nav-link" :to="{ name: 'interest-details', params: { id: post.id } }"> 
                <div class="ms-2 me-auto"> 
                  <div class="fw-bold">{{ users[post.user_id]?.username }}</div> 
                  <div>{{ post.title }}</div> 
                  <div class="small">{{ post.created_at }}</div> 
                </div> 
                <div class="badge bg-primary rounded-pill">{{ post.body }}</div> 
              </router-link> 
            </li> 
          </ul> 
        </div> 
      </div> 
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
                const interest_id = this.$route.params.id;
                http                   
                    .get("/posts/interest_id/" + interest_id) // обращаемся к серверу для получения списка абитуриентов
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