<script>

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
      this.$store.dispatch('addItem', this.items);
      this.$router.push('/itemList')
    }
  },
  computed: {

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
              <input v-model="items.quantity" type="text" placeholder="Item Quantity">
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
