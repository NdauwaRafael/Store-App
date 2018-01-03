<template>
  <div>
    <div class="body-full-firstpage">
      <div class="overlay-top">
        <div class="grid-container padded-overlay">
          <div class="grid-x grid-margin-x">
            <div class="cell small-2"></div>
            <div class="cell small-8">

              <h3>Organize Your Store Like A Pro</h3>
              <router-link :to="{ path: '/login' }">
                <a class="button alert">Get Started</a>
              </router-link>
            </div>
            <div class="cell small-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome'
}
</script>
