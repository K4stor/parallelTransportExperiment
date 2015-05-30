var container, stats;

var camera, scene, renderer;

var mouseX = 0;
var mouseY = 0;

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

  document.body.appendChild( stats.domElement );
}

function initCamera() {
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 100;
  camera.position.y = 0;
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({antialias : true, alpha: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = false;
  renderer.shadowMapSoft = false;
  renderer.autoClear = false;
  container.appendChild( renderer.domElement );
}

function initScene() {
  scene = new THREE.Scene();
}

function initLines() {
  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry.vertices.push(new THREE.Vector3(10, 0, 0));
  var line = new THREE.Line(geometry, material);
  scene.add(line);
}

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  initCamera();
  initRenderer();
  initScene();
  initLines();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
  initStats();
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 4;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  stats.begin();
  // camera.position.x += ( mouseX - camera.position.x ) * .1;
  // camera.position.y += ( - mouseY - camera.position.y ) * .1;
  // camera.lookAt( scene.position );
  renderer.clear( true, true, false );
  renderer.setClearColor( 0x010, 0 );
  renderer.render( scene, camera );
  stats.end();
}
