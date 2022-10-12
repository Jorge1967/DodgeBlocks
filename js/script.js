 
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
var contezt = canvas.getContext("2d");
var conteyt = canvas.getContext("2d");
var canvasPos = getPosition(canvas);
var hit = false;
var startGame = 0;
var score = 0;
var highScore = 0;
var pwidth  = canvas.width = window.innerWidth-30;
var pheight = canvas.height = window.innerHeight-10;
var mouseX = 360; // pwidth-100;
var mouseY = 400; // pheight-50;
var music  = new Audio('audio1.mp3');
var soniON = true;
colorball  = "#FFFFFF";
opagrafico = 1;
opagrafic2 = 1;
xspeed     = 1;
xsonido    = true;
canvas.addEventListener("mousemove", setMousePosition, false);
canvas.addEventListener("touchmove", setMousePositionTouch, false );

class fallingRectangle{
	constructor(){
		this.xPosition = Math.floor(Math.random()*pwidth-100); 
		this.yPosition = (Math.floor(Math.random()*pheight+20))*-1;
		this.zPosition = Math.floor(Math.random()*pwidth-100); 
		this.vPosition = (Math.floor(Math.random()*pheight+20))*-1;
		this.width  = Math.floor(Math.random()*60+20);
		this.height = 15;
		this.speed  = xspeed; 
	}
	create(){
		context.fillStyle = "rgba(0, 0, 128, "+opagrafico+")";
		context.fillRect(this.xPosition,this.yPosition,this.width+35,this.height+15);
		context.fillStyle = "rgba(128, 0, 0, "+opagrafic2+")";
		contezt.fillRect(this.zPosition,this.vPosition,this.width+35,this.height+15);
	}
	move(){
		this.yPosition = this.yPosition + xspeed;
		this.vPosition = this.vPosition + xspeed;
	}
	touchEdge(){
		if(this.yPosition > 600){
			this.yPosition = (Math.floor(Math.random()*(pheight-80))) *-1;
			this.xPosition= Math.floor(Math.random()*pwidth);
			this.vPosition = (Math.floor(Math.random()*(pheight-80))) *-1;
			this.zPosition= Math.floor(Math.random()*pwidth);
			if(this.speed < 8){
				this.speed = xspeed + .1; 
			}
		}
	}
	touchCursor(){
		if( (mouseX >= this.xPosition && mouseX <= this.xPosition+this.width) && (mouseY>=this.yPosition && mouseY <= this.yPosition+this.height) ){
			hit = true;
		}else if( (mouseX>=this.zPosition && mouseX <= this.zPosition+this.width) && (mouseY>=this.vPosition && mouseY <= this.vPosition+this.height) ){
			hit = true;
		}
	}
	resetBlock(){
		this.xPosition = Math.floor(Math.random() * pwidth-100); 
		this.yPosition = (Math.floor(Math.random() * pheight+20)) *-1;
		this.zPosition = Math.floor(Math.random() * pwidth-100); 
		this.vPosition = (Math.floor(Math.random() * pheight+20)) *-1;
		this.width  = Math.floor(Math.random() * 60+20);
		this.height = 15;
		this.speed  = xspeed; 
	}
}
var rectangleList=[];
var xrectangleLis=[];
var fallingRect1 = new fallingRectangle;
for (var i = 0; i < 20; i++) { 
  rectangleList[i] = new fallingRectangle;
  xrectangleLis[i] = new fallingRectangle;
}
// main function
function update() {
	if(startGame > 0) {
		if (mouseY<(pheight/2)+20) {
			mouseX = this.xPosition;	//canvas.width/2;
			mouseY = this.yPosition;	//canvas.height/2;
		}
		ball();
		fallingRect();
		displayTime();
		gameOver();
		score = score + .01;;
	}
}
//Time
function displayTime() {
	if(hit == false){
		context.font="30px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.marginTop = "50%";
		context.fillText(score.toFixed(2), canvas.width/2, 75);

		context.lineWidth = 5;
		context.strokeStyle = "#FFFFFF";
		context.beginPath();
		context.moveTo(20,(pheight/2));
		context.lineTo(pwidth+100,(pheight/2));
		context.stroke();
	}
}
//rectangles falling
function fallingRect() {
	if(hit == false){
		for (var i = 0; i < 5; i++) { 
			rectangleList[i].create();
			rectangleList[i].move();
			rectangleList[i].touchEdge();
			rectangleList[i].touchCursor();
			xrectangleLis[i].create();
			xrectangleLis[i].move();
			xrectangleLis[i].touchEdge();
			xrectangleLis[i].touchCursor();
		}
	}
}
//ball display
function ball() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(mouseX, mouseY, 18, 0, 2 * Math.PI, true);
	context.fillStyle = colorball;
	context.fill();
	context.closePath();
}

