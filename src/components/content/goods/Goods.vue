<template>
  <div class="goods">
    <goods-item :goodsItem="item" v-for="(item,index) in goods" :key="index" @click="itemClick(index)" />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "Goods",
  components: {
    GoodsItem,
  },
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
  methods:{
    itemClick(index){
      // this.$emit('goodsClick',index)
      console.log(index);
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
