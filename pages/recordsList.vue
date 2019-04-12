<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row type="flex" align="middle">
          <el-date-picker
            v-model="filters.dateRange"
            type="daterange"
            unlink-panels
            range-separator="-"
            :start-placeholder="$t('from')"
            :end-placeholder="$t('to')"
            :picker-options="pickerOptions"
            :default-time="['00:00:00','23:59:59']"
          ></el-date-picker>
          <div class="percentFilter">
            <label>Label(S+V%)</label>
            <el-input v-model="filters.labelSV" pattern="\d{1,5}"></el-input>
          </div>
          <div class="percentFilter">
            <label>Label(U%)</label>
            <el-input v-model="filters.labelU" pattern="[0-9]"></el-input>
          </div>
        </el-row>
      </div>

      <el-table :data="filteredTableData">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column align="center" prop="startTime" :label="$t('startTime')"></el-table-column>
        <el-table-column align="center" prop="recordTime" :label="$t('recordTime')"></el-table-column>
        <el-table-column
          align="center"
          prop="labelSV"
          label="Label(S+V%)"
          :formatter="(row, column, cellValue, index) => { return cellValue + '%' }"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="labelU"
          label="Label(U%)"
          :formatter="(row, column, cellValue, index) => { return cellValue + '%' }"
        ></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="(event) => handleDetail(scope.row,event)"
              type="text"
              size="small"
              style="margin-right:40px;"
            >{{$t('detail')}}</el-button>
            <el-button
              @click="(event) => handleDelete(scope.row,event)"
              type="text"
              size="small"
            >{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-if="dialogVisible"
      custom-class="test"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="96%"
      top="2%"
    >
      <div class="title">{{dialogTitle}}</div>
      <el-tabs type="border-card">
        <el-tab-pane label="ECG">
          <ECG/>
        </el-tab-pane>
        <el-tab-pane label="Heart Rate">Todo</el-tab-pane>
        <el-tab-pane label="Temperature">Todo</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import ECG from "../components/ECG";

export default {
  components: { ECG },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      filters: {
        dateRange: null,
        labelSV: "",
        labelU: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 2 + 1000);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 8 + 1000);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 31 + 1000);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 91 + 1000);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          id: 1,
          startTime: "2019-04-11 12:30:00",
          recordTime: "xx:xx",
          labelSV: 7,
          labelU: 3
        },
        {
          id: 2,
          startTime: "2019-04-07 12:30:00",
          recordTime: "xx:xx",
          labelSV: 20,
          labelU: 1
        },
        {
          id: 3,
          startTime: "2019-04-03 12:30:00",
          recordTime: "xx:xx",
          labelSV: 6,
          labelU: 3
        },
        {
          id: 4,
          startTime: "2019-03-25 12:30:00",
          recordTime: "xx:xx",
          labelSV: 7,
          labelU: 33
        }
      ]
    };
  },
  methods: {
    handleDelete(row, event) {
      this.$confirm(this.$t("deleteMsg"), this.$t("tip"), {
        confirmButtonText: this.$t("yes"),
        cancelButtonText: this.$t("no"),
        type: "warning"
      })
        .then(() => {
          this.tableData = this.tableData.filter(item => item.id !== row.id);
          this.$message({
            type: "success",
            message: this.$t("success")
          });
        })
        .catch(() => {});
    },
    handleDetail(row, event) {
      this.dialogTitle = `${this.$t("startTime")}: ${row.startTime}  ${this.$t(
        "recordTime"
      )}: ${row.recordTime}`;
      this.dialogVisible = true;
    },
    formatNum(val) {
      console.log(val);
      return 0;
    }
  },
  computed: {
    filteredTableData() {
      let filteredData = this.tableData.filter(item => {
        if (this.filters.dateRange) {
          let d = new Date(item.startTime);
          if (d < this.filters.dateRange[0] || d > this.filters.dateRange[1])
            return false;
        }

        if (this.filters.labelSV) {
          if (parseInt(item.labelSV) < this.filters.labelSV) return false;
        }

        if (this.filters.labelU) {
          if (parseInt(item.labelU) < this.filters.labelU) return false;
        }
        return true;
      });

      return filteredData;
    }
  },
  watch: {
    filters: {
      handler: function(value) {
        let numberPattern = /\d+/g;
        value.labelSV =
          value.labelSV.match(numberPattern) === null
            ? ""
            : value.labelSV.match(numberPattern)[0];
        if (parseInt(value.labelSV) >= 100) {
          value.labelSV = "100";
        }
        if (parseInt(value.labelSV) <= 0) {
          value.labelSV = "";
        }

        value.labelU =
          value.labelU.match(numberPattern) === null
            ? ""
            : value.labelU.match(numberPattern)[0];
        if (parseInt(value.labelU) >= 100) {
          value.labelU = "100";
        }
        if (parseInt(value.labelU) <= 0) {
          value.labelU = "";
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  top: 20px;
  left: 22px;
}
.percentFilter {
  position: relative;
  width: 130px;
  margin-left: 30px;
  label {
    position: absolute;
    top: -7px;
    left: 20px;
    padding: 0 2px;
    z-index: 1;
    color: #bbb;
    font-size: 0.8rem;
    background: #fff;
  }
}
</style>

