import * as THREE from 'three';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';


import Modelmtl from '../../assets/models/Castor.mtl';
import Modelobj from '../../assets/models/Castor.obj';

export default class Beaver {
    constructor() {

        let camera, scene, renderer, mesh1, mesh2;
        let parent;
		let composer;

		const meshes = [];

        let mouseX = 0, mouseY = 0;

		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;

        init();
        animate();

        window.addEventListener("resize",() => {onWindowResize();});
        document.body.addEventListener('pointermove',(e) => {onPointerMove(e);});

        function init(){

            const container = document.querySelector('#background');

            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1,10000);
            camera.position.set(0, 0, 700);
            
            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xdacaa4 );

            camera.lookAt( scene.position );

            //---------------------- LIGHTS & GRID ----------------------------

            const hemiLight = new THREE.AmbientLight( 0xffffff );
            hemiLight.position.set( 0, 200, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 0, 2000, 0 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 180;
            dirLight.shadow.camera.bottom = - 100;
            dirLight.shadow.camera.left = - 120;
            dirLight.shadow.camera.right = 120;
            scene.add( dirLight );

            const lightHelper = new THREE.DirectionalLightHelper(dirLight, 5, 0xffffff);
            // scene.add( lightHelper);

            const grid = new THREE.GridHelper(500,50, 0xffffff);
            // scene.add( grid);


            //------------------------ FORMS & OBJECTS -----------------------

            const beaver = new OBJLoader();
            const textureBeaver = new MTLLoader();

            textureBeaver.load(Modelmtl, function(mtl){
                mtl.preload();
                beaver.setMaterials(mtl);
                beaver.load(Modelobj, function (obj){
                
                    const positions = combineBuffer(obj, 'position');
    
                    createMesh(positions, scene, -441, -100, 0, 0x51abb2 );
                }, function(xhr){
                    console.log((xhr.loaded/xhr.total*100) +'%obj loaded');
                }, function(error){
                    console.error(error);
                });

            }, function(xhr){
                console.log((xhr.loaded/xhr.total*100) +'%obj loaded');
            }, function(error){
                console.error(error);
            });

            
            // -------------------- RENDERING ---------------------------

            renderer = new THREE.WebGLRenderer({canvas: container});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize( window.innerWidth, window.innerHeight);
            
            // -------------------- CONTROL ---------------------------
            
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controls.update();
            // controls.enablePan = false;
            // controls.enableDamping = true;



            parent = new THREE.Object3D();
			scene.add( parent );

            // ------------------- POSTPROCESSING -----------------------

			const renderModel = new RenderPass( scene, camera );
				
			composer = new EffectComposer( renderer );

			composer.addPass( renderModel );
        }
        
        function animate(){
            requestAnimationFrame(animate);
            
            scene.children[1].rotation.y += - 0.01;
            // mesh2.rotation.y += - 0.01;
            // camera.rotation.y += -0.01;

            

            camera.position.x += ( mouseX - camera.position.x ) * 0.05;
			camera.position.y += ( - mouseY + 200 - camera.position.y ) * 0.05;

			camera.lookAt( scene.position );

            const time = Date.now() * 0.0001;

			for ( let i = 0; i < scene.children.length; i ++ ) {

				const object = scene.children[ i ];


				object.rotation.y = time * ( i % 2 ? 1 : - 1 );

				

			}

            composer.render();
        }
        

        // ----------------------- AUXILIARIES FUNCTIONS -----------------------------


        function combineBuffer( model, bufferName ) {

            let count = 0;

            model.traverse( function ( child ) {

                if ( child.isMesh ) {

                    const buffer = child.geometry.attributes[ bufferName ];

                    count += buffer.array.length;

                }

            } );

            const combined = new Float32Array( count );

            let offset = 0;

            model.traverse( function ( child ) {

                if ( child.isMesh ) {

                    const buffer = child.geometry.attributes[ bufferName ];

                    combined.set( buffer.array, offset );
                    offset += buffer.array.length;

                }

            } );

            return new THREE.BufferAttribute( combined, 3 );

        }

        function createMesh( positions, scene, x, y, z, color ) {

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', positions.clone() );
            geometry.setAttribute( 'initialPosition', positions.clone() );

            geometry.attributes.position.setUsage( THREE.DynamicDrawUsage );

            mesh1 = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 5, color: 0x291b25 } ) );
            mesh2 = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x291b25, wireframe: true, wireframeLinewidth: 5, } ) );
            // mesh2 = new THREE.Mesh( geometry, new THREE.MeshDepthMaterial( { wireframe: true, wireframeLinewidth: 5, } ) );
            // mesh2 = new THREE.Mesh( geometry, new THREE.MeshToonMaterial( { color:0x291b25, wireframe: false, } ) );
            // mesh2 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x291b25, linewidth: 5, } ) );
            // mesh2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x291b25, reflectivity: 0, dithering: true, } ) );
                 
    
            mesh1.position.x = x ;
            mesh1.position.y = y ;
            mesh1.position.z = z ;
            mesh2.position.x = x ;
            mesh2.position.y = y ;
            mesh2.position.z = z ;


            parent.add( mesh1, mesh2 );

            meshes.push( {
                mesh: mesh1, verticesDown: 0, verticesUp: 0, direction: 0, speed: 20, delay: Math.floor( 200 + 200 * Math.random() ),
                start: Math.floor( 100 + 200 * Math.random() ),
            } );
            meshes.push( {
                mesh: mesh2, verticesDown: 0, verticesUp: 0, direction: 0, speed: 20, delay: Math.floor( 200 + 200 * Math.random() ),
                start: Math.floor( 100 + 200 * Math.random() ),
            } );

            

        }

        function onPointerMove(e) {

            if ( e.isPrimary === false ) return;

            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            camera.lookAt( scene.position );

            renderer.setSize( window.innerWidth, window.innerHeight );
            composer.setSize( window.innerWidth, window.innerHeight );

        }
    }
}