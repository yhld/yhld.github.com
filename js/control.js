document.onkeydown = grabEvent;
document.onkeypress = grabEvent;
function grabEvent(event){
	 var code = Event(event);
     switch (code) {
     case "KEY_UP":
    	 moveBorder("up");
    	 break;
     case "KEY_DOWN":
    	 moveBorder("down");
    	 break;
     case "KEY_LEFT":
    	 moveBorder("left");
    	 break;
     case "KEY_RIGHT":  	
    	 moveBorder("right");
    	 break;
     case "KEY_NUMBER1":
    	 rotateLeft(borderCenter.topIndex,borderCenter.leftIndex);
    	 recordOneRotatePath(borderCenter.topIndex,borderCenter.leftIndex,-1);
    	 break;
     case "KEY_NUMBER2":
    	 rotateRight(borderCenter.topIndex,borderCenter.leftIndex);
    	 recordOneRotatePath(borderCenter.topIndex,borderCenter.leftIndex,1);
    	 break;
     case "KEY_NUMBER3":
    	 alert( checkTaskFinished() );
    	 break;
     }
	 
	 
	 
	 
 };