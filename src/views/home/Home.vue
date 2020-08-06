<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      v-show="isTabFixed"
      ref="topTabControl"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
    />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentPosition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper @swiperImageLoad="swiperImageLoad" :banners="banners" />
      <recommend :recommends="recommends" />
      <feature />
      <tab-control ref="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar";
import HomeSwiper from "./childCpns/homeSwiper/HomeSwiper";
import Recommend from "./childCpns/recommend/Recommend";
import Feature from "./childCpns/homeFeature/Feature";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import Goods from "components/content/goods/Goods";

import { getHomeData, getHomeGoods } from "network/home";

import {
  itemListenerMixin,
  backTopMixin,
  tabControlMixin,
} from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    Scroll,
    Goods,
    // BackTop,
  },
  mixins: [backTopMixin, itemListenerMixin, tabControlMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          list: [],
          page: 0,
        },
        new: {
          list: [],
          page: 0,
        },
        sell: {
          list: [],
          page: 0,
        },
      },
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this._getHomeData();
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  mounted() {
    this.tabClick(0);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 取消全局事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // ----------网络请求----------
    async _getHomeData() {
      let res = await getHomeData();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },
    async _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      let res = await getHomeGoods(type, page);
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;

      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp();
    },
    // ----------事件监听----------
    contentPosition(position) {
      this.listenShowBackTop(position);

      // 判断tabControl是否固定
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this._getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* margin-top: 44px; */
}

.tab-control {
  position: relative;
  z-index: 999;
}
</style>
