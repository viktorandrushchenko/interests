<template>
    <div class="container">
    <div>
        <h4>Добавление поста</h4>
        <div v-if="!submitted" class="mt-3">
            <form @submit="addInterest">
                <div class="mb-3">
                    <label for="short_name" class="form-label">Заголовок</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Введите заголовок" required v-model="post.title">
                </div>
                <div class="mb-3">
                    <label for="short_name" class="form-label">Текст</label>
                    <input type="text"  class="form-control" id="name" name="name" placeholder="Введите текст" required v-model="post.body">
                </div>
                <button type="submit" class="btn btn-success">Добавить</button>
            </form>
        </div>
        <div v-else class="mt-3">
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-2">
                <button v-on:click="newPost" class="btn btn-primary">Добавить новый пост</button>
            </div>
            <div>
                <router-link :to="{name: 'interest-details', params: {id: this.$route.params.id}}" class="btn btn-secondary">Вернуться к постам</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddInterest",
        data() {
            return {
                post: {
                    id: null,
                    title: "",
                    body: "",
                },
                submitted: false
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            addInterest(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    title: this.post.title,
                    body: this.post.body,
                    user_id: this.currentUser.id,
                    interest_id: this.$route.params.id
                };
                // Либо var data = this.user;
                http
                    .post("/addPosts", data)
                    .then(response => { // запрос выполнился успешно
                        this.post.id = response.data.id;
                        this.submitted = true;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                
            },
            newPost() {
                this.submitted = false;
                this.post = {
                    id: null,
                    title: "",
                    body: "",
                };
            }
        }
    }
</script>