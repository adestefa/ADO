# ADO

I was inspired by the fabulous game [A Dark Room](http://adarkroom.doublespeakgames.com/). It has many key elements that stand out: simplicity in UI; exploration as play; timed elements (cool downs) and expansive storyline that is very engaging. This game has more depth and emotion than many current games with their fancy 3D graphics and special effects. 

I wanted to experiment with these ideas myself, and see if I can create a few simple objects in JavaScript to handle any number of actions, cool-downs and storyline. I spent a weekend in July of 2013, setting up the main game objects and a simple UI to test the gameplay elements.

I decided to take what A Dark Room has done with UI and gameplay and mash it up with a fiction novel and pick-your-adventure books of the '70/'80s. 

Each sound is a simple HTML5 audio element hard coded in the HTML. We could have created each one dynamically if we are interested in sound libraries and the ablity to switch between different themes- but we don't care because simple is better when you are rapid-prototyping.

At the basic requirements:
- An action is performed by clicking a link. 
- Each action has a set amount of time to complete and an associated progress bar to display real-time progress. 
- When an action is complete, pay out user, this can be any type of payment and any amount
- Each Action can grow or shrink in time which depends on the user's abilities and skill level.
- After mastery of a skill then action completion requires no time.
- Typing like a human for COMLINK simulation
- Use background color as a special effect to convey player/game state
- Play sounds

# Actions
- [action_mine
- [action_hunt
- [action_punch
- [action_breathe

# JS solution
ADO        // Main ADO object container
ADO.G      // Game object  - Logic / Interface
ADO.P      // Player is a lightwieght object container
ADO.Action // Does the heavy lifting
ADO.TYPER  // Type like a human


