var container, stats;

var camera, scene, renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var stats;

var p1 = new THREE.Vector3( -10, -10, 0 );
var p2 = new THREE.Vector3( -15, 15, 0 );
var p3 = new THREE.Vector3( 20, 5, 0 );
var p4 = new THREE.Vector3( 10, -10, 0 );


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
  camera.position.z = 50;
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

  var material = new THREE.LineBasicMaterial( { color : 0xff0000, linewidth: 5 } );

  // Create the final Object3d to add to the scene
  var curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}

function addPoint(position) {
  var geometry = new THREE.SphereGeometry( 0.2, 5, 5 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position = position;
  scene.add( sphere );
}

function initPoints() {
  addPoint(p1);
  addPoint(p2);
  addPoint(p3);
  addPoint(p4);
}

function addTangent( t ) {
  var curve = new THREE.SplineCurve3([p1,p2,p3,p4]);
  var tangent = curve.getTangent(t);
  tangent.x *= 2;
  tangent.y *= 2;
  tangent.z *= 2;
  var start = curve.getPoint(t);
  var end =  curve.getPoint(t);
  end.x += tangent.x;
  end.y += tangent.y;
  end.z += tangent.z;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(start);
  geometry.vertices.push(end);
  var material = new THREE.LineBasicMaterial( { color : 0xffffff, linewidth: 5 } );
  var line = new THREE.Line(geometry, material);
  scene.add(line);
}

function initTangents() {
  addTangent(0);
  addTangent(0.25);
  addTangent(0.5);
  addTangent(0.75);
  addTangent(1);
}

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  initCamera();
  initRenderer();
  initScene();
  initTangents();
  initLines();
  initPoints();

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
