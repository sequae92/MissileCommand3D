//This will define all the gamelogic for the game - 3D Missile Command
// Author - Spondon Kundu
// Unity Id - skundu
// Email Id - spondon6102@gmail.com
//Description of this game: http://cgclass.csc.ncsu.edu/search/label/homework

//================================================================================
var scene,renderer,camera;
var aSTEP,dSTEP;
var totalMissilesRound1;

const WIDTH = 600;//window.innerWidth;
const HEIGHT = 600;//window.innerHeight;

var aMissile =[];// = new THREE.Vector3();
var aMissileEnd = [];
var x1,y1;



// Set the scene size.
function init() {
    //WIDTH = 600;//window.innerWidth;
    //HEIGHT = 600;//window.innerHeight;

    // Set some camera attributes.
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    dSTEP = 0.3; // essentially the refresh rate - for the ballistic missile
    aSTEP = 0.4; // refresh rate for the anti-ballistic missile
    totalMissilesRound1 = 40;

    // Get the DOM element to attach to
    const container =
        document.querySelector('#container');

    // Create a WebGL renderer, camera
    // and a scene
     renderer = new THREE.WebGLRenderer();
     camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    //camera.position.z = 300;
    
     scene = new THREE.Scene();

    // Add the camera to the scene.
    scene.add(camera);

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);

    // var axes = new THREE.AxesHelper(100);
    // scene.add(axes);

    // Attach the renderer-supplied
    // DOM element.
    container.appendChild(renderer.domElement);

    // text for Missile Command

    /*var loader = new THREE.FontLoader();

	loader.load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/fonts/helvetiker_bold.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( 'MISSILE COMMAND 3D', {
		font: font,
		size: 13,
		height: 3,
	} );
	var txtmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000});
    var txtObject = new THREE.Mesh(geometry, txtmaterial);

    txtObject.position.z = -300;
    txtObject.position.x = -98;
    txtObject.position.y = 95;

    scene.add(txtObject); 

    } );
    */
    // Load the background texture
    var bckgTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/skystarstexture2.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(WIDTH,HEIGHT),
        new THREE.MeshBasicMaterial({
            map: bckgTexture
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;
    backgroundMesh.position.z = -500;

    // Create your background scene
     //var backgroundScene = new THREE.Scene();
     //var backgroundCamera = new THREE.Camera();
     //backgroundScene.add(backgroundCamera);
     //backgroundScene.add(backgroundMesh);

    scene.add(backgroundMesh);

	// create the plane

	THREE.ImageUtils.crossOrigin = "";
	//var texture = THREE.ImageUtils.loadTexture("OldStoneRoad.jpg");

	// this is to avoid the CORS issue
	//var stone = new Image()
	
    var stoneTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/OldStoneRoad.jpg' );
	// assuming you want the texture to repeat in both directions:
	stoneTexture.wrapS = THREE.RepeatWrapping; 
	stoneTexture.wrapT = THREE.RepeatWrapping;

	// how many times to repeat in each direction; the default is (1,1),
	stoneTexture.repeat.set( 4, 4 ); 
	stoneTexture.needsUpdate = true;

	var geometry = new THREE.PlaneGeometry( WIDTH, HEIGHT);
	var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: stoneTexture} );
	var plane = new THREE.Mesh( geometry, material );
	
	plane.position.z = -300;
	plane.position.y = -170;
	//plane.position.x = -100;

	plane.rotation.x = -Math.PI/2.5;
    plane.doubleSided = true;
    plane.receiveShadow = true;
	scene.add(plane);

	// build the "target" shape
	//var building = new Image();

    THREE.ImageUtils.crossOrigin = "";

	var buildingTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/BuildingTexture.jpg' );
	// assuming you want the texture to repeat in both directions:
	buildingTexture.wrapS = THREE.RepeatWrapping; 
	buildingTexture.wrapT = THREE.RepeatWrapping;

	// how many times to repeat in each direction; the default is (1,1),
	buildingTexture.repeat.set( 4, 4 ); 
	buildingTexture.needsUpdate = true;

