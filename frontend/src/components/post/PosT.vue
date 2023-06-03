<template>       
      <div class="row mt-3 form-box"> 
        <div class="col-md-8 offset-md-2"> 
                <div class="ms-2 me-auto"> 
                  <div class="badge bg-primary rounded-pill">{{ users[posts.user_id]?.username}}</div> 
                  <div class="fw-bold" >{{ posts.title }}</div>
                  <div class="text-break form-box">{{ posts.body }}</div>                                    
                  <div class="small">{{ posts.created_at }}</div> 
                  <div v-if="isAdmin== 'true' ? 1 : 0 || currentUser.id==posts.user_id ? 1 : 0">
                    <button v-on:click="deletePost" class="btn btn-primary">удалить</button>
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
            isAdmin() {
              return this.$route.params.admin
            },
            intId() {
              return this.$route.params.intId
            },
        },
        methods: {
          deletePost() {                 
            http 
              .post(`/deletePosts/${this.postId}`) 
              .then(response => { 
                console.log(response.data); // выводим ответ сервера в консоль 
                this.$router.push({ name: 'interest-details', params:{id: this.intId} }); // переходим на страницу со списком всех постов
              }) 
              .catch(e => { 
                console.log(e); 
              }); 
          },
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