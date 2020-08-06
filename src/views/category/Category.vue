<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectIndex="selectIndex" />
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :subcategories="showTabContentCategory" />
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick" />
        <tab-content-detail @imageLoad="imageLoad" :categoryDetail="showTabContentDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import NavBar from "components/common/navbar/navbar";
import TabMenu from "./childCpns/TabMenu";
import TabContentCategory from "./childCpns/TabContentCategory";
import TabContentDetail from "./childCpns/TabContentDetail";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import { tabControlMixin,itemListenerMixin } from "common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
    Scroll,
    TabControl,
  },
  mixins: [tabControlMixin,itemListenerMixin],
  data() {
    return {
      categoryData: {},
      categories: [],
      currentIndex: -1,
    };
  },
  computed: {
    showTabContentCategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showTabContentDetail() {
      if (this.currentIndex == -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    },
  },
  created() {
    this._getCategory();
  },
  activated(){
    this.$refs.scroll.refresh()
  },
  methods: {
    // -----网络请求-----
    async _getCategory() {
      let res=await getCategory()
        // console.log(res);
        // 获取分类数据
        this.categories = res.data.category.list;

        // 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 请求第一个分类的数据
        this._getSubcategories(0);
    },
    async _getSubcategories(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);

      const mailKey = this.categories[index].maitKey;
      let res=await getSubcategory(mailKey)
        // console.log(res);

        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };

        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
    },
    async _getCategoryDetail(type) {
      // 获取miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求,传入miniWallkey和type
      let res=await getCategoryDetail(miniWallkey, type)
        // console.log(res);

        // 将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
        // console.log(this.showTabContentDetail);
    },

    // -----事件监听-----
    selectIndex(index) {
      this.currentIndex=index
      this._getSubcategories(index);
    },
    imageLoad(){
      this.refresh()
    }
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
