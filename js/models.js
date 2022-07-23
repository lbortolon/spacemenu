const modelNodeList = document.querySelectorAll('a-entity[gltf-model]');
const models =  Array.prototype.slice.call(modelNodeList);

const modelsArr = models.map(function(index){
  return index.getAttribute('gltf-model').match(/\(([^)]+)\)/)[1]
});

  const loadModels = new Promise((resolve, reject) => {
    for (const element of modelsArr) {
      fetch(element)
        .then((response) => {
         return response;
       }).then((model) => {
            console.log(model.url);
            resolve(model.url);
          }).catch(error => {
            reject(error + "it failed");
          })
        }
    });

  loadModels.then(function (success) {
    console.log("success: ", success)
  }).catch(error => console.log("error: ", error));


// wait until model is loaded

    window.addEventListener('model-loaded', function(){

      init();

      function init() {

      //cubemap
      const path = 'assets/cubemap/';
      const format = '.jpg';
      const urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
      ];

        const reflectionCube = new THREE.CubeTextureLoader().load( urls ); // eslint-disable-line

        for (const element of models) {
          element.object3D.traverse(function(object3D){
              object3D.material = new THREE.MeshPhongMaterial( // eslint-disable-line
                {
                  envMap: reflectionCube,
                  shininess: 100,
                }
              )
            }
         )}
      }

});
