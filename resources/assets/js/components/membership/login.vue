<template>

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
    import { mapGetters } from 'vuex'
    export default {
      name: 'login',
        data(){
          return {
            loginForm: {
              email: 'rkaranja@cytonn.com',
              password: 'password',
              token: ''
            },
              isloggedin:false,
              isError: false,
              loggedin: {}
          }
        },
          computed: {
              ...mapGetters({
                  userLoggedin: 'userLoggedin',
                  loggedUser: 'loggedUser',
                  loginError: 'loginError'
              }),
          },
        methods: {
          login(){
              this.$http.get('login/')
              .then((response)=>{
                this.token = response.data.token;
                console.log(this.token)
                  this.$store.dispatch('login', this.loginForm)
                      .then((res)=>{
                          this.$message({
                              message: 'Congrats, this is a success message.',
                              type: 'success'
                          });
                      })
                      .catch((er)=>{

                      })
              })
                  .catch((err)=>{
                      console.log(err)
                  })


            // this.$router.push('/home');
            //this.$http.post(loginURL);
          },
            loginState() {
                if(this.isloggedin){
                    this.$router.push('/home')
                }else{
                    if(this.isError) {
                        this.$notify.error({
                            title: 'Login Error',
                            message: 'Failed to Login, please check your details and try again'
                        });
                    }
                }
            }
        },
        mounted() {
            let status = this.userLoggedin;
            this.isloggedin = status;
            this.isError = this.loginError
            this.loginState()
        },
        watch: {
            isloggedin: function () {
                this.loginState();
            }
        }
    }
</script>
