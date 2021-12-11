// Scene where we can put objects
const scene = new THREE.Scene();

const sizes = {
    width: 800,
    height: 600,
}

// Actual geometry or shape
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Color of the material
const material = new THREE.MeshBasicMaterial({ color: 'red' });


// Actual mesh object
const mesh = new THREE.Mesh(geometry, material);
// Add mesh to the scene
scene.add(mesh);


// Add camera to we can see the scene
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer - To render screen through the camera point of view
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);