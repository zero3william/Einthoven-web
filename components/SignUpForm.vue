<template>
  <div style="margin:0 auto;">
    <el-form
      v-if="!isSubmitSuccess"
      class="sign-up-form-container text-center"
      :model="ruleForm"
      ref="ruleForm"
    >
      <h2 class="primary-text">{{$t('signUpFormTitle')}}</h2>
      <AutoCompleteBlocker/>
      <el-form-item
        prop="nickname"
        :rules="[{
        required:true, 
        message: $t('pleaseEnterName'),
        trigger: 'submit'},{trigger: 'blur'}]"
      >
        <el-input
          :placeholder="$t('name')"
          prefix-icon="iconfont icon-user"
          v-model="ruleForm.nickname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
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
      <el-form-item
        prop="password2"
        :rules="{
          validator: passwordValidator,
          trigger: 'blur'
        }"
      >
        <el-input
          type="password"
          :placeholder="$t('confirmPassword')"
          prefix-icon="iconfont icon-lock-outline"
          v-model="ruleForm.password2"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-button round type="primary" @click="submitForm('ruleForm')">{{$t('entryNavBtn1')}}</el-button>
    </el-form>
    <div
      v-if="isSubmitSuccess"
      style="width:30vw;min-width:500px;text-align:center;font-size:1.8rem;padding-bottom:30px;"
    >
      <h2 class="primary-text">{{$t('CONGRATULATIONS')}}</h2>
      <i class="el-icon-success primary-text" style="font-size:3.4rem;"/>
      <p>{{$t('verifyEmailTitle')}}</p>
      <p>{{$t('verifyEmailDesc')}}</p>
      <el-button
        type="primary"
        @click="handleResend"
        :disabled="countdown!==0"
        plain
      >{{`${$t('resendMail')}${countdown===0 ? '' : ` (${countdown})`}`}}</el-button>
    </div>
  </div>
</template>

<script>
import AutoCompleteBlocker from './AutoCompleteBlocker';

export default {
  name: 'SignUpForm',
  components: {
    AutoCompleteBlocker
  },
  data() {
    return {
      ruleForm: {
        nickname: '',
        email: '',
        password: '',
        password2: ''
      },
      isSubmitSuccess: false,
      countdown: 60
    };
  },
  methods: {
    passwordValidator(rule, value, callback) {
      if (this.ruleForm.password === '') callback();
      if (value === '') {
        callback(new Error(this.$t('enterPasswordAgain')));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t('differentPassword')));
      } else {
        callback();
      }
    },
    handleResend() {
      this.$api.register(this.ruleForm).then(resp => {
        this.$message.success({
          message: this.$t('success')
        });
        this.countdown = 60;
        let interval = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(interval);
          }
        }, 1000);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .register(this.ruleForm)
            .then(resp => {
              this.isSubmitSuccess = true;
              let interval = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                  clearInterval(interval);
                }
              }, 1000);
            })
            .catch(err => {
              return err;
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
.sign-up-form-container {
  width: 70vw;
  padding: 20px 16vw 80px;
}
</style>

