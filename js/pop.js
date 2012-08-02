
/**
 * @author xiety@ipanel.cn
 * 弹出框处理暂停,游戏结束等消息
 */

var popDivShowFlag = false;
var popDivDomId = "popDiv";
var victoryDomId = "victoryDiv";
var popDialogDomId = "popDialog";

function showDialogAfterVictory(){
	_showPopDiv();
	_showVictory(_showPopDialog);
	
}


function _showPopDiv(){
	$(popDivDomId).className= "popDiv popDivShow";
}
function _hidePopDiv(){
	$(popDivDomId).className= "popDiv popDivHidden";
}
function _showPopDialog(){
	$(popDialogDomId).className = "popDialog popDialogShow";
	setTimeout(function(){_hidePopDialog();_hidePopDiv();},2000);
}
function _hidePopDialog(){
	$(popDialogDomId).className = "popDialog popDialogHidden";	
}
function _showVictory(func){
	setTimeout(function(){$(victoryDomId).className= "victoryDialog victoryAnimate1";},100);
	setTimeout(function(){$(victoryDomId).className= "victoryDialog victoryAnimate2";},200);
	setTimeout(function(){$(victoryDomId).className= "victoryDialog victoryAnimate3";},300);
	//setTimeout(function(){$(victoryDomId).className= "victoryDialog victoryAnimate4";},400);
	setTimeout(function(){$(victoryDomId).className= "victoryDialog victoryAnimate5";},400);
	setTimeout(function(){_hideVictory(func); },2000);

}
function _hideVictory(func){
	$(victoryDomId).className= "victoryDialogHidden";
	if(func) func();
}

