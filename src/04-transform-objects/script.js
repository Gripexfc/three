import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
})
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Group
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.x = 0.2 * Math.PI
group.add(mesh)
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
)
cube1.position.x = -2
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })
)
cube2.position.x = 2
group.add(cube2)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)