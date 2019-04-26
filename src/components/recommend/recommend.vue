<template>
  <div class="recommend">
    <scroll ref="scroll" :data="personalizedList" class="recommend-content">
      <div>
        <div v-if="bannerList.length" class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="(item,index) in bannerList" :key="index">
                <a href="javascript:void(0);">
                  <img @load="loadImage" :src="item.imageUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-group">
          <div class="recommend-group-head">
            <a href="javascript:void(0);">查看更多 <i class="fa fa-angle-right"></i></a>
            <h2>为你推荐</h2>
          </div>
          <div class="recommend-group-body">
            <ul v-if="personalizedList.length">
              <li v-for="(item,index) in personalizedList" :key="index" @click="_linkPlayerDetail(item)">
                <img v-lazy="item.picUrl" alt="">
                <h3>{{item.name}}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!personalizedList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {banner, personalized} from 'api/index'
import {ERR_OK} from 'api/config'
import {mapState} from 'vuex'
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      bannerList: [],
      personalizedList: []
    }
  },
  computed: {
    ...mapState(['coverList'])
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
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    _linkPlayerDetail (item) {
      this.$store.state.coverList.name = item.name
      this.$store.state.coverList.url = item.picUrl
      this.$router.push({ path: `/playlist/detail?id=${item.id}` })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/mixin"
.recommend
  position fixed
  width 100%
  top px2rem(44)
  left 0px
  bottom 0px
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      padding-top 37%
      overflow hidden
      .slider-content
        position absolute
        top 0
        left 0
        width 100%
    .recommend-group
      background #ffffff
      border 1px solid #efefef
      .recommend-group-head
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
      .recommend-group-body
        padding 0 15px
        ul
          display flex
          flex-wrap wrap
          li
            flex 0 0 30%
            margin-right 5%
            box-sizing border-box
            margin-bottom px2rem(10)
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
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
