<script>
  export default {
    name: 'itemList',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      }
    }
  }
</script>

<template>
  <div class="grid-container grid-padding-x">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date Added"
        sortable
        width="180">
      </el-table-column>

      <el-table-column
        prop="name"
        label="Added By"
        width="180">
      </el-table-column>

      <el-table-column
        prop="address"
        label="Item Name"
        :formatter="formatter">
      </el-table-column>

      <el-table-column
        prop="tag"
        label="Edit"
        width="100"
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
