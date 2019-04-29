import { mapState } from 'vuex'

export const fullScreenMixin = {
  computed: {
    ...mapState(['fullScreen'])
  },
  mounted () {
    this.handleFullScreen(this.fullScreen)
  },
  activated () {
    this.handleFullScreen(this.fullScreen)
  },
  watch: {
    fullScreen (newVal) {
      this.handleFullScreen(newVal)
    }
  },
  methods: {
    handleFullScreen () {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
