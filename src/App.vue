<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang='less'>
html{
  height: 100%;
  body{
    height: 100%;
    #app{
      height: 100%;
      #nprogress .bar{
        background: #29d;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
    }
  }
}
*{
  padding: 0;
  margin: 0;
}
</style>