/**
 * ²Ù×÷ÒÆ¶¯±ß¿ò
 * @author xiety@ipanel.cn
 * 2012-5-31
 */

var borderMatrixSize = 3;
var borderCenter = {"leftIndex":1,"topIndex":1};
var borderLPosGap = 75;
var borderTPosGap = 73;
var borderLeftOffset =["","","",175,133,103];
var borderTopOffset = ["","","",102,92,60];

function initBorder(_size){	
	resetBorderParameter(_size);
	_geneBorderDiv();
	_setBorderPos();
}

function resetBorderParameter(_size){
	borderMatrixSize = _size-2;
	borderCenter = {"leftIndex":1,"topIndex":1};
}
function _geneBorderDiv(){
	$("gameRegion").innerHTML = $("gameRegion").innerHTML + 
						"<div id='ctlborder' class='border' ></div>";
}

function moveBorder(direction){
	switch(direction){
	case "up":
		if(borderCenter.topIndex!=1)
			borderCenter.topIndex--;
		break;
	case "down":
		if(borderCenter.topIndex != borderMatrixSize )
			borderCenter.topIndex++;		
		break;
	case "left":
		if(borderCenter.leftIndex != 1)
			borderCenter.leftIndex--;
		break;
	case "right":
		if(borderCenter.leftIndex != borderMatrixSize)
			borderCenter.leftIndex++;
		break;
	}
	_setBorderPos();
}

function moveBorderByPos(i,j){
	borderCenter.topIndex = i;
	borderCenter.leftIndex = j;
	_setBorderPos();
}

function _setBorderPos(){
	$("ctlborder").style.opacity= 1;
	$("ctlborder").style.left = (borderLeftOffset[borderMatrixSize]+(borderCenter.leftIndex-1) * borderLPosGap)+"px";
	$("ctlborder").style.top = (borderTopOffset[borderMatrixSize]+(borderCenter.topIndex-1) * borderTPosGap)+"px";	
}