<template>
    <div class="navbar">
        <div class="icons">
            <img :src=this.search alt="search">
            <img :src=this.bell alt="bell">
            <div class="admin" @click="this.adminToggle = !this.adminToggle">
                <span>
                    Admin
                </span>
                <img v-show="adminToggle == false" :src=this.down alt="down">
                <img class="up" v-show="adminToggle" :src=this.down alt="down">
            </div>
        </div>
    </div>
    <div v-show="adminToggle" class="adminSetting" ref="adminSetting">
        <span>Admin</span>
        <div class="changePassword">
            Change Password
            <img class="goArrow" :src=this.down alt="arrow">
        </div>
        <div class="logout" @click="handleLogout">Logout
            <img :src=this.logout alt="logout">
        </div>
    </div>
    <div @click="handleGlobalClick"></div>
</template>

<script>
import router from "@/router"
import bell from "../assets/Admin/notification.svg"
import search from "../assets/Admin/search.svg"
import down from "../assets/Admin/downArrow.svg"
import logout from "../assets/Admin/logout.svg"
import { mapActions } from "vuex"
export default {
    data() {
        return {
            search,
            bell,
            down,
            logout,
            adminToggle: false,
        }
    },
    methods: {
        ...mapActions('auth', ['logoutUser']),
        async handleLogout() {
            this.$store.state.auth.user.isLoggedIn = false
            this.$store.state.auth.user.isAdmin = false
            router.push({ path: "/login" })
            localStorage.removeItem('isLoggedIn')
        },
        handleGlobalClick(e) {
            const adminSetting = this.$refs.adminSetting;
            if (adminSetting && !adminSetting.contains(e.target)) {
                this.adminToggle = false
            }
        }
    }
}
</script>

<style scoped>
.goArrow {
    transform: rotate(270deg);
}

.adminSetting div {
    padding: 10px;
}

.adminSetting img {
    width: 16px;
    height: 16px;
}

.adminSetting div:hover {
    cursor: pointer;
    background-color: #E7E7E3;
}

.adminSetting span {
    color: #232321;
    font-family: "Rubik";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

}

.logout {
    display: flex;
    height: 32px;
    padding: 8px 0px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    color: #232321;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
}

.changePassword {
    color: #232321;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    border-radius: 8px;
    display: flex;
    height: 32px;
    padding: 8px 0px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
}

.adminSetting {
    -webkit-box-shadow: -1px 4px 39px -11px rgba(0, 0, 0, 1);
    -moz-box-shadow: -1px 4px 39px -11px rgba(0, 0, 0, 1);
    box-shadow: -1px 4px 39px -11px rgba(0, 0, 0, 1);
    z-index: 999;
    left: 80%;
    top: 120px;
    position: absolute;
    display: flex;
    width: 233px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    border-radius: 8px;
    border: 1px solid #E7E7E3;
    background: #FFF;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.adminSetting.hidden {
    opacity: 0;
    transform: translateY(-10px);
}

.admin {
    cursor: pointer;
    display: flex;
    /* height: 20px; */
    /* width: 60px; */
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #1C1C1A;
}

.admin img {
    cursor: pointer;
}

.up {
    transform: rotate(180deg);
}

.admin span {
    color: #1C1C1A;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
}

.icons {
    display: flex;
    width: 301px;
    justify-content: flex-end;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
}

.navbar {
    display: flex;
    /* width: 1180px; */
    /* height: 96px; */
    padding: 32px 60px;
    justify-content: flex-end;
    align-items: center;
    gap: 195px;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(35, 35, 33, 0.20);
    background: #FAFAFA;
}
</style>