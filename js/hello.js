const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement)
const vW = window.innerWidth;
const vH = window.innerHeight;
renderer.setSize(vW, vH);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.CapsuleGeometry(1, 1, 48, 48);
const material = new THREE.MeshNormalMaterial();
const pill = new THREE.Mesh(geometry, material);
const pill2 = new THREE.Mesh(geometry, material);
scene.add(pill);
scene.add(pill2);
const gridHelper = new THREE.GridHelper(30,30, 0x555555, 0x555555);
scene.add(gridHelper);
pill.position.x = .2;
pill2.position.x = -.2;
camera.position.z = 5;

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
 const gridHelper = new THREE.GridHelper(size, divisions, 0x555555, 0x555555);
    scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);
  pill2.rotation.x -= 0.01;
  pill2.rotation.z -= 0.01;
  pill.rotation.x += 0.01;
  pill.rotation.z += 0.01;
  gridHelper.position.y = -5;
  renderer.render(scene, camera);
}
animate();
let message = "Hello world";
console.log(message);