<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'addItem',


  data(){

return {
  items: {
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: ''
  }
}

},
  methods: {
    registerItem(){
        if (this.items.name==''||this.items.category==''||this.items.quantity ==''|| this.items.price ==''||this.items.description==''){
            this.$notify({
                title: 'Empty Fields Warning',
                message: 'Fill Out All the empty fields before submitting',
                type: 'warning'
            });
        }else{
            this.$store.dispatch('addItem', this.items);
            this.$router.push('/itemList')
        }

    }
  },
  computed: {
      ...mapGetters({
          storeItemsList: 'storeItems'
      })
  }
}
</script>


<template >
  <div class="add-item">
    <form>
        <div class="grid-container">
        <div class="grid-x grid-padding-x">
          <div class="medium-6 cell">
            <label>Item Name
              <input v-model="items.name" type="text" placeholder="Item Name">
            </label>
          </div>
          <div class="medium-6 cell">
            <label>Input Category
              <input v-model="items.category" type="text" placeholder="Item Category">
            </label>
          </div>
        </div>

        <div class="grid-x grid-padding-x">
          <div class="medium-6 cell">
            <label>Item Quantity
              <input v-model="items.quantity" type="number" placeholder="Item Quantity">
            </label>
          </div>
          <div class="medium-6 cell">
            <label>Input Price
              <input v-model="items.price" type="text" placeholder="Input Price">
            </label>
          </div>
        </div>

        <div class="grid-x grid-padding-x">
          <div class="medium-12 cell">
            <label>Item Description
              <textarea v-model="items.description" placeholder="Item Description" rows="6"></textarea>
            </label>
          </div>
        </div>

        <div class="grid-x grid-padding-x">
          <div class="medium-12 cell">
            <el-button type="success" @click="registerItem" >Add Item To Store Directory</el-button>
          </div>
        </div>

        </div>
        </form>
  </div>
</template>



<style>
</style>
