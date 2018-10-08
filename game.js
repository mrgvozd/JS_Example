var Player_Strength;
var Player_Dexterity;
var Player_Health;
var Player_Points_Left;
var Player_Points_Summ;

var Enemy_Strength;
var Enemy_Dexterity;
var Enemy_Health;

var GlobalLog;
var Battle;

function ChangeUp(skill){
	if(Player_Points_Left>0&&Player_Points_Summ<15){
		if(skill==1) { Player_Strength++;  }
		if(skill==2) { Player_Dexterity++; }
		if(skill==3) { Player_Health++;    }
		Player_Points_Left--;
		Player_Points_Summ++;
		reload();
		return true;
	}
}
function ChangeDown(skill){
	if(Player_Points_Left<15&&Player_Points_Summ>0){
		if(skill==1) {
			if(Player_Strength==0) return false;
			Player_Strength--;
		}
		if(skill==2) {
			if(Player_Dexterity==0) return false;
			Player_Dexterity--;
		}
		if(skill==3) {
			if(Player_Health==0) return false;
			Player_Health--;
		}
		Player_Points_Left++;
		Player_Points_Summ--;
		reload();
		return true;
	}
}

function WriteLog(Attack, Damage){
	var TempStr;
	if(Attack==0) TempStr="Player hits monster for "+Damage+" damage!";
	else TempStr="Monster hits player for "+Damage+" damage!";
	GlobalLog=Battle+" "+TempStr+'\n'+GlobalLog;
	document.fight.log.value=GlobalLog;
}

function GameOver(){
	if(Enemy_Health<=0){
		alert("Player win!");
		return true;
	}
	if(Player_Health<=0){
		alert("Monster win!");
		return true;
	}
	return false;
}

function StartGame(){
	if(Player_Points_Left==0&&Player_Points_Summ==15) setTimeout(AttackMonster, 1000);
	else alert("Player points not set!");
}

function WhoKnows(type){
	var speed=10;
	var qq=0;
	var tmr;
	A = function () {
		document.getElementById("player").style.left = qq + "px";
		qq+=speed;
		if(qq==350) speed*=-1;
		if(qq==-10) clearInterval(tmr);
	}
	B = function () {
		document.getElementById("enemy").style.left = qq + "px";
		qq-=speed;
		if(qq==-400) speed*=-1;
		if(qq==10) clearInterval(tmr);
	}
	if(type==1) tmr=setInterval(A, 12);
	if(type==2) tmr=setInterval(B, 12);
	
	// direction=5;
	// pos=0;
	// setInterval(function () {
		// document.getElementById("Ann").style.left = pos;
		// pos+=direction;
		// if(pos==350) direction*=-1;
		// if(pos==-10) clearInterval(tmr);
	// }, 10);

}

function AttackMonster(){
	WhoKnows(1);
	Damage=getRandom(0,Player_Strength);			
	ChanceToHit=getRandom(0,Player_Dexterity);
	ChanceToBlock=getRandom(0,Enemy_Dexterity);
	if(ChanceToHit>ChanceToBlock) Enemy_Health-=Damage;
	else Damage=0;
	WriteLog(0,Damage);
	document.estats.etext3.value=Enemy_Health;
	if(GameOver()) return NewGame();
	setTimeout(AttackPlayer, 1000);
}

function AttackPlayer(){
	WhoKnows(2);
	Damage=getRandom(0,Enemy_Strength);
	ChanceToHit=getRandom(0,Enemy_Dexterity);
	ChanceToBlock=getRandom(0,Player_Dexterity);
	if(ChanceToHit>ChanceToBlock) Player_Health-=Damage;
	else Damage=0;
	WriteLog(1,Damage);
	document.pstats.ptext3.value=Player_Health;
	if(GameOver()) return NewGame();
	GlobalLog='\n'+GlobalLog;
	document.fight.log.value=GlobalLog;
	Battle++;
	setTimeout(AttackMonster, 1000);
}

function NewGame(){
	Player_Strength=0;
	Player_Dexterity=0;
	Player_Health=0;
	Player_Points_Left=15;
	Player_Points_Summ=0;
	GlobalLog="";
	Battle=1;
	while(Enemy_Dexterity+Enemy_Health+Enemy_Strength!=15){
		Enemy_Dexterity=getRandom(1,9);
		Enemy_Health=getRandom(1,9);
		Enemy_Strength=getRandom(1,9);
	}
	reload();
}

function reload(){
	document.pstats.ptext1.value=Player_Strength;
	document.pstats.ptext2.value=Player_Dexterity;
	document.pstats.ptext3.value=Player_Health;
	document.pstats.ptext4.value=Player_Points_Left;
	
	document.estats.etext1.value=Enemy_Strength;
	document.estats.etext2.value=Enemy_Dexterity;
	document.estats.etext3.value=Enemy_Health;
	return true;
}

function getRandom(min,max){ return Math.floor(Math.random()*(max-min+1))+min;}