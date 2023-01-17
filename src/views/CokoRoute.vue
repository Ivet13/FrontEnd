<template>
    <section class="destination">
        <h1>Destination with route parameter :{{ $route.params.id }}</h1>
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="destination.name">
            <p>{{ destination.description }}</p>
        </div>
    </section>

</template>

<script>
import sourceData from '@/data.json';

export default {
    computed: {
        //Gets the Id from the SLUG
        destinationId() {
            return parseInt(this.$route.params.id)
        },
        //callback function "destination" called on sourceData which is imported data.json file
        destination() {
            return sourceData.destinations.find(destination => destination.id === this.destinationId)
        }
    }
    
}
</script>

