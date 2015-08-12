//Crucial script within project. Ajax calls are made to server running within python code on Compact Cori.
//Once Ajax call is successful, json object received is held within globaljson variable, which can be called
//from other scripts within project.

//Next 4 lines: Code that adds jQuery as a library to the Javascript. Found at http://stackoverflow.com/questions/1140402/how-to-add-jquery-in-js-file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var globaljson = {
    "params":{
        "num_particles": 2,
        "num_active_workers": 1,
        "simulation_height": 1000,
        "simulation_width": 1000,
        "simulation_depth": 1000
    },
    "particles":[
        {
            "particle_id": 0,
            "thread_num": 1,
            "position": [5,5,5],
            "velocity":[1.35,4.234,935.90],
            "mass":13,
            "radius":78,
            "neighbors":[]
        },
        {
            "particle_id": 1,
            "thread_num": 1,
            "position": [10,10,10],
            "velocity":[-1.1034,9.45,0.1],
            "mass":15,
            "radius":6,
            "neighbors":[]
        }
    ]
};
var global_toggle = 1;        //variable to hold toggle option between Nick's MD Simulation and Elizabeth's Meteor application

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
            
            var urlstring = "";
            
            //if statement to toggle between Nick and Elizabeth application
            if (global_toggle === 1){
                urlstring = "http://localhost:8080/api/v1/get_particles";  //Nick's code
            }else if (global_toggle === 2){
                urlstring = "http://128.55.19.109:3000/api/v1/get_particles";  //Eliz's code
            }
            
            //jQuery ajax call to get json object from server within MD simulation or Meteor application
            $.ajax({
                url: urlstring, //Elizabeth's url: "http://128.55.19.109:3000/api/get_particles"
                type: "GET",
                dataType: "json",
                success: function(res) {
                    globaljson = res;                //this is where received json object is put into global json object
                },
                error: function(xhr, status, error) {
                }
                
            });
            
            num_workers_changed = false;
            if (globaljson.params.num_active_workers != app.root.findByName("Comm").script.KeyboardInput.params().num_workers){
                num_workers_changed = true;
            }
            
            //Loop that checks every particle and updates position and color, according to number of nodes being used.
            for (i = 0; i < globaljson.particles.length; i++){
                var id_num = globaljson.particles[i].particle_id;
                app.root.findByName(id_num.toString()).script.Force.updatePosition(globaljson.particles[i].position[0], globaljson.particles[i].position[1], globaljson.particles[i].position[2]);
                //app.root.findByName(id_num.toString()).script.Force.updatePosition(globaljson[i].x, globaljson[i].y, globaljson[i].z);  //Elizabeth code
                if (num_workers_changed){
                    app.root.findByName(id_num.toString()).script.Force.setColor(globaljson.particles[i].thread_num);
                }
            }
        },
        
        //crucial function which returns json object to any script which asks for it. Called by every molecule
        send: function () {
            return globaljson;
        },
        
        length: function () {
            return globaljson.particles.length;
        },
        
        //toggle function call which is called from KeyboardInput.js
        toggle: function (num){
            global_toggle = num;
        }
    };

    return Ajax;
});