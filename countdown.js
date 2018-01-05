var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 6;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018,1,1,0,0,0);
var curShowTimeSeconds = 0;


window.onload = function(){



    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d"); //define context


    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render(context);
            update();
        },
        50
    );
}


function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret  = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);

    return ret>=0 ? ret : 0;
}



function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds(); //calculate the remaining seconds
    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds = curShowTimeSeconds%60;

    if(nextSeconds != curSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds;
    }


}


function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds/3600); //remaining hours
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = curShowTimeSeconds%60;

    //2 digits for hours
    // renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    // renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    // renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    // renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    // renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    // renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    // renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    // renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    //3 digits for hours
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/100) , cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt((hours-parseInt(hours/100)*100)/10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );


    renderDigit( MARGIN_LEFT + 45*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 84*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 108*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);


}

function renderDigit(x,y,num, cxt){
    cxt.fillStyle = "rgb(46, 134, 193)";//define color

    for (var i=0; i< digit[num].length; i++) {
        for (var j=0; j<digit[num][i].length; j++) {
            if(digit[num][i][j]===1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS, 0, 2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }

    }
}