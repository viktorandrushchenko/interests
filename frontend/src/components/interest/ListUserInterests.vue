<template> 
    <div class="text-center"> 
        <h2 style="font-style: italic;">Сообщества</h2> 
        <ul class="list-group"> 
            <li v-for="(usersInterest, index) in usersInterests" :key="index" class="list-group-item"> 
                <h3 class="font-weight-bold text-secondary"> 
                    {{interests[usersInterest.interest_id]?.name}}  {{usersInterest.admin ? ' - Администратор' : ''}}                 
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
                interests: [],
            };
        },
        computed: { // вычисляемые свойства
            userId() {
              return this.$route.params.user_id
            },
        },
        methods: {
            getUsersInterests() {
                http
                    .get("/user_interests/user_id/" + this.userId)
                    .then(response => {
                            this.usersInterests = response.data;
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
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getUsersInterests();
            this.getInterests();
        }
    };
</script>