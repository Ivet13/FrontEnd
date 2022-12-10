<template>
    <main>
        <h1>Pictures</h1>
        <button v-on:click="initData">Pictures</button>

        <!--         <section v-if="destination" class="destination">
            <h2>{{ destination.name }}</h2>
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" :alt="destination.name">
                <p>{{ destination.description }}</p>
            </div>
        </section>

        <section class="experiences">
        <div class="cards">
            <RouterLink v-for="picture in pictures" :key="picture.picture_id"
                :to="{ name: 'experience.show', params: { picture_id: picture.picture_id } }">
                <ExperienceCard :picture="picture" />
            </RouterLink>
        </div>
    </section> -->

        <div v-for="picture in pictures">
            {{ picture.description }}
        </div>
    </main>
</template>

<script>
import sourceData from '@/data.json'
export default {
    data() {
        return {
            pictures: []
        }
    },
    methods: {
        async initData() {
            //const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)

            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer c87671824aeca236a41bc5a9ea50aaeab51d4f34854532e945f82a3bcece1ad1' },

            };

            fetch(`http://localhost:8080/pictures`, requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    console.log('pictures found')
                    console.log(data)
                    this.pictures = data;

                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });

        }
    },
    /*  computed: {
          destinationId() {
              return parseInt(this.$route.params.id)
          },
  
      },*/
    async created() {
        this.initData()
    }
}
</script>