//WIP: Script to control xbox controller

pc.script.create('gamepad', function (app) {
    // Creates a new Gamepad instance
    var Gamepad = function (entity) {
        this.entity = entity;
    };

    Gamepad.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (app.gamepads.isPressed(pc.PAD_1, pc.input.PAD_FACE_1)){
                console.log("button pressed");
            }
        }
    };

    return Gamepad;
});