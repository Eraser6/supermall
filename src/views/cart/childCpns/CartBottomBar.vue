<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{'¥'+totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{totalCount}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartLength','cartList']),

    isSelectAll() {
      if (this.cartLength === 0) return false;
      return !this.cartList.find(item => !item.check);
    },
    totalPrice(){
      return this.cartList.filter(item=>item.check).reduce((preVal,item)=>{
        return preVal+item.price*item.count
        console.log(item);
      },0).toFixed(2)
    },
    totalCount(){
      const checked=this.cartList.filter(item=>item.check).reduce((preVal,item)=>{
        return preVal+item.count
      },0)
      // console.log(checked);
      return checked
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.check = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.check = true;
        });
      }
    },
    calcClick(){
      if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)

      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 128px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>
