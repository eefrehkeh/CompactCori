//script that controls ajax POST call back to parallel MD simulation, also toggle options between applications

//Next 4 lines: Code that adds jQuery as a library to the Javascript. Found at http://stackoverflow.com/questions/1140402/how-to-add-jquery-in-js-file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var global_toggle = 1;
var global_params = {num_particles: 5, num_workers: 1};
var togglenum = 1;

pc.script.create('KeyboardInput', function (app) {
    // Creates a new KeyboardInput instance
    var KeyboardInput = function (entity) {
        this.entity = entity;
    };

    KeyboardInput.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var globaljson_holder = app.root.findByName("Comm").script.ajax.send();
            var urlstring = "";
            
            //toggle between Nick's MD simulation and Elizabeth's Meteor application
            if (global_toggle === 1){
                urlstring = "http://localhost:8080/api/v1/post_parameters";  //Nick's code
            }else if (global_toggle === 2){
                urlstring = "http://128.55.19.109:3000/api/post_parameters";  //Eliz's code
            }
            
            if (app.keyboard.isPressed(pc.input.KEY_P)) {
                $.ajax({
                    url: urlstring, //Elizabeth's url: "http://128.55.19.109:3000/api/post_parameters"
                    type: "POST",
                    data: global_params,
                    //dataType: "json",
                    success: function(res) {
                        console.log("The POST ajax call WORKED", "DATA: ", res);
                    },
                    error: function(xhr, status, error) {
                        console.log("The POST ajax call didn't work. ", "xhr: ", xhr, "status: ", status, "error: ", error);
                    }
                });
            }
            
            //toggle between Camera scripts.
            if (app.keyboard.isPressed(pc.input.KEY_C)) {
                console.log("input received: ");
                if (togglenum === 1){
                    console.log("inside toggle 1");
                    app.root.findByName("AlphaCamera").enabled = false;
                    app.root.findByName("OrbitCamera").enabled = true;
                    togglenum = 2;
                }else{
                    console.log("inside toggle 2");
                    app.root.findByName("AlphaCamera").enabled = true;
                    app.root.findByName("OrbitCamera").enabled = false;
                    togglenum = 1;
                }
                
            }
            
            //toggle between Nick's code and Elizabeth's application
            if (app.keyboard.isPressed(pc.input.KEY_1)) {
                this.entity.script.KeyboardInput.toggle(1);
                app.root.findByName("Comm").script.ajax.toggle(1);
            }else if (app.keyboard.isPressed(pc.input.KEY_2)){
                this.entity.script.KeyboardInput.toggle(2);
                app.root.findByName("Comm").script.ajax.toggle(2);
            }
        },
        
        params: function (){
            return global_params;
        },
        
        toggle: function (num){
            global_toggle = num;
        }
    };

    return KeyboardInput;
});