'use strict';

var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var stats;

init();
animate();

function initStats() {
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);
}

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 100;
  camera.position.y = 0;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = false;
  renderer.shadowMapSoft = false;
  renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
  initStats();
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 4;
}

//

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  stats.begin();
  // camera.position.x += ( mouseX - camera.position.x ) * .1;
  // camera.position.y += ( - mouseY - camera.position.y ) * .1;
  // backgroundScene.lookAt( backgroundScene.position );
  // camera.lookAt( scene.position );
  renderer.clear(true, true, false);
  renderer.setClearColor(16, 0);
  // renderer.sortObjects = false
  // renderer.render( backgroundScene, backgroundCamera );
  renderer.render(scene, camera);
  stats.end();
}