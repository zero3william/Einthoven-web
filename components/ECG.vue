<template>
  <div>
    <el-row type="flex" align="middle" style="margin: 0 0 30px;">
      <el-button
        :disabled="loading"
        v-if="pixiStatus==='pause'"
        icon="iconfont icon-play"
        type="text"
        @click="startPixi"
      ></el-button>
      <el-button
        :disabled="loading"
        v-if="pixiStatus==='play'"
        icon="iconfont icon-stop"
        type="text"
        @click="stopPixi"
      ></el-button>
      <vue-slider
        style="margin-left:20px;width:100%"
        tooltip="none"
        :disabled="loading"
        v-model="ecgIndex"
        :max="recordTime*250-1"
        @change="handleSlider"
        :processStyle="{backgroundColor: '#11A59C'}"
        :dotStyle="{borderColor: '#11A59C'}"
        :railStyle="{cursor:'pointer'}"
      ></vue-slider>
    </el-row>
    <div id="pixi-container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <div id="timer">{{formatTime}}</div>
    </div>
  </div>
</template>

<script>
import fakeData from "./ecgdata";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "ECG",
  components: {
    VueSlider
  },
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
      labelMapArr: [
        {
          label: "N",
          style: {
            fill: ["#63cc4d", "#3cbf42", "#40ff5c"],
            fillGradientStops: [0.1],
            fontFamily: "Tahoma",
            miterLimit: "",
            stroke: "#319340",
            strokeThickness: 2
          }
        },
        {
          label: "U",
          style: {
            fill: ["#ffe064", "#fc0"],
            fillGradientStops: [0.1],
            fontFamily: "Tahoma",
            miterLimit: "",
            stroke: "#d0a700",
            strokeThickness: 2
          }
        },
        {
          label: "V",
          style: {
            fill: ["white", "#fb0006", "#ff4045"],
            fillGradientStops: [0.1],
            fontFamily: "Tahoma",
            miterLimit: "",
            stroke: "#d9404b",
            strokeThickness: 2
          }
        },
        {
          label: "S",
          style: {
            fill: ["white", "#fb0006", "#ff4045"],
            fillGradientStops: [0.1],
            fontFamily: "Tahoma",
            miterLimit: "",
            stroke: "#d9404b",
            strokeThickness: 2
          }
        }
      ],
      time: 0,
      recordTime: 60,
      pixiApp: null,
      pixiStatus: "pause",
      loading: true
    };
  },
  mounted() {
    this.labelMapArr[-1] = {
      label: "?",
      style: {
        fill: ["#63cc4d", "#3cbf42", "#40ff5c"],
        fillGradientStops: [0.1],
        fontFamily: "Tahoma",
        miterLimit: "",
        stroke: "#319340",
        strokeThickness: 2
      }
    };
    this.$nextTick(function() {
      const parent = document.getElementById("pixi-container");
      this.param.width = parent.clientWidth;
      this.param.height = parent.clientHeight;
      this.param.data_x = parseInt(parent.clientWidth / 100) * 50 + 50;
      this.param.hidden_left =
        this.param.data_x - this.param.ref_x - 8 * this.param.d;
      this.param.hidden_right = this.param.data_x * 2;
      document.getElementById("timer").style.left =
        this.param.data_x - 4 + "px";

      this.pixiApp = new PIXI.Application({
        width: this.param.width,
        height: this.param.height,
        antialias: true
      });
      document.getElementById("pixi-container").appendChild(this.pixiApp.view);

      this.drawGrid(this.pixiApp);

      //////fake start
      // this.ecgData = fakeData.data;
      // this.ecgLine = new PIXI.Graphics();
      // this.labelContainer = new PIXI.Container();
      // app.stage.addChild(this.labelContainer);
      // this.drawData(app);
      // const vue = this;
      // app.ticker.add(function(delta) {
      //   vue.time += delta / 60;
      //   if(vue.time > vue.recordTime) vue.time = vue.recordTime;
      //   vue.ecgLine.clear();
      //   vue.labelContainer.removeChildren();
      //   vue.drawData(app);
      // });
      // this.stopPixi();
      //////fake end

      this.loading = true;
      this.asyncData({ interval: 3600 }).then(resp => {
        this.loading = false;
        this.recordTime = resp.data.data.ecg.length / 250;
        this.ecgData = resp.data.data;
        this.ecgLine = new PIXI.Graphics();
        this.labelContainer = new PIXI.Container();
        this.pixiApp.stage.addChild(this.labelContainer);

        this.drawData(this.pixiApp);
        this.pixiApp.ticker.update();

        const vue = this;
        this.pixiApp.ticker.add(function(delta) {
          vue.time += delta / 60;
          if (vue.time > vue.recordTime) vue.time = vue.recordTime;
          vue.ecgLine.clear();
          vue.labelContainer.removeChildren();
          vue.drawData(vue.pixiApp);
        });
        this.stopPixi();
      });
    });
  },
  methods: {
    handleSlider(val) {
      this.time = val * 0.004;
      this.ecgLine.clear();
      this.drawData(this.pixiApp);
      this.updatePixi();
    },
    // formatTooltip(val) {
    //   return this.formatTime;
    // },
    startPixi() {
      if (this.time >= this.recordTime) this.time = 0;
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
      const {
        data_x,
        data_y,
        ref_x,
        d,
        hidden_left,
        hidden_right
      } = this.param;
      const { ecg, peak } = this.ecgData;
      const line = this.ecgLine;

      line.lineStyle(2, 0x00ff00, 1); //ecgLine style (width,color,opacity)

      this.ecgIndex = parseInt(this.time * 250);
      if (this.ecgIndex >= ecg.length) this.stopPixi();

      const start =
        this.ecgIndex - hidden_left > 0 ? this.ecgIndex - hidden_left : 0;
      const end = this.ecgIndex + hidden_right;
      const subArray = ecg.slice(start, end);
      const start_x = data_x - Math.min(hidden_left, this.ecgIndex);

      //渲染ecgLine
      line.moveTo(start_x, data_y - subArray[0] * 100);
      subArray.forEach((item, index) => {
        line.lineTo(start_x + (index * d) / 10, data_y - item * 100);
      });
      app.stage.addChild(line);

      //渲染peak label
      const subPeak = peak.filter(item => {
        return item[0] >= start && item[0] <= end;
      });
      subPeak.forEach(peak => {
        const labelText = new PIXI.Text(
          this.labelMapArr[peak[1]].label,
          this.labelMapArr[peak[1]].style
        );
        labelText.x = start_x - 8 + ((peak[0] - start) * d) / 10;
        labelText.y = d;
        this.labelContainer.addChild(labelText);
      });
    },
    drawGrid(app) {
      const {
        width,
        height,
        offsetx,
        offsety,
        d,
        ref_x,
        ref_y,
        data_x
      } = this.param;

      let line = new PIXI.Graphics();

      /*渲染 ecg grid 直線*/
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
      /*渲染 ecg grid 橫線*/
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
      let csec = this.time.toFixed(2).split(".");
      return `${min}:${sec}:${csec[1]}`;
    }
  }
};
</script>

<style lang="scss" scoped>
#pixi-container {
  position: relative;
  height: 450px;
}
#timer {
  position: absolute;
  top: -40px;
  width: 100px;
  margin-left: -50px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  font-family: digital;
}
</style>
