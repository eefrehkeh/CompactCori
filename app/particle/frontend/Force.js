//Crucial script within program. This is attached to every H20 molecule and will determine how it moves.

var global_num_particle;
var global_num_found = false;

pc.script.create('Force', function (app) {
    // Creates a new Force instance
    var Force = function (entity) {
        this.entity = entity;
    };

    Force.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.ball = app.root.findByName("Ball");                             //locate the green ball in the scene.
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var gravity = new pc.Vec3(0, 9.8, 0);
            var goToHere = new pc.Vec3();
            goToHere = this.ball.getPosition().sub(this.entity.getPosition());   //get position of green ball, create vector from it
            goToHere.normalize().scale(1);
            this.entity.rigidbody.applyForce(gravity);                           //apply a force that negates downward gravity force within PlayCanvas
            this.entity.rigidbody.applyForce(goToHere);                          //apply a force that pushes molecule towards green ball

            
            //Code Below: Previous code which is able to find particle_id number from json object once and set it as name of molecule forever. 
            
//             var holder = {};
//             holder = app.root.findByName("Comm").script.ajax.send();
            
//             for (i = 0; i<holder.length; i++){
//                 if (this.entity.name == holder[i].particle_id){ //This is the comparison that means the most. must find typeof .name and .particle_id
//                     this.entity.setLocalPosition(holder[i].position[0], holder[i].position[1], holder[i].position[2]);
//                 }
//             }
            
//             if (!(global_num_found)){
//                 for (i = 0; i<holder.length; i++){
//                     if (this.entity.name == holder[i].particle_id){ //This is the comparison that means the most. must find typeof .name and .particle_id
//                         global_num_particle = i;
//                         global_num_found = true;
//                         this.entity.setLocalPosition(holder[i].position[0], holder[i].position[1], holder[i].position[2]);
//                     }
//                 }
//             }
//             else {
//                 this.entity.setLocalPosition(holder[global_num_particle].position[0], holder[global_num_particle].position[1], holder[global_num_particle].position[2]);
//             }
            
        },
        
        //Crucial function which other scripts can call and set position of H20 molecule to which this script is attached
        updatePosition: function (x, y, z) {
            this.entity.setLocalPosition(x, y, z);
        },
        
        
        //function which ajax.js calls to set color of H20 molecule once thread_num has been parsed
        setColor: function (thread_num){
            if (thread_num === 0){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Middle Color");
            }else if (thread_num === 1){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Hydrogen");
            }else if (thread_num === 2){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Blue");
            }else if (thread_num === 3){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Green");
            }else if (thread_num === 4){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Yellow");
            }else if (thread_num === 5){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Purple");
            }else if (thread_num === 6){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Orange");
            }else if (thread_num === 7){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Pink");
            }else if (thread_num === 8){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Brown");
            }else if (thread_num === 9){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Black");
            }else if (thread_num === 10){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Teal");
            }else if (thread_num === 11){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Neon");
            }else if (thread_num === 12){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Navy");
            }else if (thread_num === 13){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Lavender");
            }else if (thread_num === 14){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Khaki");
            }else if (thread_num === 15){
                this.entity.findByName("MiddleSphere").model.materialAsset = app.assets.find("Light Blue");
            }
        }
        
    };

    return Force;
});