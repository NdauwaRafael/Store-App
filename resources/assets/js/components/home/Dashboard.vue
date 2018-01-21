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
                waiting: true,
                hasError: false,
                editItem: false

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
                        this.hasError = this.$store.state.error;
                        if (this.hasError) {
                            this.$notify({
                                title: 'Warning',
                                message: 'Sorry But You cannot Add any more of this item to the store. IT SEEM WE RAN OUT OF STOCK',
                                type: 'warning'
                            });
                        }else{
                            this.hasError = false
                            this.$message({
                                message: 'Item Added to the Basket',
                                type: 'success'
                            });

                        }


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
            removeItemBasket(id){
                this.$store.dispatch('removeItemBasket', id)
                    .then((response)=>{
                        this.$message({
                        message: 'Congrats, this is a success message.',
                        type: 'success'
                    });
                    },
                ()=>{
                    this.$message.error('Oops, cannot remove this item.');
                })
            },
            checkoutBasketList(){
                const items = this.basketItems
                if (items.length == 0) {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Add Items To the cart First before Checking Out'
                    });

                }else{
                    this.$store.dispatch('dispatchBasket', items)
                        .then((response)=>{
                            this.waiting = !this.waiting
                        })
                        .then((response)=>{
                            this.$notify({
                                title: 'Success',
                                message: 'You have Successfully Checked Out Item Basket!!',
                                type: 'success'
                            });
                        })
                        .catch((err)=>{
                            this.$message.error('Opps!! That was not supposed to happen');
                            console.log(err);
                        })
                        .finally(()=> {
                            this.waiting = !this.waiting
                        });
                }

            },

            clearBasketList(){
                const items = this.basketItems;
                this.itemsnotavailable = !this.itemsnotavailable
                this.itemsavailable = !this.itemsavailable
                this.$store.dispatch('clearBasket', items)
                    .then((response)=>{
                        this.$notify.info({
                            title: 'BASKET NOTIFICATION',
                            message: 'Basket Items has been cleared, You can always add some more you know'
                        });
                    })
                    .catch((error)=>{

                    })
            }
        }
    }
</script>
<template >
  <div class="dashboard-component">
    <div class="dashboard-nav">
      <div class="grid-container">
        <div class="settings" @click="toggleCart()">
          <i class="fa fa-shopping-basket" aria-hidden="true"></i> <small> Item Basket <span v-if="basketItems.length"><el-tag type="info">({{basketItems.length}})</el-tag></span> <i class="fa fa-hand-o-left" aria-hidden="true"></i></small>
        </div>
      </div>
    </div>
    <div class="grid-x">
        <div class="item-list" v-bind:class = "{'large-12': itemsnotavailable, 'large-7': itemsavailable }">
          <table>
              <thead>
                <!-- <tr v-for="items of storeItemsList">
                  <th v-for="(item, index) of items">{{index}}</th>
                </tr> -->

                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Item Category</th>
                  <th>Item Quantity  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of storeItemsList" v-if="item.quantity >= 1">
                  <td >{{index + 1}}</td>
                  <td >{{item.name}}</td>
                  <td >{{item.category}}</td>
                  <td >{{item.quantity}}</td>
                  <td><el-button @click="cart(index, item)" size="small" type="danger" plain>Add to cart</el-button></td>
                </tr>

              </tbody>
            </table>
        </div>

        <div class="basket" v-bind:class = "{ 'large-4': itemsavailable, 'cartHidden':itemsnotavailable }">


          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Quantity <span v-if="basketItems.length"><el-tag type="success">({{basketItems.length}})</el-tag></span></th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="basketItem in basketItems">
                <td>{{basketItem.basket_item_name}}</td>
                <td>{{basketItem.basket_item_quantity}}</td>
                <td><i class="el-icon-delete " @click="removeItemBasket(basketItem.id)"></i></td>
              </tr>
            </tbody>
          </table>

          <button type="button" class="button info expanded" @click="checkoutBasketList(this.basketItems)">
            <i class="el-icon-loading" v-bind:class = "{'cartHidden': waiting}"></i> Checkout Products</button>

          <button type="button" class="button warning expanded" @click="clearBasketList(this.basketItems)">
              <i class="el-icon-loading" v-bind:class = "{'cartHidden': waiting}"></i> Clear Basket and Close</button>
        </div>

    </div>


  </div>
</template>

<style scoped>
  .el-icon-delete {
    color: #761c19;
    cursor: pointer;
  }
</style>
