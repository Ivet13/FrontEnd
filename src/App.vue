<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>


    <TheNavigation />

    <div class="container">
      <RouterView v-slot="{ Component }">
      </RouterView>


    </div>

</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import AppLink from "@/components/AppLink.vue";
export default {
  components: { TheNavigation, AppLink }
}
</script>

<style lang="css">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;

}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: transalteX(-30%);
}
</style>