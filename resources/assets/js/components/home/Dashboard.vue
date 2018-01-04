<template >
  <div class="grid-container">
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
                  <td><el-button @click="cart(index)" size="small" type="danger" plain>Add to cart</el-button></td>
                </tr>

              </tbody>
            </table>
        </div>

        <div class="basket" v-bind:class = "{ 'large-4': itemsavailable }">
          <ul v-for="itm in basket.name">
            <li >{{itm}}</li>
          </ul>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Dashboard",
  data(){
    return {
      basket: [],
      itemsnotavailable: true,
      itemsavailable: false
    }
  },

  computed: {
    ...mapGetters({
      storeItemsList: 'storeItems'
    })
  },
  methods: {
    cart(id){
      this.itemsnotavailable = false
      this.itemsavailable = true

      console.log(storeItemsList[id]);
    }
  }
}
</script>

<style >

</style>
