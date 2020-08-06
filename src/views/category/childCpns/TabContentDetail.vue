<template>
  <grid-view>
    <goods-item v-for="(item,index) in categoryDetail" :goodsItem="item" :key="index" @load="imageLoad" />
  </grid-view>
</template>

<script>
import GoodsItem from 'components/content/goods/GoodsItem'
import GridView from 'components/common/GridView/GridView'

export default {
  name:'TabControlDetail',
  components:{
    GoodsItem,
    GridView
  },
  props:{
    categoryDetail:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      this.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
</style>
