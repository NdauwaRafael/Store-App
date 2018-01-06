<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'itemList',
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
          editItemsList: {
            name: '',
            category: '',
            quantity: '',
            price: '',
            description: '',
            id: ''
          }
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },

      handleEdit(index, row) {
        console.log(index);
        this.editItemsList.name = row.name;
        this.editItemsList.category = row.category;
        this.editItemsList.quantity = row.quantity;
        this.editItemsList.price = row.price;
        this.editItemsList.description = row.description;
        this.editItemsList.id = index;

        this.outerVisible = true;
      },
      handleDelete(index){
        this.$store.dispatch('removeItem', index)
        .then((response)=>{
          this.$message({
            message: 'Item Deleted Successfully',
            type: 'success'
          });

        })
        .then((response)=>{
          this.$router.replace('/itemList')
        })
        .catch((err)=>{
          this.$message.error('Item Could not be Deleted An error occurred');
          console.log(err);
        })
      },

      updateItem(){
          if (this.editItemsList.name==''||this.editItemsList.category==''||this.editItemsList.quantity ==''|| this.editItemsList.price ==''||this.editItemsList.description==''){
              this.$notify({
                  title: 'Empty Fields Warning',
                  message: 'You cannot set fields to empty values. Fill out Empty fields before proceeding to save',
                  type: 'warning'
              });
          }else {
              this.$store.dispatch('editItem', this.editItemsList, this.editItemsList.id)
                  .then((response) => {
                      this.$message({
                          message: 'Item Updated Successfully',
                          type: 'success'
                      });
                      this.innerVisible = false;
                      this.outerVisible = false;

                  })
                  .then((response) => {
                      // this.$router.replace('/dashboard')
                  })
                  .catch((err) => {
                      this.$message.error('Item Could not be updated Successfully');
                      console.log(err);
                  })
          }
      }
    },
    computed: {
      ...mapGetters({
        storeItemsList: 'storeItems'
      })
    },
    watch: {
      storeItems: function(){
        alert('data changed')
      }
    }

  }
</script>

<template>
  <div class="itemList-component">

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th >Item Category</th>
          <th>Number of Items</th>
          <th >Item Price (Ksh.)</th>
          <th>Edit</th>
          <th >Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in storeItemsList">
          <td>{{index + 1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.category}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.price}}</td>
          <td><el-button plain @click="handleEdit(index, item)">Edit </el-button></td>
          <td><el-button plain type="danger" @click="handleDelete(index)">Delete</el-button></td>
        </tr>
      </tbody>
    </table>

    <el-dialog title="Outter Dialog" :visible.sync="outerVisible">
      <form>
          <div class="grid-container">
          <div class="grid-x grid-padding-x">
            <div class="medium-6 cell">
              <label>Item Name
                <input v-model="editItemsList.name" type="text" placeholder="Item Name">
              </label>
            </div>
            <div class="medium-6 cell">
              <label>Input Category
                <input v-model="editItemsList.category" type="text" placeholder="Item Category">
              </label>
            </div>
          </div>

          <div class="grid-x grid-padding-x">
            <div class="medium-6 cell">
              <label>Item Quantity
                <input v-model="editItemsList.quantity" type="text" placeholder="Item Quantity">
              </label>
            </div>
            <div class="medium-6 cell">
              <label>Input Price
                <input v-model="editItemsList.price" type="text" placeholder="Input Price">
              </label>
            </div>
          </div>

          <div class="grid-x grid-padding-x">
            <div class="medium-12 cell">
              <label>Item Description
                <textarea v-model="editItemsList.description" placeholder="Item Description" rows="6"></textarea>
              </label>
            </div>
          </div>

          <!-- <div class="grid-x grid-padding-x">
            <div class="medium-12 cell">
              <el-button type="success" @click="registerItem" >Add Item To Store Directory</el-button>
            </div>
          </div> -->

          </div>
          </form>
      <el-dialog
          width="30%"
          title="Inner Dialog"
          :visible.sync="innerVisible"
          append-to-body>
          <h3><small><i class="el-icon-loading"></i></small> Are you Sure you want to change the Item details?</h3>

          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="innerVisible = false">Cancel</el-button>
            <el-button type="success" @click="updateItem">Proceed</el-button>
          </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="success" @click="innerVisible = true">Update Item Details</el-button>
      </div>
    </el-dialog>
  </div>
</template>
