//This will define all the gamelogic for the game - 3D Missile Command
// Author - Spondon Kundu
// Unity Id - skundu
// Email Id - spondon6102@gmail.com
//Description of this game: http://cgclass.csc.ncsu.edu/search/label/homework

//================================================================================

// Set the scene size.
    const WIDTH = 500;//window.innerWidth;
    const HEIGHT = 600;//window.innerHeight;

    // Set some camera attributes.
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    // Get the DOM element to attach to
    const container =
        document.querySelector('#container');

    // Create a WebGL renderer, camera
    // and a scene
    const renderer = new THREE.WebGLRenderer();
    const camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    const scene = new THREE.Scene();

    // Add the camera to the scene.
    scene.add(camera);

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);

    var axes = new THREE.AxesHelper(100);
    scene.add(axes);

    // Attach the renderer-supplied
    // DOM element.
    container.appendChild(renderer.domElement);

    // text for Missile Command

    var loader = new THREE.FontLoader();

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

	var geometry = new THREE.PlaneGeometry( 250, 250, 10, 10);
	var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: stoneTexture} );
	var plane = new THREE.Mesh( geometry, material );
	
	plane.position.z = -300;
	plane.position.y = -70;
	//plane.position.x = -100;

	plane.rotation.x = -Math.PI/2.5;
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

	var buildingGeometry = new THREE.BoxGeometry( 20, 40, 50 );
	var buildingMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: buildingTexture} );
	var building1 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building1.position.z = -300;
	building1.position.y = -35;
	building1.position.x = -55;
	scene.add(building1);

	var building2 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building2.position.z = -300;
	building2.position.y = -35;
	building2.position.x = -15;
	scene.add(building2);

	var building3 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building3.position.z = -300;
	building3.position.y = -35;
	building3.position.x = 15;
	scene.add(building3);

	var building4 = new THREE.Mesh( buildingGeometry, buildingMaterial );

	building4.position.z = -300;
	building4.position.y = -35;
	building4.position.x =  55;
	scene.add(building4);

    // Load the background texture
    var bckgTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/sequae92/MissileCommand3D/master/assets/skystarstexture.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: bckgTexture
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;

    // Create your background scene
    var backgroundScene = new THREE.Scene();
    var backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(backgroundMesh);

    function update () {
      // Draw!
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(backgroundScene , backgroundCamera );
      renderer.render(scene, camera);

      // Schedule the next frame.
      requestAnimationFrame(update);
    }

    // Schedule the first frame.
    requestAnimationFrame(update);
