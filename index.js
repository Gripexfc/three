import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

// 创建场景
const screen = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth/ window.innerHeight,
	0.1,
	1000
);
// 创建渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight)
document.body.append(render.domElement);

// 创建几何图形
const box = new THREE.BoxGeometry(12,20,50);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( box, material );
screen.add(cube)
camera.position.set( 0, 0, 50 );

render.render(screen, camera)

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	render.render( screen, camera );
}

export default animate();








// 创建相机
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;
// const controls = new ArcballControls( camera, renderer.domElement, scene );



// //controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 100 );
// controls.update();

// function animate() {
// 	requestAnimationFrame( animate );
// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;
// 	cube.rotation.z += 0.01;
// 	renderer.render( scene, camera );
// }

// controls.addEventListener( 'change', function () {
// 	renderer.render( scene, camera );
// } );

// export default animate();