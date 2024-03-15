<template>
    <div>
        <div class="notiClass">
            <Notification v-show="notification" :message="this.message" />
        </div>
        <div class="container">
            <div class="left">
                <img :src=this.Banner alt="noImage">
            </div>

            <div class="right">
                <div class="loginContainer">
                    <div class="header">
                        <div class="title">
                            Login
                        </div>
                        <div class="forgot">
                            Forgot your password?
                        </div>
                    </div>
                    <div class="loginForm">
                        <div class="loginFields">
                            <input type="text" placeholder="Email" v-model=this.user.email>
                            <!-- {{ email }} -->
                        </div>
                        <div class="loginFields">
                            <input type="password" placeholder="Password" v-model="this.user.password">
                        </div>
                        <div class="keepLoggedIn">
                            <input type="checkbox" name="keepLoggedIn" v-model="user.keepLoggedIn">
                            Keep me logged in
                        </div>
                        <div class="loginBtn" @click="handleSubmit">
                            <span>Email Login</span>
                            <img :src=this.arrow alt="">
                        </div>
                    </div>
                    <div class="loginOptions">
                        <div class="loginCard">
                            <img :src=this.Google alt="google">
                        </div>
                        <div class="loginCard">
                            <img :src=this.Apple alt="google">
                        </div>
                        <div class="loginCard">
                            <img :src=this.Facebook alt="google">
                        </div>
                    </div>
                    <span class="Terms">
                        By clicking 'Log In' you agree to our website&nbsp;
                        <span class="conditions">
                            Terms & Conditions.
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Banner from "../assets/LoginRegister/loginBanner.png"
import Google from "../assets/LoginRegister/Google.svg"
import Facebook from "../assets/LoginRegister/Facebook.svg"
import Apple from "../assets/LoginRegister/Apple.svg"
import arrow from "../assets/LoginRegister/arrow.svg"
import Notification from "./Notification.vue"
import router from '@/router'
import { mapActions, mapMutations, storeKey } from "vuex"
export default {
    data() {
        return {
            Banner,
            Google,
            Facebook,
            arrow,
            Apple,
            user: {
                email: '',
                password: '',
                keepLoggedIn: false,
                isLoggedIn: false
            },
            message: '',
            notification: false
        };
    }, components: {
        Notification
    },
    props: {
        message: String
    },
    methods: {
        // ...mapActions('auth', ['loginUser', 'setIsLoggedIn', 'setIsAdmin']),
        ...mapActions({
            loginUser: 'auth/loginUser',
        }),
        ...mapMutations('auth', ['setIsLoggedIn', 'setIsAdmin']),
        async handleSubmit(e) {
            const resp = await fetch(`http://192.168.29.85:3000/users`);
            const data = await resp.json();
            let isCredentialsValid = false;
            data.forEach((item) => {
                if (this.user.email === item.email && this.user.password === item.password) {
                    if (item.isAdmin) {
                        // this.setIsAdmin(true)
                        // this.setIsLoggedIn(true)
                        this.$store.state.auth.user.isAdmin = true
                        this.$store.state.auth.user.isLoggedIn = true
                        router.push({ path: '/admin/Dashboard' });
                        this.message = 'You have successfully logged in as an admin.'
                        this.notification = true
                        console.log('hey');
                        console.log('After loginUser', this.$store.state.auth.user);
                        // this.isLoggedIn = true
                        isCredentialsValid = true;

                    } else {
                        this.loginUser({ ...item, keepLoggedIn: this.user.keepLoggedIn, isAdmin: false });
                        isCredentialsValid = true;
                        return;
                    }
                }
            });

            if (isCredentialsValid) {
                this.message = 'Success';
                this.notification = true
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
            }
            else {
                this.message = 'Invalid Credentials';
                this.notification = true
            }
            setTimeout(() => {
                this.notification = false
            }, 3000);
        }
    },
    components: { Notification }
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
    /* background: #f1eded; */
}

.container {
    display: flex;
    flex-direction: row;
    height: 100vh
}

.loginOptions {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: space-between;
}

.conditions {
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
}

.loginCard {
    display: flex;
    padding: 16px 48px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    border-radius: 12px;
    border: 1px solid #232321;
    transition: all ease-in-out 300ms;
}

.loginCard:hover {
    background: #FFF;
    cursor: pointer;
    transform: scale(1.05);
}

.Terms {
    display: flex;
    flex: 1 0 0;
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f1eded;
    width: 50%;
    height: auto;
}

.loginForm {
    display: flex;
    flex-direction: column;
    font-family: 'Rubik';
    gap: 24px;
}

.loginContainer {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    gap: 24px;

}

.loginFields input {
    border: none;
    color: #79767C;
    font-family: "Rubik";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
    background: none;
    padding: 10px 16px;
    width: 100%;
}

.loginFields input:focus {
    outline: none;
}

.loginFields {
    border-radius: 8px;
    border: 1px solid #232321;
}

.forgot {
    color: #70706E;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
}

.header {
    display: flex;
    width: 480px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

}

.title {
    color: #232321;
    font-family: "Rubik";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.keepLoggedIn {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.keepLoggedIn input:checked {
    accent-color: black;
}

.loginBtn span {
    color: #FFF;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
}

.loginBtn:hover {
    transform: scale(1.01);
}

.loginBtn {
    cursor: pointer;
    display: flex;
    /* height: 48px; */
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    background: #003F62;
    transition: all ease-in-out 300ms;
}
</style>