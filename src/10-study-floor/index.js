// import { onMounted } from '@vue/runtime-core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

let renderer, camera, scene, container;
let clock, smallBall;

function init() {
  // renderer
  container = document.body;
  renderer = new THREE.WebGLRenderer({ antialias: true })  // antialias:true 开启抗锯齿
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enable = true
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  // camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 100, 6)
  camera.rotation.order = 'YXZ'

  // scene
  scene = new THREE.Scene()
  // scene.background = new THREE.Color(0x88ccee)
  // scene.fog = new THREE.Fog(0x88ccee, 0, 50000)
  scene.add(new THREE.GridHelper(100))

  // light
  const fillLight1 = new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5);
  fillLight1.position.set(2, 1, 1);
  scene.add(fillLight1);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(- 5, 25, - 1);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.01;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.left = - 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = - 30;
  directionalLight.shadow.mapSize.width = window.innerWidth;
  directionalLight.shadow.mapSize.height = window.innerHeight;
  directionalLight.shadow.radius = 4;
  directionalLight.shadow.bias = - 0.00006;
  scene.add(directionalLight);

  // clock
  clock = new THREE.Clock()
  //环境光
  const light = new THREE.AmbientLight(0x222222,0.5);
  scene.add(light);
  //点光源
  const pointLight = new THREE.PointLight(0x666666,1);
  smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 16),
    new THREE.MeshBasicMaterial({color:0xff0000})
  )

  //光赋给小球
  smallBall.add(pointLight)
  scene.add(smallBall);
  smallBall.position.set(0,100,4);

  // const lightSun = new THREE.PointLight(0xfff000, 1000000);
  // scene.add( sphere );
  // scene.add( lightSun );
  // sphere.add(lightSun);
  // controls
  const controls = new OrbitControls(camera, renderer.domElement)

  window.addEventListener("resize", onResize)

}


function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// 渲染
function animate() {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  let time = clock.getElapsedTime();
  smallBall.position.x = 100 + Math.sin(time)*15;
  console.log(clock)
  smallBall.position.y = 100 + Math.cos(time)*15;
}
init()
animate()