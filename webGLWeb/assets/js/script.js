var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 1080/1920, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(1080, 1920);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var content = window.document.getElementById('content')
content.appendChild(renderer.domElement);

var logoCad 	= './assets/models/logoCAD.dae';
var ringOne 	= './assets/models/ringOne.dae';
var ringTwo 	= './assets/models/ringTwo.dae';
var ringThree = './assets/models/ringThree.dae';
var wheel 		= './assets/models/wheel.dae';

function load(modelLocation){
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };

    var loader = new THREE.ColladaLoader(manager);
    loader.options.convertUpAxis = true;

    loader.load(modelLocation, function(collada) {
        var object = collada.scene;
        object.scale.set( 0.025, 0.025, 0.025 );
        object.position.set( 0, 0, 1.5 );
        object.castShadow = true; 
        object.receiveShadow = true; 
        if (modelLocation === ringOne) {
        	ringOneMixer = new THREE.AnimationMixer( object );
        }
        if (modelLocation === ringTwo) {
        	object.rotation.x = 45;
        	ringTwoMixer = new THREE.AnimationMixer( object );
        }
        if (modelLocation === ringThree) {
        	ringThreeMixer = new THREE.AnimationMixer( object );
        }
        if (modelLocation === wheel) {
        	wheelMixer = new THREE.AnimationMixer( object );
        	object.scale.set(0.003, 0.003, 0.025);
        	object.position.y = 1;
        	object.rotation.x = 1.8;
        }
        scene.add(object);

        render();
    }, 
    function(xhr) {
    	console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
    });
}

load(logoCad);
load(ringOne);
load(ringTwo);
load(ringThree);
load(wheel);


var ambientLight = new THREE.AmbientLight( 0xcccccc, .7 );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 100, 10, 50 ).normalize();
directionalLight.castShadow = true;
scene.add( directionalLight );

camera.position.set( 0, 0, 7 );

function render() {
	requestAnimationFrame( render );

	var ringOneObject = ringOneMixer.getRoot();
	ringOneObject.rotation.x += .004;
	ringOneObject.rotation.y -= .004;

	var ringTwoObject = ringTwoMixer.getRoot();
	ringTwoObject.rotation.y += .002;
	ringTwoObject.rotation.x -= .002;

	var ringThreeObject = ringThreeMixer.getRoot();
	ringThreeObject.rotation.y += .001;
	ringThreeObject.rotation.x += .001;

	var wheelObject = wheelMixer.getRoot();
	wheelObject.rotation.z -= .001;

	renderer.render(scene, camera);
}
