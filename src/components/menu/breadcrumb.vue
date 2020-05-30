<template>
    <!-- 面包屑 -->
    <div class="breadcrumb">
        <div class="example-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="(item,index) in breadList"
                    :key="index"
                    :to="{ path: item.path }"
                >
                {{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadList: [] // 路由集合
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {
        isHome(route) {
            return route.title === "首页";
        },
        getBreadcrumb() {
            let matched = this.$route.matched;
            //如果不是首页
            // if (!this.isHome(matched[0])) {
            //     matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
            // }
            this.breadList = matched;
        },
    },
    created() {
        this.getBreadcrumb();
    }
}
</script>

<style lang="less">
.breadcrumb{
    .example-container{
        .el-breadcrumb{
            padding-left: 20px;
            height: 60px;
            line-height: 60px;
            box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1), -2px 2px 2px 2px rgba(0,0,0,0.1);
        }
    }
}
</style>
<style lang="less" scoped>
.breadcrumb{
    margin-bottom: 20px;
}
</style>
