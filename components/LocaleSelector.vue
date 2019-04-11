<template>
  <el-button-group>
    <el-button
      size="mini"
      @click="changeLang(locales[0])"
      plain
      type="primary"
      style="border-right-color:#e7f6f5;"
      :class="$store.state.locale === locales[0] ? 'btn active' : 'btn'"
    >En</el-button>
    <el-button
      size="mini"
      @click="changeLang(locales[1])"
      plain
      type="primary"
      style="border-left-color:#e7f6f5;"
      :class="$store.state.locale === locales[1] ? 'btn active' : 'btn'"
    >中</el-button>
  </el-button-group>
</template>

<script>
import { locales } from "../locales/lang";

export default {
  name: "LocaleSelector",
  data() {
    return {
      locales: locales
    };
  },
  methods: {
    changeLang(lang) {
      this.$store.commit("SET_LANG", lang);
      this.$i18n.locale = window.localStorage["lang"];
    }
  },
  computed: {
    locale() {
      const lang_icon = ["En", "中"];
      return lang_icon[locales.indexOf(this.$i18n.locale)];
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    background: rgb(231, 246, 245) !important;
    color: #41b7b0 !important;
  }
  &.active {
    background: #11a59c !important;
    color: #fff !important;
  }
}
</style>


