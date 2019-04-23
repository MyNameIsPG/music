<template>
  <div class="m-header">
    <div class="m-header-icon-left">
      <i class="fa fa-bars"></i>
    </div>
    <ul class="list">
      <router-link tag="li" to="/player/myusers">我的</router-link>
      <router-link tag="li" to="/player/recommend">推荐</router-link>
      <router-link tag="li" to="/player/found">发现</router-link>
    </ul>
    <div class="m-header-icon-right">
      <i class="fa fa-search"></i>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
.m-header
  position: relative
  height px2rem(44)
  text-align: center
  .m-header-icon-left,
  .m-header-icon-right
    position absolute
    top 0px
    width px2rem(60)
    height px2rem(44)
    line-height px2rem(44)
  .m-header-icon-left
    left 0px
  .m-header-icon-right
    right 0px
  .list
    display flex
    width 100%
    height 100%
    padding 0 px2rem(60)
    box-sizing border-box
    li
      flex 1
      color #fff
      flexCenter()
      &.router-link-active
        font-size px2rem(18)
</style>
