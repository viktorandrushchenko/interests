<template> 
    <div class="text-center"> 
        <h2 style="font-style: italic;">Участники сообщества</h2> 
        <ul class="list-group"> 
            <li v-for="(usersInterest, index) in usersInterests" :key="index" class="list-group-item"> 
                <h3 class="font-weight-bold text-secondary"> 
                    <router-link :to="{name: 'userInterests', params: {user_id: usersInterest.user_id}}"  style="text-decoration: none;">
                    {{currentUser.id==usersInterest.user_id ? "Вы:" : ""   }} {{users[usersInterest.user_id]?.username}} 
                      {{usersInterest.admin ? ' - Администратор' : ''}} 
                    </router-link>                
                </h3> 
            </li> 
        </ul> 
    </div> 
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchInterest",
        data() {
            return {
                usersInterests: [],
                users: [],
            };
        },
        computed: { // вычисляемые свойства
            interestId() {
              return this.$route.params.id
            },
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getUsersInterests() {
                http
                    .get("/user_interests/interest_id/" + this.interestId)
                    .then(response => {
                            this.usersInterests = response.data;
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
            this.getUsersInterests();
            this.getUsers();
        }
    };
</script>