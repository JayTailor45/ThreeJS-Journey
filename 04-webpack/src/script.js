import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene where we can put objects
const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};

// Actual geometry or shape
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Color of the material
const material = new THREE.MeshBasicMaterial({ color: "red" });

// Actual mesh object
const mesh = new THREE.Mesh(geometry, material);
// Add mesh to the scene
scene.add(mesh);

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

console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));
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