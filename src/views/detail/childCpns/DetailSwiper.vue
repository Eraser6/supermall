<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImage" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/";

export default {
  name: "",
  components: {
    Swiper,
    SwiperItem,
  },
  props:{
    topImage:{
      type:Array,
      default:[]
    }
  }
};
</script>

<style scoped>
 .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
