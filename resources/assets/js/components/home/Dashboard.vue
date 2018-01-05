<template >
  <div class="dashboard-component">
    <div class="dashboard-nav">
      <div class="grid-container">
        <div class="settings" @click="toggleCart()">
          <i class="el-icon-goods"></i> <small>Item Basket</small>
        </div>
      </div>
    </div>
    <div class="grid-x">
        <div class="item-list" v-bind:class = "{'large-12': itemsnotavailable, 'large-8': itemsavailable }">
          <table>
              <thead>
                <!-- <tr v-for="items of storeItemsList">
                  <th v-for="(item, index) of items">{{index}}</th>
                </tr> -->

                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Item Category</th>
                  <th>Item Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of storeItemsList">
                  <td >{{index + 1}}</td>
                  <td >{{item.name}}</td>
                  <td >{{item.category}}</td>
                  <td >{{item.quantity}}</td>
                  <td><el-button @click="cart(index, item)" size="small" type="danger" plain>Add to cart</el-button></td>
                </tr>

              </tbody>
            </table>
        </div>

        <div class="basket" v-bind:class = "{ 'large-3': itemsavailable, 'cartHidden':itemsnotavailable }">


          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Quantity</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="basketItem in basketItems">
                <td>{{basketItem.basket_item_name}}</td>
                <td>{{basketItem.basket_item_quantity}}</td>
              </tr>
            </tbody>
          </table>

          <button type="button" class="button info" @click="checkoutBasketList()"><i class="el-icon-loading" v-bind:class = "{'cartHidden': waiting}"></i> Checkout Products</button>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Dashboard",
  data(){
    return {
      basketlist: {
        name: '',
        category: '',
        quantity: '',
        price: '',
        description: '',
        id: ''
      },
      itemsnotavailable: true,
      itemsavailable: false,
      waiting: true
    }
  },

  props: ['tCart'],

  computed: {
    ...mapGetters({
      storeItemsList: 'storeItems',
      basketItems: 'basketlist'
    })
  },



  methods: {
    cart(id, item){
      this.itemsnotavailable = false
      this.itemsavailable = true

      this.basketlist.name = item.name;
      this.basketlist.category = item.category;
      this.basketlist.quantity = item.quantity;
      this.basketlist.price = item.price;
      this.basketlist.description = item.description;
      this.basketlist.id = id;


      this.$store.dispatch('addToBasket', this.basketlist)
      .then((response)=>{
        this.$message({
          message: 'Item Added to the Basket',
          type: 'success'
        });

      })
      .catch((err)=>{
        this.$message.error('Opps!! That was not supposed to happen');
        console.log(err);
      })


    },

    toggleCart(){
        this.itemsnotavailable = !this.itemsnotavailable
        this.itemsavailable = !this.itemsavailable
        console.log(this.itemsavailable);
    },
    // ...mapActions([
    //   'addToBasket'
    // 'You cannot Checkout More Items Than The store has'
    // ])

    checkoutBasketList(){
      this.$store.dispatch('dispatchBasket', this.basketItems)
      .then((response)=>{
        this.$notify({
          title: 'Success',
          message: 'You have Successfully Checked Out Item Basket!!',
          type: 'success'
        });
        this.waiting = !this.waiting
      })
      .catch((err)=>{
        this.$message.error('Opps!! That was not supposed to happen');
        console.log(err);
      })
      .finally(()=> {
         this.waiting = !this.waiting
       });
    }
  }
}
</script>

<style >

</style>
