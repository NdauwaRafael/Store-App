<template>
    <div>
        <div v-if='quotes'>
            <ul v-for='quote in quotes' >
                <li>{{ quote.id }}: {{ quote.body }}</li>
            </ul>
        </div>
        <button @click='getQuote()'>Get quote 18</button>
    </div>
</template>

<script>
import Vue from 'vue'
    /* IN OUR APPLICATION */
export default {
    data() {
        return{
            quotes: null
        }
    },
    created () {
        Vue.http.get('quotes/').then((res) => {
            this.quotes = res.body;
        });
//        this.getQuote();
    },
    methods: {
        getQuote () {
            Vue.http.get('quotes/18/')
                .then((res) => {
                this.quotes.push(res.body);
            });
        }
    }
}
</script>