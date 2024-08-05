<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js';

let cube: THREE.Object3D<THREE.Object3DEventMap>,renderer: THREE.WebGLRenderer,scene: THREE.Object3D<THREE.Object3DEventMap>,camera: THREE.Camera,control;

onMounted(()=>{
initScene();
addHelper();
animate();
})
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

function initScene(){
// 创建场景
 scene = new THREE.Scene();

// 创建相机
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2,2,5);

// 创建渲染器
 renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.body.appendChild(stats.dom);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
 cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建环境光
const ambientLight = new THREE.AmbientLight(0x404040); // 参数为环境光的颜色
scene.add(ambientLight);

}

function addHelper(){
    control = new OrbitControls(camera, renderer.domElement)
    control.update();
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  stats.end()
}



</script>
<template>
    <canvas id="myCanvas" </canvas>
</template>

