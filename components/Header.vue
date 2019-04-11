<template>
  <header class="header-container">
    <el-row type="flex" justify="space-between" align="middle">
      <span style="margin-left:20px;">{{ nowTime }}</span>
      <el-row type="flex" align="middle">
        {{$store.state.userinfo ? $store.state.userinfo.email : ''}}
        <img
          src="/user32x32.png"
          style="margin:0 20px;"
        >
        <LocaleSelector/>
      </el-row>
    </el-row>
  </header>
</template>

<script>
import LocaleSelector from "../components/LocaleSelector";

export default {
  name: "Header",
  components: { LocaleSelector },
  data() {
    return {
      nowTime: ""
    };
  },
  methods: {
    now() {
      const _date = new Date();
      const year = _date.getFullYear();
      const month =
        _date.getMonth() <= 9 ? `0${_date.getMonth()}` : _date.getMonth();
      const date =
        _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
      const hour =
        _date.getHours() <= 9 ? `0${_date.getHours()}` : _date.getHours();
      const minute =
        _date.getMinutes() <= 9 ? `0${_date.getMinutes()}` : _date.getMinutes();
      const second =
        _date.getSeconds() <= 9 ? `0${_date.getSeconds()}` : _date.getSeconds();
      const timezone =
        _date.getTimezoneOffset() / -60 >= 0
          ? `+${_date.getTimezoneOffset() / -60}`
          : `-${_date.getTimezoneOffset() / -60}`;
      return `${year}-${month}-${date} ${hour}:${minute}:${second} (UTC${timezone})`;
    }
  },
  mounted() {
    this.nowTime = this.now();
    setInterval(() => {
      this.nowTime = this.now();
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
}
</style>
