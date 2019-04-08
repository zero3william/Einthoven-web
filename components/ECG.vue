<template>
  <div>
    <h3 class="title">FilterPlace</h3>
    <div id="pixi-container"></div>
  </div>
</template>

<script>
export default {
  name: "ECG",
  mounted() {
    const width = 800;
    const height = 340;
    const offsetx = 30; //格線位置
    const offsety = 20; //格線位置
    const d = 20;

    let app = new PIXI.Application({
      width: width,
      height: height,
      antialias: true
    });
    document.getElementById("pixi-container").appendChild(app.view);

    let line = new PIXI.Graphics();

    /*绘制竖行网格*/
    for (let i = 0; i <= width / d; i++) {
      if (i % 5 == 0) {
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
      if (j % 5 == 0) {
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

    let richText = new PIXI.Text("time/ms", style);
    richText.position.set(width - 70, height - 26);
    app.stage.addChild(richText);
  }
};
</script>

<style lang="scss" scoped>
</style>
