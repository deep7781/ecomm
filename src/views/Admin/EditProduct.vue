<template>
    <div class="notiClass">
        <Notification v-show="notification" :message="this.message" />
    </div>
    <div class="addNew">
        <div class="productsNavbar">
            <span class="proDet">
                Product Details
            </span>
            <div class="navigator">
                <router-link to="/admin/Dashboard">Home</router-link> > <router-link to="/admin/product">All
                    Products</router-link>
                > Edit Product
            </div>
        </div>
        <div class="container1">
            <div class="form">
                <div class="left">
                    <form>
                        <div class="formInput">
                            <label for="ProductName">Product Name</label>
                            <input type="text" v-model="Prname" placeholder="Type name here">
                        </div>
                        <div class="formInput">
                            <label for="ProductDesc">Product Description</label>
                            <textarea name="productDesc" id="" cols="30" rows="9" placeholder="Type description here"
                                v-model="Prdesc"></textarea>
                        </div>
                        <div class="formInput">
                            <label for="ProductCategory">Category</label>
                            <input type="text" v-model="Prcat" placeholder="Type category here">
                        </div>
                        <div class="formInput">
                            <label for="ProductBrand">Brand Name</label>
                            <input type="text" v-model="Prbrand" placeholder="Type brand name here">
                        </div>
                        <div class="group">
                            <div class="formInput">
                                <label for="SKU">SKU</label>
                                <input type="text" v-model="PrSku" placeholder="Fox-3983">
                            </div>
                            <div class="formInput">
                                <label for="stock">Stock Quantity</label>
                                <input type="number" v-model="Prstock" placeholder="1258">
                            </div>
                        </div>
                        <div class="group">
                            <div class="formInput">
                                <label for="Prprice">Regular Price</label>
                                <input type="number" v-model="PrPrice" placeholder="₹1000">
                            </div>
                            <div class="formInput">
                                <label for="Prsale">Sale Price</label>
                                <input type="number" v-model="Prsale" placeholder="₹450">
                            </div>
                        </div>
                        <div class="formInput">
                            <label for="Prprice">Tags</label>
                            <input type="number" v-model="Prtags" placeholder="Place Tags Here">
                        </div>
                    </form>
                </div>
                <div class="right"></div>
            </div>
            <div class="Btncont">
                <div class="buttons">
                    <button class="add" @click="onUpdateProducts">Update</button>
                    <button class="delete" @click="onDeleteProduct">Delete</button>
                    <button class="cancel" @click="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from '@/router'
import Notification from "../../components/Notification.vue"
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            Prname: "",
            Prdesc: "",
            Prcat: "",
            Prbrand: "",
            PrSku: "",
            Prstock: "",
            PrPrice: "",
            Prsale: "",
            Prtags: "",
            message: "",
            notification: false,
            product: null
        }
    },
    components: {
        Notification
    },

    mounted() {
        this.fetchData()
    },
    methods: {
        ...mapActions([
            'updateProducts',
            'deleteProduct',
            'fetchProducts',
            'fetchProductsById'
        ]),
        async onUpdateProducts() {
            const productId = this.$route.params.id
            const productData = {
                id: productId,
                name: this.Prname,
                desc: this.Prdesc,
                category: this.Prcat,
                brand: this.Prbrand,
                sku: this.PrSku,
                stock: this.Prstock,
                price: this.PrPrice,
                salePrice: this.Prsale,
            }
            try {
                await this.updateProducts(productData)
                this.message = 'Updated Successfully'
                this.notification = true
            } catch (error) {
                this.message = "Error updating products"
                this.notification = true
            }
            setTimeout(() => {
                this.notification = false
            }, 3000)
        },
        cancel() {
            router.back();
        },
        async onDeleteProduct() {
            const productId = this.$route.params.id
            await this.deleteProduct(productId)
            router.back();
        },
        async fetchData() {
            const productId = this.$route.params.id
            // const data = await this.fetchProductsById(productId);
            // console.log("from edit", data);
            // this.Prname = data.name;
            // this.Prdesc = data.desc;
            // this.Prcat = data.category;
            // this.Prbrand = data.brand;
            // this.PrSku = data.sku;
            // this.Prstock = data.stock;
            // this.PrPrice = data.price;
            // this.Prsale = data.salePrice;
            try {
                const res = await fetch(`http://192.168.29.85:3000/products/${productId}`);
                const data = await res.json();
                console.log("From edit", data);
                this.Prname = data.name;
                this.Prdesc = data.desc;
                this.Prcat = data.category;
                this.Prbrand = data.brand;
                this.PrSku = data.sku;
                this.Prstock = data.stock;
                this.PrPrice = data.price;
                this.Prsale = data.salePrice;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
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

form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
}

.group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
}

.formInput {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

textarea {
    text-decoration: none;
    resize: none;
    padding: 16px 10px;
    border-radius: 8px;
    border: 1px solid #232321;
}

.formInput input {
    display: flex;
    padding: 15px 16px;
    align-items: center;
    width: auto;
    justify-content: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #232321;
}

input,
textarea {
    color: #000;
    font-family: "Rubik";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
}

input::placeholder,
textarea::placeholder {
    color: #79767C;
    font-family: "Rubik";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
    font-style: italic;
}

label {
    color: #232321;
    font-family: "Rubik";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.addNew {
    background: #E7E7E3;
    min-height: 1000px;
    padding: 24px;
}

.productsNavbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}

.proDet {
    color: #000;
    font-family: "Rubik";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

a {
    text-decoration: none;
    color: #000;
}

.navigator {
    color: #000;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    gap: 4px;
    align-items: center;
}

.form {
    flex-direction: row;
    display: flex;
    align-items: flex-start;
    gap: 47px;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 60%;
}

.right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 24px;
}

.container1 {
    margin-top: 24px;
    display: inline-flex;
    padding: 24px;
    flex-direction: column;
    /* align-items: flex-end; */
    gap: 40px;
    border-radius: 16px;
    background: #FFF;
    /* height: 700px; */
    /* margin: 24px; */
    width: 95%;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    display: flex;
    width: 457px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 16px;
}

button {
    width: 100%;
    display: flex;
    height: 48px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    text-transform: uppercase;
}

.add {
    cursor: pointer;
    border-radius: 8px;
    background: #000;
    color: white;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    transition: all ease-in-out 300ms;
}

.add:hover,
.cancel:hover {
    transform: scale(1.1);
}

.Btncont {
    display: flex;
    justify-content: right;
}

.delete {
    background: #003F62;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #232321;
    color: white;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    transition: all ease-in-out 300ms;
}

.cancel {
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #232321;
    color: #232321;
    font-family: "Rubik";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    transition: all ease-in-out 300ms;

}
</style>