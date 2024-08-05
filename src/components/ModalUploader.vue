<script setup lang="ts">
import { Fragment, onMounted, ref } from "vue";
import * as THREE from 'three';
import { FBXLoader } from  'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Light } from "three";

enum LIGHT_COLOR {
  WHITE = '#FFFFFF',
  YELLOW = '#FFFF00',
  ORANGE = '#FF4500',
  BLUE = '#0000FF',
  GREEN = '#00FF00',

}

let scene: THREE.Object3D<THREE.Object3DEventMap>, camera: THREE.Camera, control: OrbitControls, renderer: THREE.WebGLRenderer, axesHelper, gridHelper, light: Light<undefined>;

const selectedLightColor = ref(LIGHT_COLOR.WHITE)

onMounted(() => {
  initScene()
  addHelpers()
  addLight()
  loadModel()
  addOrbitControls() 
  animate();
})

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') as HTMLCanvasElement });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.set(2, 5, 50);
}


function addHelpers() {
  // 添加坐标轴辅助线
  axesHelper = new THREE.AxesHelper(50)
  scene.add(axesHelper)

  // 添加网格辅助线
  gridHelper = new THREE.GridHelper(50, 50)
  // scene.add(gridHelper)
}

function animate() {
  control.update()
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function addLight() {
  light = new THREE.AmbientLight(selectedLightColor.value)
  scene.add(light);
}

function loadModel(){
  const loader = new FBXLoader();
  loader.load('./../../public/head.fbx', function (object) {
    console.log(object);
    scene.add(object);
  });
  loader.load('./../../public/cover.fbx', function (object) {
    console.log(object);
    scene.add(object);
  });
  loader.load('./../../public/body.fbx', function (object) {
    console.log(object);
    scene.add(object);
  });
}

function addOrbitControls() {
  control = new OrbitControls(camera, renderer.domElement)

}

function onLightColorChange() {
  light.color = new THREE.Color(selectedLightColor.value);
}

</script>

<template>
  <section>
    <div> <label>灯光颜色:</label>
      <div v-for="(color, key) in LIGHT_COLOR" :key="key" class="label-wrap">
        <input type="radio" :id="key" :name="'light-color'" :value="color" @change="onLightColorChange"
          v-model="selectedLightColor">
        <label :for="key">{{ key }}</label>
      </div>
    </div>
    <div>
      <label>材质切换:</label>
      <div class="label-wrap">
        <input type="radio" name="'material'">
        <label>半透明红色</label>
      </div>
    </div>
    </section>
      <canvas id="myCanvas"></canvas>
</template>

<style>
.label-wrap {
  margin-left: 16px;
  display: inline-block
}
</style>


