<template>
    <div>
        <div class="notiClass">
            <Notification v-show="this.isRegisterd" :message="this.message" />
        </div>
        <div class="container">
            <div class="left">
                <img :src=this.Banner alt="noImage">
            </div>
            <div class="right">
                <div class="loginContainer">
                    <div class="header">
                        <div class="title">
                            Register
                        </div>
                        <div class="Or">
                            Sign up with
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
                        <span class="Or">OR</span>
                    </div>
                    <div class="loginForm">
                        <span class="Details">Your Details</span>
                        <div class="loginFields">
                            <input type="text" placeholder="First Name" v-model=this.user.fname>

                        </div>
                        <div class="loginFields">
                            <input type="text" placeholder="Last Name" v-model="this.user.lname">
                        </div>
                        <div class="loginFields">
                            <input type="text" placeholder="Email" v-model=this.user.email>
                        </div>
                        <div>
                            <div class="loginFields">
                                <input type="password" placeholder="Password" v-model="this.user.password">
                            </div>
                            <span class="disclaimer">Minimum 8 characters with at least one uppercase, one lowercase, one
                                special character and a
                                number</span>
                        </div>


                        <div class="keepLoggedIn">
                            <input type="checkbox" name="keepLoggedIn" v-model="user.keepLoggedIn">
                            <label for="Keep me logged in"> Keep me logged in</label>
                        </div>
                    </div>

                    <span class="keepLoggedIn">
                        <input type="checkbox" name="keepLoggedIn" v-model="user.acceptTerms">
                        <label for="Terms">
                            By clicking 'Log In' you agree to our website&nbsp;
                            <span class="conditions">
                                Terms & Conditions.
                            </span>
                        </label>
                    </span>
                    <div class="loginBtn" @click="handleSubmit">
                        <span>Register </span>
                        <img :src=this.arrow alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notification from "./Notification.vue"
import Banner from "../assets/LoginRegister/loginBanner.png"
import Google from "../assets/LoginRegister/Google.svg"
import Facebook from "../assets/LoginRegister/Facebook.svg"
import Apple from "../assets/LoginRegister/Apple.svg"
import arrow from "../assets/LoginRegister/arrow.svg"
export default {
    components: { Notification },
    data() {
        return {
            Banner,
            Google,
            Facebook,
            arrow,
            Apple,
            user: {
                fname: '',
                lname: '',
                email: '',
                password: '',
                keepLoggedIn: false,
                acceptTerms: false,
                isLoggedIn: false,
                isAdmin: false
            },
            message: "Registered Successfully",
            isRegisterd: false
        }
    },
    methods: {
        async handleSubmit(e) {
            // e.preventDefault();

            const resp = await fetch('http://192.168.29.85:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.user)
            }
            )
            this.user.fname = '',
                this.user.lname = '',
                this.user.email = '',
                this.user.password = '',
                this.user.keepLoggedIn = false,
                this.user.acceptTerms = false,
                this.isRegisterd = true
            window.setTimeout(() => {
                this.isRegisterd = false;

            }, 3000)
        }
    }
}
</script>

<style scoped>
.Details {
    color: #232321;
    font-family: "Rubik";
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.notiClass {
    position: fixed;
    left: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: #f1eded; */
}

.Or {
    color: #232321;
    font-family: "Open Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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

.disclaimer {
    color: #36323B;
    align-self: stretch;
    font-family: "Rubik";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.4px;
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
    gap: 24px;

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