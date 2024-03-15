<template>
  <div>
    <!-- <AdminLayout /> -->
    <RouterView />
  </div>
</template>

<script>
import AdminLayout from './Layouts/AdminLayout.vue';
import Login from './components/Login.vue';

export default {
  components: {
    Login,
    AdminLayout
  }
}
</script>

<style scoped></style>