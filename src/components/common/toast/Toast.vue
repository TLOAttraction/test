<!-- 封装弹窗 -->
<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name:"",
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   isshow: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data () {
      return {
        message: '',
        isshow: false
      }
    },
    methods: {
      show(message='默认文字', duration=1000){
        this.isshow = true;
        this.message = message;

        setTimeout(() => {
          this.isshow = false;
          this.message = '';
        }, duration);
      }
    }
  }
</script>

<style  scoped>
  .toast{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0,.75);
    color: #fff;
    padding: 8px 10px;
    width: fit-content;
    height: fit-content;
    z-index: 9;
  }
</style>
