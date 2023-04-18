import * as three from "three";
const canvas = document.getElementById("canvas");
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import * as dat from "dat.gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const gui = new dat.GUI();

const scene = new three.Scene();

const attributes = {
  color: 0xfffe23,
};

let width = window.innerWidth;
let height = window.innerHeight;

// TEXTURE LOADER

const textureLoader = new three.TextureLoader();

const matcaps1 = textureLoader.load("static/textures/matcaps/1.png");
const matcaps2 = textureLoader.load("static/textures/matcaps/2.png");
const matcaps3 = textureLoader.load("static/textures/matcaps/3.png");
const matcaps4 = textureLoader.load("static/textures/matcaps/4.png");
const matcaps5 = textureLoader.load("static/textures/matcaps/5.png");
const matcaps6 = textureLoader.load("static/textures/matcaps/6.png");
const matcaps7 = textureLoader.load("static/textures/matcaps/7.png");
const matcaps8 = textureLoader.load("static/textures/matcaps/8.png");

// FONTS LOADER
const fontsLoader = new FontLoader();

fontsLoader.load(
  "/static/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const text = new TextGeometry("Abdullah Mehboob", {
      font,
      height: 0.2,
      size: 0.5,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 10,
    });

    // text.computeBoundingBox();

    // text.translate(
    //   (text.boundingBox.max.x - 0.02) * -0.5,
    //   (text.boundingBox.max.y - 0.02) * -0.5,
    //   (text.boundingBox.max.z - 0.03) * -0.5
    // );

    // console.log(text.boundingBox);

    text.center();

    const material = new three.MeshMatcapMaterial({
      matcap: matcaps3,
      color: attributes.color,
    });

    gui.addColor(attributes, "color").onChange((val) => {
      material.color = new three.Color(val);
    });

    const TextMesh = new three.Mesh(text, material);
    scene.add(TextMesh);

    const donutGeo = new three.TorusGeometry(0.4, 0.2, 40, 40);

    for (let i = 0; i < 200; i++) {
      const donut = new three.Mesh(donutGeo, material);

      donut.position.x = (Math.random() - 0.5) * 16;
      donut.position.y = (Math.random() - 0.5) * 16;
      donut.position.z = (Math.random() - 0.5) * 16;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random() + 0.2 * 0.5;
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
  }
);

// const cube = new three.Mesh(
//   new three.BoxGeometry(),
//   new three.MeshBasicMaterial({ color: "red" })
// );

// scene.add(cube);

const camera = new three.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 6;

const renderer = new three.WebGLRenderer({ canvas });
renderer.setSize(width, height);

// HELPERS
const axesHelpers = new three.AxesHelper(5);
axesHelpers.visible = false;
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
