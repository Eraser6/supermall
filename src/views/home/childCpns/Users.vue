<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb />
    <!-- 卡片试图 -->
    <card />
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb";
import Card from "./Card";

export default {
  name: "Users",
  components: {
    BreadCrumb,
    Card,
  },
};
</script>

<style scoped>
</style>
