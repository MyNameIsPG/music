<template>
  <div class="recommend">
    <div v-if="bannerList.length" class="slider-wrapper">
      <div class="slider-content">
        <slider ref="slider">
          <div v-for="(item,index) in bannerList" :key="index">
            <a href="javascript:void(0);">
              <img :src="item.imageUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <div class="recommend-gorup">
      <div class="recommend-gorup-head">
        <a href="javascript:void(0);">查看更多 <i class="fa fa-angle-right"></i></a>
        <h2>为你推荐</h2>
      </div>
      <div class="recommend-gorup-body">
        <ul v-if="personalizedList.length">
          <li v-for="(item,index) in personalizedList" :key="index" @click="_linkPlayerDetail(item.id)">
            <img :src="item.picUrl" alt="">
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import {banner, personalized} from 'api/index'
import {ERR_OK} from 'api/config'
export default {
  components: {
    Slider
  },
  data () {
    return {
      bannerList: [],
      personalizedList: []
    }
  },
  created () {
    setTimeout(() => {
      this._banner()
      this._personalized()
    }, 20)
  },
  methods: {
    _banner () {
      banner().then((res) => {
        if (res.code === ERR_OK) {
          this.bannerList = res.banners
        }
      })
    },
    _personalized () {
      personalized().then((res) => {
        if (res.code === ERR_OK) {
          this.personalizedList = res.result
        }
      })
    },
    _linkPlayerDetail (id) {
      this.$router.push({ path: `/playlist/detail?id=${id}` })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/mixin"
.recommend
  .slider-wrapper
    position relative
    width 100%
    padding-top 40%
    overflow hidden
    .slider-content
      position absolute
      top 0
      left 0
      width 100%
  .recommend-gorup
    background #ffffff
    border 1px solid #efefef
    .recommend-gorup-head
      padding px2rem(10) px2rem(15)
      overflow hidden
      h2
        color #323232
        font-size px2rem(18)
      a
        float right
        color #a0a0a0
        font-size px2rem(14)
        margin-top px2rem(4)
    .recommend-gorup-body
      padding 0 15px
      ul
        display flex
        flex-wrap wrap
        li
          flex 0 0 30%
          margin-right 5%
          box-sizing border-box
          margin-bottom 10px
          &:nth-child(3n+0)
            margin-right 0
          img
            width 100%
          h3
            color #323232
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
</style>
