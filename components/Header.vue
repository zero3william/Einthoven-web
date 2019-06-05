<template>
  <el-row class="header-container" type="flex" justify="space-between" align="middle">
    <span style="margin-left:20px;">{{ nowTime }}</span>
    <el-row type="flex" align="middle">
      <span>{{$store.state.userinfo ? $store.state.userinfo.nickname : ''}}</span>
      <div
        id="header-avatar"
        class="avatar"
        :style="`background-image:url(${$store.state.userinfo ? $store.state.userinfo.avatar : ''})`"
      >
        <img
          id="header-forEXIF"
          :src="$store.state.userinfo ? $store.state.userinfo.avatar : ''"
          style="display:none;"
        >
      </div>

      <LocaleSelector/>
    </el-row>
  </el-row>
</template>

<script>
import LocaleSelector from '../components/LocaleSelector';
import DateFormat from '../utils/date';

export default {
  name: 'Header',
  components: { LocaleSelector },
  data() {
    return {
      nowTime: ''
    };
  },
  methods: {
    now() {
      return DateFormat(new Date(), 1);
    }
  },
  mounted() {
    this.nowTime = this.now();
    setInterval(() => {
      this.nowTime = this.now();
    }, 1000);

    const img = document.getElementById('header-forEXIF');

    img.onload = function() {
      EXIF.getData(this, function() {
        let dom = document.getElementById('header-avatar');
        switch (EXIF.getTag(this, 'Orientation')) {
          case 1: // 水平(一般)
            break;
          case 2: // 水平鏡像
            break;
          case 3: // 翻轉180度
            dom.style.transform = 'rotate(-180deg)';
            break;
          case 4: // 垂直鏡像
            break;
          case 5: // 水平鏡像後，順時鐘翻轉270度
            break;
          case 6: // 順時鐘翻轉270度
            dom.style.transform = 'rotate(-270deg)';
            break;
          case 7: // 水平鏡像後，順時鐘翻轉90度
            break;
          case 8: // 順時鐘翻轉90度
            dom.style.transform = 'rotate(-90deg)';
            break;
          default:
            // 讀取 EXIF Orientation 錯誤
            break;
        }
        dom.style.opacity = 1;
      });
    };
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  padding: 1rem 2rem;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  .avatar {
    margin: 0 20px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-size: cover;
    opacity: 0;
    transition: all 0.7s;
  }
}
</style>
