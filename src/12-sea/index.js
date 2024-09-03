
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let renderer, camera, scene, controls, clock, lineHelper
let box, material

const SCALE = 5 // 控制海面起伏程度

// 初始化场景基础元素（渲染器，相机，场景，控制器等等）
{
    // 渲染器初始化
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    // 相机初始化
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 20);

    // 窗口自适应
    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize, false);

    // 场景
    scene = new THREE.Scene();

    // 控制器
    controls = new OrbitControls(camera, renderer.domElement);

    clock = new THREE.Clock();

}

// 将三维对象加入场景
{
    // 添加平行光
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 10, 20)
    scene.add(light);

    // 添加平行光2
    const light2 = new THREE.DirectionalLight(0xffffff, 0.1);
    light2.position.set(-5, 5, -5)
    scene.add(light2);

    // 添加环境光
    const light3 = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(light3)

    // 添加模拟小船
    box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshLambertMaterial());
    scene.add(box)

    // 添加法线辅助器
    // 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。
    const helperGeometry = new THREE.BufferGeometry()
    // 这个类用于存储与BufferGeometry相关联的 attribute（例如顶点位置向量，面片索引，法向量，颜色值，UV坐标以及任何自定义 attribute ）。 利用 BufferAttribute，可以更高效的向GPU传递数据。
    helperGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 5, 0]), 3))
    // 将顶点连接  line
    lineHelper = new THREE.LineSegments(helperGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, }))
    scene.add(lineHelper)

}

// 创建海面
{

    const vertexShader = `
        #define SCALE ${SCALE}.0
        #include <common>
        #include <logdepthbuf_pars_vertex>

        varying vec2 vUv;

        uniform float uTime;

        float calculateSurface(float x, float z) {
            float y = 0.0;
            y += (sin(x * 1.0 / SCALE + uTime * 1.0) + sin(x * 2.3 / SCALE + uTime * 1.5) + sin(x * 3.3 / SCALE + uTime * 0.4)) / 3.0;
            y += (sin(z * 0.2 / SCALE + uTime * 1.8) + sin(z * 1.8 / SCALE + uTime * 1.8) + sin(z * 2.8 / SCALE + uTime * 0.8)) / 3.0;
            return y;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            pos.y += calculateSurface(pos.x, pos.z);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            
            #include <logdepthbuf_vertex>
        }  
        `;

    const fragmentShader = `
        #include <common>
        #include <logdepthbuf_pars_fragment>
        varying vec2 vUv;

        uniform sampler2D uMap;
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
            #include <logdepthbuf_fragment>

            vec2 uv = vUv * 10.0 + vec2(uTime * -0.05);

            uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
            uv.x += 0.12 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2)) / 3.0;
            uv.y += 0.12 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;

            vec4 tex1 = texture2D(uMap, uv * 1.0);
            vec4 tex2 = texture2D(uMap, uv * 1.0 + vec2(0.2));

            vec3 blue = uColor;

            gl_FragColor = vec4(blue + vec3(tex1.a * 0.9 - tex2.a * 0.02), 1.0);
        }
        `;
    const texture = new THREE.TextureLoader().load('./water.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    const uniforms = {
        uMap: { value: texture },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#0051da') },
        depthTest: true,
        depthWrite: true,
    };

    material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
        wireframe: true
    });

    const geometry = new THREE.PlaneGeometry(100, 100, 500, 500);
    geometry.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}


// dx
function dx(x, t) {
    const cos = Math.cos
    return 1 / 3 * (cos(x / SCALE + t) / SCALE + cos(2.3 * x / SCALE + 1.5 * t) * 2.3 / SCALE + cos(3.3 * x / SCALE + 0.4 * t) * 3.3 / SCALE)
}
// dz
function dz(z, t) {
    const cos = Math.cos
    return 1 / 3 * (cos(0.2 * z / SCALE + 1.8 * t) * 0.2 / SCALE + cos(1.8 * z / SCALE + 1.8 * t) * 1.8 / SCALE + cos(2.8 * z / SCALE + 0.8 * t) * 2.8 / SCALE)
}

function getAngleBetweenVectors(v1, v2, dotThreshold = 0.00005) {
    let angle = 0;
    const dot = v1.dot(v2);

    if (dot > 1 - dotThreshold) {
        angle = 0;
    } else if (dot < dotThreshold - 1) {
        angle = Math.PI;
    } else {
        angle = Math.acos(dot);
    }
    return angle;
}
function render() {
    requestAnimationFrame(render);

    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = clock.getElapsedTime();

    // 根据海平面生成公式，计算位置
    const position = box.position
    const { x, z } = position
    const { sin, cos, atan } = Math
    position.y = (sin(x * 1.0 / SCALE + elapsedTime * 1.0) + sin(x * 2.3 / SCALE + elapsedTime * 1.5) + sin(x * 3.3 / SCALE + elapsedTime * 0.4)) / 3.0;
    position.y += (sin(z * 0.2 / SCALE + elapsedTime * 1.8) + sin(z * 1.8 / SCALE + elapsedTime * 1.8) + sin(z * 2.8 / SCALE + elapsedTime * 0.8)) / 3.0;


    // 求出 斜率kx 和斜率kz
    const kx = dx(x, elapsedTime)
    const kz = dz(z, elapsedTime)

    // 根据kx 和 kz 写出面法线
    const n = new THREE.Vector3(-kx, 1, -kz).normalize();

    // 计算旋转轴
    const axes = new THREE.Vector3().crossVectors(n, new THREE.Vector3(kx, 1, kz)).normalize()

    // 计算旋转角度
    const angle = getAngleBetweenVectors(new THREE.Vector3(0, 1, 0), n)

    // 旋转
    box.rotation.x = 0
    box.rotation.y = 0
    box.rotation.z = 0
    box.rotateOnAxis(axes, -angle)


    // 小船基础速度
    const speed = new THREE.Vector3(0, 0, 0)

    // 机选小船加速度的方向
    const dir = new THREE.Vector3().crossVectors(n, axes).normalize().divideScalar(100)

    // 小船速度叠加了由于海平面倾斜带来的速度最终的速度
    const newSpeed = speed.add(dir)

    // 计算小船位移后的位置
    const endPosition = box.position.clone().addScaledVector(newSpeed, 1)

    // 更新 y 轴
    let y = (sin(x * 1.0 / SCALE + elapsedTime * 1.0) + sin(x * 2.3 / SCALE + elapsedTime * 1.5) + sin(x * 3.3 / SCALE + elapsedTime * 0.4)) / 3.0;
    y += (sin(z * 0.2 / SCALE + elapsedTime * 1.8) + sin(z * 1.8 / SCALE + elapsedTime * 1.8) + sin(z * 2.8 / SCALE + elapsedTime * 0.8)) / 3.0;
    const truePosition = new THREE.Vector3(endPosition.x, y, endPosition.z)

    // 赋值
    box.position.copy(truePosition)

    // 更新 lineHelper
    {
        const posAttr = lineHelper.geometry.getAttribute("position")
        const arr = posAttr.array

        arr[0] = x
        arr[1] = position.y
        arr[2] = z
        arr[3] = x + n.x * 5
        arr[4] = position.y + n.y * 5
        arr[5] = z + n.z * 5

        posAttr.needsUpdate = true
    }

    controls.update();
    renderer.render(scene, camera);
}

render()