# PlayCanvas Frontend Guide
Welcome to the PlayCanvas frontend. This is a guide that should help you when looking through the source code.

Note: Everything that pertains to PlayCanvas (mostly scripting) will not be covered here, as they have their own
tutorials and API reference. Check out [developer.playcanvas.com/en](developer.playcanvas.com/en) for more information.

## Using the Editor
To be able to modify the frontend you must have an account with PlayCanvas. You can either:
- Use the official NERSC/Compact Cori PlayCanvas account (to which you must have access)
- Create your own PlayCanvas account and fork the project from the original: `https://playcanvas.com/project/350488/overview/nersc`

All of the necessary assets and scripts are contained within the project. All of the source files within this repository have been downloaded directly from PlayCanvas. Tutorials for using the Editor can be found [here](http://developer.playcanvas.com/en/user-manual/designer/).

## Important Files
Here is a quick list of the most important files inside the frontend source:

**ajax.js** - Crucial script within the project. Ajax calls are made to server running within python code on Compact Cori. Once Ajax call is successful, json object received is held within globaljson variable, which can be called from other scripts within project.

**spawnH20.js** - Crucial script within the project. Is attached to "Comm" entity, spawns molecules as they are added to JSON object.

**Force.js** - Crucial script within the project. This is attached to every H20 molecule and will determine how it moves.

**camera1.js** - Script attached to AlphaCamera, will follow behind Alpha as he swims through the scene. Either enable OrbitCamera entity or AlphaCamera entity, but not both.

**orbit3d.js** - script attached to Orbit Camera controlled by mouse input which will rotate around scene at a given distance. Either enable OrbitCamera entity or AlphaCamera entity, but not both.

**alphacontrols.js** - controls movement of Alpha model/character. USE arrow keys or WASD to move character around.

**KeyboardInput.js** - controls ajax POST call back to parallel MD simulation, also toggle options between applications

## Running the Frontend
When you are finished with the PlayCanvas project you have two options: 

1. Publish the application online and run it from the browser
  * This option is absolutely fine, but pay attention to the 4 lines of code present in *ajax.js, alphacontrols.js,* and *KeyboardInput.js* which add jQuery to the file. I'm not sure if these will cause a problem if the project is downloaded and ran as a standalone file.
2. Download the source files from PlayCanvas and run using python SimpleHTTPServer command
  * Navigate out of the editor and into the Dashboard for the project. From this page click the tab that says `Publish`. Click the `Download` button to the right, give the download a name, then click `Web` at the bottom of the popup.
  * Once the .zip file is in your Downloads folder, move it to the desired directory. After unzipping the contents, you will be able to run the PlayCanvas project by opening up the terminal and running the following command: `python3 -m SimpleHTTPServer 8000`. 
