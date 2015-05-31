var container, stats;

var camera, scene, renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var stats;

var p1 = new THREE.Vector3( -10, 0, 0 );
var p2 = new THREE.Vector3( -5, 15, 0 );
var p3 = new THREE.Vector3( 20, 15, 0 );
var p4 = new THREE.Vector3( 10, 0, 0 );


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
  var curve = new THREE.SplineCurve3([p1,p2,p3,p4]);
  var geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints( 50 );

  var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

  // Create the final Object3d to add to the scene
  var curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}

function initPoint(position) {
  var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position = position;
  scene.add( sphere );
}

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  initCamera();
  initRenderer();
  initScene();
  initLines();
  initPoint(p1);
  initPoint(p2);
  initPoint(p3);
  initPoint(p4);

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
