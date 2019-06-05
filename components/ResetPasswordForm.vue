<template>
  <el-form class="form-container text-center" :model="form" ref="form">
    <h2 class="primary-text">{{$t('forgetPassword')}}</h2>
    <AutoCompleteBlocker/>
    <el-form-item
      prop="email"
      :rules="[
      { required: true, message: $t('pleaseEnterEmail'), trigger: 'submit' },
      { type: 'email', message: $t('pleaseEnterValidEmail'), trigger: 'blur' }
    ]"
    >
      <el-input
        :placeholder="$t('email')"
        prefix-icon="iconfont icon-email"
        v-model="form.email"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="verifyCode" :rules="[
      { required: true, trigger: 'submit' }
    ]">
      <el-input
        :placeholder="$t('verificationCode')"
        prefix-icon="iconfont icon-lock-outline"
        v-model="form.verifyCode"
        autocomplete="off"
      >
        <template slot="append">
          <el-button
            @click="requestCode"
            type="primary"
            plain
            :disabled="countdown!==0"
          >{{`${$t('requestCode')}${countdown===0 ? '' : ` (${countdown})`}`}}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <el-form-item
        v-if="form.verifyCode"
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
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </transition>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <el-row type="flex" justify="center" align="middle" v-if="form.verifyCode">
        <el-button round type="primary" @click="submitForm('form')">{{$t('submit')}}</el-button>
      </el-row>
    </transition>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex';
import AutoCompleteBlocker from './AutoCompleteBlocker';

export default {
  name: 'ResetPasswordForm',
  components: { AutoCompleteBlocker },
  props: {
    isSignIn: Function
  },
  data() {
    return {
      form: {
        email: '',
        verifyCode: '',
        password: ''
      },
      countdown: 0
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.setNewPassword(this.form).then(data => {
            this.$message({
              message: this.$t('newPasswordSuccess'),
              type: 'success'
            });
            this.isSignIn(true);
          });
        } else {
          return false;
        }
      });
    },
    requestCode() {
      if (this.form.email !== '') {
        this.$refs['form'].validateField('useremail');

        this.$api
          .requestResetPassword({ email: this.form.email })
          .then(resp => {
            this.$message({
              message: this.$t('requestResetCodeSuccesss'),
              type: 'success'
            });
            this.countdown = 60;
            let interval = setInterval(() => {
              this.countdown--;
              if (this.countdown <= 0) {
                clearInterval(interval);
              }
            }, 1000);
          });
      } else {
        this.$refs['form'].validateField('useremail');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 70vw;
  padding: 20px 16vw 80px;
}
</style>

