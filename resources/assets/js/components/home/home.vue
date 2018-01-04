<template>
  <div class="home-backgound">

    <div class="grid-x">
      <div class="large-2 column left-nav show-for-large ">
        <div class="ovetop">
          <h4>Store App</h4>
          <ul >
            <li>
              <router-link :to="{ path: '/dashboard' }">
                <a >
                  <i class="el-icon-menu"></i>
                  <span>Dashboard</span>
                </a>
              </router-link>

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
                  <i class="el-icon-plus"></i>
                  <span>Add Store Manager</span>
                </a>
              </router-link>

            </li>
          </ul>
        </div>

      </div>

      <div class="large-10 column home-body">
        <div class="mynav">

          <div class="grid-container">
            <div class="grid-x">
              <div class="large-8">
                <div class="menu-toggle hide-for-large">
                  <h3>Menu <i class="el-icon-d-arrow-right"></i></h3>
                </div>
              </div>

              <div class="large-4 left-top-home">
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
