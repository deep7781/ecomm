<template>
    <!-- <div class="loader" v-if="isLoading">
        <Loader />
    </div> -->
    <div class="notiClass">
        <Notification v-show="notification" :message="message" />
    </div>
    <div class="allProducts">
        <div class="productsNavbar">
            <div class="navigator">
                <span class="allPro">
                    All Products
                </span>
                <div class="navigateMenu">
                    <router-link to="/admin/Dashboard">Home</router-link> > <router-link to="/admin/product">All
                        Products</router-link>
                </div>
            </div>
            <router-link to="/admin/product/new">
                <div class="addNew">
                    <img :src=this.add alt="add">
                    <span>ADD NEW PRODUCT</span>
                </div>
            </router-link>
        </div>
        <div
            :class="{ 'ProductsContainer1': product && (product.length === 2 || product.length === 1), 'ProductsContainer': product && product.length > 2 }">

            <div v-show="!product || !product.length" class="nothing">Nothing to Display, please Add products to Display
            </div>

            <transition-group name="fade">
                <div v-for="pro in this.product" :key="pro.id"
                    :class="{ 'productCard': product.length >= 2, 'productCard1': product.length == 1 }">
                    <div class="details">
                        <div class="image">
                            <img v-if="pro.imageUrl" :src=pro.imageUrl[0].image :alt=pro.name>
                            <!-- <img v-else="pro.imageUrl" :alt=pro.name> -->
                            {{ console.log(pro) }}
                        </div>
                        <div class="allData">
                            <div class="pr">
                                <div class="prName">{{ pro.name }}</div>
                                <div class="type">{{ pro.category }}</div>
                            </div>
                            <div class="price">₹{{ pro.price }}</div>
                        </div>
                        <div class="stockAlert" v-show="pro.stock == 0">Out Of Stock</div>
                        <div class="actions">
                            <div class="options" @click="toggleMenu(pro)">
                                <i class="fas fa-ellipsis-v"></i>
                            </div>
                            <div class="toggleMenu" v-show="pro.toggle">
                                <span class="action" @click="editAction(pro.id)">Edit</span>
                                <span class="action" @click="deleteAction(pro.id)">Delete</span>
                            </div>
                        </div>
                    </div>
                    <div class="summary"><span>Summary</span>
                        <div>{{ pro.desc }}</div>
                    </div>
                    <div class="stock">
                        <div>Sales</div>
                        <hr>
                        <div class="hr">
                            <span>
                                Remaining Products
                            </span>
                            <span>{{ pro.stock }}</span>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<!-- <script>
