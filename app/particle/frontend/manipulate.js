pc.script.create('manipulate', function (app) {
    // Creates a new Manipulate instance
    var Manipulate = function (entity) {
        this.entity = entity;
        this.time = 0;
    };

    Manipulate.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.ball2 = app.root.findByName("Ball2");
            //if(this.entity.name=="Ball2"){
            //    this.entity.rigidbody.linearVelocity = new pc.Vec3(pc.math.random(-5,5),pc.math.random(0,5),pc.math.random(-5,5));
            //} 
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var vec = new pc.Vec3(0,0,0);
            $.ajax({
                url: "http://localhost:8080/api/v1/get_particles",
                type: "GET",
                dataType: "json",
                success: function(res) {
                   //alert("Hello " + res.particles.length)
                   var myText = "";
                   this.ball2 = app.root.findByName("Ball2");
                   for (i = 0; i < res.particles.length ; i++ ) {
                       vec.x = parseFloat(res.particles[i].position[0]);
                       vec.y = parseFloat(res.particles[i].position[1]);
                       vec.z = parseFloat(res.particles[i].position[2]);
                       this.ball2.translate(vec.x, vec.y, vec.z);
                   }
                },
                error: function(xhr, status, error) {
                }
                
            });
        }
    };

    return Manipulate;
});

/*
pc.script.create('Force', function (app) {
    // Creates a new Force instance
    var Force = function (entity) {
        this.entity = entity;
    };

    Force.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            if(this.entity.name=="H20 Molecule"){
                this.entity.rigidbody.linearVelocity = new pc.Vec3(pc.math.random(-5,5),pc.math.random(0,5),pc.math.random(-5,5));
            } 
            this.ball = app.root.findByName("Ball");
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var gravity = new pc.Vec3(0, 9.8, 0);
            var goToHere = new pc.Vec3();
            goToHere = this.ball.getPosition().sub(this.entity.getPosition());
            goToHere.normalize().scale(9);
            this.entity.rigidbody.applyForce(gravity);
            this.entity.rigidbody.applyForce(goToHere);
        }
    };

    return Force;
});
*/
