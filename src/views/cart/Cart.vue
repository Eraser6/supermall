<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar  />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar";
import CartList from "./childCpns/CartList";
import CartBottomBar from "./childCpns/CartBottomBar";
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

</style>
