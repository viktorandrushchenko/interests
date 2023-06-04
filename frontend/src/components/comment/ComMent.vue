<template>       
    <div class="row mt-3 form-box"> 
      <div class="col-md-8 offset-md-2"> 
              <div class="ms-2 me-auto"> 

                
                <div v-if="currentUser.id==comments.user_id ? 1 : 0"> 
                  <div class="badge bg-primary rounded-pill">{{ users[comments.user_id]?.username}}</div> 
                  <textarea class="text-break form-box form-control" id="body" name="body" placeholder="Введите текст" required v-model="comments.body" rows="3"></textarea> 
                  <div class="small">{{ comments.created_at }}</div> 
                  <div class="d-flex justify-content-between"> 
                  <button v-on:click="deleteComment" class="btn btn-primary me-3">удалить</button> 
                  <button v-on:click="updateComment" class="btn btn-primary me-3">Изменить</button> 
                </div>
                </div>
                
                <div v-else>
                  <div class="badge bg-primary rounded-pill">{{ users[comments.user_id]?.username}}</div> 
                <div class="text-break form-box">{{ comments.body }}</div>                                    
                <div class="small">{{ comments.created_at }}</div> 
                <div class="d-flex justify-content-between">
                <div v-if="isAdmin== 'true' ? 1 : 0"> 
                  <button v-on:click="deleteComment" class="btn btn-primary me-3">удалить</button> 
                </div>
                </div>
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
              comments: {
                  id: null,
                  user_id: null,
                  body: "",
                  post_id: null,
                  created_at: null,
              },
              users: [],
          };
      },
      computed: { // вычисляемые свойства
          currentUser() {
              return this.$store.state.auth.user;
          },
          commentId() {
            return this.$route.params.id
          },
          isAdmin() {
            return this.$route.params.admin
          },
          postId() {
            return this.$route.params.postId
          },
          intId() {
            return this.$route.params.intId
          },
      },
      methods: {
        deleteComment() {                 
          http 
            .post(`/deleteComments/${this.commentId}`) 
            .then(response => { 
              console.log(response.data); // выводим ответ сервера в консоль 
              this.$router.push({ name: 'post-details', params:{id: this.postId, admin: this.isAdmin, intId: this.intId } }); // переходим на страницу со списком всех постов
            }) 
            .catch(e => { 
              console.log(e); 
            }); 
        },
        getComment() {
              http
                  .get("/comments/" + this.commentId ) // обращаемся к серверу для получения списка абитуриентов
                  .then(response => { // запрос выполнен успешно
                      this.comments = response.data;
                      console.log(this.postId);
                  })
                  .catch(e => { // запрос выполнен с ошибкой
                      console.log(e);
                  });
          },
          updateComment(e) {
            e.preventDefault();
            var data = {
              body: this.comments.body
            };
            http
                .post("/updateComments/" + this.commentId, data)
                .then(() => {
                    this.$router.push({ name: 'post-details', params:{id: this.postId, admin: this.isAdmin, intId: this.intId } });
                })
                .catch(e => {
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
          this.getComment();
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