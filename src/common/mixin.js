import { BACK_TOP } from './const'
import BackTop from 'components/content/backTop/BackTop'
import {debounce} from './utils'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > BACK_TOP
    }
  }
}

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

// 监听切换栏
export const tabControlMixin = {
  data () {
    return {
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      if(this.$refs.topTabControl!==undefined){
        this.$refs.topTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
      }

    }
  }
}