<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <TheNavigation />

    <div class="container">
      <RouterView :key="$route.path" v-slot="{ Component }"></RouterView>
    </div>
    <TheFooter />
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import AppLink from "@/components/AppLink.vue";
export default {
  components: { TheNavigation, AppLink }
}
import TheFooter from "@/components/TheFooter.vue";
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