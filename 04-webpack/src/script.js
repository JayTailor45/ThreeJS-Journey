import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const cursor = {
  x: 0,
  y: 0,
};

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const gui = new dat.GUI();

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// // door
// const doorColorTexture = textureLoader.load('/textures/door/basecolor.jpg');
// const doorAlphaTexture = textureLoader.load('/textures/door/opacity.jpg');
// const doorambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
// const doorHeightTexture = textureLoader.load('/textures/door/height.png');
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
// const doorMetallicTexture = textureLoader.load('/textures/door/metallic.jpg');
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
// // matcap texture
const matcapTexture = textureLoader.load('/textures/matcap/8.png');
// //gradient texture
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

/**
 * fonts
 */

const fontLoader = new FontLoader();
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Jay Tailor', {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
      }
    );
    // textGeometry.computeBoundingBox();
    // // -.2 and -.3 because of bevel distortion on geometry
    // textGeometry.translate(
    //   - (textGeometry.boundingBox.max.x - 0.2) * 0.5,
    //   - (textGeometry.boundingBox.max.y - 0.2) * 0.5,
    //   - (textGeometry.boundingBox.max.z - 0.3) * 0.5,
    // );
    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });

    for(let i = 0; i < 150; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      
      donut.position.x = (Math.random() - .5) * 10;
      donut.position.y = (Math.random() - .5) * 10;
      donut.position.z = (Math.random() - .5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale)

      scene.add(donut);
    }
  }
);


// Scene where we can put objects
const scene = new THREE.Scene();

/**
 * Objects
 */

// const material = new THREE.MeshBasicMaterial({
  // wireframe: true,
  // map: doorColorTexture,
  // alphaMap: doorAlphaTexture,
  // transparent: true,
  // side: THREE.DoubleSide,
  // opacity: 0.3,
  // color: 'red'
// });

// const material = new THREE.MeshNormalMaterial({
  // wireframe: true,
  // flatShading: true,
// });

// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });

// const material = new THREE.MeshDepthMaterial({});

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1120ff);

// const material = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture,
// });

// const material = new THREE.MeshStandardMaterial();

// material.map = doorColorTexture;
// material.aoMap = doorambientOcclusionTexture;
// material.metalnessMap = doorMetallicTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// // material.normalScale.set(0.5, 0.5);

// // material.transparent = true;
// // material.alphaMap = doorAlphaTexture;

// // material.displacementMap = doorHeightTexture;

// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);
// gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001);

// /**
//  * lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// const sphere = new THREE.Mesh(
//   new THREE.SphereBufferGeometry(0.5, 16, 16),
//   material,
// );
// sphere.geometry.setAttribute(
//   'uv2',
//   new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
// );

// sphere.position.x = -1.5

// const plane = new THREE.Mesh(
//   new THREE.PlaneBufferGeometry(1, 1, 3),
//   material,
// );

// plane.geometry.setAttribute(
//   'uv2',
//   new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
// );

// const torus = new THREE.Mesh(
//   new THREE.TorusBufferGeometry(.3, .2, 16, 32),
//   material,
// );

// torus.geometry.setAttribute(
//   'uv2',
//   new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2),
// );

// torus.position.x = 1.5;

// scene.add(sphere, plane, torus);


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

// Add camera to we can see the scene
// Perspective camara
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Camara position
camera.position.z = 3;
// camera.lookAt(mesh.position);

scene.add(camera);

// Axes Helper - Display helper grid
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

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
  const elapsedTime = clock.getElapsedTime();

  const yRotationSpeed = 0.2;
  const xRotationSpeed = 0.2;
  // sphere.rotation.y = yRotationSpeed * elapsedTime;
  // plane.rotation.y = yRotationSpeed * elapsedTime;
  // torus.rotation.y = yRotationSpeed * elapsedTime;

  // sphere.rotation.x = xRotationSpeed * elapsedTime;
  // plane.rotation.x = xRotationSpeed * elapsedTime;
  // torus.rotation.x = xRotationSpeed * elapsedTime;

  renderer.render(scene, camera);
  control.update();
  window.webkitRequestAnimationFrame(tick);
};;
tick();