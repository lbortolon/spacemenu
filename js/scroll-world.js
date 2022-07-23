AFRAME.registerComponent('scroll-world', {


  init: function scroll() {




    // stored vars
    /////////////////////////////////////////
    let ongoingTouches = []; //logging each touch
    let deltaY; //calculating swipe distance
    let lastPosY; //calculating direction
    let direction = []; //logging direction
    // let forwardMotion; //custom event listener
    //////////////////////////////////////////


    // move functions
    ///////////////////////////////////////
    let moveForward = (speed) => {
      this.el.object3D.position.z -= speed;
      console.log("move forward");
    }

   let moveBackward = (speed) => {
     this.el.object3D.position.z += speed;
     console.log("move backward");
    }
    ///////////////////////////////////////


    // touchstart
    /////////////////////////////////////////////////////
    document.addEventListener('touchstart', event => {
      clientY = event.touches[0].clientY;

      let touches = event.changedTouches;
      console.log(touches);
      // add touches to array
      for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(touches[i]);
      }
      console.log("it started");
      console.log(ongoingTouches);
      startForward();
    }, false);
    /////////////////////////////////////////////////////

    //
    // // touchend
    // /////////////////////////////////////////////////////
    // document.addEventListener('touchend', event => {
    //   ongoingTouches = [];
    //
    //   //clear touches
    //    if (ongoingTouches.length == 0) {
    //      console.log("its over");
    //    }
    //    stopForward();
    // }, false )
    // /////////////////////////////////////////////////////


    // touchcancel (we need this + touchend for accuracy)
    //////////////////////////////////////////////////////
    document.addEventListener('touchcancel', event => {
      ongoingTouches = [];
      stopForward();
    } , false )
    //////////////////////////////////////////////////////



    // touchmove
    /////////////////////////////////////////////////////
    document.addEventListener('touchmove', event => {
      currentPosY = (event.changedTouches[0].clientY - clientY) / 100;
      deltaY = event.changedTouches[0].clientY - clientY;
      console.log(deltaY + " ---> deltaY");
          if (currentPosY < lastPosY) {
              direction = [];
              direction.push("forward");
              moveForward(0.06);
          }
          else if (currentPosY > lastPosY) {
              direction = [];
              direction.push("backward");
              moveBackward(0.06);
          }

      // custom event listner
      directionEvent.getCurrentDirection = direction;

      // reset position
      lastPosY = currentPosY;
      console.log("its moving");
    }, false);
    /////////////////////////////////////////////////////



    // custom event listener
    /////////////////////////////////////////////////////
    const directionEvent = {
      directionData: direction,
      get getCurrentDirection() {
        return this.directionData;
      },
      set getCurrentDirection(event) {
        this.directionData = event;
        this.directionListener(event);
      },
      directionListener: function (event) {},
      registerDirection: function (directionData) {
        this.directionListener = directionData;
      },

    };
    ///////////////////////////////////////////////////////


    // // listen for changes in direction
    // ////////////////////////////////////////////////
    // directionEvent.registerDirection((event) => {
    //   console.log(`${event}`)
    //   console.log(deltaY + " THE DELTA U NEED");
    //
    //       if (deltaY < 40 && event == "forward" && ongoingTouches.length > 0) {
    //           slowForward();
    //       } else {
    //         stopForward();
    //       }
    // });
    // ////////////////////////////////////////////////


    // // automove functions
    // ////////////////////////////////////////////////////
    // function slowForward() {
    //   moveForward(0.002);
    //   forwardMotion = requestAnimationFrame(slowForward);
    // };
    //
    // function startForward() {
    //   forwardMotion = requestAnimationFrame(slowForward);
    // };
    //
    // function stopForward() {
    //   cancelAnimationFrame(forwardMotion);
    // };
    /////////////////////////////////////////////////////



  }
});