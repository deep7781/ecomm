import { createStore } from "vuex";
import authModule from "./modules/auth";
export default createStore({
  state: {
    product: [],
    isAdmin: false,
    customer: [],
    data: [],
    loginMessage: "",
    loading: false,
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.product.find((product) => product.id === id);
    },
  },
  mutations: {
    setLoginMessage(state, message) {
      state.loginMessage = message;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setProducts(state, products) {
      state.product = products;
    },
    addProduct(state, products) {
      state.product.push(products);
    },
    updateProduct(state, updatedProduct) {
      const index = state.product.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.product.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(state, productId) {
      state.product = state.product.filter(
        (product) => product.id !== productId
      );
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    getCustomerByID(state, customer) {
      state.customer.push(customer);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit("setLoading", true);
        const res = await fetch("http://192.168.29.85:3001/products");
        const data = await res.json();

        commit("setProducts", data);
        return data;
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchProductsById(id) {
      try {
        const res = await fetch(`http://192.168.29.85:3001/products/${id}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
    async addProducts({ commit }, product) {
      try {
        const res = await fetch("http://192.168.29.85:3001/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (res.ok) {
          const addedProduct = await res.json();
          commit("addProduct", addedProduct);
          return addedProduct;
        } else {
          console.error("Error adding products", res.statusText);
        }
      } catch (error) {
        console.error("Error adding Products", error);
      }
    },
    async updateProducts({ commit }, product) {
      try {
        const res = await fetch(
          `http://192.168.29.85:3001/products/${product.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (res.ok) {
          const updateProduct = await res.json();
          commit("updateProduct", updateProduct);
          return updateProduct;
        } else {
          console.log("Error updating product", res.statusText);
        }
      } catch (error) {
        console.error("Error updating the product", error);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await fetch(`http://192.168.29.85:3001/products/${productId}`, {
          method: "DELETE",
        });
        commit("deleteProduct", productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    async fetchOrders({ commit, dispatch }) {
      try {
        const res = await fetch(`http://192.168.29.85:3001/Orders`);
        const orders = await res.json();
        commit("setOrders", orders);
        orders.forEach((order) => {
          dispatch("getCustomer", order.CustomerId);
        });
        return orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async getCustomer({ commit }, customerID) {
      try {
        const res = await fetch(
          `http://192.168.29.85:3001/users/${customerID}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {
    auth: authModule,
  },
});
