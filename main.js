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

/**
 * Materials
 */

const bgGeometry = new THREE.PlaneGeometry();
const bgTexture = new THREE.TextureLoader().load("background.jpeg");
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);

bgMesh.position.set(0, 0, -2);
bgMesh.scale.set(25, 13.75, 25)
scene.add(bgMesh);

// phone images
const phoneGeometry = new THREE.PlaneGeometry();
const phoneTexture = new THREE.TextureLoader().load("phoneEcommerce.png");
const phoneMaterial = new THREE.MeshBasicMaterial({ map: phoneTexture, transparent:true });
const phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial);

phoneMesh.position.set(-5.15, .25, 2);
phoneMesh.rotation.set(.125, .25, .25);
phoneMesh.scale.set(.339, .735, .339)
scene.add(phoneMesh);
phoneMesh.visible=false

const phoneGeometry2 = new THREE.PlaneGeometry();
const phoneTexture2 = new THREE.TextureLoader().load("phoneBlog.png");
const phoneMaterial2 = new THREE.MeshBasicMaterial({ map: phoneTexture2, transparent:true });
const phoneMesh2 = new THREE.Mesh(phoneGeometry2, phoneMaterial2);

phoneMesh2.position.set(-4.9, .2, 2);
phoneMesh2.rotation.set(.125, .25, .25);
phoneMesh2.scale.set(.339, .735, .339)
scene.add(phoneMesh2);
phoneMesh2.visible=false

const phoneGeometry3 = new THREE.PlaneGeometry();
const phoneTexture3 = new THREE.TextureLoader().load("phoneNews.png");
const phoneMaterial3 = new THREE.MeshBasicMaterial({ map: phoneTexture3, transparent:true });
const phoneMesh3 = new THREE.Mesh(phoneGeometry3, phoneMaterial3);

phoneMesh3.position.set(-4.65, .15, 2);
phoneMesh3.rotation.set(.125, .25, .25);
phoneMesh3.scale.set(.339, .735, .339)
scene.add(phoneMesh3);
phoneMesh3.visible=false


// glass material
const glassMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.25,
    transmission: 1,
    reflectivity: .5,
    thickness: 5,
})


/**
 * Lights
 */
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
}, 1000);

/**
 * Animations
 */
function upAndDownAnimation()
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );
    
    if (actualSection == 1 || actualSection == 2)
    {

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

function section2Animation(reverse)
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );
    if (reverse)
    {
        //text sections
        var section2 = document.getElementById("section2")
        section2.classList.remove('animated');
        section2.style.display = 'block';

        var section3 = document.getElementById("section3")
        section3.classList.remove('animated');
        section3.style.display = 'none';
        var section4 = document.getElementById("section4")
        section4.classList.remove('animated');
        section4.style.display = 'none';
        var section5 = document.getElementById("section5")
        section5.classList.remove('animated');
        section5.style.display = 'none';
        var section6 = document.getElementById("section6")
        section6.classList.remove('animated');
        section6.style.display = 'none';
        var section7 = document.getElementById("section7")
        section7.classList.remove('animated');
        section7.style.display = 'none';

        //change material
        var computerModel = scene.getObjectByName( "defaultMaterial" );
        computerModel.material = oldPCMaterial
        //animations

        phoneMesh.visible = false
        phoneMesh2.visible = false
        phoneMesh3.visible = false
        phoneMesh.position.set(-5.15, .25, 2);
        phoneMesh2.position.set(-4.9, .2, 2);
        phoneMesh3.position.set(-4.65, .15, 2);
        if (computer.scale.x < 1)
        {
            animationConcluded = false
            computer.scale.x += 0.0125
            computer.scale.y += 0.0125
            computer.scale.z += 0.0125
            computer.position.x -= 0.0075
            computer.position.y += 0.05
            computer.rotation.y += 0.035
        }else
        {
            actualSection = 2
            animationConcluded = true
        }
    }else
    {
        //text sections
        var section3 = document.getElementById("section3")
        section3.classList.remove('animated');
        section3.style.display = 'block';
        var section4 = document.getElementById("section4")
        section4.classList.remove('animated');
        section4.style.display = 'block';
        var section5 = document.getElementById("section5")
        section5.classList.remove('animated');
        section5.style.display = 'block';
        var section6 = document.getElementById("section6")
        section6.classList.remove('animated');
        section6.style.display = 'block';
        var section7 = document.getElementById("section7")
        section7.classList.remove('animated');
        section7.style.display = 'block';

        var section2 = document.getElementById("section2")
        section2.classList.remove('animated');
        section2.style.display = 'none';

        //change material
        var computerModel = scene.getObjectByName( "defaultMaterial" );
        computerModel.material = glassMaterial
        //animations

        phoneMesh.visible = true
        phoneMesh2.visible = true
        phoneMesh3.visible = true
        if (computer.scale.x > .5)
        {
            animationConcluded = false
            computer.scale.x -= 0.00625
            computer.scale.y -= 0.00625
            computer.scale.z -= 0.00625
            computer.position.x += 0.00375
            computer.position.y -= 0.025
            computer.rotation.y -= 0.0175
            phoneMesh.position.x += .06
            phoneMesh2.position.x += .06
            phoneMesh3.position.x += .06
        }else
        {
            actualSection = 3
            animationConcluded = true
        }
    }
}

