<template>
    <!-- v-if is there for the fetch async nature, for a split second we dont have data -->
    <section v-if="destination" class="destination">
        <span>Destination route parameter == {{ $route.params.id }}</span>
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="destination.name">
            <p>{{ destination.description }}</p>
        </div>
    </section>

    <GoBack />
</template>

<script>
import sourceData from '@/data.json';
import GoBack from '@/components/GoBack.vue';

export default {
    components:{
        GoBack
    },
    props:{
        id:{type: Number, required: true}
    },
    methods:{
        /*
        async initData(){
            const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)
            // const response = await fetch(`http://localhost:8080/pictures/1`)
            this.destination = await response.json()
        }
             
        async created(){
            this.initData()
            //$watch is added for the changes happening on the page 
            this.$watch(() => this.$route.params, this.initData)
        }
        */
    },     
    computed: {
        //Gets the Id from the SLUG, with the use of props its deprecated
        /*
        destinationId() {
            return parseInt(this.$route.params.id)
        },
        */

        //callback function "destination" called on sourceData which is imported data.json file
        destination() {
            return sourceData.destinations.find(destination => destination.id === this.id)
        }
    }
}
</script>