import axios from "axios"
import router from "@/router"
import Notification from "@/components/Notification.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "@/assets/logo.png";
import { RouterView } from 'vue-router';
import add from '../../assets/Admin/add.svg'
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            add,
            logo,
            message: '',
            notification: false,
            product: []
            // toggleMenuOpen: false
        };
    },
    computed: {
        // ...mapState(["product"])
    },
    components: { RouterView, Notification },
    updated() {
        this.fetchData()
        // this.getProduct()
    },
    mounted() {
        this.fetchData();
        this.getProduct();
    },
    watch() {
        this.deleteAction();
    },

    methods: {
        ...mapActions(["fetchProducts", "deleteProduct"]),
        async getProduct() {
            // this.product = this.$store.state.product
        },
        async fetchData() {
            try {
                this.product = await this.fetchProducts()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async editAction(id) {
            router.push({ path: `/admin/product/${id}`, params: { id } })
        },
        async deleteAction(id) {
            await this.deleteProduct(id);
            this.message = 'Deleted Successfully'
            this.notification = true
            setTimeout(() => {
                this.notification = false
            }, 3000)
        }, closeToggleMenu() {
            this.toggleMenuOpen = false;
        },
        toggleMenu(pro) {

            pro.toggle = !pro.toggle;
            // this.toggleMenuOpen = pro.toggle;
            // console.log("clicked")
            this.product.forEach(p => {
                if (p !== pro && p.toggle) {
                    p.toggle = false;
                }
            });

            axios.put(`http://192.168.29.85:3001/products/${pro.id}`, { ...pro, toggle: pro.toggle })
                .then(response => {
                    console.log("Toggle updated in the database:", response.data);
                })
                .catch(error => {
                    console.error("Error updating toggle in the database:", error);
                });
        }
    },

}
</script> -->
<script>
import Loader from "@/components/Loader.vue"
import axios from "axios"
import router from "@/router"
import Notification from "@/components/Notification.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "@/assets/logo.png";
import { RouterView } from 'vue-router';
import add from '../../assets/Admin/add.svg'
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            add,
            message: "",
            notification: false,
            product: [],
            dataFetched: false,
            // isLoading: true
        };
    },
    components: { Notification, Loader },
    async mounted() {

        if (!this.dataFetched) {
            await this.fetchData();
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.loading
        })
    },
    updated() {
        if (!this.dataFetched) {
            this.fetchData();
        }
    },
    methods: {
        ...mapActions(["fetchProducts", "deleteProduct"]),
        async fetchData() {
            try {
                this.product = await this.fetchProducts();
                this.dataFetched = true;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async editAction(id) {
            router.push({ path: `/admin/product/${id}`, params: { id } });
        },
        async deleteAction(id) {
            await this.deleteProduct(id);
            this.message = "Deleted Successfully";
            this.notification = true;
            setTimeout(() => {
                this.notification = false;
            }, 3000);
        },
        toggleMenu(pro) {
            pro.toggle = !pro.toggle;
            this.product.forEach(p => {
                if (p !== pro && p.toggle) {
                    p.toggle = false;
                }
            });

            axios
                .put(`http://192.168.29.85:3001/products/${pro.id}`, {
                    ...pro,
                    toggle: pro.toggle
                })
                .then(response => {
                    console.log("Toggle updated in the database:", response.data);
                })
                .catch(error => {
                    console.error("Error updating toggle in the database:", error);
                });
        }
    }
};
</script>

<style scoped>
.loader {
    position: absolute;
    display: flex;
    z-index: 1;
    /* flex-direction: row; */
    top: 50%;
    left: 50%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.stockAlert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: "Rubik";
}

.nothing {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    left: 50%;
    top: 50%;
    height: auto;
    width: auto;
}

.notiClass {
    position: fixed;
    left: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.hr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.actions {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* z-index: 9999; */

}

.toggleMenu {
    top: 40px;
    right: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    width: 100px;
    border-radius: 5px;
    padding: 20px;
    align-items: center;
    background: rgba(35, 35, 33, 0.05);

}

.action {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    font-family: "Rubik";
    cursor: pointer;
    border-radius: 7px;
}

.action:hover {
    background: rgba(35, 35, 33, 0.05);
}

.stock {
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    border: 0.75px solid rgba(35, 35, 33, 0.30);
}

.options {
    cursor: pointer;
    display: flex;
    transform: rotate(90deg);
    padding: 8px 12px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 4px;
    background: rgba(35, 35, 33, 0.05);
}

hr {
    border-top: 1px solid #000;
    width: 100%;
}


.summary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
}

.summary div {
    height: 38px;
    align-self: stretch;
    overflow: hidden;
    color: #232321;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.summary span {
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.ProductsContainer1 {
    align-items: center;
    display: flex;
    gap: 12px;
    margin-top: 24px;
    font-family: "Rubik";
}

.ProductsContainer {
    align-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 12px;
    margin-top: 24px;
    font-family: "Rubik";
}

.details {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.image {
    object-fit: cover;
    width: 84px;
    height: 84px;
    display: flex;
}

.image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.prName {
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.type {
    color: #000;
    opacity: 0.6;
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.price {
    color: #232321;
    align-self: stretch;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.allData {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;
    align-self: stretch;
}

.pr {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex: 1 0 0;
}

.productCard1 {
    display: flex;
    width: 410px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    border-radius: 16px;
    background: #FAFAFA;
    transition: all ease-in-out 300ms;
    z-index: 0;
}

.productCard {
    display: flex;
    width: auto;
    min-width: 410px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    border-radius: 16px;
    background: #FAFAFA;
    transition: all ease-in-out 300ms;
    z-index: 0;
    /* margin-bottom: 30px; */
}

.productCard:hover,
.productCard1:hover {
    -webkit-box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    -moz-box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    cursor: pointer;
    /* transform: scale(1.04); */
}

.allProducts {
    min-height: 100vh;
    padding: 24px;
    background: #e7e7e3;
}

a {
    color: #000;
    text-decoration: none;
}

.navigateMenu {
    text-decoration: none;
    color: #000;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.navigator {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}

.productsNavbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.allPro {
    color: #232321;
    font-family: "Rubik";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.addNew {
    display: flex;
    height: 40px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: #232321;
    transition: all ease-in-out 300ms;
}

.addNew:hover {
    cursor: pointer;
    transform: scale(1.06);
    -webkit-box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    -moz-box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 29px -7px rgba(0, 0, 0, 0.68);
    cursor: pointer;
}

.addNew span {
    color: #FFF;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
}
</style>