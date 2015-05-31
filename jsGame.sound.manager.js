 /** 
	jsGame Sound Manager
 
 */






/**
 
	Here we define the global game sounds for each action. we only care about
	defining the names, setting values will be handled by another module jsGame.sound.farm.profiles.js
 
 
 */
var GAME_SOUND_COIN;
var GAME_SOUND_BOMB_PLACE;
var GAME_SOUND_BOMB_EXPLODE;

/** jsGame sound profile container */
var gSoundProfiles;




/** return true if client is mobile safari */
function gIsMobileSafari(){
	if(navigator.userAgent.indexOf('iPod') != -1){return true;}
	if(navigator.userAgent.indexOf('iPhone') != -1){return true;}
	if(navigator.userAgent.indexOf('iPad') != -1){return true;}
	else{return false;}
}


/**
 * Return randNumber between 'limit' and 0
 *
 */
function randNum( limit){
           return randomnumber=Math.floor(Math.random()*limit);
    
}



/** play an audio file in sounds sub directory */
function gPlaySound( sound, loadTime ){

		//jsGame.display("NOT MOBILE");
		if(loadTime == 'undefined'){ loadTime = 0; }
		jQuery.sound.play("sounds/"+sound,{timeout:loadTime});
}


function audioStop(){
	navigator.notification.activityStop();
	navigator.audio.stop();
}



/** GLOBAL LIST OF GAME SOUNDS AS FUNCTIONS */

function gSoundCoin(){
	gPlaySound(GAME_SOUND_COIN);
}

function gSoundBombPlace(){
	gPlaySound(GAME_SOUND_BOMB_PLACE);
}

function gSoundBombExplode(){
	gPlaySound(GAME_SOUND_BOMB_EXPLODE);
}

