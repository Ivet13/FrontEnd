<template>
  <main class="home">
    <h1>Pictures Gallery App</h1>
    <p>This is a project to demonstrate the use of vue.js + bulma in frontend and GO in backend.</p>
  </main>

  <RouterLink 
  class="button" 
  :to="{ name: 'register' }"
  >Create account
  </RouterLink>
  
  <!-- Tibor Test Start about routing -->
  <div class="destinations">
    <router-link 
      v-for="destination in destinations" 
      :key="destination.id" 
      :to="{name: 'choco.show', params:{id: destination.id, slug: destination.slug}}"
    >
    <h2>{{ destination.name }}</h2>
    <img :src="`/images/${destination.image}`" :alt="destination.name">
    </router-link> 
  </div>
  <!-- Tibor Test End about routing -->

</template>

<!-- tibor test start -->
<script>
//load all the desticantion from the data file instead of writing it manually for each link
import sourceData from '@/data.json'

  export default {
    data(){
      return{
        destinations: sourceData.destinations
      }
    }
  }
</script>
<!-- tibor test end -->