/*	//defining the geometry of the building

	var buildingPts = [];
	buildingPts.push( new THREE.Vector2 ( 200, 300 ) );
	buildingPts.push( new THREE.Vector2 ( 400, 500 ) );
	buildingPts.push( new THREE.Vector2 ( 200, 300 ) );
	buildingPts.push( new THREE.Vector2 ( 400, 500 ) );

	var buildingShape = new THREE.Shape(buildingPts);
	var extrudeSettings = { amount: 40 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5

	var buildingGeometry = new THREE.ExtrudeGeometry(buildingShape,extrudeSettings);
	var buildingMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: buildingTexture} );
	var object = new THREE.Mesh( buildingGeometry, buildingMaterial );
	
	object.position.z = -1000;
	object.position.y = -70;
	//plane.position.x = -100;

	object.rotation.x = -Math.PI/2.5;
	scene.add(object);
*/



	var buildingGeometry = new THREE.BoxGeometry( 15, 40, 50 );
	var buildingMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: buildingTexture} );
	var building1 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building1.position.z = -300;
	building1.position.y = -35;
	building1.position.x = -50;
	scene.add(building1);

	var building2 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building2.position.z = -300;
	building2.position.y = -35;
	building2.position.x = -25;
	scene.add(building2);

	var building3 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building3.position.z = -300;
	building3.position.y = -35;
	building3.position.x = 0;
	scene.add(building3);

	var building4 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building4.position.z = -300;
	building4.position.y = -35;
	building4.position.x =  25;
	scene.add(building4);

    var building5 = new THREE.Mesh( buildingGeometry, buildingMaterial );

    building5.position.z = -300;
    building5.position.y = -35;
    building5.position.x =  50;
    scene.add(building5);

    //defining the missile base texture

    var missileBaseTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/TitanMissile.jpg' );
    // assuming you want the texture to repeat in both directions:
    missileBaseTexture.wrapS = THREE.RepeatWrapping; 
    missileBaseTexture.wrapT = THREE.RepeatWrapping;

    // how many times to repeat in each direction; the default is (1,1),
    missileBaseTexture.repeat.set( 4, 4 ); 
    missileBaseTexture.needsUpdate = true;

    var missileBaseGeometry = new THREE.BoxGeometry( 20, 50, 50 );
    var missileBaseMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: missileBaseTexture} );
    
    var missileBase1 = new THREE.Mesh( missileBaseGeometry, missileBaseMaterial );

    missileBase1.position.z = -300;
    missileBase1.position.y = -35;
    missileBase1.position.x = -85;
    scene.add(missileBase1);

    var missileBase2 = new THREE.Mesh( missileBaseGeometry, missileBaseMaterial );

    missileBase2.position.z = -300;
    missileBase2.position.y = -35;
    missileBase2.position.x = 85;
    scene.add(missileBase2);

    //defining the descending missile object
    // define an array of missiles
    // spawn 'n' number of missiles each time render is called

    document.addEventListener("mousedown",onMouseClick, false);
    
}


    var dMissile = [];//new Array(totalMissilesRound1);
    var missileGeometry = new THREE.ConeGeometry( 1, 10, 8 );
    var missileMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var missileCount = 0;
    var nMissiles;
    var flag=0;

    function dropMissiles(){

    nMissiles = 4;//Math.floor((Math.random()*10) + 1);
    var xPos;
    // console.log(nMissiles);

    for(var i =0;i < nMissiles  ; i++)
    {
        xPos = -80 + Math.floor((Math.random() * 160) + 1);

        var missile = new THREE.Mesh(missileGeometry,missileMaterial);
        
        missile.position.z = -300;
        missile.position.y = 130;
        missile.position.x = xPos;
        missile.rotation.x = Math.PI;
        dMissile.push(missile);
        scene.add(missile );
        missileCount++;
        //return nMissiles;
    }

    // console.log(missileCount);
    //myTime = setInterval(moveMissiles,500);
    }
   
        //for dropmissiles
    myTime = setInterval(function(){
     if(missileCount <= totalMissilesRound1)
        {
            dropMissiles();
            //console.log('A');
            //renderer.render(scene,camera);
        }},3000);
    
    //Vector3 mouse;
    //var mouse3D = new THREE.Vector3();

    // all functionality to animate the model    
    var direction1 = new THREE.Vector3(0,-dSTEP,0);
    var direction2 = new THREE.Vector3(aSTEP,aSTEP,0);
    var n;
    var myTime;
    var missileNumber;

    var vector = new THREE.Vector3();
    var mouse = THREE.Vector3(0,0,0);
    var x,y;


    function moveMissiles(){
            for(missileNumber=0; missileNumber<dMissile.length;missileNumber++){
                //console.log('B');
                //dMissile[missileNumber].position.add(direction1);
                dMissile[missileNumber].position.y -= dSTEP;
                if((dMissile[missileNumber].position.y <= -35)){
                    scene.remove(dMissile[missileNumber]);
                    dMissile.splice(missileNumber,1);
                    // aMissileEnd.splice(i,1);
                }
                //console.log( dMissile[missileNumber].position);
            }
    }
    
    function main(){

            init();
            animate();
        // // var canvas = document.getElementById("container");
        // document.addEventListener("mousedown",onMouseClick, false);
    }

    function onMouseClick(event)
  {
  
    event.preventDefault();

    var mouse3D = THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var dir = new THREE.Vector3();
    vector.set( ( event.clientX / WIDTH  ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1, 0.5 ); // z = 0.5 important!

    vector.unproject( camera );

    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( scene.children );
    // Change color if hit block
    if ( intersects.length > 0 ) {
        mouse3D =  intersects[ 0 ];
    }
    
    x1 = mouse3D.point.x;
    y1 = mouse3D.point.y;
    //console.log(x1);
    //console.log(y1);
    var pos = new THREE.Vector2(x1,y1);
    aMissileEnd.push(pos);

    createABMissile();
    //directABMissile();

  }

  function createABMissile(){

    //defining the ascending anti-ballistic missile
    var geometry = new THREE.ConeGeometry( 1, 10, 8 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var amissile = new THREE.Mesh( geometry, material );

    if(x1 >0) {
        amissile.position.z = -300;
        amissile.position.y = -35;
        amissile.position.x = -85;
    } else {
        amissile.position.z = -300;
        amissile.position.y = -35;
        amissile.position.x = 85;
    }
    

    scene.add(amissile);
    aMissile.push(amissile);
    // console.log('A');
    //directABMissile();

  }

    function directABMissile(){

        // for(var i=0;i)
        // console.log(aMissile.length);
        for(var i=0;i<aMissile.length;i++){
            // initial position of the AB missile
            // iZ = -300;      
            // iX = -35;
            // iY = -85;

            // direction vector for movement
            // var direction = new THREE.Vector3( x1-iX, y1-iY, 0);

            // scalar to simulate speed
            var speed = 0.05;
            // var vector = direction.multiplyScalar( speed, speed, 0 );

            // console.log(aMissile[0].x,aMissile[0].y);
            // if()

            aMissile[i].position.x += (aMissileEnd[i].x-aMissile[i].position.x)*speed;//vector.x;
            aMissile[i].position.y += (aMissileEnd[i].y-aMissile[i].position.y)*speed;//vector.y;
            if((aMissile[i].position.x >= aMissileEnd[i].x-10 && aMissile[i].position.x < aMissileEnd[i].x+10 )){
                scene.remove(aMissile[i]);
                aMissile.splice(i,1);
                aMissileEnd.splice(i,1);
            }
        }
        // console.log(aMissile.x,aMissile.y);
        //object.z += vector.z;

    }

    function checkColisions(){

        // check the intersection of Missile and AB Missile
            for(var i=0; i < aMissile.length;i++){
                for(var j=0; j < dMissile.length;j++){
                        if((dMissile[j].position.x >= (aMissile[i].position.x-5) && dMissile[j].position.x <= (aMissile[i].position.x+5)) && 
                        (dMissile[j].position.y >= (aMissile[i].position.y-5) && dMissile[j].position.y <= (aMissile[i].position.y+5) )){
                                scene.remove(dMissile[j]);
                                scene.remove(aMissile[i]);
                                aMissile.splice(i,1);
                                dMissile.splice(j,1);
                                aMissileEnd.splice(i,1);
                        }
                }
            }

        //check the intersection of missile and buildings ( and batteries)

        //for(var i=0; i < aMissile.length;i++){

        //}

    }
    
    function animate(){
        
         //renderer.autoClear = false;
         //renderer.clear();
         
         requestAnimationFrame(animate);
         renderer.render(scene,camera);

        //changing the direction of the missile iteratively 
        //dMissile.position.add(direction1);
        //dropMissiles();

        moveMissiles();

        directABMissile();

        checkColisions();

        //setInterval(moveMissiles,500);
        //setInterval(calculateXY,500);

        //setInterval(directABMissile,500);

        //aMissile.position.add(direction2);
            
    }
    
    //myTime = setInterval(moveMissiles, 3000);

     //requestAnimationFrame(animate);