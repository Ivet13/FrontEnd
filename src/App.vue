<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <TheNavigation />

    <div class="container">
      <!-- Transition is passed into a SLOT -->
      <RouterView v-slot="{ Component }"></RouterView>

      <transition name="fade" mode="out-in">
        <!-- the key atribute is now used here in anonymous component instead of in router-view -->
        <component :is="Component" :key="$route.path" ></component>
      </transition>

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
/* first word is a name we given to the transition in etiquette */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;

}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: transalteX(-30%);
}

.moveUp-enter-active{
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn{
  0%{opacity: 0;}
  50%{opacity: 0.5;}
  100%{opacity: 1;}
}
.moveUp-leave-active{
  animation: moveUp 0.3s ease-in;
}
@keyframes moveUp{
  0% {transform: translateY(0);}
  100%{transform: translateY(-400px);}
}
.fade-enter-active, .facde-leave-active{
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to{
  opacity:0;
}
</style>