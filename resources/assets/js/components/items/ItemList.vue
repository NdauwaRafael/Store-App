<script>
  export default {
    name: 'itemList',
    data() {
      return {
        // tableData: [{
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   tag: 'Home'
        // }, {
        //   date: '2016-05-02',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   tag: 'Office'
        // }, {
        //   date: '2016-05-04',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   tag: 'Home'
        // }, {
        //   date: '2016-05-01',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   tag: 'Office'
        // }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      }
    },
    computed: {
      storeItemsList(){
        return this.$store.getters.storeItems;
      }
    }
  }
</script>

<template>
  <div class="grid-container grid-padding-x">
    <el-table
      :data="storeItemsList, index"
      style="width: 100%">

      <el-table-column
        prop="name"
        label="Item Name"
        sortable
        >
      </el-table-column>

      <el-table-column
        prop="category"
        label="Item Category"
        width="300">
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
        <template slot-scope="scope">
          <el-tag type="info">Edit</el-tag>
        </template>

      </el-table-column>

      <el-table-column
        prop="tag"
        label="Delete"
        width="100"
          >
        <template slot-scope="scope">
          <el-tag type="danger">Delete</el-tag>
        </template>

      </el-table-column>

    </el-table-column>
    </el-table>
  </div>
</template>
