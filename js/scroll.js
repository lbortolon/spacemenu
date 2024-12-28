AFRAME.registerComponent('scroll', { //eslint-disable-line

    init: function () {
  
      let camera = document.querySelector("#camera");
      let lastModel = document.querySelector("#last");
      let container = document.querySelector("#aframe-bg");
  
      let cameraPostion = camera.object3D.position
      let lastModelPostion = lastModel.object3D.position
      let screenWidth = window.visualViewport.width
      let screenHeight = window.visualViewport.height
      let fov = AFRAME.scenes[0].camera.fov; // standard is 80
      let vFOV = fov * (Math.PI / 180); // convert to radians
      //let cameraPositionZ = window.innerHeight / (2 * Math.tan(vFOV / 2) ); // thank gawd for this hack
      let cameraPositionZ = 7000; // hu
  
  
      // 2d to 3d vector transform for scroll pixles
      let screenToWorldPoint = (screenSpaceCoord, target) => {
        const ndc = new THREE.Vector2()
        ndc.x = 2 * screenSpaceCoord.x / screenWidth - 1;
        ndc.y = 1 - 2 * screenSpaceCoord.y / screenHeight;
        target = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(ndc, AFRAME.scenes[0].camera);
        return raycaster.ray.at(screenSpaceCoord.z, target);
      }
  
      // stop or move cam via overflow
    let stopGo = (deltaY, height) => {
      console.log(cameraPositionZ);
      if (deltaY < 0 ) {
      //  console.log("go")
        document.documentElement.classList.remove("halt");
      }
      if (deltaY > 0 && height <= cameraPositionZ) {
  //      console.log("stop")
        document.documentElement.classList.add("halt");
        }
  
      }
  
    let moveCamera = (mover, speed) => {
      let r = mover;
      let s = speed;
      let movement = r * s;
      
      
      camera.object3D.position.set(0, 0, movement);
        
      }
  
    let getCoordinates = function getCoordinates() {
        direction = event.deltaY;
        distanceTo = cameraPostion.manhattanDistanceTo(lastModelPostion);
        transform = screenToWorldPoint(lastModelPostion, lastModel).y
        magicHeight = Math.abs((3779.5275591 * distanceTo) / transform)
        finalHeight = magicHeight - cameraPositionZ;
  
        return [distanceTo, transform, magicHeight, finalHeight];
      }
  
      // for some reason init isn't working so we need to
      // listen for the load event...
      // todo: i think it has to two with three vs aframe instances
      window.addEventListener('load', function() {
        cameraPostion.set(0, 0, 0);
        getCoordinates();
        container.style.height = finalHeight + "px";
    //    console.log(finalHeight)
  
      });
  
  
    // do the halting because our estimated height is a lil off...
    window.addEventListener("wheel", event => {
      getCoordinates();
      // camera props
      let mover = -window.scrollY;
      let speed = 0.005;
      moveCamera(mover, speed);
      console.log(event.deltaY);
      console.log(finalHeight);
      stopGo(event.deltaY, finalHeight);
  
      //console.log( "This is the wheel event ---> " + finalHeight);
    });
  
  
  
  
  },
    update: function() {
  
  
  
    },
  
    tick: function(time, timeDelta) { // eslint-disable-line
      // this.tick = AFRAME.utils.throttleTick(this.tick, 500, this); // eslint-disable-line
  
  
  
    }
  
  });