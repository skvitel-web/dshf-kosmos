<template>
  <div id="app">
    <Header />
    <RouterView />
    <main>
      <FeaturesSection />
      <AboutSection />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import AboutSection from './components/AboutSection.vue'
import HomeView from './views/HomeView.vue';
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>