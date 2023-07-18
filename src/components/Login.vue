<template>
  <div class="login">
    <form class="el-form login-form">
      <h3 class="title">若依后台管理系统</h3>
      <div class="el-form-item is-success is-required el-form-item--medium">
        <div class="el-form-item__content">
          <div class="el-input el-input--medium el-input--prefix">
            <input type="text"
                   autocomplete="off"
                   placeholder="账号"
                   class="el-input__inner"
                   v-model="Loginform.username">
            <span class="el-input__prefix">
              <i class="el-icon-user-solid"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="el-form-item is-required el-form-item--medium">
        <div class="el-form-item__content">
          <div class="el-input el-input--medium el-input--prefix">
            <input type="password"
                   autocomplete="off"
                   placeholder="密码"
                   class="el-input__inner"
                   v-model="Loginform.password">
            <span class="el-input__prefix">
              <i class="el-icon-lock"></i></span>
          </div>
        </div>
      </div>
      <div class="el-form-item is-required el-form-item--medium">
        <div class="el-form-item__content">
          <div class="el-input el-input--medium el-input--prefix"
               style="width: 63%;">
            <input type="text"
                   autocomplete="off"
                   placeholder="验证码"
                   class="el-input__inner"
                   v-model="Loginform.yzm">
            <span class="el-input__prefix">
              <i class="el-icon-edit"></i>
            </span>
          </div>
          <div class="login-code"><img src="data:image/gif;base64,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"
                 class="login-code-img"></div>
        </div>
      </div><label class="el-checkbox"
             style="margin: 0px 0px 25px;"><span class="el-checkbox__input"><span class="el-checkbox__inner"></span><input type="checkbox"
                 aria-hidden="false"
                 class="el-checkbox__original"
                 value=""></span><span class="el-checkbox__label">记住密码</span></label>
      <div class="el-form-item el-form-item--medium"
           style="width: 100%;">
        <div class="el-form-item__content"><span @click="tohome()"><button type="button"
                    class="el-button el-button--primary el-button--medium"
                    style="width: 100%;">
              <span>登 录</span></button></span></div>
      </div>
    </form>
    <div class="el-login-footer"></div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      Loginform: {
        username: '',
        password: '',
        yzm: ''
      }
    }
  },
  methods: {
    tohome () {
      if (this.Loginform.username && this.Loginform.password && this.Loginform.yzm) {
        console.log(1)
        this.$router.replace({ path: '/layout' });
      }
    }
  }
}
</script>

<style scoped>
/**以下是login里的css样式*/
.login {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  background-image: url(../static/img/login-background.f9f49138.jpg);
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  box-sizing: border-box;
  border-radius: 6px;
  background: #fff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}

.login-form .el-input,
.login-form .el-input input {
  height: 38px;
}

.login-form .input-icon {
  height: 39px;
  width: 14px;
  margin-left: 2px;
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
}

.login-code img {
  cursor: pointer;
  vertical-align: middle;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
