<template>
<!--dfgvhbnm-->

  <div>
    <div class="body-full-firstpage">
      <div class="overlay-top">
        <div class="grid-container">
          <div class="grid-x">
            <div class="large-2 cell"></div>
            <div class="large-8 cell">
              <div class="login-area">
                <h3>LOGIN</h3>
                <form>
                  <div class="login-form">
                    <div class="grid-x grid-padding-x">
                      <div class="medium-12 cell">
                        <label>Email
                          <input type="text" v-model="loginForm.email" placeholder="Provide your email">
                        </label>
                      </div>
                      <div class="medium-12 cell">
                        <label>Password
                          <input type="password" v-model="loginForm.password" placeholder="************">
                        </label>
                      </div>

                      <div class="medium-12 cell">
                        <button type="button" @click="login()" class="success button">Sign In</button>
                        <router-link :to="{ path: '/' }">
                          <el-button type="text" icon="el-icon-d-arrow-left">Go to Start</el-button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
            <div class="large-2 cell"></div>
          </div>
        </div>
  </div>
</div>
  </div>
</template>




<script>
export default {
  name: 'login',

  data(){
    return {
      loginForm: {
        email: 'rkaranja@cytonn.com',
        password: 'password',
        token: ''
      }
    }
  },
  methods: {
    login(){
        this.$http.post('/login/',
            {email: this.email, password: this.password},
            {headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
        .then((response)=>{
          const token = response.data.token;
        })
            .catch((err)=>{

            })
//      this.$message({
//        message: 'Congrats, this is a success message.',
//        type: 'success'
//      });

      // this.$router.push('/home');
      //this.$http.post(loginURL);
    }
  }
}
</script>
