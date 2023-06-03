<template>  
      
  <nav class="navbar navbar-expand-lg navbar-light bg-custom">  
    <div class="container-fluid">  
      <div class="navbar-nav" id="navbarNav">   
        <div v-if="!isAdmin">  
          <div v-if="!isAvto">  
          <li class="nav-item d-flex">  
            <button v-on:click="addToInterest" class="btn btn-primary me-3">Вступить</button> 
          </li> 
          </div> 
          <div v-else> 
          <li class="nav-item d-flex">  
            <button v-on:click="DeleteFromInterest" class="btn btn-primary me-3">Выйти</button> 
          </li> 
          <li class="nav-item d-flex">  
            <router-link class="nav-link me-3" :to="{name: 'add-post', params: {id: this.$route.params.id}}">  
              <span class="navbar-brand mb-0 h1">Добавить пост</span>  
            </router-link>  
          </li>  
          <li class="nav-item d-flex">  
            <router-link class="nav-link me-3" :to="{name: 'users', params: {id: this.$route.params.id}}">  
              <span class="navbar-brand mb-0 h1">Участники сообщества : {{ userCount }}</span>  
            </router-link>  
          </li>  
        </div> 
        </div> 
        <div v-else> 
          <li class="nav-item d-flex">  
            <button v-on:click="deleteInterest" class="btn btn-primary me-3">удалить сообщество</button> 
          </li> 
          <li class="nav-item d-flex">  
            <router-link class="nav-link me-3" :to="{name: 'add-post', params: {id: this.$route.params.id}}">  
              <span class="navbar-brand mb-0 h1">Добавить пост</span>  
            </router-link>  
          </li>  
          <li class="nav-item d-flex">  
            <router-link class="nav-link me-3" :to="{name: 'users', params: {id: this.$route.params.id}}">  
              <span class="navbar-brand mb-0 h1">Участники сообщества: {{ userCount }}</span>  
            </router-link>  
          </li> 
        </div> 
      </div>  
    </div>  
  </nav>  

  <div >  
    <div >  
      <div class="form-box"> 
      <ul class="list-group">  
        <li v-for="(post, index) in posts" :key="index" class="list-group-item d-flex justify-content-between align-items-start">  
          <router-link class="nav-link" :to="{ name: 'post-details', params: { id: post.id, admin: isAdmin, intId: interestId }}">  
            <div class="ms-2 me-auto">  
              <div class="badge bg-primary rounded-pill">{{ users[post.user_id]?.username }}</div>  
              <div class="fw-bold" >{{ post.title }}</div> 
              <div class="text-break form-box1">{{ post.body }}</div>                                     
              <div class="small">{{ post.created_at }}</div>  
            </div>                 
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
                users: [],
                isAdmin: 0,
                isAvto: 0,
                userCount: 0
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            },
            interestId() {
              return this.$route.params.id
            },
        },
        methods: {
          getUsersInterest() {
                http                   
                    .get("/user_interests/interest_id/" + this.interestId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                          this.userCount = response.data.length
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
          deleteInterest() {                
                          http
                            .post(`/deleteInterest/${this.interestId}`)
                            .then(response => {
                              console.log(response.data); // выводим ответ сервера в консоль
                              window.location.reload(); // перезагружаем страницу после удаления
                            })
                            .catch(e => {
                              console.log(e);
                            });
          },
          DeleteFromInterest() { 
            var user_interest_id = 1;
            http                   
                    .get("/user_interests/interest_user_id/" + this.interestId + "/" + this.currentUser.id) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        if(response.data.length > 0) {
                          user_interest_id = response.data[0].id;
                          http
                            .post(`/deleteUser_interests/${user_interest_id}`)
                            .then(response => {
                              console.log(response.data); // выводим ответ сервера в консоль
                              window.location.reload(); // перезагружаем страницу после удаления
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        }
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
          },
          addToInterest(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    user_id: this.currentUser.id,
                    interest_id: this.interestId,
                    admin: 0,
                    
                };
                // Либо var data = this.user;
                http
                    .post("/addUser_interests", data)
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                    window.location.reload();
            },
            getUserInterest() {
                http                   
                    .get("/user_interests/interest_user_id/" + this.interestId + "/" + this.currentUser.id) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        if(response.data.length > 0) {
                          this.isAvto = 1;
                          this.isAdmin = response.data[0].admin;
                        }
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
            this.getUserInterest();
            this.getUsersInterest();
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
    background-color: #69aff0;
}
.form-box {
  border: 1px solid #000000;
  padding: 5px;
  background-color: #8dc1f8;
}
.form-box1 {
  border: 1px solid #000000;
  padding: 5px;
  background-color: #fafafa;
}
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border: none;
  border-radius: 0;
  background-color: #ffffff;
  margin-bottom: 10px;
}
</style>