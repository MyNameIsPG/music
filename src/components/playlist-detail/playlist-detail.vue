<template>
  <div class="playlist-detail" v-if="playlistDetailList">
    <m-header-back :name="playlistDetailList.name"></m-header-back>
    <div class="coverImgUrl">
      <img :src="playlistDetailList.coverImgUrl" alt="">
    </div>
    <ul class="list">
      <li v-for="(item,index) in playlistDetailList.tracks" :key="index" @click="_linkPlayerDetail(index)">
        <img :src="item.al.picUrl" alt="">
        <div>
          <h4>{{item.ar[0].name}}</h4>
          <h5>{{item.al.name}}</h5>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MHeaderBack from 'components/m-header/m-header-back'
import {playlistDetail} from 'api/index'
import {ERR_OK} from 'api/config'
import { mapState } from 'vuex'
export default {
  components: {
    MHeaderBack
  },
  data () {
    return {
      playlistDetailList: []
    }
  },
  computed: {
    ...mapState(['player'])
  },
  created () {
    setTimeout(() => {
      this._playlistDetail()
    }, 20)
  },
  methods: {
    _playlistDetail () {
      let params = {
        id: this.$route.query.id
      }
      playlistDetail(params).then((res) => {
        if (res.code === ERR_OK) {
          this.playlistDetailList = res.playlist
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
          this.$router.push({ path: `/player` })
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/mixin"
.playlist-detail
  .coverImgUrl
    img
      width 100%
      height px2rem(200)
  .list
    margin-top 20px
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
</style>
