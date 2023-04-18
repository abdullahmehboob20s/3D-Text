import * as three from "three";
const canvas = document.getElementById("canvas");
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const gui = new dat.GUI();

const scene = new three.Scene();

let width = window.innerWidth;
let height = window.innerHeight;

const textureLoader = new three.TextureLoader();

const matcap1 = textureLoader.load("static/textures/matcaps/1.png");
const matcap2 = textureLoader.load("static/textures/matcaps/2.png");
const matcap3 = textureLoader.load("static/textures/matcaps/3.png");
const matcap4 = textureLoader.load("static/textures/matcaps/4.png");
const matcap5 = textureLoader.load("static/textures/matcaps/5.png");
const matcap6 = textureLoader.load("static/textures/matcaps/6.png");
const matcap7 = textureLoader.load("static/textures/matcaps/7.png");
const matcap8 = textureLoader.load("static/textures/matcaps/8.png");

const door_alpha = textureLoader.load("static/textures/door/alpha.jpg");
const door_ambientOcclusion = textureLoader.load(
  "static/textures/door/ambientOcclusion.jpg"
);
const door_color = textureLoader.load("static/textures/door/color.jpg");
const door_height = textureLoader.load("static/textures/door/height.jpg");
const door_metalness = textureLoader.load("static/textures/door/metalness.jpg");
const door_normal = textureLoader.load("static/textures/door/normal.jpg");
const door_roughness = textureLoader.load("static/textures/door/roughness.jpg");

// LIGHTS
const ambientLight = new three.AmbientLight("gray");
ambientLight.position.y = 2;
ambientLight.position.x = 2;
ambientLight.position.z = 2;
scene.add(ambientLight);

const pointLight = new three.PointLight("white", 1, 100);
pointLight.position.set(2, 2, 3);
scene.add(pointLight);

const material = new three.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1.8;

material.map = door_color;
material.metalnessMap = door_metalness;
material.roughnessMap = door_roughness;
material.displacementMap = door_height;
material.displacementScale = 0.1;
material.aoMap = door_ambientOcclusion;
material.alphaMap = door_alpha;
material.normalMap = door_normal;
material.aoMapIntensity = 2;

gui.add(material, "displacementScale").name("Scale").min(0, 10).step(0.1);
gui.add(material, "aoMapIntensity").name("Scale").min(0, 10).step(0.1);
gui.add(material, "transparent");

// material.matcap = matcap2;
gui.add(material, "wireframe");

const sphere = new three.Mesh(
  new three.SphereGeometry(0.6, 600, 600),
  material
);
sphere.position.x = -1.6;

const donut = new three.Mesh(
  new three.TorusGeometry(0.6, 0.16, 100, 100),
  material
);
donut.position.x = 1.6;

const plane = new three.Mesh(new three.PlaneGeometry(1, 1, 100, 100), material);
plane.material.side = three.DoubleSide;

plane.geometry.setAttribute(
  "uv2",
  new three.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
sphere.geometry.setAttribute(
  "uv2",
  new three.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
donut.geometry.setAttribute(
  "uv2",
  new three.BufferAttribute(donut.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, donut);

const camera = new three.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.z = 3;

const renderer = new three.WebGLRenderer({ canvas });
renderer.setSize(width, height);

// HELPERS
const axesHelpers = new three.AxesHelper(5);
gui.add(axesHelpers, "visible").name("Axis Helpers");
scene.add(axesHelpers);

const controls = new OrbitControls(camera, canvas);
gui.add(controls, "enableDamping").name("smooth movement");
gui.add(controls, "enabled").name("movement");

const clock = new three.Clock();

const animate = () => {
  const time = clock.getElapsedTime();

  const speed = 0.08;

  // sphere.rotation.x = time * speed;
  // sphere.rotation.y = time * speed;

  // plane.rotation.x = time * speed;
  // plane.rotation.y = time * speed;

  // donut.rotation.x = time * speed;
  // donut.rotation.y = time * speed;

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.render(scene, camera);
});
