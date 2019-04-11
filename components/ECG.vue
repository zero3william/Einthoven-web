<template>
  <div>
    <el-row type="flex" align="middle" style="margin: 0 0 30px;">
      <el-button
        v-if="pixiStatus==='pause'"
        icon="iconfont icon-play"
        type="text"
        @click="startPixi"
      ></el-button>
      <el-button v-if="pixiStatus==='play'" icon="iconfont icon-stop" type="text" @click="stopPixi"></el-button>
      <el-slider style="width:100%;margin-left:20px;" v-model="ecgIndex" :max="recordTime*250-1" :format-tooltip="formatTooltip" @change="handleSlider"></el-slider>
    </el-row>
    <div id="pixi-container">
      <div id="timer">{{formatTime}}</div>
    </div>
  </div>
</template>

<script>
import fakeData from "./ecgdata";

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
        data_x: 0, //ecgData x
        data_y: 700, //ecgData y
        hidden_left: 0,
        hidden_right: 0
      },
      ecgData: {},
      ecgIndex: 0,
      ecgLine: null,
      labelContainer: null,
      time: 0,
      recordTime: 60,
      pixiApp: null,
      pixiStatus: "pause"
    };
  },
  mounted() {
    this.$nextTick(function() {
      const parent = document.getElementById("pixi-container");
      this.param.width = parent.clientWidth;
      this.param.height = parent.clientHeight;
      this.param.data_x = parseInt(parent.clientWidth / 100) * 50 + 50;
      this.param.hidden_left = this.param.data_x - this.param.ref_x - 8 * this.param.d;
      this.param.hidden_right = this.param.data_x * 2;
      document.getElementById('timer').style.left = this.param.data_x+'px';

      let app = new PIXI.Application({
        width: this.param.width,
        height: this.param.height,
        antialias: true
      });
      this.pixiApp = app;
      document.getElementById("pixi-container").appendChild(app.view);

      this.drawGrid(app);

      //fake start
      this.ecgData = fakeData.data;
      this.ecgLine = new PIXI.Graphics();
      this.labelContainer = new PIXI.Container();
      app.stage.addChild(this.labelContainer);

      this.drawData(app);

      const vue = this;
      app.ticker.add(function(delta) {
        vue.time += delta / 60;
        if(vue.time > vue.recordTime) vue.time = vue.recordTime;
        vue.ecgLine.clear();
        vue.labelContainer.removeChildren();
        vue.drawData(app);
      });
      this.stopPixi();
      //fake end

/*
      this.asyncData({ interval: 3600 }).then(resp => {
        this.ecgData = resp.data.data;
        this.ecgLine = new PIXI.Graphics();
        this.labelContainer = new PIXI.Container();
        app.stage.addChild(this.labelContainer);

        this.drawData(app);

        const vue = this;

        app.ticker.add(function(delta) {
          vue.time += delta / 60;
          if(vue.time > vue.recordTime) vue.time = vue.recordTime;
          vue.ecgLine.clear();
          vue.labelContainer.removeChildren();
          vue.drawData(app);
        });
        this.stopPixi();
      }); */
    });
  },
  methods: {
    handleSlider(val) {
      this.time = val * 0.004;
      this.ecgLine.clear();
      this.drawData(this.pixiApp);
      this.updatePixi();
    },
    formatTooltip(val) {
      return val;
    },
    startPixi() {
      if(this.time >= this.recordTime) this.time = 0;
      this.pixiApp.ticker.start();
      this.pixiStatus = "play";
    },
    stopPixi() {
      this.pixiApp.ticker.stop();
      this.pixiStatus = "pause";
    },
    updatePixi() {
      this.pixiApp.ticker.update();
    },
    asyncData(payload) {
      let data = this.$api.post("/Data/RetrieveECG", payload);
      return data;
    },
    drawData(app) {
      const { data_x, data_y, ref_x,d,hidden_left,hidden_right } = this.param;
      const { ecg, peak } = this.ecgData;
      const line = this.ecgLine;

      line.lineStyle(2, 0x00ff00, 1);

      const index = parseInt(this.time * 250);
      this.ecgIndex = index;
      if (index >= ecg.length) this.stopPixi();

      const start = index - hidden_left > 0 ? index - hidden_left : 0;
      const end = index + hidden_right;
      const subArray = ecg.slice(start, end);
      const start_x = data_x - Math.min(hidden_left,index);

      line.moveTo(start_x , data_y - subArray[0] * 100);
      subArray.forEach((item, index) => {
        line.lineTo(start_x + (index * d) / 10, data_y - item * 100);
      });
      app.stage.addChild(line);

      //渲染peak label
      const subPeak = peak.filter(item => {
        return item[0] >= start && item[0] <= end;
      });
      let style = new PIXI.TextStyle({
        fontSize: 16,
        fontWeight: "bold",
        fill: ["#ffffff", "#ff0099"]
      });
      subPeak.forEach(peak => {
        const basicText = new PIXI.Text(peak[1],style);
        basicText.x = start_x + (peak[0]-start) * d / 10;
        basicText.y = 30;
        this.labelContainer.addChild(basicText);
      });
    },
    randomBase() {
      const { d } = this.param;
      return (Math.random() * d) / 5;
    },
    drawGrid(app) {
      const { width, height, offsetx, offsety, d, ref_x, ref_y, data_x } = this.param;

      let line = new PIXI.Graphics();

      /*绘制竖行网格*/
      for (let i = 0; i <= width / d; i++) {
        if (i % 5 === 0) {
          line.lineStyle(1, 0x00ff00, 0.8);
        } else {
          line.lineStyle(1, 0x00ff00, 0.4);
        }
        line.moveTo(i * d + offsetx, offsety);
        line.lineTo(i * d + offsetx, height - offsety);
        app.stage.addChild(line);
      }
      /*渲染心電圖表格*/
      for (let j = 0; j <= height / d; j++) {
        if (j % 5 === 0) {
          line.lineStyle(1, 0x00ff00, 0.8);
        } else {
          line.lineStyle(1, 0x00ff00, 0.4);
        }
        line.moveTo(offsetx, j * d + offsety);
        line.lineTo(width + offsetx, j * d + offsety);
        app.stage.addChild(line);
      }
      /*渲染XY軸說明*/
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
      /*渲染1mv參考波 reference pulse*/
      line.lineStyle(2, 0x00ff00, 1);
      line.moveTo(ref_x, ref_y);
      line.lineTo(ref_x + d, ref_y);
      line.lineTo(ref_x + d, ref_y - 10 * d);
      line.lineTo(ref_x + 6 * d, ref_y - 10 * d);
      line.lineTo(ref_x + 6 * d, ref_y);
      line.lineTo(ref_x + 7 * d, ref_y);
      app.stage.addChild(line);
      /*渲染時間參考線*/
      line.lineStyle(2, 0xff0000, 1);
      line.moveTo(data_x, 0);
      line.lineTo(data_x, height);
      app.stage.addChild(line);
    }
  },
  computed: {
    formatTime() {
      let min = Math.floor(this.time / 60);
      min = min > 9 ? min : `0${min}`;
      let sec = Math.floor(this.time % 60);
      sec = sec > 9 ? sec : `0${sec}`;
      let csec = this.time.toFixed(2).split('.');
      return `${min}:${sec}:${csec[1]}`;
    }
  }
};
</script>

<style lang="scss" scoped>
#pixi-container {
  position: relative;
  height: 450px;
  cursor: move;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}
#timer {
  position:absolute;
  top:-40px;
  width:100px;
  margin-left:-50px;
  text-align:center;
  font-size:30px;
  font-weight:bold;
  font-family: digital;
}
</style>
