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

# Solution
--------------
- ADO        // Main ADO object container
==============
var ADO = { }

--------------
- ADO.G      // Game object  - Logic / Interface
==============
ADO.G = { }

--------------
- ADO.P      // Player is a lightwieght object container
==============
ADO.P = {
		name : "Nimrod",
		score : 0,	// final score value
		exp   : 0,	// experiance points
		life : 20,	// life points, die when 0
		defense : 10,	// armor defence value
		breathe : 1,	// size of breathe
		attack : 1,	// attack hit points
		search : 1,	// search ability
		gold : 10,	// gold resource
		bones : 5,	// bones resource
		skill : {
			breathe : 1, // ability to hold a breathe
			attach : 2,  
			chance : 20,
			armor : 10
		}
	};


--------------
- ADO.Action // Does the heavy lifting
==============
ADO.Action = function(id, speed, max, payouttype, amt, snd_start, snd_end){
		this.id = id;
		this.val = 0;
		this.speed = speed;
		this.cycles = 0;
		this.running = 0;
		this.timer = '';
		this.width = max;
		this.max = max;
		this.payoutType = payouttype;
		this.payoutAmt = amt;
		this.direction = 1;
		this.snd_start = snd_start;
		this.snd_end = snd_end;
		this.drawVal = function () {
			jQuery('#meter_' + this.id).val(this.val);	
		}
		// omitting functions for brevity..
  
	ADO.A = [];
	// name, delay, size, payout type, payout amount, start sound, end sound
	ADO.A[0] = new ADO.Action('mine', 250, 150, 'gold', 5, 'mine', 'coin');

--------------
- ADO.TYPER  // Type like a human
==============
ADO.TYPER = {
		text : "Startup",
		count : 0,
		maxspeed : 100,
		timer : '',
		ready : function (s) {
			this.maxspeed(s);
		},
		set : function (str) {
			this.text = str;
			this.count = 0;
			jQuery('#messages').html('');
			this.go();
		},
		go : function () {
			if (this.count <= this.text.length) {
				var random = Math.floor(Math.random() * this.maxspeed);
				var me = this; // fix settimeout scope
				this.timer = setTimeout(function(){me.go()}, random);
				jQuery('#messages').append(this.text.substring(this.count, this.count+1));
				this.count++;
				//console.log(this.count);
			} else {
			 	clearTimeout(this.timer);
			 	//console.log("end of string");
			}
		},
		stop : function () {
			clearTimeout(this.timer);
			//console.log("stop called");
		}
	
	}
