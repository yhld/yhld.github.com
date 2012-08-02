/**
 * 不同颜色的方块
 * @author xiety@ipanel.cn
 * 2012-5-31
 */

var boxBgImg = {"black":"img/box/box_black.png","blue":"img/box/box_blue.png","gray":"img/box/box_gray.png",
				"green":"img/box/box_green.png","purple":"img/box/box_purple.png","red":"img/box/box_red.png",
				"yellow":"img/box/box_yellow.png"};
var boxBgColor = ["black","blue","gray","green","purple","red","yellow"];

var boxLeftPos = [];//方块的left px值
var boxTopPos = [];//方块的top px值
var boxIdMatrix = [];//运行期保存domid的矩阵
var boxColorMatrix = [];//for speed
var boxMatrixSize = 5; //方块矩阵大小如5*5
var boxImgWidth = 77; //每个方块的宽度
var boxImgHeight = 73; // 每个方块的高度
var boxLeftOffset =["","","","","",175,133,103];
var boxTopOffset = ["","","","","",102,92,60];

function initBox(_size){
	
	resetBoxParameter(_size);
	//calculateGameRegion();
	calculateBoxLTPos();
	setGameRegionStyle();
	geneGameRegionBox();
}
function resetBoxParameter(_size){
	boxMatrixSize = _size;
	boxLeftPos = [];
	boxTopPos=[];
	boxIdMatrix = [];
}

function calculateBoxLTPos(){
	for(var i=0; i<boxMatrixSize; i++){
		boxLeftPos[i] = [];
		boxTopPos[i] = [];
		for(var j=0; j<boxMatrixSize; j++){
			boxLeftPos[i][j]= boxImgWidth*j+boxLeftOffset[boxMatrixSize]+"px";
			boxTopPos[i][j]= boxImgHeight*i+boxTopOffset[boxMatrixSize]+"px";
		}
	}
}
function setGameRegionStyle(){
	$("gameRegion").className = "gameRegion matrix"+boxMatrixSize;
}
function geneGameRegionBox(){
	var content = $("gameRegion").innerHTML;
	for(var i=0; i<boxMatrixSize; i++){
		boxIdMatrix[i] = [];
		boxColorMatrix[i]=[];
		for(var j=0; j<boxMatrixSize; j++){	
			boxIdMatrix[i][j] = "box"+i+""+j;
			boxColorMatrix[i][j] = i;
			content += geneOneBoxDiv(boxBgColor[i],i,j);
		}		
	}
	$("gameRegion").innerHTML = content;
}

function geneOneBoxDiv(color,i,j){
	var topPos = "top:"+boxTopPos[i][j]+";";
	var leftPos = "left:"+boxLeftPos[i][j]+";";
	var bgImg = "background-image:url(img/box/box_black.png);";
	if(color && typeof(color)!="undefined")
		bgImg = "background-image:url("+boxBgImg[color]+");"	;		
	var htmlContent = "<div id='box"+i+""+j+"' class='box' style='"+topPos+leftPos+bgImg+"'>" +
					"<input type='hidden' id='box"+i+""+j+"value' value='"+color+"'>"+
					"</div>";
	return htmlContent;
}


