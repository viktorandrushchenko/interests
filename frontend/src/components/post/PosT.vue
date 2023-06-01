<template>
    <div class="container">       
      <div class="row mt-3"> 
        <div class="col-md-8 offset-md-2"> 
                <div class="ms-2 me-auto"> 
                  <div class="badge bg-primary rounded-pill">{{ users[posts.user_id]?.username}}</div> 
                  <div class="fw-bold" >{{ posts.title }}</div>
                  <div class="text-break form-box">{{ posts.body }}</div>                                    
                  <div class="small">{{ posts.created_at }}</div> 
                </div>                 
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
                posts: {
                    id: null,
                    user_id: null,
                    title: "",
                    body: "",
                    interest_id: null,
                    created_at: null,
                },
                users: [],
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            },
            postId() {
              return this.$route.params.id
            },
        },
        methods: {
          getPosts() {
                http
                    .get("/posts/" + this.postId ) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.posts = response.data;
                        console.log(this.postId);
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
.form-box {
  border: 1px solid #000000;
  padding: 5px;
}
</style>