'use strict'
var container = document.getElementById("container")
var width = container.offsetWidth;
var height = container.offsetHeight;
var canvas = document.getElementById("rainCanvas");
var ctx = canvas.getContext("2d");

var particles = [];
var bannerX = 0;
var bannerY = 0;
var bannerWidth = 0;
var bannerHeight = 0;

var init = function() {
	registerEvents();
	setCanvasSize();
	
	// # particles, radius, speed, wind
	createParticles(150, 5, 2, 1);
	
	render();

};

var registerEvents = function() {
	window.addEventListener("resize", function() {
		resize();
	});
};

var resize = function() {
	setCanvasSize();
};

var setCanvasSize = function() {
	width = container.offsetWidth;
	height = container.offsetHeight;

	ctx.canvas.width = width;
	ctx.canvas.height = height;
};



// 0 radians is 3 oclock position
// Converts angle into radians
var drawCircle = function(x,y,radius){
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);

	
	ctx.shadowBlur=20;
	ctx.shadowColor="white";
	ctx.fillStyle = "white";
	ctx.fill();

};

var drawFlake = function(x,y,lineLength, n) {
	
	
	var theta = (2*Math.PI)/n;
		
	ctx.strokeStyle = "white";
	// ctx.shadowBlur=30;
	ctx.shadowColor="white";

	for (var i =0; i < n; i++) {

		var dx = Math.round((lineLength/2) * Math.cos(theta*i));
		var dy = Math.round((lineLength/2) * Math.sin(theta*i));
			
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo((x + dx), (y + dy));
		ctx.stroke();			
	}
		

};


var fillBoxAnim = function(boxWidth, boxHeight, percentage){
	bannerX = (width/2) - (boxWidth/2);
	bannerY = (height - 60);
	bannerWidth = boxWidth;
	bannerHeight = boxHeight;
	ctx.shadowBlur=20;
	ctx.shadowColor = "white";
	ctx.fillStyle = "black";
	
	ctx.rect(bannerX, bannerY, bannerWidth, (percentage) * bannerHeight);
	ctx.fill();

};



var percent = 0;


var render = function() {
	ctx.clearRect(0,0,width,height);
	
	requestAnimationFrame(render); 

   
 	for (var i = 0; i < particles.length; i++) {
 		
 		
		if (particles[i].position.y >= height + particles[i].radius) {

 			 particles[i].position.y = 0 - particles[i].radius;
 			 if (percent < 100) {
 			 	percent += 1;
 			 }

 		}
 		if (particles[i].position.x >= width + particles[i].radius) {

 			 particles[i].position.x = 0 - particles[i].radius;
 			 if (percent < 100) {
 			 	percent += 1;
 			 }

 		}
			// drawFlake(particles[i].position.x += particles[i].speed.x , 
 		// 		  	 particles[i].position.y += particles[i].speed.y, 
 		// 		   	particles[i].radius, 6);
	
		
		drawCircle(particles[i].position.x += particles[i].speed.x , 
			   	   particles[i].position.y += particles[i].speed.y, 
 				   particles[i].radius);
		
 	}
    
  

};

var Particle = function() {
	this.radius = 5;
	this.position = {x: 0, y: 0};
	this.speed = {x: 0, y: 0};

}

var createParticles = function(numParticles, radius, speed, wind) {
	
	for (var i = 0; i < numParticles; i++) {
		var p = new Particle();
		p.radius = (Math.random() * radius) + 1;
		p.position.x = Math.random() * width;
		p.position.y = -1 * Math.random()*height;
		p.speed.y = 2 + (speed * Math.random());
		p.speed.x = (0.5 * wind) - (wind * Math.random());

		particles.push(p);
	}
};
init();
