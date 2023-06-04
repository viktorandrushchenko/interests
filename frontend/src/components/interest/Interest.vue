<template>   
  <nav class="navbar navbar-expand-lg navbar-light bg-custom">   
    <div class="container-fluid">   
      <div class="navbar-nav" id="navbarNav">   
        <div class="flex-grow-1">
          <div v-if="!isAdmin">   
            <div v-if="!isAvto">   
              <div class="d-flex justify-content-center form-box2 nav-item d-flex mb-3">
              <h3 class="align-self-center">{{ interest.name }}</h3> 
            </div> 
              <li class="nav-item d-flex">   
                <button v-on:click="addToInterest" class="btn btn-primary me-3" style="width: 220px;">Вступить</button>  
              </li>  
            </div>  
            <div v-else>  
              <div class="d-flex justify-content-center form-box2 nav-item d-flex mb-3">
              <h3 class="align-self-center">{{ interest.name }}</h3> 
            </div> 
              <li class="nav-item d-flex mb-3">   
                <button v-on:click="DeleteFromInterest" class="btn btn-primary me-3" style="width: 220px;">Выйти</button>  
              </li>  
              <li class="nav-item d-flex mb-3">  
              <button v-on:click="addPost" class="btn btn-primary me-3 btn-block" style="width: 220px;">
                <router-link :to="{name: 'add-post', params: {id: this.$route.params.id}}" class="text-white" style="text-decoration: none;">
                  Добавить пост
                </router-link>
              </button>  
            </li>  
            <li class="nav-item d-flex mb-3">    
              <button class="btn btn-primary me-3 btn-block" style="width: 220px;">  
                <router-link :to="{name: 'users', params: {id: this.$route.params.id}}" class="text-white" style="text-decoration: none;">  
                  Участники сообщества: {{ userCount }}    
                </router-link>    
              </button>    
            </li>  
            </div>  
          </div>  
          <div v-else>  
            <div class="d-flex justify-content-center form-box2 nav-item d-flex mb-3">
              <input class="align-self-center" name="name" id="name" required v-model="interest.name" >
            </div> 
            <li class="nav-item d-flex mb-3">  
              <button v-on:click="addPost" class="btn btn-primary me-3 btn-block" style="width: 220px;">
                <router-link :to="{name: 'add-post', params: {id: this.$route.params.id}}" class="text-white" style="text-decoration: none;">
                  Добавить пост
                </router-link>
              </button>  
            </li>  
            <li class="nav-item d-flex mb-3">    
              <button class="btn btn-primary me-3 btn-block" style="width: 220px;">  
                <router-link :to="{name: 'users', params: {id: this.$route.params.id}}" class="text-white" style="text-decoration: none;">  
                  Участники сообщества: {{ userCount }}    
                </router-link>    
              </button>    
            </li> 
            <li class="nav-item d-flex mb-3">  
              <button v-on:click="updateInterest" class="btn btn-primary me-3" style="width: 220px;">изменить название</button>  
            </li>  
            <li class="nav-item d-flex mb-3">  
              <button v-on:click="deleteInterest" class="btn btn-danger me-3" style="width: 220px;">удалить сообщество</button>  
            </li> 
          </div>  
        </div>
        <div>  
          <ul class="list-group post-container">   
            <li v-for="(post, index) in posts" :key="index" class="list-group-item d-flex justify-content-between align-items-start">   
              <router-link class="nav-link" :to="{ name: 'post-details', params: { id: post.id, admin: isAdmin, intId: interestId, isAvto: isAvto}}">   
                <div class="ms-2 me-auto">   
                  <div class="badge bg-primary rounded-pill">{{ users[post.user_id]?.username }}</div>   
                  <div class="fw-bold">{{ post.title }}</div>  
                  <div class="text-break form-box1">{{ post.body }}</div>                                      
                  <div class="small">{{ post.created_at }}</div>   
                </div>                  
              </router-link>   
            </li>   
          </ul>   
        </div>  
      </div>   
    </div>   
  </nav>   
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
                userCount: 0,
                interest: []
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
          updateInterest(e) {
              e.preventDefault();
              var data = {
                name: this.interest.name,
              };
              http
                  .post("/updateInterest/" + this.interestId, data)
                  .then(() => {
                    this.$router.push({ name: 'interest-details', params:{id: this.interestId} });
                  })
                  .catch(e => {
                    console.log(e);
                  });
            },
          getInterest() {
                http
                    .get("/interest/" + this.interestId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.interest = response.data;
                        console.log(this.interests);
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
                              this.$router.push({ name: 'interests'});  // перезагружаем страницу после удаления
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
            this.getInterest();
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
.form-box2 {
  border: 1px solid #000000;
  padding: 5px;
  background-color: #fafafa;
  width: 220px;
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
.post-container {
  height: 840px; /* задаем высоту контейнера комментариев в пикселях */
  overflow-y: scroll; /* добавляем вертикальную прокрутку */
}
</style>