const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement)
const vW = window.innerWidth;
const vH = window.innerHeight;
renderer.setSize(vW, vH);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.CapsuleGeometry(1, 1, 48, 48);
const material = new THREE.MeshPhongMaterial({
  color: 0x0ffee2,
});
const pill = new THREE.Mesh(geometry, material);
const pill2 = new THREE.Mesh(geometry, material);
scene.add(pill);
scene.add(pill2);
const gridHelper = new THREE.GridHelper(300, 50, 0x555555, 0x555555);
scene.add(gridHelper);
const light = new THREE.PointLight(0xffffff, 5, 100);
light.position.set(50, 50, 50);
scene.add(light);
pill.position.x = 1.5;
pill2.position.x = -1.5;
camera.position.z = 5;
scene.fog = new THREE.Fog('black', 0.1, 100);
var spritey = makeTextSprite(" Hello ", {
  fontsize: 32,
  textColor: {
    r: 255,
    g: 255,
    b: 255,
    a: 1.0
  }
});
scene.add(spritey)
spritey.position.set(0, 0, -10);

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

function makeTextSprite(message, parameters) {
  if (parameters === undefined) parameters = {};
  var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier New";
  var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
  var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
  var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
    r: 0,
    g: 0,
    b: 0,
    a: 1.0
  };
  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
    r: 0,
    g: 0,
    b: 255,
    a: 1.0
  };
  var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {
    r: 0,
    g: 0,
    b: 0,
    a: 1.0
  };

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;
  var metrics = context.measureText(message);
  var textWidth = metrics.width;

  context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
  context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
  context.fillText(message, borderThickness, fontsize + borderThickness);

  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    useScreenCoordinates: false
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
  return sprite;
}