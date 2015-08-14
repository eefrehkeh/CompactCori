//Crucial script within the project. Is attached to "Comm" entity, spawns molecules as they are added to JSON object.

var spawncount = 0;    // variable to keep track of number of H20 molecules in scene
var MAX_MOL = 200;

pc.script.create('spawnH20', function (app) {
    
    // Creates a new SpawnH20 instance
    var SpawnH20 = function (entity) {
        this.entity = entity;
        //this.time = 0;
        this.entities = [];        //list/array of entities to be stored as they are created from spawn_molecule function
        this.time = 0;
    };

    SpawnH20.prototype = {
        // Called once after all resources are loaded and before the first update    
        initialize: function () {
            this.moleculeTemplate = app.root.findByName("H20 Molecule");
            var globaljson_holder = app.root.findByName("Comm").script.ajax.send(); //getting json object from ajax.js through locally defined send() function
            for (i = 0; i < globaljson_holder.particles.length; i++){
                var num_mol_id = globaljson_holder.particles[i].particle_id;
                this.spawn_molecule(num_mol_id);
                spawncount += 1;
            }
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            //Code Below: Code that spawns a specified number (MAX_MOL) of H20 molecules into the scene. Was used for demo during SUPERB REU Tech Talk.
            //This code will not work unless the two if statements below that control adding and deleting molecules are commented out.
            
//             this.time+=dt;
//             if (spawncount <= MAX_MOL){
//                 if (this.time > 0.05){
//                     this.spawn_molecule(spawncount);
//                     this.time=0;
//                     spawncount += 1;
//                     console.log(spawncount);
//                 }
//             }
            
            
            //if statement that checks if more molecules have been added to json object in ajax.js, if so add them to scene
//             if(app.root.findByName("Comm").script.ajax.length() > spawncount){
//                 var spawn_increase = spawncount;
//                 var globaljson_holder2 = app.root.findByName("Comm").script.ajax.send();
//                 for (i = spawn_increase; i < globaljson_holder2.particles.length; i++){
//                     var num_mol_id = globaljson_holder2.particles[i].particle_id;
//                     this.spawn_molecule(num_mol_id);
//                     spawncount += 1;
//                 }
//             }
            
//             //if statement that checks if molecules have been deleted from json object in ajax.js, if so delete entity from scene
//             if(app.root.findByName("Comm").script.ajax.length() < spawncount){
//                 var spawn_decrease = spawncount;
//                 var globaljson_holder3 = app.root.findByName("Comm").script.ajax.send();
//                 var match_found = false;
//                 for (i = this.entities.length; i > 0; i--){
//                     for (j = globaljson_holder3.particles.length; j > 0; j--){
//                         if (this.entities[i-1].entity.getName() == globaljson_holder3.particles[j-1].particle_id){
//                             match_found = true;
//                         }
//                     }
//                     //destroy entities if they are no longer in the json object and remove from list/array
//                     if(!(match_found)){
//                         this.entities[i-1].entity.destroy();
//                         this.entities.splice(i-1, 1);
//                         spawncount -= 1;
//                     }
//                 }
//             }
//             
               if(app.root.findByName("Comm").script.ajax.length() != spawncount){
                   var globaljson_holder3 = app.root.findByName("Comm").script.ajax.send();
                   for (i = this.entities.length; i > 0; i--){
                       this.entities[i-1].entity.destroy();
                       this.entities.splice(i-1, 1);
                       spawncount -= 1;
                   }
                   for (i = 0; i < globaljson_holder3.particles.length; i++){
                       var num_mol_id = globaljson_holder3.particles[i].particle_id;
                       this.spawn_molecule(num_mol_id);
                       spawncount += 1;
                   }
               }
            
        },
        
        spawn_molecule: function(num){
            var e = this.moleculeTemplate.clone();                             //clone body of H20 molecule
            e.setPosition(this.entity.getPosition());
            e.translate(pc.math.random(-25,25),0,pc.math.random(-25,25));      //spawn clone from a random position
            e.rigidbody.syncEntityToBody();                                    //sync rigidbody with cloned body
            var text = num.toString();
            e.name = text;                                                     //store passed parameter of particle_id into name attribute of entity
            app.root.addChild(e);                                              //add entity to the project heirarchy
            this.entities.push({ entity: e });                                 //push entity to list/array so it can be found easily later and deleted
        }
    };

    return SpawnH20;
});