function rotateRight(i,j){
	var _tempId = _recordSurroundDomId(i,j);
	var _tempColor = _recordSurroundColor(i,j);
	_movePosition(i-1,j-1,i-1,j);
	_movePosition(i-1,j,i-1,j+1);
	_movePosition(i-1,j+1,i,j+1);
	_movePosition(i,j-1,i-1,j-1);
	_movePosition(i,j+1,i+1,j+1);
	_movePosition(i+1,j-1,i,j-1);
	_movePosition(i+1,j,i+1,j-1);
	_movePosition(i+1,j+1,i+1,j);
	_freshSurrondDomId(i,j,_tempId,1);
	_freshSurroundColor(i,j,_tempColor,1);
	
}
function rotateLeft(i,j){
	var _tempId = _recordSurroundDomId(i,j);
	var _tempColor = _recordSurroundColor(i,j);
	_movePosition(i-1,j-1,i,j-1);
	_movePosition(i-1,j,i-1,j-1);
	_movePosition(i-1,j+1,i-1,j);
	_movePosition(i,j-1,i+1,j-1);
	_movePosition(i,j+1,i-1,j+1);
	_movePosition(i+1,j-1,i+1,j);
	_movePosition(i+1,j,i+1,j+1);
	_movePosition(i+1,j+1,i,j+1);	
	_freshSurrondDomId(i,j,_tempId,-1);
	_freshSurroundColor(i,j,_tempColor,-1);
}
function _movePosition(bi,bj,ti,tj){
	var bibjDomId = boxIdMatrix[bi][bj];//得到要转移位置的domid
	$(bibjDomId).style.top = boxTopPos[ti][tj];
	$(bibjDomId).style.left = boxLeftPos[ti][tj];
}
function _recordSurroundDomId(i,j){
	var _temp = [];
	_temp[0] = boxIdMatrix[i-1][j-1];
	_temp[1] = boxIdMatrix[i-1][j];
	_temp[2] = boxIdMatrix[i-1][j+1];
	_temp[3] = boxIdMatrix[i][j+1];
	_temp[4] = boxIdMatrix[i+1][j+1];
	_temp[5] = boxIdMatrix[i+1][j];
	_temp[6] = boxIdMatrix[i+1][j-1];
	_temp[7] = boxIdMatrix[i][j-1];
	return _temp;
}
function _recordSurroundColor(i,j){
	var _temp = [];
	_temp[0] = boxColorMatrix[i-1][j-1];
	_temp[1] = boxColorMatrix[i-1][j];
	_temp[2] = boxColorMatrix[i-1][j+1];
	_temp[3] = boxColorMatrix[i][j+1];
	_temp[4] = boxColorMatrix[i+1][j+1];
	_temp[5] = boxColorMatrix[i+1][j];
	_temp[6] = boxColorMatrix[i+1][j-1];
	_temp[7] = boxColorMatrix[i][j-1];
	return _temp;
}
function _freshSurrondDomId(i,j,_temp,direction){
	var flag = direction>0;
	boxIdMatrix[i-1][j-1] = flag ?_temp[7]:_temp[1];
	boxIdMatrix[i-1][j] = flag ?_temp[0]:_temp[2];
	boxIdMatrix[i-1][j+1] = flag ?_temp[1]:_temp[3];
	boxIdMatrix[i][j+1] = flag ?_temp[2]:_temp[4];
	boxIdMatrix[i+1][j+1] = flag ?_temp[3]:_temp[5];
	boxIdMatrix[i+1][j] = flag?_temp[4]:_temp[6];
	boxIdMatrix[i+1][j-1] = flag ?_temp[5]:_temp[7];
	boxIdMatrix[i][j-1] = flag ?_temp[6]:_temp[0];
}
function _freshSurroundColor(i,j,_temp,direction){
	var flag = direction>0;
	boxColorMatrix[i-1][j-1] = flag ?_temp[7]:_temp[1];
	boxColorMatrix[i-1][j] = flag ?_temp[0]:_temp[2];
	boxColorMatrix[i-1][j+1] = flag ?_temp[1]:_temp[3];
	boxColorMatrix[i][j+1] = flag ?_temp[2]:_temp[4];
	boxColorMatrix[i+1][j+1] = flag ?_temp[3]:_temp[5];
	boxColorMatrix[i+1][j] = flag?_temp[4]:_temp[6];
	boxColorMatrix[i+1][j-1] = flag ?_temp[5]:_temp[7];
	boxColorMatrix[i][j-1] = flag ?_temp[6]:_temp[0];	
}

function checkTaskFinished(){
	var rFlag = true;
	var cFlag = true;
	for(var i=0; i<boxMatrixSize; i++){
		var rTemp = boxColorMatrix[i][0];
		var cTemp = boxColorMatrix[0][i];
		for(var j=0; j<boxMatrixSize; j++){
			if( rFlag && boxColorMatrix[i][j] != rTemp)
				rFlag = false;
			if( cFlag && boxColorMatrix[j][i] != cTemp )
				cFlag = false;
			if( !( rFlag || cFlag) )
				return false;
		}				
	}
	return true;
	
}


