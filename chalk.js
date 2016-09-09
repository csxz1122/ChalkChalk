globalchannel = 6


$(document).ready(chalkboard);

function chalkboard(){
	$('#chalkboard').remove();
	$('.chalk').remove();
	$('body').prepend('<canvas id="chalkboard"></canvas>');
	$('body').prepend('<div class="chalk"></div>');
	
	function random(){
		return Math.random()*255;
	}

	$("#red").click(function(){
		globalchannel=2;
	});

	$("#green").click(function(){
		globalchannel=3;
	});

	$("#white").click(function(){
		globalchannel=4;
	});

	$("#rainbow").click(function(){
		globalchannel=6;
	});


	function getRandomColor(channel){
		var letters = '0123456789ABCDEF'.split('');
		var color = '';
		if( channel==6 ){
			for (var i = 0; i<channel; i++){
			color += letters[Math.floor(Math.random()*16)];
		}}
		else if(channel==2){
			color ='rgb(255, 0, 0)';
		}
		else if(channel==3){
			color = 'rgb(0, 153, 0)';
		}
		else if(channel==4){
			color = 'rgb(255, 255, 255)';
		}
		return color;
	};







	var canvas = document.getElementById("chalkboard");
	$('#chalkboard').css('width',$(window).width());
	$('#chalkboard').css('height',$(window).height());
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	
	var ctx = canvas.getContext("2d");
	
	var width = canvas.width;
	var height = canvas.height;
	var mouseX = 0;
	var mouseY = 0;
	var mouseD = false;
	var eraser = false;
	var xLast = 0;
	var yLast = 0;
	var brushDiameter = 7;
	var eraserWidth = 50;
	var eraserHeight = 100;
	
	$('#chalkboard').css('cursor','none');
	document.onselectstart = function(){ return false; };
	ctx.fillStyle = 'rgba(255,25,25,0.5)';	
	ctx.strokeStyle = 'rgba(25,255,30,0.5)';	
    ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';

	document.addEventListener('touchmove', function(evt) {
        var touch = evt.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        if (mouseY < height && mouseX < width) {
            evt.preventDefault();
            $('.chalk').css('left', mouseX + 'px');
            $('.chalk').css('top', mouseY + 'px');
            //$('.chalk').css('display', 'none');
            if (mouseD) {
                draw(mouseX, mouseY);
            }
        }
    }, false);

    document.addEventListener('touchstart', function(evt) {
        //evt.preventDefault();
        var touch = evt.touches[0];
        mouseD = true;
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        xLast = mouseX;
        yLast = mouseY;
        draw(mouseX + 1, mouseY + 1);
    }, false);
    document.addEventListener('touchend', function(evt) {
        mouseD = false;
    }, false);
    $('#chalkboard').css('cursor','none');
	ctx.fillStyle = 'rgba(2,255,0.5)';	
	ctx.strokeStyle = 'getColor(),0.5)';	
    ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';
	
	$(document).mousemove(function(evt){
		mouseX = evt.pageX;
		mouseY = evt.pageY;
		if(mouseY<height && mouseX<width){
			$('.chalk').css('left',(mouseX-0.5*brushDiameter)+'px');
			$('.chalk').css('top',(mouseY-0.5*brushDiameter)+'px');
			if(mouseD){
				if(eraser){
					erase(mouseX,mouseY);
				}else{
					draw(mouseX,mouseY);
					}
				}
		}else{
			$('.chalk').css('top',height-10);
			}
		});
	$(document).mousedown(function(evt){ 
		mouseD = true;
		xLast = mouseX;
		yLast = mouseY;
		if(evt.button == 2){
			erase(mouseX,mouseY);
			eraser = true;
			$('.chalk').addClass('eraser');
		}else{			
			draw(mouseX+1,mouseY+1);
			}
		});
	$(document).mouseup(function(evt){ 
		mouseD = false;
		if(evt.button == 2){
			eraser = false;
			$('.chalk').removeClass('eraser');
			}
		});

	$(document).keyup(function(evt){
		if(evt.keyCode == 32){
				ctx.clearRect(0,0,width,height);
			}
		});

	document.oncontextmenu = function() {return false;};
         
	function draw(x,y){
		ctx.strokeStyle = getRandomColor(globalchannel);
		ctx.beginPath();
  		ctx.moveTo(xLast, yLast);		
  		ctx.lineTo(x, y);
  		ctx.stroke();
         
        //chalk effect
		var length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
		var xUnit = (x-xLast)/length;
		var yUnit = (y-yLast)/length;
		for(var i=0; i<length; i++ ){
			var xCurrent = xLast+(i*xUnit);	
			var yCurrent = yLast+(i*yUnit);
			var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;			
			var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
    		ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
			}

		xLast = x;
		yLast = y;	
		}

	function erase(x,y){
		ctx.clearRect (x-0.5*eraserWidth,y-0.5*eraserHeight,eraserWidth,eraserHeight);
	}

	$(window).resize(function(){
			chalkboard();
		});

	} 

	

