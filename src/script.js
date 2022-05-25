import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/SmallBricks.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 1, 32, 16 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2
material.roughness = 0.6
material.wireframe = true
//material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

//light 1
/*
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
*/

//light 2
const pointLight2 = new THREE.PointLight(0x4176d9, 0.1)
pointLight2.position.set(-2.25, 1.2,4.64)
pointLight2.intensity = 2
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0x4176d9
}

light2.addColor(light2Color, 'color')
.onChange(() => {
    pointLight2.color.set(light2Color.color)
})

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.1)
scene.add(pointLightHelper)

//light 3
const pointLight3 = new THREE.PointLight(0x52166e, 0.1)
pointLight3.position.set(1.13,-2.37,-6)
pointLight3.intensity = 1.6
scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'z').min(-6).max(6).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color: 0x52166e
}

light3.addColor(light3Color, 'color')
.onChange(() => {
    pointLight3.color.set(light3Color.color)
})

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.1)
scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()