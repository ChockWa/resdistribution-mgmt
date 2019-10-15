<template>
  <div class="r-wechat-receive">
    <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
      <!-- <el-table-column
        prop="area"
        header-align="center"
        align="center"
        :formatter="wechatTypeFormat"
        label="类型"
      ></el-table-column>-->
      <el-table-column prop="wechat" header-align="center" align="center" label="微信号">
        <template slot-scope="scope">
          <span :class="copy-wechat + scope.$index" :data-clipboard-text="scope.row.wechat">{{scope.row.wechat}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态"
        :formatter="statusFormat"
      ></el-table-column>
      <!-- <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="导入时间"
        :formatter="createTimeFormat"
      ></el-table-column>-->
      <!-- <el-table-column prop="userPhone" header-align="center" align="center" label="领取人手机号"></el-table-column> -->
      <!-- <el-table-column
        prop="receiveTime"
        header-align="center"
        align="center"
        label="领取时间"
        :formatter="receiveTimeFormat"
      ></el-table-column>-->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="receiveHandle(scope.$index, scope.row)"
            :disabled="scope.row.status === 2"
          >领取</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import * as dateUtils from "./../../util/dateUtil";
import { messages } from "./../../assets/js/common.js";
import Clipboard from "clipboard";
export default {
  name: "WechatReceive",
  data() {
    return {
      dataListLoading: false,
      dataList: []
    };
  },
  methods: {
    getDataList() {
      const _this = this;
      _this.dataListLoading = true;
      _this.$api.wechat.distribute().then(resp => {
        if (resp) {
          if (resp.code === 0) {
            _this.dataList = resp.data;
          } else {
            messages("error", resp.msg);
          }
          _this.dataListLoading = false;
        }
      });
    },
    createTimeFormat(row) {
      return dateUtils.formartDate(row.createTime);
    },
    statusFormat(row) {
      if (row.status === 0) {
        return "未发放";
      } else if (row.status === 1) {
        return "已发放";
      } else {
        return "已领取";
      }
    },
    receiveHandle(index, row) {
      const _this = this;
      _this.dataListLoading = true;
      _this.$api.wechat.receive({ wechat: row.wechat }).then(resp => {
        if (resp) {
          if (resp.code === 0) {
            _this.dataList = resp.data;
            _this.copy(index)
            messages("success", "领取成功");
          } else {
            messages("error", resp.msg);
          }
          _this.dataListLoading = false;
        }
      });
    },
    copy(index) {
      var clipboard = new Clipboard(".copy-wechat" + index);
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        messages("error","该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.r-wechat-receive {
}
</style>