<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @tabClick="tabClick" />
    <scroll ref="scroll" class="content" @scroll="contentPosition">
      <detail-swiper :topImage="topImage" />
      <detail-base-info :goodsInfo="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-info @detailImageLoad="detailImageLoad" :detailInfo="detailInfo" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childCpns/DetailNavBar";
import DetailSwiper from "./childCpns/DetailSwiper";
import Scroll from "components/common/scroll/Scroll";
import DetailBaseInfo from "./childCpns/DetailBaseInfo";
import DetailShopInfo from "./childCpns/DetailShopInfo";
import DetailGoodsInfo from "./childCpns/DetailGoodsInfo";
import DetailParamInfo from "./childCpns/DetailParamInfo";
import DetailCommentInfo from "./childCpns/DetailCommentInfo";
import GoodsList from "components/content/goods/Goods";
import DetailBottomBar from "./childCpns/DetailBottomBar";

import { backTopMixin, itemListenerMixin, tabControlMixin } from "common/mixin";
import { debounce } from "common/utils";
import {mapActions} from 'vuex'

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage: [],
      detailInfo: {},
      shopInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsInfo: {},
      recommend: [],
      tabOffsetTop: 0,
      getThemeTopY: null,
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  mixins: [backTopMixin, itemListenerMixin, tabControlMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created() {
    console.log();
    this.iid = this.$route.params.iid;
    this._getDetail(this.iid);
    this._getRecommend();

    //  计算各元素高度
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  methods: {
    ...mapActions(['addCart']),
    // 网络请求
    async _getDetail(iid) {
      let res=await getDetail(iid)
        const data = res.result;
        const topList = data.itemInfo.topImages;
        this.topImage.push(...topList);
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        this.shopInfo = new Shop(data.shopInfo);

        this.detailInfo = data.detailInfo;

        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0];
        }

    },
    async _getRecommend() {
      let res=await getRecommend()
        // console.log(res);
        const data = res.data;
        this.recommend = data.list;
    },
    detailImageLoad() {
      // 防抖
      this.refresh();

      this.getThemeTopY();
    },
    // 事件监听
    addToCart() {
      // 展示购物车商品数据
      const product={}
      product.image=this.topImage[0]
      product.title=this.goodsInfo.title
      product.desc=this.goodsInfo.desc
      product.price=this.goodsInfo.realPrice
      product.iid=this.iid

      // 将商品添加到购物车里
        this.addCart(product).then(res=>{
          this.$toast.show(res)
        })
    },
    contentPosition(position) {
      const positionY = -position.y;
      // 返回顶部
      this.listenShowBackTop(position);

      // 与相应区域做对比
      // 创造currentIndex节流阀
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        let length = this.themeTopYs.length;
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}

/* .back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
  z-index:9
} */
</style>
