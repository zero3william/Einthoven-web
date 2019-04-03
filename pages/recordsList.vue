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
        <el-table-column fixed="right" label="Delete" width="70">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">del</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
    handleDelete(row) {
      this.tableData = this.tableData.filter(item => item.id !== row.id);
    }
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped>
</style>

