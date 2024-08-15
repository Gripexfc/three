import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

// // three 三要素  场景  相机  渲染器


// // 创建场景
// const screen = new THREE.Scene();
// // 创建相机
// const camera = new THREE.PerspectiveCamera(
// 	50, // 相机视野
// 	window.innerWidth / window.innerHeight, // 水平方向和竖直方向长度的比值
// 	0.1, // 近端渲染距离
// 	1000 // 远端渲染距离
// )
//  // 设置相机位置
//  camera.position.set(5, 10, 10);
// // 创建渲染器
// const render = new THREE.WebGLRenderer();
// // 设置渲染大小
// render.setSize(window.innerWidth, window.innerHeight);
// // 将渲染结果展示到页面上
// document.body.appendChild(render.domElement);
// // 创建几何模型
// const geometry = new THREE.BoxGeometry(2,2,2)
//  // 5.1 创建基础网格材质
// let materialBasic = new THREE.MeshBasicMaterial({
// 	color: 0xffffff, // 白色
// 	// color: 0x00ff00, // 绿色
// 	wireframe: true //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
// });

// // 5 创建法线网格材质
// var materialNormal = new THREE.MeshNormalMaterial();

// // 6、创建多种网格（因为有多个材质）
// // 第一个参数是几何模型，第二参数是材质
// let cube  = new THREE.Mesh(geometry, [
// 	materialBasic,
// 	materialNormal
// ]);

// // 6.1、将网格添加到场景中
// screen.add(cube);

// // 6.2 让相机 看向（对着）物体（拍摄对象）的位置（默认状态下，相机将指向三维坐标系的原点。）
// camera.lookAt(cube.position);
        
// // 7、创建光源
// var spotLight = new THREE.SpotLight(0xffffff);
// // 7.1 设置光源位置
// spotLight.position.set(0, 20, 20);
// // 7.2 设置光源照射的强度，默认值为 1
// spotLight.intensity = 5;
// // 7.3 将光源添加到场景中
// screen.add(spotLight);

// // 8、为了方便观察3D图像，添加三维坐标系对象
// // var axes = new THREE.AxisHelper(6);
// screen.add(axes);

// // 9、 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
// render.render(screen, camera);



































// 创建相机
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
const controls = new ArcballControls( camera, renderer.domElement, scene );



//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	renderer.render( scene, camera );
}

controls.addEventListener( 'change', function () {
	renderer.render( scene, camera );
} );

export default animate();