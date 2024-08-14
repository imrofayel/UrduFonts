<template>
  <canvas ref="noiseCanvas"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'NoiseEffect',
  setup() {
    const noiseCanvas = ref(null);
    let ctx;
    let documentWidth, documentHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;
    let resizeObserver;

    const createNoise = () => {
      const idata = ctx.createImageData(documentWidth, documentHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.25) {
          buffer32[i] = 0xff000000;
        }
      }

      noiseData.push(idata);
    };

    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }

      ctx.putImageData(noiseData[frame], 0, 0);
    };

    const loop = () => {
      paintNoise(frame);

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };

    const updateCanvasSize = () => {
      documentWidth = Math.max(
        document.documentElement.clientWidth,
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth
      );
      documentHeight = Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      noiseCanvas.value.width = documentWidth;
      noiseCanvas.value.height = documentHeight;

      noiseData = []; // Clear existing noise data
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
    };

    const setup = () => {
      updateCanvasSize();
      loop();
    };

    onMounted(() => {
      ctx = noiseCanvas.value.getContext('2d');
      setup();

      // Use ResizeObserver to detect changes in document size
      resizeObserver = new ResizeObserver(updateCanvasSize);
      resizeObserver.observe(document.body);
    });

    onUnmounted(() => {
      window.clearTimeout(loopTimeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    });

    return { noiseCanvas };
  }
};
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  z-index: 1000;
}

.dark canvas {
  opacity: 0.1;
}
</style>