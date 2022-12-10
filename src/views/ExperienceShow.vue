<template>
    <section v-if="experience" class="experience">
        <h1>{{ experience.name }}</h1>
        <div class="experience-details">
            <img :src="`/images/${experience.image}`" :alt="experience.name">
            <p>{{ experience.description }}</p>
        </div>
    </section>

</template>

<script>
import sourceData from '@/data.json'
export default {

    props: {
        id: { type: Number, required: true }
    },
    computed: {

        destination() {
            return sourceData.experience.find(
                (experience) => experience.id === this.id
            );
        }

    }
}
</script>