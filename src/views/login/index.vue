<template>
  <div :class="loginStyle" v-loading="loading">
    <div class="login-form">
      <div style="font-size:28px;margin-bottom:50px;text-align: center">
        <span>资源发放平台</span>
      </div>
      <el-form ref="dataForm" :model="model" size="small">
        <el-form-item>
          <el-radio v-model="role" label="1">普通用户</el-radio>
          <el-radio v-model="role" label="2">管理员</el-radio>
        </el-form-item>
        <el-form-item v-if="role === '1'">
          手机号&nbsp;&nbsp;
          <el-input v-model="model.userPhone" placeholder="手机号" class="input-width"></el-input>
        </el-form-item>
        <el-form-item v-if="role === '1'">
          <div style="display: flex;justify-content: ecnter;">
            验证码&nbsp;&nbsp;
            <el-input
              v-model="model.smsCode"
              style="width:150px;margin-right:5px;"
              placeholder="短信验证码"
            ></el-input>
            <el-button size="small" @click="sendSmsCode">获取短信验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="role === '2'">
          账号&nbsp;&nbsp;
          <el-input v-model="model.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item v-if="role === '2'">
          密码&nbsp;&nbsp;
          <el-input v-model="model.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" size="small" @click="login()">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { messages } from "./../../assets/js/common.js";
export default {
  name: "Login",
  data() {
    return {
      model: {
        account: "",
        password: "",
        userPhone: "",
        smsCode: ""
      },
      role: "1",
      loading: false,
    };
  },
  created() {
    this.authcheck();
  },
  methods: {
    login() {
      const _this = this;
      _this.loading = true
      if (role === "1") {
        _this.$api.user.login(_this.model).then(resp => {
          if (resp && resp.code === 0) {
            _this.$store.dispatch("setToken", resp.data.token);
            _this.$store.dispatch("setRoles", resp.data.roles);
            _this.$store.dispatch("setAccount", resp.data.account);
            _this.$router.push({ path: "/home" });
          } else {
            _this.$message.error(resp.msg);
          }
          _this.loading = false
        });
      } else {
        _this.$api.user.loginMgmt(_this.model).then(resp => {
          if (resp && resp.code === 0) {
            _this.$store.dispatch("setToken", resp.data.token);
            _this.$store.dispatch("setRoles", resp.data.roles);
            _this.$store.dispatch("setAccount", resp.data.account);
            _this.$router.push({ path: "/home" });
          } else {
            _this.$message.error(resp.msg);
          }
          _this.loading = false
        });
      }
    },
    sendSmsCode() {
      const _this = this;
      if (_this.model.userPhone === "") {
        messages("error", "手机号不能为空");
        return;
      }
      _this.loading = true
      _this.$api.user
        .sendSmsCode({ userPhone: _this.model.userPhone })
        .then(resp => {
          if (resp) {
            if (resp.code === 0) {
              messages("success", "发送成功");
            } else {
              messages("error", resp.msg);
            }
          }
          _this.loading = false
        });
    },
    authcheck() {
      const _this = this;
      _this.loading = true
      _this.$api.user.authcheck({token: _this.$store.getters.getToken()}).then(resp => {
        if (resp) {
          if (resp.code === 0) {
            if (resp.data) {
              _this.$store.dispatch("setToken", resp.data.token);
              _this.$store.dispatch("setRoles", resp.data.roles);
              _this.$store.dispatch("setAccount", resp.data.account);
              _this.$router.push({ path: "/home" });
            }
          } else {
            _this.$message.error(resp.msg);
          }
        }
        _this.loading = false
      });
    },
    loginStyle() {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      return "width:" + width + "px;height:" + height + "px;";
    }
  }
};
</script>

<style>
.login-form {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 400px;
  height: 50%;
  margin: auto;
}
.input-width {
  width: 200px;
}
</style>
