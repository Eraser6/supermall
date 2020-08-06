<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scoll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true,
      pullUpLoad: this.pullUpLoad,
      scrollY: true,
    });

    // 监听滚动
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 监听上拉加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log('上拉加载');
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>
