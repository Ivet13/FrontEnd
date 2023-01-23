<template>
    <section class="experience">
        <!-- <h1>{{ experience.name }}</h1> -->
      
      
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
