<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


/** 
 * ✅ 必要
 * ⬜ 可选
 * */

let scene: THREE.Object3D<THREE.Object3DEventMap> & any, camera: THREE.Camera, renderer: THREE.WebGLRenderer;
let axesHelper, gridHelper, control;
let envTexture: THREE.DataTexture, mouse: THREE.Vector2, raycaster: THREE.Raycaster, observeObjects: THREE.Group<THREE.Object3DEventMap>[] = [];
  
let ModalColor=new THREE.Color( 0.6038273388475408,  0.6038273388475408,  0.6038273388475408)

onMounted(() => {
  initScene()
  addHelpers()
  addHDR()
  addRaycaster()
  loadModel()
  addLight()
  addOrbitControls()
  animate();
})

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') as HTMLCanvasElement, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);
  camera.position.set(20, 20, 20);
}






function addHDR() {
  // 加载 HDR 环境贴图
  new RGBELoader()
    .setPath('/public/')
    .load('hotel.hdr', (texture) => {
      envTexture = texture
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });
}


function addHelpers() {
  // 添加坐标轴辅助线
  axesHelper = new THREE.AxesHelper(100)
  scene.add(axesHelper)

  // 添加网格辅助线
  gridHelper = new THREE.GridHelper(20, 20)
  scene.add(gridHelper)
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addLight() {
  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light);
}

function addOrbitControls() {
  control = new OrbitControls(camera, renderer.domElement)
  control.update();
}



function loadModel() {
  const loader = new FBXLoader();
  loader.load('./../../public/head.fbx', function (object) {
    observeObjects.push(object)
    applyEnvTexture2Material(object)
    object.name='head'
    scene.add(object);
  });
  loader.load('./../../public/cover.fbx', function (object) {
    observeObjects.push(object)
    applyEnvTexture2Material(object)
    object.name='cover'
    scene.add(object);
  });
  loader.load('./../../public/body.fbx', function (object) {
    observeObjects.push(object)
    applyEnvTexture2Material(object)
    object.name='body'
    scene.add(object);
  });
}


function applyEnvTexture2Material(m: THREE.Object3D) {
  m.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh) {
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.envMap = envTexture; // 将环境贴图应用到模型材质上
      material.needsUpdate = true;
    }
  })
}

function addRaycaster() {
  // 初始化 Raycaster 和鼠标向量
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 监听鼠标移动事件
  document.addEventListener('mousemove', onMouseMove, false);
  // 监听鼠标点击事件
  document.addEventListener('click', onClick, false);
}

function onMouseMove(event: { clientX: number; clientY: number; }) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function onClick(event) {
  // 更新射线投射位置和方向
  raycaster.setFromCamera(mouse, camera);

  // 计算物体和射线的交点
  const intersects = raycaster.intersectObjects(observeObjects, true); // 第二个参数 true 表示递归检查子对象
console.log(intersects)

  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log('Clicked on object:', object);
    // 在这里可以进行点击后的操作，比如改变颜色、动画等
    object.material.color.set(JSON.stringify(object.material.color) === JSON.stringify(ModalColor)?0xffff00:ModalColor); // 将颜色改为黄色
  
  }
}

function removeModalByName(name:'head'|'body'|'cover'){
  scene.traverse((object) => {
  if (object.name === name) {
   object.visible=!object.visible
  }
});

}

</script>

<template>
  <button @click="removeModalByName('head')">头</button>
  <button @click="removeModalByName('cover')">盖子</button>
  <button @click="removeModalByName('body')">瓶身</button>
  <canvas id="myCanvas" </canvas>
</template>




