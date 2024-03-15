<template>
    <div class="sidebar">
        <div class="logo">
            <img :src=this.logo alt="logo">
        </div>
        <div class="menuContainer">
            <router-link class="menuItems" to="/admin/Dashboard" :class="{ 'active': $route.path === '/admin/Dashboard' }">
                <img class="image" :src="Dashboard" alt="Dashboard" />
                <span>DashBoard</span>
            </router-link>
            <router-link class="menuItems" to="/admin/product" :class="{ 'active': $route.path === '/admin/product' }">
                <img :src="Products" alt="Products" />
                <span>All Products</span>
            </router-link>
            <router-link class="menuItems" to="/admin/Orders" :class="{ 'active': $route.path === '/admin/Orders' }">
                <img :src="Orders" alt="Orders" />
                <span>Order List</span>
            </router-link>
        </div>
        <div class="Categories" @click='showCategory()'>
            <span>
                Categories
            </span>
            <img :src=this.down v-show="!catToggle" alt="down" @click='showCategory()' />
            <img :src=this.down class="upArrow" v-show="catToggle" alt="down" @click='showCategory()' />

        </div>
        <div class="AllCategory" v-show="catToggle" v-for="item in uniqueCategories" :key="item">
            <div class="category">
                {{ item }}
            </div>
        </div>
        <!-- {{ this.ProductCategory.forEach((item) => item) }} -->
    </div>
</template>

<script>
import Dashboard from "../assets/Admin/Dashboard.svg"
import Products from "../assets/Admin/Products.svg"
import Orders from "../assets/Admin/Orders.svg"
import logo from '../assets/Admin/logo.svg'
import down from '../assets/Admin/downArrow.svg'
import { mapActions } from "vuex"
export default {
    data() {
        // console.log('second');
        // console.log(this.$store.state.products);
        return {
            logo,
            down,
            Dashboard,
            Products,
            Orders,
            ProductCategory: [],
            data: null,
            uniqueCategories: new Set(),
            catToggle: false
        }
    },
    updated() {
        this.fetchData();
    },
    created() {
        this.fetchData()
        // this.data = this.ProductCategory
        // console.log(this.ProductCategory);
    },
    // mounted() {
    //     this.fetchData();
    //     // console.log("first");
    //     console.log("products", this.ProductCategory);
    // },
    methods: {
        ...mapActions(['fetchProducts']),
        async fetchData() {
            const res = await this.fetchProducts()
            this.ProductCategory = res;
            this.logCategories();

            // console.log(this.ProductCategory);

        },
        logCategories() {
            this.uniqueCategories = new Set(this.ProductCategory.map((item) => item.category));
            // console.log(Array.from(this.uniqueCategories));
        },
        showCategory() {
            this.catToggle = !this.catToggle
        }
    },
}
</script>

<style scoped>
.upArrow {
    transform: rotate(180deg);
}

.sidebar {
    border-right: 1px solid rgba(35, 35, 33, 0.20);
    background: #FAFAFA;
    /* width: 20%; */
    display: flex;
    width: 260px;
    /* height: 1616px; */
    height: 100%;
    padding: 32.391px 24px 0 24px;
    flex-direction: column;
    align-items: center;
    gap: 31.141px;
    flex-shrink: 0;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 174.375px;
    height: 48.469px;
    flex-shrink: 0;
}

.category {
    display: flex;
    width: 212px;
    justify-content: space-between;
    align-items: center;
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.AllCategory {
    display: flex;
    flex-direction: column;
}

.menuItems {
    color: #003F62;
    gap: 10px;
    width: 212px;
    display: flex;
    height: 48px;
    padding: 8px 16px;
    border-radius: 8px;
    /* justify-content: center; */
    align-items: center;
    gap: 8px;
    text-decoration: none;
    align-self: stretch;
    transition: all ease-in-out 300ms;
}

.menuItems:hover {
    background: #dce1e4;
    cursor: pointer;
    /* color: white; */
}

.menuItems.active {
    border-radius: 8px;
    background-color: #003F62;
    color: white;
}

.menuItems span {
    /* color: #232321; */
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
}

.menuContainer {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.Categories {
    display: flex;
    align-items: center;
    gap: 82px;
}

.Categories:hover {
    cursor: pointer;
}

.Categories span {
    color: #232321;
    /* Rubik/20px */
    font-family: "Rubik";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
</style>