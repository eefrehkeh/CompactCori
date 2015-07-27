var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var globaljson = [
    {
        particle_id: 72,
        thread_num: 2,
        position: [1,2,3],
        velocity: [4,5,6],
        mass: 8,
        neighbors: []
    },
    {
        particle_id: 73,
        thread_num: 3,
        position: [15,25,35],
        velocity: [14,15,16],
        mass: 18,
        neighbors: []
    }
   ];

//console.log("typeof globaljson: ", typeof globaljson);
//console.log("HERE IS globaljson: ", globaljson);

pc.script.create('ajax', function (app) {
    // Creates a new Ajax instance
    var Ajax = function (entity) {
        this.entity = entity;
    };

    Ajax.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var vec = new pc.Vec3(0,0,0); 
            $.ajax({
                url: "http://localhost:8080/api/v1/get_particles",
                type: "GET",
                dataType: "json",
                success: function(res) {
                    //alert("Hello " + res.particles.length);
                    globaljson = res.particles;
                },
                error: function(xhr, status, error) {
                }
                
            });
        },
        
        send: function () {
            return globaljson;
        }
    };

    return Ajax;
});