pc.script.create('Force', function (app) {
    // Creates a new Force instance
    var Force = function (entity) {
        this.entity = entity;
    };

    Force.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            if(this.entity.name=="H20 Molecule"){
                //this.entity.rigidbody.linearVelocity = new pc.Vec3(pc.math.random(-5,5),pc.math.random(0,5),pc.math.random(-5,5));
            } 
            this.ball = app.root.findByName("Ball");
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var gravity = new pc.Vec3(0, 9.8, 0);
            var goToHere = new pc.Vec3();
            goToHere = this.ball.getPosition().sub(this.entity.getPosition());
            goToHere.normalize().scale(1);
            this.entity.rigidbody.applyForce(gravity);
            this.entity.rigidbody.applyForce(goToHere);
        }
    };

    return Force;
});