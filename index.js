import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
const render = new THREE.WebGLRenderer({
	antialias: true, // 抗锯齿
});


// const loader = new THREE.TextureLoader();
// loader.load('./img/map.jpg', (textTure) => {
// 	console.log(textTure,'textTuretextTuretextTure');
// 	const material1 = new THREE.MeshBasicMaterial({
// 		map: textTure
// 	});
// 	screen.add(material1)
// 	render.render(screen, camera)
// })
render.setSize(window.innerWidth, window.innerHeight)
document.body.append(render.domElement);

// 创建几何图形
const box = new THREE.BoxGeometry(1,2,5);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( box, material );
screen.add(cube)
camera.position.set( 0, 0, 50 );

let mesh;
const textureLoader = new THREE.TextureLoader().load(
    "/img/map.jpg",
    function (texture) {
      // 纹理加载完成后创建材质,map:texture实际就是贴在上面的
      const textureMaterial = new THREE.MeshBasicMaterial({map: texture});
      // 创建一个网格对象
      mesh = new THREE.Mesh(box, textureMaterial);
      // 将网格对象添加到场景中
	  screen.background = texture;
      screen.add(mesh);
    }
);

render.render(screen, camera)
// 鼠标控制移动 https://threejs.org/docs/index.html?q=Orbi#examples/en/controls/OrbitControls
const orbcontr = new OrbitControls(camera, render.domElement);
// 移动时有惯性  
orbcontr.enableDamping = true;
// 运动轨迹辅助线
// const axesHelper = new THREE.AxesHelper( 5 );
// screen.add( axesHelper );
// 设置光源
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
screen.add( directionalLight );
function animate() {
	requestAnimationFrame( animate );
	cube.position.x += 0.01;
	camera.lookAt(0,0,0)
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// cube.rotation.z += 0.01;
	// 更新移动状态
	orbcontr.update();
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