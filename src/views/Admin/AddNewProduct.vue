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
                <router-link to="/admin">Home</router-link> > <router-link to="/admin/product">All
                    Products</router-link>
                > <router-link to="/admin/product/new">Add New Product</router-link>
            </div>
        </div>
        <div class="container1">
            <div class="form">
                <div class="left">
                    <form>
                        <div class="formInput">
                            <label for="ProductName">Product Name</label>
                            <input type="text" v-model="Prname" placeholder="Type name here">
                            <span v-show="Prname == '' && isEmpty">Name can't be empty</span>
                        </div>
                        <div class="formInput">
                            <label for="ProductDesc">Product Description</label>
                            <textarea name="productDesc" id="" cols="30" rows="9" placeholder="Type description here"
                                v-model="Prdesc"></textarea>
                            <span v-show="Prdesc == '' && isEmpty">Description can't be empty</span>
                        </div>
                        <div class="formInput">
                            <label for="ProductCategory">Category</label>
                            <input type="text" v-model="Prcat" placeholder="Type category here">
                            <span v-show="Prcat == '' && isEmpty">Category can't be empty</span>
                        </div>
                        <div class="formInput">
                            <label for="ProductBrand">Brand Name</label>
                            <input type="text" v-model="Prbrand" placeholder="Type brand name here">
                            <span v-show="Prbrand == '' && isEmpty">Brand name can't be empty</span>
                        </div>
                        <div class="group">
                            <div class="formInput">
                                <label for="SKU">SKU</label>
                                <input type="text" v-model="PrSku" placeholder="Fox-3983">
                                <span v-show="PrSku == '' && isEmpty">SKU can't be empty</span>
                            </div>
                            <div class="formInput">
                                <label for="stock">Stock Quantity</label>
                                <input type="number" v-model="Prstock" placeholder="1258">
                                <span v-show="Prstock == '' && isEmpty">Stock can't be empty</span>
                            </div>
                        </div>
                        <div class="group">
                            <div class="formInput">
                                <label for="Prprice">Regular Price</label>
                                <input type="number" v-model="PrPrice" placeholder="₹1000">
                                <span v-show="PrPrice == '' && isEmpty">Price can't be empty</span>
                            </div>
                            <div class="formInput">
                                <label for="Prsale">Sale Price</label>
                                <input type="number" v-model="Prsale" placeholder="₹450">
                                <span v-show="Prsale == '' && isEmpty">Sale price can't be empty</span>
                            </div>
                        </div>
                        <div class="formInput">
                            <label for="Prprice">Tags</label>
                            <input type="number" v-model="Prtags" placeholder="Place Tags Here">
                            <span v-show="Prtags == '' && isEmpty">Tags can't be empty</span>
                        </div>
                    </form>
                </div>
                <div class="right">

                    <div class="imagePreview">
                        <img v-if="images.length" :src="images[0].image" alt="Placeholder Image" class="imagePreview">
                        <img id="preview" :src="previewImage || selectedImage" v-if="previewImage || selectedImage"
                            class="imagePreview">
                    </div>
                    <div class="custom-file-upload">
                        <label for="imageInput" class="imageInput">
                            <img :src="dummyImage" alt="dummyimage">
                            <span>
                                <p>Drop your image here, or browse</p>
                                <p>Jpeg, png are allowed</p>
                            </span>
                        </label>
                        <input type="file" id="imageInput" accept="image/*" @change="handleImageUpload">
                    </div>
                    <div class="imagePreview1">
                        <span class="imageEmpty" v-show="!images.length && isEmpty">Add images</span>
                        <div class="imageCard" v-for="(image, index) in images" :key="index">
                            <img :src="image.image" alt="uploaded Image">
                            <!-- {{ image }} -->
                            <span class="fileName">{{ image.name }}</span>
                            <img :src="this.cross" alt="cancel" class="cross" @click="removeImage(index)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="Btncont">
                <div class="buttons">
                    <button class="add" @click="addNewProduct">Add</button>
                    <button class="cancel" @click="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cross from "@/assets/Admin/cross.svg";
import { mapActions } from "vuex"
import Notification from "../../components/Notification.vue"
import router from "@/router"
import dummyImage from "@/assets/Admin/dummyImage.svg"
export default {
    data() {
        return {
            isEmpty: false,
            cross,
            dummyImage,
            selectedImage: null,
            previewImage: null,
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
            images: []
        }
    }, components: {
        Notification
    },
    methods: {
        ...mapActions(["addProducts"]),
        cancel() {
            router.back();
        },
        handleImageUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    this.images.push({ image: imageUrl, name: fileName });
                };

                reader.readAsDataURL(file);
            }
        },
        removeImage(index) {
            this.images.splice(index, 1);
            document.getElementById('imagePreview').children[index].remove();
        },
        uploadImage() {
            const formData = new FormData()
            formData.append('image', this.selectedImage)
            axios.post('http://192.168.29.25:3001/test').then(response => {
                console.log("image uploaded successfully");
            })
                .catch(error =>
                    console.error(error))

        },
        async addNewProduct() {
            const productData = {
                toggle: false,
                name: this.Prname,
                desc: this.Prdesc,
                category: this.Prcat,
                brand: this.Prbrand,
                sku: this.PrSku,
                stock: this.Prstock,
                price: this.PrPrice,
                salePrice: this.Prsale,
                imageUrl: this.images
            }
            if (this.Prname == '' || this.Prdesc == '' || this.Prcat == '' || this.Prbrand == '' || this.PrSku == '' || this.Prstock == '' || this.PrPrice == '' || this.Prsale == '' || this.images.length == 0
            ) {
                this.notification = true;
                this.message = "Please add all products to continue"
                this.isEmpty = true
                setTimeout(() => {
                    this.notification = false;
                    this.message = '';
                }, 3000)
            } else {
                try {
                    await this.addProducts(productData)
                    this.message = 'SuccessFully added product!';
                    this.notification = true
                    setTimeout(() => {
                        router.push('/admin/product')
                    }, 3000)
                    this.isEmpty = false;

                } catch (error) {
                    this.message = 'Error adding product'
                    this.notification = true
                }
                setTimeout(() => {
                    this.notification = false;
                }, 3000)
            }
        }
    }
}
</script>

<style scoped>
.imagePreview1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
}

input[type="file"] {
    display: none;
}

.cross {
    width: 32px;
    height: 32px;
}

.imageCard {
    display: flex;
    padding: 16px;
    justify-content: space-between;
    width: 457px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-radius: 8px;
    background: #FAFAFA;

}

.imageCard span {
    color: #232321;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.imageInput {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
    width: 64px;
    height: 64px;
}

.custom-file-upload span {
    color: #70706E;
    text-align: center;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.custom-file-upload {
    display: flex;
    flex-direction: column;
    width: 457px;
    padding: 16px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
    border: 1px dashed #232321;
}

.whenNoImage {
    width: 441px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.20);
}

.imagePreview {
    display: flex;
    width: 457px;
    height: 444px;
    padding: 8px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 16px;
    background: #FAFAFA;
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

.formInput span,
.imageEmpty {
    font-family: "Rubik";
    font-style: italic;
    color: red;
    padding-left: 20px;
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
    color: #79767C;
    font-family: "Rubik";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
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
    border-radius: 8px;
    background: #003F62;
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
    transform: scale(1.06);
    cursor: pointer;
}

.Btncont {
    display: flex;
    justify-content: right;
}

.cancel {
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