<template>
  <div class="main d-flex align-center justify-center">
    <List />
  </div>
</template>
<script>
import List from '@/components/List.vue'

export default {
  components: {
    List
  }
}
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>