<script setup>
import { ref } from 'vue';
import Sidebar from '../components/layout/Sidebar.vue';
import Navbar from '../components/layout/Navbar.vue';
import Footer from '../components/layout/Footer.vue';

/**
 * DefaultLayout — the authenticated app shell. Owns sidebar-collapsed
 * state and passes it down to Sidebar via Props, reacting to the child's
 * `toggle` Emit. RouterView renders the active nested route here.
 */
const sidebarCollapsed = ref(false);
</script>

<template>
  <div class="app-shell">
    <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="main-column">
      <Navbar />
      <main class="main-content">
        <RouterView v-slot="{ Component, route }">
          <Transition name="view-fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.main-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main-content {
  flex: 1;
}
</style>
