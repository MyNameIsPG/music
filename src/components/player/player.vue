<template>
  <div class="player" v-show="setFullScreen">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000">
        </div>
        <div class="top">
          <div class="back" @click="back()">
            <i class="fa fa-chevron-left"></i>
          </div>
          <h1 class="title">{{player.name}}</h1>
          <h2 class="subtitle">{{player.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" ref="imageWrapper">
                <img ref="image" class="image" :src="player.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">sdsd</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">

          </div>
          <div class="progress-wrapper" v-if="songList">
            <span class="time time-l">01</span>
            <div class="progress-bar-wrapper">
              <progress-bar></progress-bar>
            </div>
            <span class="time time-r">{{format(player.time)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="fa fa-random"></i>
            </div>
            <div class="icon i-left">
              <i class="fa fa-backward" @click="prev"></i>
            </div>
            <div class="icon i-center">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right">
              <i class="fa fa-forward" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="fa fa-heart-o"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <div class="imgWrapper" ref="miniWrapper">
            <img ref="miniImage" width="40" height="40" :src="player.image">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="player.name"></h2>
          <p class="desc" v-html="player.singer"></p>
        </div>
        <div class="control">
          <i class="fa fa-playi"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" @playing="ready" @error="error"></audio>
  </div>
</template>

<script>
import progressBar from 'base/progress-bar/progress-bar'
import {songUrl, lyric} from 'api/index'
import {ERR_OK} from 'api/config'
import { mapState } from 'vuex'
export default {
  components: {
    progressBar
  },
  data () {
    return {
      songReady: false,
      url: '',
      songList: [],
      lyricList: '',
      currentLyric: null,
      playAdnStop: false
    }
  },
  computed: {
    playIcon () {
      return this.playAdnStop ? 'fa fa-play' : 'fa fa-pause'
    },
    ...mapState(['player', 'playlist', 'sequenceList', 'setFullScreen', 'firstPage', 'fullScreen', 'currentIndex'])
  },
  created () {
    this.touch = {}
    setTimeout(() => {

    }, 20)
  },
  methods: {
    // 关闭大界面
    back () {
      this.$store.state.setFullScreen = true
      this.$store.state.fullScreen = false
    },
    // 打開小界面
    open () {
      this.$store.state.setFullScreen = true
      this.$store.state.fullScreen = true
    },
    // 切換上一首
    prev () {
      if (!this.songReady) {
        return false
      } else {
        let length = this.$store.state.playlist.length
        if (length > 0) {
          let index = this.$store.state.currentIndex
          if (index === 0) {
            this.$store.state.currentIndex = 0
          } else {
            this.$store.state.currentIndex--
          }
        }
        this.$store.state.player = this.$store.state.playlist[this.$store.state.currentIndex]
        this.playAdnStop = false
      }
    },
    // 切換下一首
    next () {
      if (!this.songReady) {
        return false
      } else {
        let length = this.$store.state.playlist.length
        if (length > 0) {
          let index = this.$store.state.currentIndex
          if (index === length) {
            this.$store.state.currentIndex = 0
          } else {
            this.$store.state.currentIndex++
          }
        }
        this.$store.state.player = this.$store.state.playlist[this.$store.state.currentIndex]
        this.playAdnStop = false
      }
    },
    togglePlaying () {
      if (!this.songReady) {
        return false
      }
      this.playAdnStop = !this.playAdnStop
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    _songUrl () {
      let params = {
        id: this.player.id
      }
      songUrl(params).then((res) => {
        if (res.code === ERR_OK) {
          this.url = res.data[0].url
          this.songList = res.data[0]
        }
      })
    },
    _lyric () {
      let params = {
        id: this.player.id
      }
      lyric(params).then((res) => {
        if (res.code === ERR_OK) {
          this.lyricList = res.lrc.lyric
        }
      })
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    }
  },
  watch: {
    url (item) {
      this.$refs.audio.src = item
      this.$refs.audio.play()
    },
    player: {
      handler (obj) {
        if (obj.id === '') {
          return false
        } else {
          this._songUrl()
          this._lyric()
        }
      },
      immediate: true,
      deep: true
    },
    playAdnStop (item) {
      const audio = this.$refs.audio
      item ? audio.pause() : audio.play()
    },
    firstPage (item) {
      if (item) {
        this._songUrl()
        this._lyric()
      }
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        i
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    &.normal-enter-active, &.normal-leave-active
    transition: all 0.4s
    .title, .subtitle
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .title
        transform: translate3d(0, -100px, 0)
      .subtitle
        transform: translate3d(0, 100px, 0)
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          box-sizing: border-box
          height: 100%
          .cd
            width: 100%
            height: 100%
            border-radius: 50%
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 10px solid rgba(255, 255, 255, 0.1)
            .play
              animation: rotate 20s linear infinite
        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
          .pure-music
            padding-top: 50%
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      height: 40px
      padding: 0 10px 0 20px
      .imgWrapper
        height: 100%
        width: 100%
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      height: 40px
      padding: 0 10px 0 20px
      .imgWrapper
        height: 100%
        width: 100%
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
