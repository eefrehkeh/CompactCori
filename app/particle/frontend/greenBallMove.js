//Simple script to make green ball move from side to side inside tank. 
//Was used/made primarily for demo during SUPERB 2015 REU Tech Talk.

var change = 1;

pc.script.create('greenBallMove', function (app) {
    // Creates a new GreenBallMove instance
    var GreenBallMove = function (entity) {
        this.entity = entity;
        this.time = 0;
    };

    GreenBallMove.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var position1 = new pc.Vec3(15,10,0); 
            var position2 = new pc.Vec3(-15,10,0); 
            
            this.time += dt;
            if (this.time > 10){
                if (change === 1){
                    this.entity.setLocalPosition(position1);
                    change = 2;
                }else{
                    this.entity.setLocalPosition(position2);
                    change = 1;
                }
                
                this.time=0;
            }
        }
    };

    return GreenBallMove;
});