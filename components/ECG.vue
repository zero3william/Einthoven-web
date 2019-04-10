<template>
  <div>
    <h3 class="title">FilterPlace</h3>
    <div id="pixi-container"></div>
  </div>
</template>

<script>
export default {
  name: "ECG",
  data() {
    return {
      param: {
        width: 1250, //canvas width
        height: 300, //canvas height
        offsetx: 0, //grid position
        offsety: 0, //grid position
        d: 10, //scale of small box
        ref_x: 20, // reference pulse x,
        ref_y: 200, // reference pulse y, height / 2 + 5 * d
        data_x: 100, //ecgData x
        data_y: 200 //ecgData y
      },
      ecgData: [],
      time: 0
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
      document.getElementById("pixi-container").appendChild(app.view);

      this.drawGrid(app);
      this.ecgData = this.fakeData();
      let dataLine = this.drawData(app, this.time);

      const vue = this;

      app.ticker.add(function(delta) {
        vue.time += delta / 60;
        dataLine.clear();
        dataLine = vue.drawData(app, vue.time);
      });
    });
  },
  unmounted() {
    console.log("unmounted ???");
  },
  methods: {
    drawData(app, time) {
      const { data_x, data_y, d } = this.param;
      let line = new PIXI.Graphics();

      line.lineStyle(2, 0x00ff00, 1);
      line.moveTo(data_x, data_y);

      const index = parseInt(time * 250);
      const subArray = this.ecgData.slice(index, index + 1250);
      if (subArray.length < 500) app.ticker.stop();
      subArray.forEach((item, index) => {
        line.lineTo(data_x + (index * d) / 10, data_y + item);
      });
      app.stage.addChild(line);
      return line;
    },
    fakeData() {
      const { d } = this.param;
      const data_length = 5; //sec
      let data = [];
      let this_pick = 0;
      let next_pick = parseInt(Math.random() * 50) + 200;
      for (let i = 0; i < 250 * data_length; i++) {
        if (i - this_pick <= next_pick) {
          data[i] = this.randomBase();
        } else {
          this_pick = i;
          next_pick = parseInt(Math.random() * 100) + 100;
          const start = this.randomBase();
          const end = Math.random() + 0.5;
          data[i++] = start - 2 * d * end;
          data[i++] = start - 4 * d * end;
          data[i++] = start - 6 * d * end;
          data[i++] = start - 8 * d * end;
          data[i++] = start - 10 * d * end;
          data[i++] = start - 12 * d * end;
          data[i++] = start - 10 * d * end;
          data[i++] = start - 8 * d * end;
          data[i++] = start - 6 * d * end;
          data[i++] = start - 4 * d * end;
          data[i++] = start - 2 * d * end;
          data[i++] = start * end;
          data[i++] = start + 2 * d * end;
          data[i++] = start + 1.5 * d * end;
          data[i++] = start + 1 * d * end;
          data[i++] = start + 0.5 * d * end;
          data[i++] = start * end;
        }
      }
      return data.map(item => parseFloat(item.toFixed(2)));
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
  height: 300px;
  cursor: move;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}
</style>
