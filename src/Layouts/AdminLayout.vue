<template>
    <div class="admin-Layout">
        <div class="left">
            <AdminSideBar />
        </div>
        <div class="right">
            <AdminNavbar />
            <div class="admin-content">
                <router-view />
            </div>
        </div>
    </div>
</template>
  
<script>
import AdminSideBar from "../components/AdminSideBar.vue";
import AdminNavbar from "../components/AdminNavbar.vue";

export default {
    components: {
        AdminSideBar,
        AdminNavbar,
    },
};
</script>
  
<style scoped>
.body,
html {
    margin: 0;
    padding: 0;
}

.admin-Layout {
    display: flex;
    height: 100vh;
}

.left {
    flex-shrink: 0;
}

.right {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.admin-content {
    flex: 1;
    overflow-y: auto;
    /* Enable vertical scrolling for content */
    /* padding: 20px; */
    scrollbar-width: none;
}
</style>
  