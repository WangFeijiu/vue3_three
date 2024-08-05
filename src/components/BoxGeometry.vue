<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from 'three';


let scene: THREE.Object3D<THREE.Object3DEventMap>, camera: THREE.Camera, cube: THREE.Object3D<THREE.Object3DEventMap>, renderer: THREE.WebGLRenderer,axesHelper,gridHelper;

onMounted(() => {
  initScene()
  addHelpers()
  // renderer.render(scene, camera);
  animate();
})

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') as HTMLCanvasElement});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 'green' });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.set(2,2,10);

}


function addHelpers() {
    // 添加坐标轴辅助线
    axesHelper = new THREE.AxesHelper(10)
    scene.add(axesHelper)
  
    // 添加网格辅助线
    gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
  }

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
</script>

<template>
  <canvas id="myCanvas" </canvas>
</template>
