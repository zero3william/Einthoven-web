<template>
  <el-form class="login-form-container text-center" :model="ruleForm" ref="ruleForm">
    <h2 class="primary-text">{{$t('signInFormTitle')}}</h2>
    <AutoCompleteBlocker/>
    <el-form-item
      prop="email"
      :rules="[
      { required: true, message: $t('pleaseEnterEmail'), trigger: 'blur' },
      { type: 'email', message: $t('pleaseEnterValidEmail'), trigger: ['blur', 'change'] }
    ]"
    >
      <el-input
        :placeholder="$t('account')"
        prefix-icon="iconfont icon-user"
        v-model="ruleForm.email"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="password"
      :rules="[
          {
            required: true,
            message: $t('pleaseEnterPassword'),
            trigger: 'change'
          },
          {
            min: 8,
            max: 16,
            message: $t('wrongPasswordFormat'),
            trigger: 'blur'
          }
        ]"
    >
      <el-input
        type="password"
        :placeholder="$t('password')"
        prefix-icon="iconfont icon-lock-outline"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-row type="flex" justify="space-between" align="middle">
      <nuxt-link to="/login/recovery">{{$t('forgetPassword')}}</nuxt-link>
      <el-button round type="primary" @click="submitForm('ruleForm')">{{$t('entryNavBtn2')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { mapMutations } from "vuex";
import AutoCompleteBlocker from "./AutoCompleteBlocker";

export default {
  name: "LoginForm",
  components: {
    AutoCompleteBlocker
  },
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const payload = this.$store.commit("LOGIN", this.payload);
          this.$router.push({ path: "recordsList" });
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    payload() {
      return this.ruleForm;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form-container {
  width: 70vw;
  padding: 20px 16vw 80px;
}
</style>

