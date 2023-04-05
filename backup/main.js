import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000, 0);
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const loader = new GLTFLoader();

loader.load( '3D_Computer/source/lowres computer.glb', function ( gltf ) {
    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

/**
 * Materials
 */
const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.25,
    transmission: 1,
    reflectivity: .5,
    thickness: 5,
})

const bgGeometry = new THREE.PlaneGeometry();
const bgTexture = new THREE.TextureLoader().load("background.jpeg");
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, transparent:true });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);

bgMesh.position.set(0, 0, -1);
bgMesh.scale.set(20, 10, 20)
scene.add(bgMesh);

const bgGeometry2 = new THREE.PlaneGeometry();
const bgTexture2 = new THREE.TextureLoader().load("background2.jpeg");
const bgMaterial2 = new THREE.MeshBasicMaterial({ map: bgTexture2 });
const bgMesh2 = new THREE.Mesh(bgGeometry2, bgMaterial2);
bgMesh2.position.set(0, 0, -2);
bgMesh2.scale.set(20, 10, 20)
scene.add(bgMesh2);

const color = 0xC724B1;
const intensity = 10;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

/**
 * Animations
 */
function upAndDownAnimation()
{
    var computer = scene.getObjectByName( "Scene" );
    
    if(computer.position.y <= .2 && computerUp == true)
    {
        computer.position.y += 0.005
    }else {
        computerUp = false
        computer.position.y -= 0.005
        if(computer.position.y <= -.2)
        {
            computerUp = true
        } 
    }
}

function rotationUpAnimation()
{
    var computer = scene.getObjectByName( "Scene" );

    if(computer.rotation.x <= .75 && rotationUp == true)
    {
        computer.rotation.x += 0.002
    }else {
        rotationUp = false
        computer.rotation.x -= 0.002
        if(computer.rotation.x <= -.25)
        {
            rotationUp = true
        } 
    }
}

var computerUp = true
var rotationUp = true
var oldPCMaterial = undefined
var oldMonitorMaterial = undefined
var oldKeyboardMaterial = undefined
var oldMouseMaterial = undefined

function renderScene() {
    
    if(scene.getObjectByName("PC") != undefined && oldPCMaterial == undefined)
    {
        oldPCMaterial = scene.getObjectByName("PC").material
    }
    if(scene.getObjectByName("Monitor") != undefined && oldMonitorMaterial == undefined)
    {
        oldMonitorMaterial = scene.getObjectByName("Monitor").material
    }
    if(scene.getObjectByName("Keyboard") != undefined && oldKeyboardMaterial == undefined)
    {
        oldKeyboardMaterial = scene.getObjectByName("Keyboard").material
    }
    if(scene.getObjectByName("Mouse") != undefined && oldMouseMaterial == undefined)
    {
        oldMouseMaterial = scene.getObjectByName("Mouse").material
    }

	requestAnimationFrame( renderScene );

    rotationUpAnimation();
    
    upAndDownAnimation();

    var computer = scene.getObjectByName( "Scene" );

    var yOffset = document.getElementsByClassName("webgl")[0].scrollTop
    console.log(yOffset)
    

    var PC = scene.getObjectByName( "PC" );
    var Mouse = scene.getObjectByName( "Mouse" );
    var Monitor = scene.getObjectByName( "Monitor" );
    var Keyboard = scene.getObjectByName( "Keyboard" );


    if(yOffset <= 1400)
    {
        computer.rotation.y = .5 + yOffset*0.005
        camera.position.z = 5 - yOffset*0.001

        PC.material = oldPCMaterial
        Mouse.material = oldMouseMaterial
        Monitor.material = oldMonitorMaterial
        Keyboard.material = oldKeyboardMaterial

    }else{
        PC.material = glassMaterial
        Mouse.material = glassMaterial
        Monitor.material = glassMaterial
        Keyboard.material = glassMaterial
    }
    if(yOffset >= 1300)
    {
        bgMesh.material.opacity = 1-((yOffset-1300)/200); 
        console.log((yOffset-1300)/1000)
    }else
    {
        bgMesh.material.opacity = 1; 
    }

	renderer.render( scene, camera );
}

renderScene();
