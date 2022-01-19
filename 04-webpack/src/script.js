import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* Textures */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log(`on start`);
}
loadingManager.onProgress = () => {
  console.log(`in progress`);
}
loadingManager.onError = () => {
  console.log(`on error`);
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/door/basecolor.jpg');
// const alphaTexture = textureLoader.load('/textures/door/opacity.jpg');
// const heightTexture = textureLoader.load('/textures/door/height.png');
// const normalTexture = textureLoader.load('/textures/door/normal.jpg');
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
// const metalnessTexture = textureLoader.load('/textures/door/metallic.jpg');
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.offset.x = 0.5;
// colorTexture.rotation = 1;
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

/* DEBUG */
const gui = new dat.GUI();

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + Math.PI * 2,
      duration: 1,
    });
  }
};

const cursor = {
  x: 0,
  y: 0,
};

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene where we can put objects
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.espect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
// Actual geometry or shape
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ]);
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionsAttribute);
// Color of the material
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
  wireframe: false,
});

// Actual mesh object
const mesh = new THREE.Mesh(geometry, material);
// Add mesh to the scene
scene.add(mesh);

// debug
gui.add(mesh.position, 'x', -3, 3, 0.01);
gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'z', -3, 3, 0.01);

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

gui.add(material, 'wireframe');


// Add camera to we can see the scene
// Perspective camara
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// Orthographic camara
// const aspectRatio = size.width / size.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 50);

// Camara position
camera.position.z = 3;
// camera.lookAt(mesh.position);

scene.add(camera);

// Mesh position
// mesh.position.x = 3;
// mesh.position.y = 3;
// mesh.position.z = 3;

// console.log(mesh.position.length());
// console.log(mesh.position.distanceTo(camera.position));
// mesh.position.normalize();
// mesh.position.set(0.7, -0.6, 1);

// Axes Helper - Display helper grid
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Scale 
// mesh.scale.x = 2;
// mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.y = 2;
// mesh.rotation.reorder('yxz');
// mesh.rotation.x = 3;
// mesh.rotation.y = 2;

// Quaternion
// camera.lookAt(mesh.position);

// Renderer - To render screen through the camera point of view
const canvas = document.querySelector(".webgl");
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  // clock
  const elapsedTime = clock.getElapsedTime();

  //   gsap.to(mesh.position, { duration: 1, x: cursor.x });
  //   gsap.to(mesh.position, { duration: 1, y: cursor.y });
  // Render the scene with updated values
  renderer.render(scene, camera);

  // update contorls
  control.update();

  // callback fun
  window.webkitRequestAnimationFrame(tick);
};
tick();