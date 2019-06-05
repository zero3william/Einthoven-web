<template>
  <el-form class="login-form-container text-center" :model="ruleForm" ref="ruleForm">
    <h2 class="primary-text">{{$t('signInFormTitle')}}</h2>
    <AutoCompleteBlocker/>
    <el-form-item
      prop="email"
      :rules="[
      { required: true, message: $t('pleaseEnterEmail'), trigger: 'submit' },
      { type: 'email', message: $t('pleaseEnterValidEmail'), trigger: 'blur' }
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
            trigger: 'submit'
          },
          {
            min: 4,
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
    <el-row type="flex" justify="center" align="middle">
      <el-button round type="primary" @click="submitForm('ruleForm')">{{$t('entryNavBtn2')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex';
import AutoCompleteBlocker from './AutoCompleteBlocker';

export default {
  name: 'LoginForm',
  components: {
    AutoCompleteBlocker
  },
  data() {
    return {
      ruleForm: {
        email: 'zero3william@gmail.com',
        password: '1234'
      },
      usersystem: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.login(this.ruleForm).then(data => {
            this.$store.commit('LOGIN_SUCCESS', {
              email: this.ruleForm.email,
              ...data
            });
            this.$router.push({ path: '/' });
          });
        } else {
          return false;
        }
      });
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

