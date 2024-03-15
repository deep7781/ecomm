<template>
    <div class="Orders">
        <div class="ordersNavbar">
            <div class="navigator">
                <span class="allPro"> Orders List </span>
                <div class="navigateMenu">
                    <router-link to="/admin/Dashboard">Home</router-link> >
                    <router-link to="/admin/Orders"> Orders List</router-link>
                </div>
            </div>
        </div>
        <div class="changeStatus"></div>
        <div class="OrdersContainer">
            <div class="Recent">
                <span>Recent Purchases</span>
                <i class="fas fa-ellipsis-v"></i>
            </div>
            <hr />
            <table>
                <thead>
                    <tr class="row">
                        <th>
                            <span> Product </span>
                        </th>
                        <th><span> Order ID </span></th>
                        <th><span> Date </span></th>
                        <th><span> Customer Name </span></th>
                        <th><span> Status </span></th>
                        <th><span> Amount </span></th>
                    </tr>
                </thead>
                <!-- <tbody> -->
                <tbody>
                    <tr v-for="item in Orders" class="new">
                        <td>
                            <span> Product Name </span>
                        </td>
                        <td>
                            <span>
                                {{ item.orderId }}
                            </span>
                        </td>
                        <td>
                            <span>
                                {{ item.purchaseDate }}
                            </span>
                        </td>
                        <td>
                            <span>
                                {{ customerNames[item.CustomerId] }}
                            </span>
                        </td>
                        <td>
                            <span>
                                {{ item.Status }}
                            </span>
                        </td>
                        <td>
                            <span>
                                {{ item.products[0].amount }}
                            </span>
                        </td>
                    </tr>
                    <!-- </tbody> -->
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import { mapActions } from "vuex";
import Vue from 'vue';

export default {
    data() {
        return {
            Orders: null,
            customerNames: {}
        };
    },
    created() {
        this.getOrders();
    },
    watch: {
        Orders: {
            handler(newOrders) {
                if (newOrders) {
                    this.updateCustomerNames(newOrders);
                }
            },
        }
    },
    methods: {
        ...mapActions(["fetchOrders", "getCustomer"]),
        async getOrders() {
            try {
                const data = await this.fetchOrders();
                this.Orders = data;
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        async updateCustomerNames(orders) {
            for (const order of orders) {
                if (!this.customerNames[order.CustomerId]) {
                    try {
                        const customer = await this.getCustomer(order.CustomerId);
                        this.customerNames = { ...this.customerNames, [order.CustomerId]: customer.fname };

                    } catch (error) {
                        console.error("Error fetching customer:", error);
                        this.customerNames = { ...this.customerNames, [order.CustomerId]: "Unknown" };
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.new {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

table {
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
}

th {
    padding: 16px 8px;
    text-align: start;
    flex: 1;
}

td {
    padding: 16px 8px;
    flex: 0.5;
    text-align: start;
    /* Equal width columns */
    /* text-align: center; */
    color: rgba(35, 35, 33, 0.8);
}

th span {
    text-align: center;
    font-family: "Rubik";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    opacity: 0.8;
}

td span {
    color: #000;
    text-align: center;
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-bottom: 0.5px solid rgba(35, 35, 33, 0.2);
}

.Recent span {
    color: #000;
    font-family: "Rubik";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.Recent i {
    width: 24px;
    height: 24px;
}

hr {
    border-top: 1px solid rgba(35, 35, 33, 0.2);
    width: 100%;
    height: 0.5px;
}

.Recent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
}

.OrdersContainer {
    display: flex;
    /* width: 1108px; */
    padding: 24px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    border-radius: 16px;
    background: #f8f8f8;
}

a {
    text-decoration: none;
    cursor: pointer;
    color: #000;
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

.Orders {
    display: flex;
    flex-direction: column;
    background: #e7e7e3;
    min-height: 100vh;
    padding: 24px;
    gap: 24px;
}

.allPro {
    color: #232321;
    font-family: "Rubik";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.ordersNavbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.navigator {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}
</style>
