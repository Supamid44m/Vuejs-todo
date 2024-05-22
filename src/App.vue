<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar">
        
        <!-- <div class="todo-link">
          <RouterLink to="/Todos">Todos</RouterLink>
        </div> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.navbar {
  display: flex;
  flex-direction: row;
  margin-inline: 10px;
}
</style>
