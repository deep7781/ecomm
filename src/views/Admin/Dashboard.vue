<template>
    <div class="notiClass">
        <Notification v-show="notification" :message="$store.state.loginMessage" />
    </div>
    <div class="Dashboard">
        <h1>Dashboard</h1>
    </div>
</template>

<script>
import Notification from '@/components/Notification.vue'

export default {
    props: {
        message: String
    },
    data() {
        return {

            notification: false
        }
    },
    components: {
        Notification
    },
    mounted() {
        if (this.$store.state.loginMessage) {
            this.notification = true
        }
        setTimeout(() => {
            this.notification = false
        }, 3000)
    }
}
</script>

<style scoped>
.notiClass {
    position: fixed;
    left: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.Dashboard {
    display: flex;
    background: #E7E7E3;
    height: 100vh;
    padding: 24px;
}
</style>