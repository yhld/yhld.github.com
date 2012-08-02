/*
 * xiety@ipanel.cn
 * 2012-5-31
 * ������¼�û���ÿһ����¼��֤���Ի���,����������һ�ȡ��Ϸͼ
 */
//var onePath = {"CI":1,"CJ":1,"LR":1};//CI== center i pos,CJ center j pos, LR>0 right,LR<0 left
var randomRecordPath = [];

function resetRecordPath(){
	randomRecordPath = [];
}
/**
 * ���ݲ����漴������ת���飬��֤���н�ģ�����¼ÿ���漴·��
 * @param _len �漴�Ĳ���
 */
function randomGenePath(_len){
	for(var i=0; i<_len; i++){
		var onePath = getOneRandomPath();
		randomRecordPath[randomRecordPath.length] = onePath;
		stepOnePath(onePath);
	}
}
/**
 * ÿ�λ���һ���漴·��
 */
function backOneRandomPath(){	
	var onePath = randomRecordPath.pop();
	backStepOnePath(onePath);	
}
/**
 * ����ͷ����ÿһ��
 * @param timeout ÿһ�����
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
