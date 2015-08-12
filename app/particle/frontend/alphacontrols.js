//Script that controls movement of Alpha model/character. USE arrow keys or WASD to move character around.
//TODO: wanted to add different animations to Alpha. There is a walking and treading water animation I have not implemented.

//Next 4 lines: Code that adds jQuery as a library to the Javascript. Found at http://stackoverflow.com/questions/1140402/how-to-add-jquery-in-js-file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


pc.script.create('alphacontrols', function (context) {
    // Creates a new Tankcontrols instance
    var Alphacontrols = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
        
        this.torque = 0.5;
        this.power = 10;
        this.time = 0;
    };

    Alphacontrols.prototype = {
        // Called once after all resources are loaded
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //this.entity.rigidbody.applyForce(0, 9.8, 0);
            if (context.keyboard.isPressed(pc.input.KEY_LEFT) || context.keyboard.isPressed(pc.input.KEY_A)) {
                //this.entity.rigidbody.applyTorque(0, this.torque, 0);
                this.entity.rotate(0,37*dt,0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_RIGHT) || context.keyboard.isPressed(pc.input.KEY_D)) {
                //this.entity.rigidbody.applyTorque(0, -this.torque, 0);
                this.entity.rotate(0,-37*dt,0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_UP) || context.keyboard.isPressed(pc.input.KEY_W)) {
                //this.force.copy(this.entity.forward).scale(-this.power);
                //this.entity.rigidbody.applyForce(this.force);
                this.entity.translateLocal(0,0,5*dt);
            }
            if (context.keyboard.isPressed(pc.input.KEY_DOWN) || context.keyboard.isPressed(pc.input.KEY_S)) {
                //this.force.copy(this.entity.forward).scale(this.power);
                //this.entity.rigidbody.applyForce(this.force);
                this.entity.translateLocal(0,0,-5*dt);
            }
            
            //code below: preliminary testing to see if POST ajax call works
            /*
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                var text1 = "name=ifreke&age=26";
                $.ajax({
                    url: "http://localhost:8080/api/v1/post_parameters",
                    type: "POST",
                    data: text1,
                    success: function(data, status, jqXHR) {
                    },
                    error: function(xhr, status, error) {
                    }
                });
            }
            */
        }
    };

    return Alphacontrols;
});