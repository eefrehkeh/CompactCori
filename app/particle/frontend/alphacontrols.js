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
            this.entity.rigidbody.applyForce(0, 9.8, 0);
            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.entity.rigidbody.applyTorque(0, this.torque, 0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.entity.rigidbody.applyTorque(0, -this.torque, 0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_UP)) {
                this.force.copy(this.entity.forward).scale(-this.power);
                this.entity.rigidbody.applyForce(this.force);
            }
            if (context.keyboard.isPressed(pc.input.KEY_DOWN)) {
                this.force.copy(this.entity.forward).scale(this.power);
                this.entity.rigidbody.applyForce(this.force);
            }
        }
    };

    return Alphacontrols;
});