function section3Animation(reverse)
{
    var computer = scene.getObjectByName( "Sketchfab_Scene" );
    if (reverse)
    {
        //text sections
        var section3 = document.getElementById("section3")
        section3.classList.remove('animated');
        section3.style.display = 'block';
        var section4 = document.getElementById("section4")
        section4.classList.remove('animated');
        section4.style.display = 'block';
        var section5 = document.getElementById("section5")
        section5.classList.remove('animated');
        section5.style.display = 'block';
        var section6 = document.getElementById("section6")
        section6.classList.remove('animated');
        section6.style.display = 'block';
        var section7 = document.getElementById("section7")
        section7.classList.remove('animated');
        section7.style.display = 'block';

        var whatsIcon = document.getElementById("whatsIcon")
        whatsIcon.classList.remove('animated');
        whatsIcon.style.display = 'none';
        var emailIcon = document.getElementById("emailIcon")
        emailIcon.classList.remove('animated');
        emailIcon.style.display = 'none';
        var section8 = document.getElementById("section8")
        section8.classList.remove('animated');
        section8.style.display = 'none';
        var section9 = document.getElementById("section9")
        section9.classList.remove('animated');
        section9.style.display = 'none';
        var section10 = document.getElementById("section10")
        section10.classList.remove('animated');
        section10.style.display = 'none';
        var section11 = document.getElementById("section11")
        section11.classList.remove('animated');
        section11.style.display = 'none';

        //animations
        phoneMesh.visible = true
        phoneMesh2.visible = true
        phoneMesh3.visible = true
        
        if (computer.scale.x > .5)
        {
            animationConcluded = false
            computer.scale.x -= 0.01
            computer.scale.y -= 0.01
            computer.scale.z -= 0.01
            computer.position.x += 0.01
            computer.position.y -= 0.003
            computer.rotation.y += 0.01
            phoneMesh.position.x += .095
            phoneMesh2.position.x += .095
            phoneMesh3.position.x += .095
            
        }else
        {
            actualSection = 3
            animationConcluded = true
        }
    }
    else
    {
        //text sections
        var section3 = document.getElementById("section3")
        section3.classList.remove('animated');
        section3.style.display = 'none';
        var section4 = document.getElementById("section4")
        section4.classList.remove('animated');
        section4.style.display = 'none';
        var section5 = document.getElementById("section5")
        section5.classList.remove('animated');
        section5.style.display = 'none';
        var section6 = document.getElementById("section6")
        section6.classList.remove('animated');
        section6.style.display = 'none';
        var section7 = document.getElementById("section7")
        section7.classList.remove('animated');
        section7.style.display = 'none';

        var section8 = document.getElementById("section8")
        section8.classList.remove('animated');
        section8.style.display = 'block';
        var section9 = document.getElementById("section9")
        section9.classList.remove('animated');
        section9.style.display = 'block';
        var section10 = document.getElementById("section10")
        section10.classList.remove('animated');
        section10.style.display = 'block';
        var section11 = document.getElementById("section11")
        section11.classList.remove('animated');
        section11.style.display = 'block';
        var whatsIcon = document.getElementById("whatsIcon")
        whatsIcon.classList.remove('animated');
        whatsIcon.style.display = 'block';
        var emailIcon = document.getElementById("emailIcon")
        emailIcon.classList.remove('animated');
        emailIcon.style.display = 'block';

        //animations
        phoneMesh.visible = false
        phoneMesh2.visible = false
        phoneMesh3.visible = false
        phoneMesh.position.set(-5.15, .25, 2);
        phoneMesh2.position.set(-4.9, .2, 2);
        phoneMesh3.position.set(-4.65, .15, 2);

        if (computer.scale.x < 1)
        {
            animationConcluded = false
            computer.scale.x += 0.005
            computer.scale.y += 0.005
            computer.scale.z += 0.005
            computer.position.x -= 0.005
            computer.position.y += 0.0015
            computer.rotation.y -= 0.005

        }else
        {
            actualSection = 4
            animationConcluded = true
        }
    }
}

/**
 * Scroll commands
 */
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

var oldPCMaterial = undefined

var initialSettings = false
function renderScene() {
    requestAnimationFrame( renderScene );
    renderer.render( scene, camera );
    if (splash_opacity >.9)
    {
        return
    }
    var computer = scene.getObjectByName( "Sketchfab_Scene" );

    if (!initialSettings)
    {
        computer.position.y = 1
        computer.rotation.y = -2.5
        initialSettings = true

        oldPCMaterial = scene.getObjectByName("defaultMaterial").material
    }
    
    rotationUpAnimation();
    
    upAndDownAnimation();
    
    if (scroll_command != "no command")
    {
        if (scroll_command == "down")
        {
            if(actualSection == 1)
            {
                section1Animation(false)
            }
            else if(actualSection == 2)
            {
                section2Animation(false)
            }
            else if(actualSection == 3)
            {
                section3Animation(false)
            }

        }else
        {
            if (actualSection == 2)
            {
                section1Animation(true)
            }
            else if (actualSection == 3)
            {
                section2Animation(true)
            }
            else if (actualSection == 4)
            {
                section3Animation(true)
            }
            
        }
        if(animationConcluded == true)
        {
            scroll_command = "no command"
        }
    }
}

renderScene();
