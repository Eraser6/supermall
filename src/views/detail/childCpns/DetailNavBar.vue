<template>
   <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">
        <div class="title">
          <div
           class="title-item"
            :class="{active:currentIndex==index}"
             v-for="(item,index) in titles"
              :key="index"
              @click="tabClick(index)"
              >
            {{item}}
          </div>
        </div>
      </div>
      <div slot="right"></div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'


export default {
  name:'',
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    tabClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>
