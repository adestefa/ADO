


	// ADO, A heightened concern; busy or delaying activity; bustle; a fuss.


	
	// Main ADO Object container
	// This stuff is the bedrock, 
	// not tied to any dependancies on player or game logic
	var ADO = {
		ver : '0.1.1.1',
		DEBUG : 1,
		log : function (str) {
			if (this.DEBUG && (window.console && window.console.log)) {
				window.console.log(str);
			}
		},
		/** return random number between 0 and limit */
		rand : function (limit) {
			return randomnumber=Math.floor(Math.random()*limit);
		},
		/** each sound is a simply HTML5 audio element hard coded in the HTML.
		    we could have created each one dynamically if we are interested
		    in sound libraries and the ablity to switch between different themes
		     - but we don't care so simple is better.
		*/
		play_sound : function (snd) {
			var s = 'sound_' + snd;
			this.log("Play sound:" + s);
			window.document.getElementById(s).play();	
		}
		
	};
		
	// Player is a lightwieght object container
	// using a dicipline of properties only, leaving the work
	// to the GAME object we keep things portable and easy to grow
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
	
	
	
	
	// {G}ame player Object  - Logic Interface
	// Here we do real work using the Player object
	ADO.G = {
		// draw the player's stats on screen
		draw : function () {
			jQuery('#p_life').html(ADO.P.life);
			jQuery('#p_gold').html(ADO.P.gold);
			jQuery('#p_bones').html(ADO.P.bones);
		},
		// player takes damge, can die
		damage : function (n) {
			var life = ADO.P.life;
			if (life > n) {
				
				ADO.P.life = life - n;
				jQuery('body').animate({
				backgroundColor: '#FA8282'
				}, 500 );
				
				jQuery('body').animate({
				backgroundColor: 'white'
				}, 500 );
				ADO.play_sound('damage');
				this.draw();
			} else {
				ADO.P.life = 0;
				ADO.G.die();
			}
		},
		// player is healed n amount
		heal : function (n) {
			ADO.play_sound('breathe');
			jQuery('body').animate({
				backgroundColor: '#AFF5A2'
				}, 500 );
				jQuery('body').animate({
				backgroundColor: 'white'
				}, 500 );
			ADO.P.life = ADO.P.life + n;
			this.draw();
			
		},
		// player has died
		die : function () {
			ADO.play_sound('die');
			jQuery('body').animate({
			backgroundColor: 'red'
			}, 3500 );
			jQuery('body').animate({
			backgroundColor: 'black'
			}, 1500 );
			window.setTimeout(function () {
			  jQuery('#die').fadeIn('slow');	
			}, 4000 );
			
			
		},
		// restart
		resurect : function () {
			jQuery('body').css('background','white');
			jQuery('#die').hide();
			
		},
		player_report : function () {
			ADO.log("PLAYER REPORT [" + ADO.P.name + "]");
			ADO.log(' -score:' + ADO.P.score);
			ADO.log(' -life :' + ADO.P.life);
			ADO.log(' -exp  :' + ADO.P.life);
		}

	};


	
	
	
	/**
		An action is performed by clicking a link. Each action
		has a set amount of time to complete and an associated progress bar
		to display real-time progress. Each Action can grow or shrink in time
		which depends on the user's abilities and skill level.
		Mastery of a skill requires no time.
	*/
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
		
		// change the amount of action the user has to complete
		// here we change the max percentage amount and width of meter bar
		this.setMax = function (v) {
			this.max = v;
			this.width = v;
			jQuery('#meter_' + this.id).attr('max', this.max);
			jQuery('#meter_' + this.id).attr('style', 'width:' + this.width + "px");
		},
		// setup and start the action
		this.start = function() {
			// make sure size of field reflects user data
			this.setMax(this.max);
			// check if action is already running and hasn't finished when user clicked link
			if (!this.running) {
				ADO.play_sound(this.snd_start);
				this.running = 1;
				jQuery('#action_' + this.id).removeClass('done').addClass('running');
				clearInterval(this.timer);	
				// when direciton is 0, we must countdown instead of up
				if (this.direction === 1){ 
					this.go();
					this.val = 0;
				} else {
					this.val = 0;
					this.fill();
				}
			} else  {
				console.log("Already running " + this.id);
			}
		},
		// perform action
		this.go = function () {
			var thisis = this;
			this.timer = setInterval(function() { thisis.update()}, thisis.speed);
		},
		// action is complete, pay out user, this can be any type of payment and any amount
		this.done = function () {
			ADO.play_sound(this.snd_end);
			jQuery('#action_' + this.id).addClass('done').removeClass('running');
			ADO.P[this.payoutType] = ADO.P[this.payoutType] + this.payoutAmt
			console.log("You now have: " + ADO.P[this.payoutType] + " " + this.payoutType + "!");
			this.running = 0;
			ADO.G.draw();
		},
		// comlpete a portion of the action, update and set the action progress
		this.update = function () {
			// countup
			if (this.direction == 1) {
				if (this.val < this.max) {
					this.val = this.val + 5;
					this.drawVal();
				} else {
					console.log(this.id + " has reached end");
					this.val = 0;
					this.drawVal();
					this.cycles = this.cycles + 1;
					clearInterval(this.timer);
					this.done();
				}
			// countdown
			} else {
			
				if (this.val > 0) {
					this.val = this.val - 5;
					this.drawVal();
					
					
				} else {
					console.log(this.id + " has run out");
					this.val = 0;
					this.drawVal();
					this.cycles = this.cycles + 1;
					clearInterval(this.timer);
					//this.done();
					ADO.G.die();
					
				}
			
			}
			
		},
		// animate the fast filling of meter, then countdown
		this.fill = function () {
			if (this.val < this.max) {
				this.val = this.val + 10;
				this.drawVal();
				var thisis = this;
				setTimeout(function(){thisis.fill()}, 50);
			} else {
				this.val = this.max;
				this.drawVal();
				this.go();
			}
		
		},
		// dump this object to console
		this.report =  function(){
			console.dir(this);
		}
	}	
	
	// type like a human
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
	/**	
		[SOUNDS]
		'click'
		'coin'
		'clang'
		'fool'
		'die'
		'heartbeat2'
	*/
	
	// Game Action objects
	ADO.A = [];
	// name, delay, size, payout type, payout amount, start sound, end sound
	ADO.A[0] = new ADO.Action('mine', 250, 150, 'gold', 5, 'mine', 'coin');
	ADO.A[1] = new ADO.Action('hunt', 200, 50, 'bones', 20, 'clang', 'coin');
	ADO.A[2] = new ADO.Action('punch', 200, 50, 'money', 20, 'clang', 'coin');
	
	ADO.A[3] = new ADO.Action('breathe', 1000, 150, 'breathe', 10, 'breathe', 'heartbeat2');
	ADO.A[3].direction = 0;
	
	
	ADO.TXT = [];
	ADO.TXT.push("This is a story about how my life got turned upside down");
	ADO.TXT.push("Listen to my story and understand the truth");
	
	
	// GAME STARTUP
	(function() {	
		ADO.log("ADO v" + ADO.ver);
		
		
		// Delegate User UI Actions	
		jQuery('#actions').click(function(e) {
			e.preventDefault();
			var target = e.target.id;
			switch (target) {
				case 'action_mine':
				console.log('mining action found');
				ADO.A[0].start();
				break;
				
				case 'action_hunt':
				console.log('hunting found');
				ADO.A[1].start();
				break;
				
				case 'action_punch':
				console.log('punch found');
				ADO.A[2].start();
				break;
				
				case 'action_breathe':
				console.log('breathe found');
				ADO.A[3].start();
				break;
			}
		});
		
		
		
	 
	}());
