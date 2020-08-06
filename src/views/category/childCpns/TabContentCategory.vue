<template>
<div>
  <div class="category-list" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" class="category-list-item" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
</div>

</template>

<script>
export default {
  name: "",
  props:{
    subcategories:{
      type:Object,
      default:{}
    }
  }
};
</script>

<style scoped>
.category-list {
  display: flex;
  width: 85px;
  margin-left: 6px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
}

.category-list-item {
  flex: 1;
  width: 80%;
}

</style>
