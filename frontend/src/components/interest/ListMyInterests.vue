<template>
  <div class="container">
    <div v-if="displayContent">
    <ul class="list-group mt-3">
      <li v-for="(myInterest, index) in myInterests" :key="index" class="list-group-item">        
          <router-link class="nav-link" :to="{name: 'interest-details', params: {id: myInterest.id}}">{{interests[myInterest.interest_id]?.name}}</router-link>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListMyInterests", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                myInterests: [],
                interests: [],
                displayContent: true,
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: { // методы компонента
            getMyInterests() {
            const currentUser = this.currentUser;
            http.get("/user_interests/user_id/" + currentUser.id)
                .then(response => {
                this.myInterests = response.data;
                })
                .catch(e => {
                console.log(e);
                });
            },
            getInterests() {
                http
                    .get("/interests")
                    .then(response => {
                    this.interests = response.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});
                    })
                    .catch(e => {
                    console.log(e);
                    });
            },
            isUser() {
                const currentUser = this.currentUser;
                this.myInterests = this.myInterests.filter(interest => interest.user_id === currentUser.id);
                console.log(this.myInterests.length)
                //if(this.myInterests.length > 0)
                //this.displayContent = true;
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getMyInterests();
            this.getInterests();
            this.isUser();
        }
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