/*
 * showList对象的作用就是控制在页面列表数据信息上下滚动切换以及翻页；
 * @__listSize    列表显示的长度；
 * @__dataSize    所有数据的长度；
 * @__position    数据焦点的位置；
 * @__startplace  页面焦点Div开始位置的TOP值；
 */
function showList(__listSize, __dataSize, __position, __startplace, f){
	this.listSize = __listSize;  //列表显示的长度；
	this.dataSize = __dataSize;  //所有数据的长度；
	this.position = __position;  //数据焦点的位置；
	this.tempSize = this.dataSize<this.listSize?this.dataSize:this.listSize;
	this.focusPos = this.dataSize-this.position<this.tempSize?this.tempSize-(this.dataSize-this.position):0; //页面焦点的位置；

	this.listHigh = null;  //列表中每个行的高度，可以是数据或者数组，例如：40 或 [40,41,41,40,42];
	this.focusDiv = null;  //页面焦点的ID名称或者定义为滑动对象，例如："focusDiv" 或 new showSlip("focusDiv",0,3,40);
	this.focusPlace = new Array();  //记录每行页面焦点的位置值；
	this.startPlace = __startplace;	 //页面焦点Div开始位置的TOP值；
	
	this.haveData = function(){}; //在显示列表信息时，有数据信息就会调用该方法；
	this.notData = function(){}; //在显示列表信息时，无数据信息就会调用该方法；
	//调用以上两个方法都会收到参数为{idPos:Num, dataPos:Num}的对象，该对象属性idPos为页面焦点的值，属性dataPos为数据焦点的值；
	
	this.focusUp  = function(){this.changeList(-1);}; //焦点向上移动；
	this.focusDown= function(){this.changeList(1); }; //焦点向下移动；
	this.pageUp   = function(){this.changePage(-1);}; //列表向上鄱页；
	this.pageDown = function(){this.changePage(1); }; //列表向下鄱页；
	
	//开始显示列表信息
	this.startShow = function(){
		this.focusPlace[0]= this.startPlace;
		if(typeof(this.listHigh)=="number"){
			for(var i=1; i<this.listSize; i++) this.focusPlace[i] = this.listHigh*i+this.startPlace;
		}else if(typeof(this.listHigh)=="object"){
			for(var i=1; i<this.listSize; i++) this.focusPlace[i] = typeof(this.listHigh[i-1])=="undefined"?this.listHigh[this.listHigh.length-1]+this.focusPlace[i-1]:this.listHigh[i-1]+this.focusPlace[i-1];
		}
		if(typeof(this.focusDiv)=="string"){
			if (typeof(f) == "object"){
				f.document.getElementById(this.focusDiv).style.top = this.focusPlace[this.focusPos]
			} else {
				document.getElementById(this.focusDiv).style.top = this.focusPlace[this.focusPos];
			}
		}else{
			this.focusDiv.tunePlace(this.focusPlace[this.focusPos]);
		}
		this.showList();
	}
	//切换数据焦点的位置
	this.changeList = function(__num){
		if(this.position+__num<0||this.position+__num>this.dataSize-1) return;
		this.position += __num;
		if(this.focusPos+__num<0||this.focusPos+__num>this.listSize-1){
			this.showList();
		}else{
			this.changeFocus(__num);
		}	
	}
	//切换页面列表翻页
	this.changePage = function(__num){
		var tempPos = this.position-this.focusPos;
		if((tempPos==0 && __num<0)||(tempPos==this.dataSize-this.tempSize && __num>0)) return;
		tempPos += __num*this.tempSize;
		if(tempPos<0){
			tempPos = 0;
		}else if(tempPos>this.dataSize-this.tempSize){
			tempPos = this.dataSize-this.tempSize;
		}
		if(this.focusPos!=0) this.changeFocus(this.focusPos*-1);
		this.position = tempPos;
		this.showList();
	}
	//切换页面焦点的位置
	this.changeFocus = function(__num){
		this.focusPos += __num;		
		if(typeof(this.focusDiv)=="string"){
			if (typeof(f) == "object"){
				f.document.getElementById(this.focusDiv).style.top = this.focusPlace[this.focusPos];
			} else {
				document.getElementById(this.focusDiv).style.top = this.focusPlace[this.focusPos];
			}
		}else{
			this.focusDiv.moveStart(__num/Math.abs(__num), Math.abs(this.focusPlace[this.focusPos-__num]-this.focusPlace[this.focusPos]));
		}
	}
	//显示列表信息
	this.showList = function(){
		var tempPos = this.position-this.focusPos;
		for(var i=tempPos; i<tempPos+this.listSize; i++){
			if(i<this.dataSize){
				this.haveData({idPos:i-tempPos, dataPos:i});
			}else{
				this.notData({idPos:i-tempPos, dataPos:i});
			}
		}
	}
}

/*
 * showSlip对象的作用就是控制Div层的滑动；
 * @__name  所要滑动对象的ID名称；
 * @__sign  “0”表示上下滑动，“1”表示左右滑动；
 * @__delay 此值是控制步长的，每次滑动的步长就是到终点所剩距离的__delay分之一,默认值(4)；
 * @__time  滑动间隔时间,默认值(40)；
 */
function showSlip(__name, __sign, __delay, __time, f){
	if (typeof(f) == "object"){
		this.moveObj = f.document.getElementById(__name); //所要滑动的对象；
	} else {
		this.moveObj = document.getElementById(__name); //所要滑动的对象；
	}
	this.moveSize = 500;    //每一次滑动的距离；
	this.moveType = 1;      //1表是正向滑动，-1表是反向滑动；
	this.moveSign = __sign; //0表示top属性，1表示left属性；

	this.endPlace  = (this.moveSign==0)?this.moveObj.style.top:this.moveObj.style.left; //滑动结束位置；
	this.currPlace = this.endPlace; //滑动当前位置；

	this.moveLoad = null;
	this.spaceTime = __time;   //滑动间隔时间,默认值(40)；
	this.delayValue= __delay;  //此值是控制步长的，每次滑动的步长就是到终点所剩距离的this.delayValue分之一,默认值(4)；
	//开始滑动对象
	this.moveStart = function(__type, __size){
		iPanel.debug("__type = " + __type);
		iPanel.debug("__size = " + __size);
		this.moveStop();
		this.moveType = __type;
		this.moveSize = __size;
		this.endPlace += this.moveSize*this.moveType;
		this.moveGoto();
	}
	//计算当前要滑动的位置
	this.moveGoto = function(){
		var tempStep = Math.ceil(Math.abs((this.endPlace-this.currPlace)/this.delayValue))*this.moveType; //计算步长
		this.currPlace += tempStep;
		if((this.moveType==-1&&this.currPlace<=this.endPlace)||(this.moveType==1&&this.currPlace>=this.endPlace)||tempStep==0){ //判断是否到达终点
			this.currPlace = this.endPlace;
			this.setcurrPlace();
		}else{
			var self = this;
			this.setcurrPlace();
			this.moveLoad = window.setTimeout(function(){self.moveGoto();},this.spaceTime);
		}
	}
	//设置滑动对象的位置
	this.setcurrPlace = function(){
		if(this.moveSign==0){
			this.moveObj.style.top = this.currPlace;
		}else{
			this.moveObj.style.left= this.currPlace;
		}
	}
	//调整对象位置，参数__num是将要调整位置的值
	this.tunePlace = function(__num){
		this.endPlace  = __num; 
		this.currPlace = this.endPlace;
		this.setcurrPlace();
	}
	//对象停止滑动
	this.moveStop = function(){ window.clearTimeout(this.moveLoad);}
}