import * as THREE from 'three';
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//导入tween
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
 
 
//创建场景
const scene = new THREE.Scene();
 
//创建相机
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight, //宽高比
    0.1,
    1000
)

// 球缓冲几何体
const SphereGeometry = new THREE.SphereGeometry(1,20,20);
const meterial = new THREE.MeshPhongMaterial({
    color:0xffffffff
})
 
const sphere = new THREE.Mesh(SphereGeometry,meterial);
//4.设置物体投射阴影
sphere.castShadow = true;
//创建平面
const planeGeometry = new THREE.PlaneGeometry(50,50);
const plane = new THREE.Mesh(planeGeometry,meterial);
plane.position.set(0,-1,0);
// 将地面放平
plane.rotation.x = -Math.PI/2;
//5.设置物体接收阴影
plane.receiveShadow = true;
scene.add(plane)
scene.add(sphere)
// 创建一个太阳
const smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,20,20),
    new THREE.MeshBasicMaterial({color:0xff0000})
)
 
//灯光
//环境光
const light = new THREE.AmbientLight(0x222222,0.5);  //后一个参数是亮度
scene.add(light);
//点光源
const pointLight = new THREE.PointLight(0x666666,1);
//3.设置光照投射阴影
pointLight.castShadow = true;
//光照强度
pointLight.intensity = 10

 
//光赋给小球
smallBall.add(pointLight)
 
scene.add(smallBall);
 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
//1.材质要对光照有反应
//2.渲染器开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
 
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0,0,0);
//坐标
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper); 
//控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.04;

//渲染
function animate(){
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    TWEEN.update();
}
animate();


const clock = new THREE.Clock();

function render(){
    let time = clock.getElapsedTime();
    smallBall.position.x = Math.sin(time)*5;
    console.log(clock)
    smallBall.position.y = Math.cos(time)*5;
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render)
}
render();
