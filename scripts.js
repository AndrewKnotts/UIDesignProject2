import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';


var renderer = new THREE.WebGLRenderer( { alpha: true } );

var camera;

var scene;

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight 
}

let cube;

let cube2;

let inputFile = document.getElementById("input-file")

init();






//loader stuff


function init() {

camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, .1, 1000)
camera.position.set(40,40,40)




scene = new THREE.Scene()

//scene.background = new THREE.Color(0xf000ff);



scene.add(camera)
var loader = new THREE.TextureLoader();
var texture = loader.load('img/MonaLisaImage.png')

var cubeGeo = new THREE.BoxGeometry(4,4,4)
var cubeMat = new THREE.MeshStandardMaterial({
   map:texture 
})

var cubeCanvas = new THREE.BoxGeometry(8,8,.3)

inputFile.onchange = function(){
   
   cubeMat.map = loader.load(URL.createObjectURL(inputFile.files[0]))

}
//cube = new THREE.Mesh(cubeGeo, cubeMat)
cube2 = new THREE.Mesh(cubeCanvas, cubeMat)
//scene.add(cube)
scene.add(cube2)
//cube.position.set(0,30,0)
cube2.position.set(0,10,-9.5)
//cube.castShadow = true
cube2.castShadow = true

const ambient = new THREE.AmbientLight(0x333333)
scene.add(ambient)

   const container = document.getElementById('canvas-container');

   renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
   renderer.setSize(container.clientWidth, container.clientHeight);
   
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true
    renderer.setClearColor( 0x0c0c1b, 1 );
    container.appendChild(renderer.domElement);


//end of loader stuff 





const planeGeometry = new THREE.BoxGeometry(21,21, 1)
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xb5b1cf, side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -.5 * Math.PI
plane.receiveShadow = true


const plane2 = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane2)
plane2.receiveShadow = true
plane2.position.set(0,10,-10)

const plane3 = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane3)

plane3.receiveShadow = true
plane3.position.set(-10,10,0)
plane3.rotation.y = .5 * Math.PI;



const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
scene.add(directionalLight)
directionalLight.position.set(50, 40, 30)
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const spotlight = new THREE.SpotLight(0xfffffd)
scene.add(spotlight)
spotlight.position.set(0,150,150)
spotlight.castShadow = true;
spotlight.angle = .03
spotlight.penumbra = 1;
spotlight.intensity = .6


const targetObject = new THREE.Object3D(); 
scene.add(targetObject);

spotlight.target = targetObject;
targetObject.position.set(0,17,0)


const gloader = new GLTFLoader();

gloader.load( './assets/bench/scene.gltf', function ( gltf ) {

   const model = gltf.scene;
	scene.add( gltf.scene );
   gltf.scene.scale.set(50,50,50)
   gltf.scene.position.set(0,1,2)
   gltf.scene.rotation.y = -.6 * Math.PI
   
   model.traverse(function(node) {
      if(node.isMesh)
         node.castShadow = true;
   })

}, undefined, function ( error ) {

	console.error( error );

} );

//const slh = new THREE.SpotLightHelper(spotlight);
//scene.add(slh)


var orbit = new OrbitControls(camera, renderer.domElement)


orbit.update()




//boilerplate






}







function animate(){

     // cube.rotation.y += .005;
     // cube.rotation.x += .005;

      requestAnimationFrame(animate)
      renderer.render(scene, camera)

      
       
}
animate();
