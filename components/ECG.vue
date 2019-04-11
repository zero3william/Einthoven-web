<template>
  <div>
    <el-row style="margin: 0 0 10px;">
      <el-button
        v-if="pixiStatus==='pause'"
        icon="iconfont icon-play"
        type="text"
        @click="startPixi"
      ></el-button>
      <el-button v-if="pixiStatus==='play'" icon="iconfont icon-stop" type="text" @click="stopPixi"></el-button>
    </el-row>
    <div id="pixi-container"></div>
  </div>
</template>

<script>
// import fakeData from "./ecgdata";

export default {
  name: "ECG",
  data() {
    return {
      param: {
        width: 0, //canvas width
        height: 0, //canvas height
        offsetx: 0, //grid position
        offsety: 0, //grid position
        d: 10, //scale of small box
        ref_x: 20, // reference pulse x,
        ref_y: 300, // reference pulse y, height / 2 + 5 * d
        data_x: 100, //ecgData x
        data_y: 700 //ecgData y
      },
      ecgData: {},
      time: 0,
      pixiApp: null,
      pixiStatus: "pause"
    };
  },
  mounted() {
    this.$nextTick(function() {
      const parent = document.getElementById("pixi-container");
      this.param.width = parent.clientWidth;
      this.param.height = parent.clientHeight;

      let app = new PIXI.Application({
        width: this.param.width,
        height: this.param.height,
        antialias: true
      });
      this.pixiApp = app;
      document.getElementById("pixi-container").appendChild(app.view);

      this.drawGrid(app);

      this.asyncData({ interval: 3600 }).then(resp => {
        this.ecgData = resp.data.data;

        let dataLine = new PIXI.Graphics();
        this.drawData(app, this.time, dataLine);

        const vue = this;

        app.ticker.add(function(delta) {
          vue.time += delta / 60;
          dataLine.clear();
          vue.drawData(app, vue.time, dataLine);
        });
        app.ticker.stop();
      });
    });
  },
  methods: {
    startPixi() {
      this.pixiApp.ticker.start();
      this.pixiStatus = "play";
    },
    stopPixi() {
      this.pixiApp.ticker.stop();
      this.pixiStatus = "pause";
    },
    asyncData(payload) {
      let data = this.$api.post("/Data/RetrieveECG", payload);
      return data;
    },
    drawData(app, time, line) {
      const { data_x, data_y, d } = this.param;
      const { ecg, peak } = this.ecgData;

      line.lineStyle(2, 0x00ff00, 1);

      const index = parseInt(time * 250);
      const subArray = ecg.slice(index, index + 2000);
      if (subArray.length < 500) app.ticker.stop();

      line.moveTo(data_x, data_y - subArray[0] * 100);
      subArray.forEach((item, index) => {
        line.lineTo(data_x + (index * d) / 10, data_y - item * 100);
      });
      app.stage.addChild(line);
      return line;
    },
    randomBase() {
      const { d } = this.param;
      return (Math.random() * d) / 5;
    },
    drawGrid(app) {
      const { width, height, offsetx, offsety, d, ref_x, ref_y } = this.param;

      let line = new PIXI.Graphics();

      /*绘制竖行网格*/
      for (let i = 0; i <= width / d; i++) {
        if (i % 5 === 0) {
          line.lineStyle(1, 0x00ff00, 0.7);
        } else {
          line.lineStyle(1, 0x00ff00, 0.4);
        }
        line.moveTo(i * d + offsetx, offsety);
        line.lineTo(i * d + offsetx, height - offsety);
        app.stage.addChild(line);
      }
      /*绘制横行网格*/
      for (let j = 0; j <= height / d; j++) {
        if (j % 5 === 0) {
          line.lineStyle(1, 0x00ff00, 0.7);
        } else {
          line.lineStyle(1, 0x00ff00, 0.4);
        }
        line.moveTo(offsetx, j * d + offsety);
        line.lineTo(width + offsetx, j * d + offsety);
        app.stage.addChild(line);
      }
      /*横纵坐标说明*/
      let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "bold",
        fill: ["#ffffff", "#00ff99"], // gradient
        stroke: "#4a1850",
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
      });
      let richText = new PIXI.Text("25mm/s", style);
      richText.position.set(width - 70, height - 26);
      app.stage.addChild(richText);
      richText = new PIXI.Text("10mm/mv", style);
      richText.position.set(0, 0);
      app.stage.addChild(richText);
      // reference pulse
      line.lineStyle(2, 0x00ff00, 1);
      line.moveTo(ref_x, ref_y);
      line.lineTo(ref_x + d, ref_y);
      line.lineTo(ref_x + d, ref_y - 10 * d);
      line.lineTo(ref_x + 6 * d, ref_y - 10 * d);
      line.lineTo(ref_x + 6 * d, ref_y);
      line.lineTo(ref_x + 7 * d, ref_y);
      app.stage.addChild(line);
    }
  }
};
</script>

<style lang="scss" scoped>
#pixi-container {
  overflow: hidden;
  height: 450px;
  cursor: move;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}
</style>
