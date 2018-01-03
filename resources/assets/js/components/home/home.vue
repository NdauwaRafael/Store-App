<template>
  <div class="home-backgound">
    <div class="grid-x">
      <div class="small-2 cell left-nav">
        <div class="ovetop">
          <h4>Store App</h4>
          <ul >
            <li>
              <a >
                <i class="el-icon-menu"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <li>

                <router-link :to="{ name: 'addItem'}">
                  <a>
                  <i class="el-icon-circle-plus"></i>
                  <span>Add Item</span>
                  </a>
                </router-link>

            </li>

            <li>
              <router-link :to="{ name: 'itemList' }">
                <a>
                  <i class="el-icon-info"></i>
                  <span>View Items</span>
                </a>
              </router-link>

            </li>

            <li>
              <router-link :to="{ name: 'itemList' }">
                <a>
                  <i class="el-icon-info"></i>
                  <span>Add Store Manager</span>
                </a>
              </router-link>

            </li>
          </ul>
        </div>

      </div>

      <div class="small-10 cell home-body">
        <div class="mynav">
          <div class="grid-container">
            <div class="grid-x">
              <div class="small-8">
              </div>

              <div class="small-4 left-top-home">
                <div class="input-group search">
                  <input class="input-group-field" type="text">
                  <div class="input-group-button">
                    <el-button type="primary" icon="el-icon-search">Search</el-button>
                  </div>
                </div>

                <div class="settings">
                  <i class="el-icon-setting"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'home'
}
</script>
