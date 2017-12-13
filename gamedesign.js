//This will define all the gamelogic for the game - 3D Missile Command
// Author - Spondon Kundu
// Unity Id - skundu
// Email Id - spondon6102@gmail.com
//Description of this game: http://cgclass.csc.ncsu.edu/search/label/homework

//================================================================================


var scene,renderer,camera;
var aSTEP,dSTEP;
var totalMissilesRound;
var building = [];
var missileBase = [];
var aMissile =[];// = new THREE.Vector3();
var aMissileEnd = [];
var x1,y1;
var bringUFO = true;
var score = 0;
var currentLevel = 1;
var delayinms= 1000;
var delayinA= 3000;
var sphereUFO,sphereEx1,sphereEx2;
var flag = 0;
var explosionSound = new Audio('./assets/Bomb_Exploding.mp3');
var batteryExplosionSound = new Audio('./assets/Shotgun_Blast.mp3');


const WIDTH = 600;//window.innerWidth;
const HEIGHT = 600;//window.innerHeight;

// Set the scene size.
function init() {
    //WIDTH = 600;//window.innerWidth;
    //HEIGHT = 600;//window.innerHeight;

    // Set some camera attributes.
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    dSTEP = 0.2; // essentially the refresh rate - for the ballistic missile
    aSTEP = 0.4; // refresh rate for the anti-ballistic missile
    totalMissilesRound = 40;

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

    // Attach the renderer-supplied
    // DOM element.
    container.appendChild(renderer.domElement);

    // text for Missile Command

    var loader = new THREE.FontLoader();

	loader.load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/fonts/helvetiker_bold.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( 'MISSILE COMMAND 3D', {
		font: font,
		size: 10,
		height: 3,
	} );
	var txtmaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff});
    var txtObject = new THREE.Mesh(geometry, txtmaterial);

    txtObject.position.z = -300;
    txtObject.position.x = -80;
    txtObject.position.y = 110;

    scene.add(txtObject); 

    } );

    // this is for scoreboard

    
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

	var buildingGeometry = new THREE.BoxGeometry( 15, 40, 50 );
	var buildingMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: buildingTexture} );
	building[0] = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building[0].position.z = -320;
	building[0].position.y = -35;
	building[0].position.x = -50;
	scene.add(building[0]);

	building[1] = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building[1].position.z = -320;
	building[1].position.y = -35;
	building[1].position.x = -25;
	scene.add(building[1]);

	building[2] = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building[2].position.z = -320;
	building[2].position.y = -35;
	building[2].position.x = 0;
	scene.add(building[2]);

	building[3] = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building[3].position.z = -320;
	building[3].position.y = -35;
	building[3].position.x =  25;
	scene.add(building[3]);

    building[4] = new THREE.Mesh( buildingGeometry, buildingMaterial );

    building[4].position.z = -320;
    building[4].position.y = -35;
    building[4].position.x =  50;
    scene.add(building[4]);

    //defining the missile base texture

    var missileBaseTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/TitanMissile.jpg' );
    // assuming you want the texture to repeat in both directions:
    missileBaseTexture.wrapS = THREE.RepeatWrapping; 
    missileBaseTexture.wrapT = THREE.RepeatWrapping;

    // how many times to repeat in each direction; the default is (1,1),
    missileBaseTexture.repeat.set( 4, 4 ); 
    missileBaseTexture.needsUpdate = true;

    var missileBaseGeometry = new THREE.BoxGeometry( 25, 40, 50 );
    var missileBaseMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: missileBaseTexture} );
    
    building[5] = new THREE.Mesh( missileBaseGeometry, missileBaseMaterial ); // This is missileBase 1

    building[5].position.z = -320;
    building[5].position.y = -35;
    building[5].position.x = -85;
    scene.add(building[5]);

    building[6] = new THREE.Mesh( missileBaseGeometry, missileBaseMaterial ); // This is missileBase 2

    building[6].position.z = -320;
    building[6].position.y = -35;
    building[6].position.x = 85;
    scene.add(building[6]);

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
     if(missileCount <= totalMissilesRound)
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
  }

    function directABMissile(){

        for(var i=0;i<aMissile.length;i++){
            

            // scalar to simulate speed
            var speed = 0.05;

            aMissile[i].position.x += (aMissileEnd[i].x-aMissile[i].position.x)*speed;//vector.x;
            aMissile[i].position.y += (aMissileEnd[i].y-aMissile[i].position.y)*speed;//vector.y;
            if((aMissile[i].position.x >= aMissileEnd[i].x-10 && aMissile[i].position.x < aMissileEnd[i].x+10 )){
                scene.remove(aMissile[i]);
                aMissile.splice(i,1);
                aMissileEnd.splice(i,1);
            }
        }
    }

    function updateScore(increment){

        score+=increment; // each missile-AB missile collision earns you 1 point
        document.getElementById("scores").innerHTML = "Score:" + score;
    }

    function dispUFO(){

        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        sphereUFO = new THREE.Mesh( geometry, material );
        
        sphereUFO.position.z = -250;
        sphereUFO.position.y = 50;
        sphereUFO.position.x = 100;
// 
        scene.add( sphereUFO );
        //console.log('A');
        flag = 1;
    }

    function moveUFO(){

        sphereUFO.position.x -= dSTEP;
            if((sphereUFO.position.x <= -300)){
                scene.remove(sphereUFO);
                //cflag =0;
                }
    }

    //for UFO
    myTime = setInterval(function(){
     if(flag==0)
        {
            dispUFO();
        }},5000);

    function checkColisions(){

        // check the intersection of Missile and AB Missile
            for(var i=0; i < aMissile.length;i++){
                for(var j=0; j < dMissile.length;j++){
                        if((dMissile[j].position.x >= (aMissile[i].position.x-5) && dMissile[j].position.x <= (aMissile[i].position.x+5)) && 
                        (dMissile[j].position.y >= (aMissile[i].position.y-5) && dMissile[j].position.y <= (aMissile[i].position.y+5) )){
                                
                                createSmallExplosion(dMissile[j].position.x,dMissile[j].position.y);
                                scene.remove(dMissile[j]);
                                scene.remove(aMissile[i]);
                                aMissile.splice(i,1);
                                dMissile.splice(j,1);
                                aMissileEnd.splice(i,1);
                                explosionSound.play();
                                updateScore(1);
                                break;
                                //console.log(score);
                        }
                }
            }

        //check the intersection of missile and buildings ( and batteries)

        for(var i=0; i < dMissile.length;i++){
            for(var j=0;j < building.length;j++){

                if((dMissile[i].position.x >= (building[j].position.x-5) && dMissile[i].position.x <= (building[j].position.x+5)) && 
                        (dMissile[i].position.y >= (building[j].position.y-5) && dMissile[i].position.y <= (building[j].position.y+5) )){
                                
                                createBigExplosion(building[j].position.x,building[j].position.y);
                                scene.remove(dMissile[i]);
                                scene.remove(building[j]);
                                dMissile.splice(i,1);
                                building.splice(j,1);
                                batteryExplosionSound.play();
                        }
            }

        }

        //check the collisions wof missile and UFO

        for(var i=0; i < aMissile.length;i++){

            if((aMissile[i].position.x >= (sphereUFO.position.x-5) && aMissile[i].position.x <= (sphereUFO.position.x+5)) && 
                        (aMissile[i].position.y >= (sphereUFO.position.y-5) && aMissile[i].position.y <= (sphereUFO.position.y+5) )){

                                //createExplosion(sphereUFO.position.x,sphereUFO.position.y)
                                scene.remove(aMissile[i]);
                                scene.remove(sphereUFO);
                                aMissile.splice(i,1);
                                explosionSound.play();
                                updateScore(5);
                        }
        }

    }

    // this is to animate missile-missile and missile-city explosions
    function createBigExplosion(a,b){

        var geometry = new THREE.SphereGeometry( 15, 32, 32 );

        var material = new THREE.MeshBasicMaterial( {color: 0xffa500} );
        sphereEx1 = new THREE.Mesh( geometry, material );
            
        sphereEx1.position.x = a;
        sphereEx1.position.y = b;
        sphereEx1.position.z = -300;

        scene.add( sphereEx1 );

        setTimeout(function() {
        //your code to be executed after 1 second
        scene.remove(sphereEx1);
        }, delayinms);
    }

     function createSmallExplosion(a,b){

        var geometry = new THREE.SphereGeometry( 5, 32, 32 ); 

        var material = new THREE.MeshBasicMaterial( {color: 0xffa500} );
        sphereEx2 = new THREE.Mesh( geometry, material );
            
        sphereEx2.position.x = a;
        sphereEx2.position.y = b;
        sphereEx2.position.z = -300;

        scene.add( sphereEx2 );

        setTimeout(function() {
        //your code to be executed after 1 second
        scene.remove(sphereEx2);
        }, delayinms);
    }



    function nextLevel(){

        dSTEP+=0.1;
        missileCount = 0;
        //score = 0;
        currentLevel+=1;
        displayNextLevel();
        document.getElementById("level").innerHTML = "Level:" + currentLevel;
    }

    function displayNextLevel(){

    var loader = new THREE.FontLoader();

    loader.load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/fonts/helvetiker_bold.typeface.json', function ( font ) {

    var geometry = new THREE.TextGeometry( 'BE READY -> NEXT LEVEL', {
        font: font,
        size: 7,
        height: 3,
    } );
    var txtmaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff});
    var levelObject = new THREE.Mesh(geometry, txtmaterial);

    levelObject.position.z = -300;
    levelObject.position.x = -70;
    levelObject.position.y = 50;

    scene.add(levelObject);

    setTimeout(function() {
  //your code to be executed after 1 second
    scene.remove(levelObject);
    }, delayinms);

     } );

    }
    
    function animate(){   
         //renderer.autoClear = false;
         //renderer.clear();
         
        requestAnimationFrame(animate);
        renderer.render(scene,camera);

        if(missileCount == totalMissilesRound)
        {
            nextLevel();
        }

        moveMissiles();

        directABMissile();

        if(flag == 1){
            moveUFO();
        }

        checkColisions();


    }