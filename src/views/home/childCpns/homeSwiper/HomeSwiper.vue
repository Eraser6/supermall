<template>
  <swiper>
    <swiper-item v-for="(item,key) in banners" :key="key">
      <a :href="item.link"></a>
      <img :src="item.image" alt @load="imageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props:{
    banners:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
      this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    }
  }
};
</script>

<style scoped>
</style>
