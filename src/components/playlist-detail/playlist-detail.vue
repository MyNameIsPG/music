<template>
  <transition appear name="slide">
    <div class="playlist-detail">
      <div class="playlist-detail-content">
        <div>
          <div class="back" @click="_back">
            <i class="fa fa-chevron-left"></i>
          </div>
          <h1 class="title" v-html="coverList.name"></h1>
          <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
              <div ref="playBtn" class="play">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
              </div>
            </div>
            <div class="filter" ref="filter"></div>
          </div>
          <div class="bg-layer" ref="layer"></div>
          <scroll :data="playlistDetailList.tracks" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="playlist-detail-list" ref="list">
            <div class="playlist-detail-list-content">
              <ul class="list-content">
                <li v-for="(item,index) in playlistDetailList.tracks" :key="index" @click="_linkPlayerDetail(index)">
                  <img v-lazy="item.al.picUrl" alt="">
                  <div>
                    <h4>{{item.ar[0].name}}</h4>
                    <h5>{{item.al.name}}</h5>
                  </div>
                </li>
              </ul>
            </div>
            <div class="loading-container" v-show="!playlistDetailList.tracks">
              <loading></loading>
            </div>
          </scroll>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistDetail} from 'api/index'
import {ERR_OK} from 'api/config'
import {prefixStyle} from 'common/js/dom'
import {mapState} from 'vuex'
const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  components: {
    Loading,
    Scroll
  },
  data () {
    return {
      playlistDetailList: [],
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.coverList.url})`
    },
    ...mapState(['player', 'coverList'])
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    setTimeout(() => {
      this._playlistDetail()
    }, 20)
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    _back () {
      this.$router.back()
    },
    _playlistDetail () {
      let params = {
        id: this.$route.query.id
      }
      playlistDetail(params).then((res) => {
        if (res.code === ERR_OK) {
          this.playlistDetailList = res.playlist
          let arr1 = []
          let arr2 = []
          for (var i = 0; i < this.playlistDetailList.tracks.length; i++) {
            let arr = {}
            arr.id = this.playlistDetailList.trackIds[i].id
            arr.name = this.playlistDetailList.tracks[i].name
            arr.image = this.playlistDetailList.tracks[i].al.picUrl
            arr.singer = this.playlistDetailList.tracks[i].ar[0].name
            arr.time = this.playlistDetailList.tracks[i].dt
            arr1.push(arr)
            arr2.push(arr)
          }
          this.$store.state.player.playlist = arr1
          this.$store.state.player.sequenceList = arr2.sort(() => Math.random() - 0.5)
        }
      })
    },
    _linkPlayerDetail (index) {
      this.playlistDetailList.tracks.map((v, i) => {
        if (i === index) {
          this.$store.state.player.id = this.playlistDetailList.trackIds[index].id
          this.$store.state.player.name = v.name
          this.$store.state.player.singer = v.ar[0].name
          this.$store.state.player.image = v.al.picUrl
          this.$store.state.player.time = v.dt
        }
      })
      // this.$router.push({ path: `/player` })
    }
  },
  watch: {
    scrollY (newVal) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.playlist-detail
  position fixed
  left 0px
  top 0px
  bottom 0px
  width 100%
  background #333
  z-index 99
  display none
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    i
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .title
    position absolute
    top 0
    left 10%
    z-index 40
    width 80%
    no-wrap()
    text-align center
    line-height 40px
    font-size $font-size-large
    color $color-text
  .bg-image
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background-size cover
    .play-wrapper
      position absolute
      bottom 20px
      z-index 50
      width 100%
      .play
        box-sizing border-box
        width 135px
        padding 7px 0
        margin 0 auto
        text-align center
        border 1px solid $color-theme
        color $color-theme
        border-radius 100px
        font-size 0
        .icon-play
          display inline-block
          vertical-align middle
          margin-right 6px
          font-size $font-size-medium-x
        .text
          display inline-block
          vertical-align middle
          font-size $font-size-small
    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7, 17, 27, 0.4)
  .bg-layer
    position relative
    height 100%
    background $color-background
  .playlist-detail-content
    height 100%
    .coverImgUrl
      img
        width 100%
        height px2rem(200)
    .playlist-detail-list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      .playlist-detail-list-content
        padding 20px 0px
        box-sizing border-box
        background: $color-background
        position relative
        ul
          li
            display flex
            padding 0 20px 20px 20px
            img
              width px2rem(60)
              height px2rem(60)
              margin-right px2rem(10)
            div
              font-size px2rem(14)
              display flex
              flex-direction column
              justify-content center
              line-height px2rem(20)
              h4
                margin-bottom px2rem(10)
                color #ffffff
              h5
                color rgba(255,255,255,0.3)
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
