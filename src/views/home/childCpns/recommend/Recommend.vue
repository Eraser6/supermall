<template>
  <div class="recommend">
    <div class="item" v-for="(item,key) in recommends" :key="key">
      <img :src="item.image" alt="">
        <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Recommend',
  props:{
    recommends:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>
.recommend{
    display:flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding:10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend .item{
    flex:1;
  }
    .recommend .item img{
      width: 100%;
      margin-bottom:10px;
    }
</style>
