<template>   
      <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <div class="container-fluid">
          <div class="navbar-nav" id="navbarNav">
            <li class="nav-item">
              <router-link class="nav-link" to="/addInterest">
                <span class="navbar-brand mb-0 h1">Добавить сообщество</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/searchInterest">
                <span class="navbar-brand mb-0 h1">Поиск сообщества</span>
              </router-link>
            </li>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="form-box">
      <ul class="list-group mt-3">
        <li v-for="(interest, index) in interests" :key="index" class="list-group-item">
          <router-link class="nav-link" :to="{name: 'interest-details', params: {id: interest.id}}">
            {{interest.name}}
          </router-link>
        </li>
      </ul>
      </div>
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
                        console.log(this.interests);
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
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border: none;
  border-radius: 0;
  background-color: #f8f9fa;
  margin-bottom: 10px;
}

.list-group-item:hover {
  background-color: #2579f8;
}

.nav-link {
  color: #000000;
  text-decoration: none;
}

.nav-link:hover {
  color: #fffefe;
  text-decoration: underline;
}
.form-box {
  border: 1px solid #000000;
  padding: 20px;
  background-color: #bed8ff;
}
</style>