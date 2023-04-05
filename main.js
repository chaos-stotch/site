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

loader.load( '3D_Computer/source/ericsson_military_control_terminal.glb', function ( gltf ) {
    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const bgGeometry = new THREE.PlaneGeometry();
const bgTexture = new THREE.TextureLoader().load("background.jpeg");
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, transparent:true });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);

bgMesh.position.set(0, 0, -2);
bgMesh.scale.set(25, 13.75, 25)
scene.add(bgMesh);

var color = 0xffffff;
var intensity = 2;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 4, 7);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);


color = 0xC724B1
intensity = 2
const light2 = new THREE.DirectionalLight(color, intensity);
light2.position.set(-4, 5, 7);
light2.target.position.set(5, 0, 0);
scene.add(light2);
scene.add(light2.target);


let splash_opacity = 1
function decreaseOpacity() {
    var splashScreen = document.querySelector('.splashScreen');
    if (splash_opacity > 0) {
        splash_opacity -= 0.1;
        splashScreen.style.opacity = splash_opacity;
        setTimeout(decreaseOpacity, 100);
    } else {
         splashScreen.style.display = "none";
    }
}

setTimeout(function() {
    
    decreaseOpacity()
}, 3000);

/**
 * Animations
 */
function upAndDownAnimation()
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );
    
    if(computer.position.y <= 1 && computerUp == true)
    {
        computer.position.y += 0.005
    }else {
        computerUp = false
        computer.position.y -= 0.005
        if(computer.position.y <= .4)
        {
            computerUp = true
        } 
    }
}

function rotationUpAnimation()
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );

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

var actualSection = 1

var animationConcluded = false
function section1Animation(reverse)
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );
    if (reverse)
    {

        //text sections
        var section = document.getElementById("section1")
        section.classList.remove('animated');
        section.style.display = 'block';

        var section2 = document.getElementById("section2")
        section2.classList.remove('animated');
        section2.style.display = 'none';

        //animations
        if (computer.rotation.y > -2.5)
        {
            animationConcluded = false
            computer.rotation.y -= 0.1
            camera.position.z += .06
            
        }else
        {
            actualSection = 1
            animationConcluded = true
        }
    }
    else
    {
        //text sections
        var section = document.getElementById("section1")
        section.classList.remove('animated');
        section.style.display = 'none';

        var section2 = document.getElementById("section2")
        section2.classList.remove('animated');
        section2.style.display = 'block';
        
        //animations
        if (computer.rotation.y < -.5)
        {
            animationConcluded = false
            computer.rotation.y += 0.05
            camera.position.z -= .03
        }else
        {
            actualSection = 2
            animationConcluded = true
        }
    }
}

var scroll_command = "no command"
function upAndDownController(ev)
{
    if(splash_opacity>0)
    {
        return
    }
    if(ev.deltaY < 0 && scroll_command == "no command")
    {
        scroll_command = "up"
    }
    if(ev.deltaY > 0 && scroll_command == "no command")
    {
        scroll_command = "down"
    }
}

window.addEventListener("wheel", upAndDownController);

var touchPos;
document.body.ontouchstart = function(e){
    touchPos = e.changedTouches[0].clientY;
}
document.body.ontouchmove = function(e){
    let newTouchPos = e.changedTouches[0].clientY;
    if(splash_opacity>0)
    {
        return
    }
    if(newTouchPos > touchPos && scroll_command == "no command") {
        scroll_command = "up"
    }
    if(newTouchPos < touchPos && scroll_command == "no command") {
        scroll_command = "down"
    }
}

var computerUp = true
var rotationUp = true

camera.position.z = 5

var initialSettings = false
function renderScene() {
    requestAnimationFrame( renderScene );
    renderer.render( scene, camera );

    var computer = scene.getObjectByName( "Sketchfab_Scene" );

    if (!initialSettings)
    {
        computer.position.y = 1
        computer.rotation.y = -2.5
        initialSettings = true
    }
    
    rotationUpAnimation();
    
    upAndDownAnimation();
    if (splash_opacity >0)
    {
        return
    }

    console.log(actualSection)
    if (scroll_command != "no command")
    {
        if (scroll_command == "down")
        {
            if(actualSection == 1)
            {
                section1Animation(false)
            }
        }else
        {
            if (actualSection == 2)
            {
                section1Animation(true)
            }
            
        }
        if(animationConcluded == true)
        {
            scroll_command = "no command"
        }
    }
}

renderScene();
