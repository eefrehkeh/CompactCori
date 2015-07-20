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
            var xmlhttp;
            var json;
            var url = "";
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                    if(xmlhttp.status == 200){
                        json = xmlhttp.responseText;
                    }
                    else if(xmlhttp.status == 400) {
                        alert('There was an error 400');
                    }
                    else {
                        alert('something else other than 200 was returned');
                    }
                }
            };
            
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
            
            this.time+=dt;
            var e = this.ball2;
            if(this.time > 0.01){
                e.translate(1,0,-1);
                this.time=0;
            }
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