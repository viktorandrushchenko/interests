<template>
    <div>
        <h4>Добавление сообщества</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addAbiturient определён в script-->
            <form @submit="addInterest">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" name="name" placeholder="Название" required v-model="interest.name">
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div v-else>
            <h4>Вы успешно добавили запись</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового абитуриента"
                Обработчик newAbiturient определён в script-->
                <button v-on:click="newInterest">Добавить новое сообщество</button>
            </div>
            <div>
                <router-link to="/listInterests">Вернуться к списку сообществ</router-link>
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
                interest: {
                    id: null,
                    name: "",
                },
                submitted: false
            };
        },
        methods: {
            addInterest(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.interest.name,
                };
                // Либо var data = this.user;
                http
                    .post("/addAbiturient", data)
                    .then(response => { // запрос выполнился успешно
                        this.interest.id = response.data.id;
                        this.submitted = true;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                
            },
            newInterest() {
                this.submitted = false;
                this.interest = {
                    id: null,
                    name: "",
                };
            }
        }
    }
</script>