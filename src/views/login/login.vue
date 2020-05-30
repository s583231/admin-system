<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demoLogin">
            <h2>后台管理系统</h2>
            <!-- <el-form-item label="账号" prop="username"> -->
            <el-form-item  prop="username">
                <el-input
                    type="input"
                    v-model="ruleForm.username"
                    autocomplete="off"
                    placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    placeholder="请输入密码"
                    @keyup.enter.native="submitForm('ruleForm')"
                ></el-input>
            </el-form-item>
            <el-checkbox v-model="ruleForm.checked">记住我</el-checkbox>
            <el-form-item>
                <el-button class="loginbtn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// import { login } from '@/api/login'

// 加密
import secret from '../../utils/secret'
export default {
    name: 'login',
    data () {
        let validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                callback();
            }
        };
        let validatePassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                pass: '',
                checked: true
            },
            rules: {
                username: [
                    { validator: validateUserName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePassWord, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.getCookie()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 调登录接口，成功后，保存密码到本地

                sessionStorage.token = '1111111'
                if (this.$route.query.redirect) {
                    this.$router.push({
                        path: this.$route.query.redirect
                    })
                } else {
                    this.$router.push({
                        path: '/home'
                    })
                }
                if (this.ruleForm.checked == true) { 
                    //调用配置cookie方法,传入账号名，密码，和保存天数3个参数 
                    this.setCookie(this.ruleForm.username, secret.Encrypt(this.ruleForm.pass), 30) // 加密
                } else { 
                    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了 
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 设置cookie
        setCookie(c_name, c_pwd, exdays) {
            let exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie =
                "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },

        // 查看是否有cookie, 如果有cookie,回填到input中
        getCookie() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split("="); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == "userName") {
                        this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == "userPwd") {
                        this.ruleForm.pass = secret.Decrypt(arr[i].split('userPwd=')[1])
                    }
                }
            }
        },
    }
}
</script>

<style lang="less">
.login{
    .loginbtn{
        width: 100%;
    }
}
</style>
<style scoped lang="less">
.login{
    background: url('../../assets/back_bg.png') center center no-repeat;
    background-size: 100%;
    height: calc(100% - 15vh);
    padding-top: 15vh;;
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .demoLogin{
        background: white;
        margin: 0 auto ;
        padding: 40px;
        width: 300px;
        border-radius: 10px;
        box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.1), -3px 3px 3px 3px rgba(0,0,0,0.1);
    }
}
</style>
