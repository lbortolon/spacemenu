let scene = document.querySelector('a-scene');

if(scene.hasLoaded) {
  run();
} else {
  scene.addEventListener('loaded', run);
}
function run() {

  const modelNodeList = document.getElementsByClassName('model');
  const models =  Array.prototype.slice.call(modelNodeList);

  // to play the videosphere
document.querySelector("#video").play();

  let position1 = {
    'posX': -2.25,
    'posY': -0.5,
    'posZ': -2.5,

    'rotX': 0,
    'rotY': 0,
    'rotZ': 0,
  }

    anime({ // eslint-disable-line
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 6000,
      targets: position1,

      posX: -2.75,
      posY: -0.5,
      posZ: -2.5,

      // rotX: -10,
      // rotY: 3,
      // rotZ: 2,

      keyframes: [
        // {rotX: -10, rotY: 3, rotZ: 2},
        // {rotX: 10, rotY: -3, rotZ: -2},
      ],
      update: function() {
          //models[0].setAttribute('position', {x: position1.posX, y: position1.posY, z: position1.posZ});
          let offsetPosition = 0; 
          for (const element of models) {
            element.setAttribute('rotation', {x: position1.rotX, y: position1.rotY, z: position1.rotZ});
            // element.setAttribute('position', {x: position1.posX, y: position1.posY, z: (position1.posZ + offsetPosition)});
            offsetPosition = offsetPosition - 2;
          }
      }
    });
  }
