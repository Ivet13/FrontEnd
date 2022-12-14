<template>
    <main class="box">
        <h1 class="title">Pictures</h1>
        <div>
            <div>
                <button @click="showFileSelect = !showFileSelect">Select a file</button>
            </div>
            <div v-show="showFileSelect">
                <FileUpload :maxSize="1" accept="jpg" @file-uploaded="getUploadedData" />
            </div>

            <div v-if="fileSelected">
                Successfully Selected file: {{ file.name }}.{{ file.fileExtention }}
            </div>

            <button v-on:click="submitFile()">Submit</button>
        </div>
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
        <div v-if="pictures != null" class="columns">

            <div v-for="picture in pictures" :key="picture" class="column">

                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="`http://localhost:8080${picture.image.highres_url}`" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img :src="`http://localhost:8080${picture.image.thumb_url}`" :alt="picture.title">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{ picture.title }}</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>

                        <div class="content">
                            {{ picture.description }} <a>@bulmaio</a>.
                            <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import sourceData from '@/data.json'
import FileUpload from "@/components/FileUpload.vue";
export default {
    components: {
        FileUpload
    },
    data() {
        return {
            pictures: [],
            file: {},
            fileSelected: false,
            showFileSelect: false,
        }
    },
    methods: {
        async initData() {
            //const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)

            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },

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

        },
        getUploadedData(file) {
            this.fileSelected = true;
            this.showFileSelect = false;
            this.file = file;
        },
        /*
                Submits the file to the server
              */
        submitFile() {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

            /*
              Make the request to the POST /single-file URL
            */
        
            fetch('http://localhost:8080/pictures', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
                .then(function (response) {
                    if (response.status != 201) {
                        this.fetchError = response.status;
                    } else {
                        response.json().then(function (data) {
                            this.fetchResponse = data;
                        }.bind(this));
                    }
                }.bind(this));
        },

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