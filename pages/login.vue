<template>
  <div>
    <el-row type="flex" align="middle" class="entry-container" data-ease="easeOutElastic(.8, .8)">
      <transition
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp leave-active"
      >
        <SignInForm v-if="isSignIn"/>
      </transition>
      <transition
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown leave-active"
      >
        <ResetPasswordForm v-if="!isSignIn" :isSignIn="handleIsSignIn"/>
      </transition>

      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <el-button
          v-if="isSignIn"
          @click="isSignIn=false"
          type="text"
          class="bottom_btn"
        >{{$t('forgetPassword')}}</el-button>
      </transition>
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <el-button
          v-if="!isSignIn"
          @click="isSignIn=true"
          type="text"
          class="bottom_btn"
        >{{$t('signIn')}}</el-button>
      </transition>

      <EntryNav
        :page="page"
        :title="entryNavProps.title"
        :desc="entryNavProps.desc"
        :btn="entryNavProps.btn"
        :click="animate"
      />
      <SignUpForm/>
      <LocaleSelector
        id="locale-select-container"
        data-ease="easeOutElastic(.8, .8)"
        style="position:fixed;top:14px;left:60vw;"
      />
      <el-row id="logo-container" type="flex" justify="center" align="bottom">
        <img src="/logo32.png">
        <span
          style="font-family:'Italianno',cursive;font-size:18px;font-weight:bold;padding-right:20px;"
        >EINTHOVEN</span>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import ResetPasswordForm from '../components/ResetPasswordForm';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import EntryNav from '../components/EntryNav';
import LocaleSelector from '../components/LocaleSelector';
import anime from 'animejs';

export default {
  layout: 'login',
  components: {
    SignInForm,
    SignUpForm,
    EntryNav,
    LocaleSelector,
    ResetPasswordForm
  },
  data() {
    return {
      isSignIn: true,
      page: 'signIn',
      entryNavProps: {
        title: '',
        desc: '',
        btn: ''
      },
      title: ['entryNavTitle1', 'entryNavTitle2'],
      desc: ['entryNavDesc1', 'entryNavDesc2'],
      btn: ['entryNavBtn1', 'entryNavBtn2']
    };
  },
  methods: {
    handleIsSignIn(bool) {
      this.isSignIn = bool;
    },
    animate: function(event) {
      this.page = this.page === 'signIn' ? 'signUp' : 'signIn';
      const num = this.page === 'signIn' ? 0 : 1;
      this.entryNavProps = {
        title: this.title[num],
        desc: this.desc[num],
        btn: this.btn[num]
      };
      anime({
        targets: '.entry-container',
        left: num === 0 ? 0 : '-70vw',
        easing: function(el) {
          return el.getAttribute('data-ease');
        },
        duration: 1300
      });
      anime({
        targets: '#locale-select-container',
        left: num === 0 ? '60vw' : '35vw',
        easing: function(el) {
          return el.getAttribute('data-ease');
        },
        duration: 1300
      });
      anime({
        targets: '#logo-container',
        color: num === 0 ? '#5960d4' : '#ffffff',
        duration: 1800
      });
      anime({
        targets: '#logo',
        filter:
          num === 0 ? 'brightness(1) invert(0)' : 'brightness(0) invert(1)',
        duration: 1300
      });
    }
  },
  mounted: function() {
    this.entryNavProps = {
      title: this.title[0],
      desc: this.desc[0],
      btn: this.btn[0]
    };
    if (
      this.$route.query.hasOwnProperty('useremail') &&
      this.$route.query.hasOwnProperty('activatecode')
    ) {
      this.$api
        .activate({
          email: this.$route.query.useremail,
          verifyCode: this.$route.query.activatecode
        })
        .then(data => {
          this.$message.success({
            message: this.$t('Activate account')
          });
        });
    }
    if (this.$route.query.isSignUp === 'true') {
      this.animate();
    }
  }
};
</script>

<style lang="scss" scoped>
.entry-container {
  width: 170vw;
}
#logo-container {
  position: fixed;
  top: 20px;
  left: 20px;
  color: #11a59c;
}
.leave-active {
  position: absolute;
}
.bottom_btn {
  position: absolute;
  bottom: 12vh;
  width: 8vw;
  left: 31vw;
  text-align: center;
}
</style>

