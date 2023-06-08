import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';



var renderer;

var camera;

var scene;

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight
}

let cube;

let cube2;

/*
//crazy stuff

let imageone = document.getElementById("imageone")
let inputFile = document.getElementById("input-file")

inputFile.onchange = function(){
   
   imageone.src = URL.createObjectURL(inputFile.files[0])

   texture = new THREE.TextureLoader().load(document.getElementById("imageone").src)
   texture.needsUpdate = true;
   cubeMat = new THREE.MeshStandardMaterial({
      map : texture
     })
     cube.material.map.needsUpdate = true;
}

//woah

*/
let inputFile = document.getElementById("input-file")

init();






//loader stuff

//let defaultimg = './img/capytexture.jpg'

function init() {

camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height, 0.1, 100)
camera.position.set(40,20,40)



scene = new THREE.Scene()

//scene.background = new THREE.Color(0xf000ff);



scene.add(camera)
var loader = new THREE.TextureLoader();
var texture = loader.load('img/capytexture.jpg')

var cubeGeo = new THREE.BoxGeometry(4,4,4)
var cubeMat = new THREE.MeshStandardMaterial({
   map:texture 
})

var cubeCanvas = new THREE.BoxGeometry(4,4,.5)

inputFile.onchange = function(){
   
   cubeMat.map = loader.load(URL.createObjectURL(inputFile.files[0]))

}
cube = new THREE.Mesh(cubeGeo, cubeMat)
cube2 = new THREE.Mesh(cubeCanvas, cubeMat)
scene.add(cube)
scene.add(cube2)
cube.position.set(0,4,0)
cube2.position.set(0,10,-9.5)
cube.castShadow = true

const ambient = new THREE.AmbientLight(0x333333)
scene.add(ambient)


renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true
    renderer.setClearColor(0xadd8e6);



//end of loader stuff 





const planeGeometry = new THREE.PlaneGeometry(20,20)
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xfffff0, side: THREE.DoubleSide})
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




var orbit = new OrbitControls(camera, renderer.domElement)


orbit.update()




//boilerplate






}







function animate(){

      cube.rotation.y += .005;
      cube.rotation.x += .005;

      requestAnimationFrame(animate)
      renderer.render(scene, camera)

      
       
}
animate();
