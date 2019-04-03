<template>
  <el-row type="flex" align="middle" justify="center" class="animate-block bg-primary">
    <div>
      <transition
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="ok">
          <h3>{{title}}</h3>
          <p>{{desc}}</p>
        </div>
      </transition>
      <el-button round class="button" @click="onClick">{{btn}}</el-button>
    </div>
  </el-row>
</template>

<script>
import anime from "animejs";

export default {
  name: "EntryNav",
  data() {
    return {
      ok: true
    };
  },
  props: {
    page: String,
    title: String,
    desc: String,
    btn: String,
    click: Function
  },
  methods: {
    onClick: function(event) {
      this.click();
      const obj =
        this.page === "signIn"
          ? { paddingLeft: "70px" }
          : { paddingRight: "70px" };
      anime({
        ...obj,
        targets: ".animate-block .button",
        direction: "alternate",
        easing: "easeInOutSine",
        duration: 360
      });
      this.ok = false;
      setTimeout(() => {
        this.ok = true;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.animate-block {
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
