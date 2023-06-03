<template>
    <div>
    <div>
        <h4>Поиск сообществ по названию</h4>
        <form @submit="searchInterestByName" class="mb-3">
            <div class="input-group">
                <input type="text" name="name" id="name" placeholder="Название" required v-model="name" class="form-control">
                <button type="submit" class="btn btn-primary">Поиск</button>
            </div>
        </form>

        <ul class="list-group">
            <li v-for="(interest, index) in interests" :key="index" class="list-group-item">
                <router-link class="nav-link" :to="{name: 'interest-details', params: {id: interest.id}}">
                    {{interest.name}}
                </router-link>
            </li>
        </ul>

        <div v-show="noDataFound" class="mt-3">
            Данные, соответствующие параметрам поиска, не найдены
        </div>
    </div>
</div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchInterest",
        data() {
            return {
                name: "",
                interests: [],
                noDataFound: false
            };
        },
        methods: {
            searchInterestByName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/interest/name/" + this.name)
                    .then(response => {
                        if (response.data.length > 0){
                            this.interests = response.data;
                            this.noDataFound = false;
                        }
                        else{
                            this.noDataFound = true;
                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>