<template>
    <section v-if="destination" class="destination">
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="destination.name">
            <p>{{ destination.description }}</p>
        </div>
    </section>
</template>

<script>
import sourceData from '@/data.json'
export default {
    data() {
        return {
            destination: null
        }
    },
    methods: {
       async initData(){
            //const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)
            const response = await fetch(`http://localhost:8080/pictures/1`)
            this.destination = await response.json()
        }
    },
    computed: {
        destinationId() {
            return parseInt(this.$route.params.id)
        },

    },
    async created() {
        this.initData()
    }
}
</script>