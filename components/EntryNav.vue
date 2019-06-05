<template>
  <el-row type="flex" align="middle" justify="center" class="animate-block">
    <div>
      <transition name="fade">
        <div v-show="show">
          <h3>{{$t(title)}}</h3>
          <p v-html="$t(desc)" style="line-height:24px;"></p>
          <el-button round class="button" @click="onClick">{{$t(btn)}}</el-button>
        </div>
      </transition>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'EntryNav',
  data() {
    return {
      show: true
    };
  },
  props: {
    title: String,
    desc: String,
    btn: String,
    click: Function
  },
  methods: {
    onClick: function(event) {
      this.click();
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.7s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.2s;
  opacity: 0;
}

.animate-block {
  background: radial-gradient(farthest-corner at 40px 40px, #207a94, #11a59c);
  width: 30vw;
  height: 100vh;
  color: #fff;
  text-align: center;
  padding: 40px;
  .button {
    background: transparent;
    color: #fff;
    border-color: #fff;
    &:hover {
      color: #73dac9;
      border-color: #73dac9;
    }
  }
}
</style>
