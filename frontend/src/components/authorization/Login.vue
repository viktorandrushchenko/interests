<template>
    <div class="form-container">
        <div class="form-box col-md-5">
        <h4 class="mx-auto mt-4">Вход в систему</h4>
        <form name="form" @submit="handleLogin">
            <div class="form-group">
                <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
            </div>
                <div class="form-group d-flex justify-content-between align-items-center"> 
                <button class="btn btn-primary" :disabled="loading"> 
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span> 
                    <span>Войти</span> 
                </button> 
                <router-link to="/register" class="btn btn-secondary ml-2"> 
                    Зарегистрироваться 
                </router-link> 
             </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
    </div>
</template>
<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form-box {
  border: 1px solid #000000;
  padding: 20px;
}
</style>