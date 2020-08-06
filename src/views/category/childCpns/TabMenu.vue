<template>
  <scroll id="tab-menu">
    <ul class="category-list">
      <li
        class="menu-list-item"
        :class="{isActive:currentIndex===index}"
        v-for="(item,index) in categories"
        :key="index"
        @click="selectClick(index)"
      >{{item.title}}</li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "",
  props: {
    categories: {
      type: Array,
      default: [],
    },
  },
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    selectClick(index) {
      this.currentIndex = index;
      this.$emit('selectIndex',index)
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  box-sizing: border-box;

  height: 100%;
  width: 100px;
}
.category-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh+49px);
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.isActive {
  color: var(--color-high-text);
  background-color: #fff;
  font-weight: 700;
  border-left: 3px solid var(--color-high-text);
}
</style>
