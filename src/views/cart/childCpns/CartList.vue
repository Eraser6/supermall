<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :cartListItem="item" />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";
import {mapGetters} from 'vuex'


export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  computed:{
    ...mapGetters(['cartLength','cartList'])

  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 84px;
  left: 0;
  right: 0;
}
</style>
