<template>
    <!-- 页面布局 -->
    <div class="container">
        <el-container>
            <el-header>
                <div class="user">
                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="头像">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            username<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="260px">
                    <Navmenu></Navmenu>
                </el-aside>
                <el-main>
                    <Breadcrumb />
                    <router-view :key="key"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Breadcrumb from '../menu/breadcrumb'
import Navmenu from '../menu/navmenuleft'
export default {
    name: 'container',
    computed: {
        key() {
            console.log('路由发生改变')
            return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
        }
    },
    components: {
        Navmenu,
        Breadcrumb
    },
    props: {
        msg: String
    },
    methods: {
        handleCommand(command) {
            if (command === '1') {
                sessionStorage.token = ''
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style lang='less'>
.container{
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        height: calc( 100vh - 60px);
        background-color: #333;
        padding: 40px 0px;
    }
    .user{
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
}
</style>

<style scoped lang="less">
.container{
    .user{
        float: right;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            vertical-align: -10px;
        }
    }
}
</style>
