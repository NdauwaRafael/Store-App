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

          this.$router.push('/itemList')
        })
        .catch((err)=>{
          this.$message.error('Item Could not be Deleted An error occurred');
          console.log(err);
        })
      },

      updateItem(){
        this.$store.dispatch('editItem', this.editItemsList, this.editItemsList.id)
        .then((response)=>{
          this.$message({
            message: 'Item Updated Successfully',
            type: 'success'
          });
          this.innerVisible = false;
          this.outerVisible = false;

          this.$router.push('/itemList')

        })
        .catch((err)=>{
          this.$message.error('Item Could not be updated Successfully');
          console.log(err);
        })

      }
    },
    computed: {
      ...mapGetters({
        storeItemsList: 'storeItems'
      })
    },


  }
</script>

<template>
  <div class="itemList-component">
    <el-table
      :data="storeItemsList"
      style="width: 100%">

      <el-table-column
        prop="index"
        label="#"
        >
        <template slot-scope="scope" >
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="Item Name"

        >
      </el-table-column>

      <el-table-column
        prop="category"
        label="Item Category"
        width="150">
      </el-table-column>

      <el-table-column
        prop="quantity"
        label="Number of Items"
        width="150">
      </el-table-column>

      <el-table-column
        prop="price"
        label="Item Price (Ksh.)"
        width="300">
      </el-table-column>

      <el-table-column
        prop="tag"
        label="Edit"
        width="120"
          >
        <template slot-scope="edit">
          <el-button plain @click="handleEdit(edit.$index, edit.row)">Edit </el-button>
        </template>

      </el-table-column>

      <el-table-column
        prop="tag"
        label="Delete"
        width="100"
          >
        <template slot-scope="del">
          <el-button plain type="danger" @click="handleDelete(del.$index)">Delete</el-button>
        </template>

      </el-table-column>

    </el-table-column>
    </el-table>



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
          <h3><i class="el-icon-loading"></i> Are you Sure you want to change the Item details?</h3>

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
