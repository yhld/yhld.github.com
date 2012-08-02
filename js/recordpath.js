/*
 * xiety@ipanel.cn
 * 2012-5-31
 * 用来记录用户的每一步记录保证可以回溯,正向随机扰乱获取游戏图
 */
//var onePath = {"CI":1,"CJ":1,"LR":1};//CI== center i pos,CJ center j pos, LR>0 right,LR<0 left
var randomRecordPath = [];

function resetRecordPath(){
	randomRecordPath = [];
}
/**
 * 根据参数随即打乱旋转方块，保证是有解的，并记录每步随即路径
 * @param _len 随即的步数
 */
function randomGenePath(_len){
	for(var i=0; i<_len; i++){
		var onePath = getOneRandomPath();
		randomRecordPath[randomRecordPath.length] = onePath;
		stepOnePath(onePath);
	}
}
/**
 * 每次回溯一步随即路径
 */
function backOneRandomPath(){	
	var onePath = randomRecordPath.pop();
	backStepOnePath(onePath);	
}
/**
 * 慢镜头回溯每一步
 * @param timeout 每一步间隔
 */

function backAllRandomPath(){
	if(randomRecordPath.length > 0){		
		setTimeout(function(){
			backOneRandomPath();
			backAllRandomPath();
		},600);
	}
		
}

function recordOneRotatePath(i,j,LR){
	randomRecordPath[randomRecordPath.length] = {"CI":i,"CJ":j,"LR":LR};
}

function stepOnePath(onePath){	
	moveBorderByPos(onePath.CI, onePath.CJ);
	if(onePath.LR>0)rotateRight(onePath.CI, onePath.CJ);
	else rotateLeft(onePath.CI, onePath.CJ);
}
function backStepOnePath(onePath){
	moveBorderByPos(onePath.CI, onePath.CJ);
	if(onePath.LR<0)rotateRight(onePath.CI, onePath.CJ);
	else rotateLeft(onePath.CI, onePath.CJ);
}
/*
function randomOnePath(){
	var onePath = getOneRandomPath();
	stepOnePath(onePath);
	randomRecordPath[randomRecordPath.length] = onePath;
}

function backRandomPath(){
	var onePath = randomRecordPath.pop();
	moveBorderByPos(onePath.CI, onePath.CJ);
	if(onePath.LR<0)rotateRight(onePath.CI, onePath.CJ);
	else rotateLeft(onePath.CI, onePath.CJ);
}*/

function getOneRandomPath(){
	var CI = _randomCI();
	var CJ = _randomCJ();
	var LR = _randomLR();
	return {"CI":CI,"CJ":CJ,"LR":LR};
}

function _randomCI(){
	return Math.floor( (Math.random()*10)%(boxMatrixSize-2) ) +1;
}
function _randomCJ(){
	return Math.floor( (Math.random()*10)%(boxMatrixSize-2) )+1;
}
function _randomLR(){
	return (Math.random()>0.5)? 1: -1;
}
