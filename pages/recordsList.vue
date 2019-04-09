<template>
  <div>
    <el-date-picker
      v-model="filters.dateRange"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <p></p>
    <el-card>
      <el-table :data="tableData">
        <el-table-column prop="startTime" label="Start Time" width="180"></el-table-column>
        <el-table-column prop="recordTime" label="Record Time" width="180"></el-table-column>
        <el-table-column prop="label" label="Label"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="(event) => handleDetail(scope.row,event)"
              type="text"
              size="small"
              style="margin-right:40px;"
            >Detail</el-button>
            <el-button
              @click="(event) => handleDelete(scope.row,event)"
              type="text"
              size="small"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog custom-class="test" :visible.sync="dialogVisible" width="96%" top="2%">
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
        dateRange: ["", ""]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          id: 1,
          startTime: "2019-03-25 12:30:00",
          recordTime: "xx:xx",
          label: "nan%"
        },
        {
          id: 2,
          startTime: "2019-03-24 12:30:00",
          recordTime: "xx:xx",
          label: "nan%"
        },
        {
          id: 3,
          startTime: "2019-03-23 12:30:00",
          recordTime: "xx:xx",
          label: "nan%"
        },
        {
          id: 4,
          startTime: "2019-03-22 12:30:00",
          recordTime: "xx:xx",
          label: "nan%"
        }
      ]
    };
  },
  methods: {
    handleDelete(row, event) {
      this.tableData = this.tableData.filter(item => item.id !== row.id);
    },
    handleDetail(row, event) {
      this.dialogTitle = `開始時間: ${row.startTime}  紀錄時長: ${
        row.recordTime
      }`;
      this.dialogVisible = true;
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
</style>