//game over function
function gameOver() {
	if(hit){
    document.getElementById("myFilter").style.display = "block";
    if(score > highScore){
      highScore = score;
    }
		context.font="40px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("Game Over", canvas.width/2, canvas.height/2);
    
		context.font="40px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("Score: "+score.toFixed(2), canvas.width/2, canvas.height/2 +50);
    
		for (var i = 0; i < 20; i++) { 
			rectangleList[i].resetBlock();
		}
		startGame = 0;
		score = 0;
		sonido(xsonido);
	}
}

//for proper mouse postitioning
function setMousePosition(e) {
	mouseX = e.clientX; // - canvasPos.x;
	mouseY = e.clientY; // - canvasPos.y;
} 

function getPosition(el) {
	var xPosition = 0;
	var yPosition = 0;
	while (el) {
		xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}    

function setMousePositionTouch(e) {
	mouseX =  e.touches[0].clientX - canvasPos.x;;
	mouseY =  e.touches[0].clientY - canvasPos.y;
} 
function boton() {
  document.getElementById("panta").style.display = "none";
  document.getElementById("range").style.display  = "block";
  document.getElementById("botones").style.display  = "block";
}

function botonOPC2() {
  document.getElementById("menuOpc2").style.display = "inline";
}
function opcOK1(){
  document.getElementById("menuOpc1").style.display = "none";
}
function opcOK2(){
  document.getElementById("menuOpc2").style.display = "none";
}

//Selection Bar
function botonOPC1() {
  document.getElementById("menuOpc1").style.display = "inline";
//  conteyt.fillStyle = fillcolor1;
//  conteyt.fillRect(this.width+35,this.height+15);
}
function opcgrafBar(e) {
  ult = e.substr(-1);
  pri = e.substr(0,1);
  xid = ult=='0' ? '_A' : '_R';
  for (var i = 1; i < 6; i++) {
    nid = xid + i + ult;
    oEl = document.getElementById(nid);
    oEl.className = "graficopc11";
  }
  xid = xid+e;
  oEl = document.getElementById(xid);
  oEl.className = "graficopc00";
	opag = (pri=='1')?1:(pri=='2')?.8:(pri=='3')?.6:(pri=='4')?.4:.2;
  if (ult=='0') {
	  opagrafico = opag;
  }else {
	  opagrafic2 = opag;
  }
  fallingRect();
}

function opcgrafBall(e) {
	xop = ['B','N','R','A'];
  xid = 'cir';
  for (var i = 0; i < 4; i++) {
    nid = xid + xop[i];
    oElem = document.getElementById(nid);
    oElem.className = "graficopc1";
  }
  xid = xid+e;
  oElem = document.getElementById(xid);
  oElem.className = "graficopc0";
  validopc(e);
}
function validopc(e){
	colorball=(e=='B')?'#FFFFFF':(e=='N')?'#000000':(e=='A')?'#000080':'#800000';
  update();
}
function sonido(valor){
	if (valor) {
		music.play();
	}else {
		music.pause();
	}
}
function opcAudioON(){
	document.getElementById("audioON").style.display  = "none";
	document.getElementById("audioOFF").style.display  = "inline";
	xsonido = false;
	sonido(xsonido);
}
function opcAudioOFF(){
	document.getElementById("audioOFF").style.display  = "none";
	document.getElementById("audioON").style.display  = "inline";
	xsonido = true;
	sonido(xsonido);
}

function sliderOpc(e){
	xspeed=(e=='0')?1:(e=='30')?2:(e=='60')?3:4;
  update();
}

//play function
function start(){
  if(startGame == 0){
    document.getElementById("myFilter").style.display = "none";
    document.getElementById("audioON").style.display  = "inline";
		hit = false;
		startGame++;
		sonido(xsonido);
  }
}
var framesPer = setInterval(update, 500/60);
