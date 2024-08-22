import * as THREE from 'three';  
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 如果你想要更高级的相机控制，可以取消注释这行  
  
// 场景  
const scene = new THREE.Scene();  
  
// 相机  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
camera.position.set(0, 10, 30); // 初始相机位置  
  
// 渲染器  
const renderer = new THREE.WebGLRenderer();  
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);  
  
// 草地纹理  
const grassTextureLoader = new THREE.TextureLoader();  
grassTextureLoader.load(  
    '/img/map.jpg', // 替换为你的草地图像路径  
    function (texture) {  
        // 草地平面  
		
        // const grassGeometry = new THREE.PlaneGeometry(100, 100, 32, 32); // 创建一个大的平面  
        // const grassMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });  
        // const grass = new THREE.Mesh(grassGeometry, grassMaterial);  
        // grass.rotation.x = -Math.PI / 2; // 旋转平面使其平躺在地面上  
        // scene.add(grass);  

		const grassGeometry = new THREE.PlaneGeometry(1000, 1000, 320, 320); // 创建一个大的平面  
  
		// 设置纹理的平铺属性  
		// 假设你希望纹理在x和y方向上各重复10次来覆盖整个100x100的平面  
		// 注意：这取决于你的纹理尺寸和所需的视觉效果  
		const textureRepeat = 10;  
		// 创建材料时设置纹理的repeat属性  
		const grassMaterial = new THREE.MeshBasicMaterial({  
			map: texture,
			side: THREE.DoubleSide,  
			// 设置纹理的重复次数  
			// 注意：上面的map.repeat.set是伪代码，因为map是一个Texture对象，没有直接的repeat属性  
			// 你应该这样做：  
			// 但在创建material之后，你需要这样设置：  
			// grassMaterial.map.repeat.set(textureRepeat, textureRepeat);  
		});  
		
		grassMaterial.map.repeat.set(textureRepeat, textureRepeat)  
		// 或者直接在创建material后设置  
		grassMaterial.map.repeat.set(textureRepeat, textureRepeat);  
		  
		const grass = new THREE.Mesh(grassGeometry, grassMaterial);  
		grass.rotation.x = -Math.PI / 2; // 旋转平面使其平躺在地面上  
		  
		// 将草地添加到场景中  
		scene.add(grass);  
		
    },  
    undefined, // 进度回调函数（可选）  
    function (err) {  
        console.error('Failed to load grass texture:', err);  
    } // 错误回调函数（可选）  
);  
  
// 光源  
const ambientLight = new THREE.AmbientLight(0x404040);  
scene.add(ambientLight);  
  
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  
directionalLight.position.set(1, 1, 1);  
scene.add(directionalLight);  
  
// 键盘控制相机（简化版，仅用于演示）  
let moveForward = false;  
let moveBackward = false;  
let moveLeft = false;  
let moveRight = false;  
  
function onKeyDown(event) {  
    switch (event.key) {  
        case 'ArrowUp':  
            moveForward = true;  
            break;  
        case 'ArrowDown':  
            moveBackward = true;  
            break;  
        case 'ArrowLeft':  
            moveLeft = true;  
            break;  
        case 'ArrowRight':  
            moveRight = true;  
            break;  
    }  
}  
  
function onKeyUp(event) {  
    switch (event.key) {  
        case 'ArrowUp':  
            moveForward = false;  
            break;  
        case 'ArrowDown':  
            moveBackward = false;  
            break;  
        case 'ArrowLeft':  
            moveLeft = false;  
            break;  
        case 'ArrowRight':  
            moveRight = false;  
            break;  
    }  
}  
  
document.addEventListener('keydown', onKeyDown, false);  
document.addEventListener('keyup', onKeyUp, false);  
  
// 渲染循环  
function animate() {  
    requestAnimationFrame(animate);  
  
    // 根据键盘输入移动相机  
    const speed = 10.25;  
    if (moveForward) camera.position.z -= speed;  
    if (moveBackward) camera.position.z += speed;  
    if (moveLeft) camera.position.x -= speed;  
    if (moveRight) camera.position.x += speed;  
  
    // 限制相机移动范围（可选）  
  
    // 渲染场景  
    renderer.render(scene, camera);  
}  
  
animate();  
  
// 注意：这个示例中的相机移动是非常基础的，并且没有考虑碰撞检测或边界限制。  
// 在实际应用中，你可能需要实现更复杂的相机控制系统。