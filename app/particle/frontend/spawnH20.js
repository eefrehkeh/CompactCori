var spawncount = 0;

pc.script.create('spawnH20', function (app) {
    // Creates a new SpawnH20 instance
    var SpawnH20 = function (entity) {
        this.entity = entity;
        this.time = 0;
    };

    SpawnH20.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.moleculeTemplate = app.root.findByName("H20 Molecule");
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.time+=dt;
            if(this.time > 0.05){
                this.spawnMol(spawncount);
                this.time=0;
                spawncount += 1;
            }
            
        },
        
        spawnMol: function(num){
            var e = this.moleculeTemplate.clone();
            e.setPosition(this.entity.getPosition());
            e.translate(pc.math.random(-25,25),0,pc.math.random(-25,25));
            e.rigidbody.syncEntityToBody();
            //console.log("numtostring: ", num.toString());
            var text = num.toString();
            //console.log("number text: ", text);
            //console.log("E: ", e);
            e.name = text; 
            app.root.addChild(e);
        }
    };

    return SpawnH20;
});