<template>
    <div id="app">
      <div v-if="displayContent">
        <nav class="navbar navbar-expand-lg navbar-light bg-custom">
          <div class="container">
            <div class="navbar-nav" id="navbarNav">
              <li class="nav-item">
                <router-link class="nav-link" to="/listInterests">
                  <span class="navbar-brand mb-0 h1">Сообщества</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/listMyInterests">
                  <span class="navbar-brand mb-0 h1">Мои сообщества</span>
                </router-link>
              </li>
              <li class="nav-item ml-auto d-flex align-items-center">
                <div v-if="currentUser" class="mr-3">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary">{{ currentUser.username }}</span>
                  </div>
                </div>
            </li>
                <li class="nav-item ml-auto d-flex align-items-center">
                  <div class="ml-auto">
                    <button v-if="currentUser" @click.prevent="logOut" class="btn btn-outline-dark mr-3">Выйти</button>
                  </div>
                </li>
            </div>
          </div>
        </nav>
      </div>
      <div v-else>
        <div class="mt-3 d-flex justify-content-center"> <!-- центрируем по горизонтали -->
          <router-link to="/login" class="btn btn-primary btn-lg">Перейти к входу</router-link> <!-- добавляем стилизованную кнопку и увеличиваем размер -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import UserService from '../services/user.service';
    export default {
        name: "NavBar",
        data() {
            return {
                displayContent: false
            };

        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
                window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            UserService.getUserBoard()
                .then(() => {
                    this.displayContent = true;
                })
                .catch(e => {
                        this.content =
                            (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    }
                );
        }
    };
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
        background-color: #b5e3f9;
    }
  </style>