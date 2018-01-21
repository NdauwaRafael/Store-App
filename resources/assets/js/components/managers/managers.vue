<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'managers',
        data(){
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    managerName: '',
                    managerEmail: '',
                    managerOffice: '',
                    managerPassword: '',
                    role: 'manager'
                },
            }
        },
        computed:{
            ...mapGetters({
                offices: 'offices',
                storeManagers: 'storeManagers',
                managerAddedSuccess: 'managerAddedSuccess',
                managerAddedError: 'managerAddedError'
            })
        },
        methods: {
            addManager(){
                if(this.form.managerName=='' || this.form.managerEmail=='' || this.form.managerOffice==''){
                    this.$notify.error({
                        title: 'Oops!! That was not supposed to happen',
                        message: `OOPS!! It Appears It appears you are trying to register an empty form. Please fill in the details before submitting`,
                    });
                }else{
                    this.$store.dispatch('addManager', this.form)
                        .then((response)=>{
                            if(this.managerAddedSuccess){
                                this.$notify({
                                    title: 'Success',
                                    message: 'You have Successfully Added A Manager!!',
                                    type: 'success'
                                });
                                this.form = {}
                                this.dialogFormVisible = false;
                            }else if(this.managerAddedError){
                                this.$notify.error({
                                    title: 'Manager Registration Failed',
                                    message: `OOPS!! It Appears A Manager with Email Address ${this.form.managerEmail} already exists`,
                                });
                            }
                        })
                        .catch((err)=>{

                        })
                        .finally((response)=>{

                        })
                }
            },
            deleteManager(email){
                this.$store.dispatch('deleteManager', email)
                    .then((resp)=>{
                        this.$message('deleted successfully!!')
                    },
                    ()=>{
                    this.$notify.error({
                        title: 'Pending.hh......',
                        message: `Wait, Delete is not yet enabled!!`,
                    });
                });
            }
        }
    }
</script>

<template>
    <div class="grid-container">
        <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
            <form v-model="form">
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="medium-12 cell">
                            <label>Manager Name
                                <input type="text" v-model="form.managerName" placeholder="Manager Name">
                            </label>
                        </div>
                        <div class="medium-12 cell">
                            <label>Manager Email
                                <input type="email" v-model="form.managerEmail" placeholder="Manager Email">
                            </label>
                        </div>
                        <div class="medium-12 cell">
                            <label>Assign Office
                                <select v-model="form.managerOffice">
                                    <option value="" disabled selected>Select Office</option>
                                    <option v-for="office in offices" :value="office.officeName">{{office.officeName}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="medium-12 cell">
                            <label>Manager Password
                                <input type="text" v-model="form.managerPassword" placeholder="Manager Password">
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="success" @click="addManager">Add Now</el-button>
  </span>
        </el-dialog>

        <div class="manager-table">
            <div class="add-manager-button-area">
                <el-button type="success"  icon="el-icon-circle-plus" @click="dialogFormVisible = true" plain>Add New Manager</el-button>
            </div>

            <table>
                <thead>
                <tr>
                    <th >#</th>
                    <th>Manger Name</th>
                    <th >Office</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="storeManager in storeManagers">
                    <td>1</td>
                    <td>{{storeManager.managerName}}</td>
                    <td>{{storeManager.managerOffice}}</td>
                    <td>{{storeManager.managerEmail}}</td>
                    <td><el-tag type="info">{{storeManager.managerPassword}}</el-tag></td>
                    <td><el-button type="danger" size="mini" icon="el-icon-delete" plain @click="deleteManager(storeManager.managerEmail)">Delete</el-button></td>
                </tr>

                </tbody>
            </table>
        </div>
    </div>

</template>

<style scoped>
    .add-manager-button-area {
        padding: 0.3%;
    }
</style>