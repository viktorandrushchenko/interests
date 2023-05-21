<template>
    <div>
        <h4>Список сообществ</h4>
        <!-- Определение ссылок -->
        <router-link class="item" to="/addInterest">Добавить сообщество</router-link>
        <router-link class="item" to="/searchInterest">Поиск сообщества</router-link>
        <ul>
            <!-- Вывод списка абитуриентов -->
            <li v-for="(interest, index) in interests" :key="index">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных об абитуриенте -->
                <!-- Ссылка на abiturient определена в файле router.js -->
                <!-- По маршруту user подгружается компонент Abiturient.vue -->
                <!-- в params указываются параметры, которые передаются компоненту-->
                <!--Двоеточие перед to указывает, что значение атрибута изменяющееся (динамическое) -->
                <router-link :to="{
                        name: 'interest-details',
                        params: { id: interest.id }
                    }">
                    {{interest.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListInterests", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                interests: []
            };
        },
        methods: { // методы компонента
            getInterests() {
                http
                    .get("/interests") // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.interests = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getInterests();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>