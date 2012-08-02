/*
 * showList��������þ��ǿ�����ҳ���б�������Ϣ���¹����л��Լ���ҳ��
 * @__listSize    �б���ʾ�ĳ��ȣ�
 * @__dataSize    �������ݵĳ��ȣ�
 * @__position    ���ݽ����λ�ã�
 * @__startplace  ҳ�潹��Div��ʼλ�õ�TOPֵ��
 */
function showList(__listSize, __dataSize, __position, __startplace, f){
	this.listSize = __listSize;  //�б���ʾ�ĳ��ȣ�
	this.dataSize = __dataSize;  //�������ݵĳ��ȣ�
	this.position = __position;  //���ݽ����λ�ã�
	this.tempSize = this.dataSize<this.listSize?this.dataSize:this.listSize;
	this.focusPos = this.dataSize-this.position<this.tempSize?this.tempSize-(this.dataSize-this.position):0; //ҳ�潹���λ�ã�

	this.listHigh = null;  //�б���ÿ���еĸ߶ȣ����������ݻ������飬���磺40 �� [40,41,41,40,42];
	this.focusDiv = null;  //ҳ�潹���ID���ƻ��߶���Ϊ�����������磺"focusDiv" �� new showSlip("focusDiv",0,3,40);
	this.focusPlace = new Array();  //��¼ÿ��ҳ�潹���λ��ֵ��
	this.startPlace = __startplace;	 //ҳ�潹��Div��ʼλ�õ�TOPֵ��
	
	this.haveData = function(){}; //����ʾ�б���Ϣʱ����������Ϣ�ͻ���ø÷�����
	this.notData = function(){}; //����ʾ�б���Ϣʱ����������Ϣ�ͻ���ø÷�����
	//���������������������յ�����Ϊ{idPos:Num, dataPos:Num}�Ķ��󣬸ö�������idPosΪҳ�潹���ֵ������dataPosΪ���ݽ����ֵ��
	
	this.focusUp  = function(){this.changeList(-1);}; //���������ƶ���
	this.focusDown= function(){this.changeList(1); }; //���������ƶ���
	this.pageUp   = function(){this.changePage(-1);}; //�б�����۶ҳ��
	this.pageDown = function(){this.changePage(1); }; //�б�����۶ҳ��
	
	//��ʼ��ʾ�б���Ϣ
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
	//�л����ݽ����λ��
	this.changeList = function(__num){
		if(this.position+__num<0||this.position+__num>this.dataSize-1) return;
		this.position += __num;
		if(this.focusPos+__num<0||this.focusPos+__num>this.listSize-1){
			this.showList();
		}else{
			this.changeFocus(__num);
		}	
	}
	//�л�ҳ���б�ҳ
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
	//�л�ҳ�潹���λ��
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
	//��ʾ�б���Ϣ
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
 * showSlip��������þ��ǿ���Div��Ļ�����
 * @__name  ��Ҫ���������ID���ƣ�
 * @__sign  ��0����ʾ���»�������1����ʾ���һ�����
 * @__delay ��ֵ�ǿ��Ʋ����ģ�ÿ�λ����Ĳ������ǵ��յ���ʣ�����__delay��֮һ,Ĭ��ֵ(4)��
 * @__time  �������ʱ��,Ĭ��ֵ(40)��
 */
function showSlip(__name, __sign, __delay, __time, f){
	if (typeof(f) == "object"){
		this.moveObj = f.document.getElementById(__name); //��Ҫ�����Ķ���
	} else {
		this.moveObj = document.getElementById(__name); //��Ҫ�����Ķ���
	}
	this.moveSize = 500;    //ÿһ�λ����ľ��룻
	this.moveType = 1;      //1�������򻬶���-1���Ƿ��򻬶���
	this.moveSign = __sign; //0��ʾtop���ԣ�1��ʾleft���ԣ�

	this.endPlace  = (this.moveSign==0)?this.moveObj.style.top:this.moveObj.style.left; //��������λ�ã�
	this.currPlace = this.endPlace; //������ǰλ�ã�

	this.moveLoad = null;
	this.spaceTime = __time;   //�������ʱ��,Ĭ��ֵ(40)��
	this.delayValue= __delay;  //��ֵ�ǿ��Ʋ����ģ�ÿ�λ����Ĳ������ǵ��յ���ʣ�����this.delayValue��֮һ,Ĭ��ֵ(4)��
	//��ʼ��������
	this.moveStart = function(__type, __size){
		iPanel.debug("__type = " + __type);
		iPanel.debug("__size = " + __size);
		this.moveStop();
		this.moveType = __type;
		this.moveSize = __size;
		this.endPlace += this.moveSize*this.moveType;
		this.moveGoto();
	}
	//���㵱ǰҪ������λ��
	this.moveGoto = function(){
		var tempStep = Math.ceil(Math.abs((this.endPlace-this.currPlace)/this.delayValue))*this.moveType; //���㲽��
		this.currPlace += tempStep;
		if((this.moveType==-1&&this.currPlace<=this.endPlace)||(this.moveType==1&&this.currPlace>=this.endPlace)||tempStep==0){ //�ж��Ƿ񵽴��յ�
			this.currPlace = this.endPlace;
			this.setcurrPlace();
		}else{
			var self = this;
			this.setcurrPlace();
			this.moveLoad = window.setTimeout(function(){self.moveGoto();},this.spaceTime);
		}
	}
	//���û��������λ��
	this.setcurrPlace = function(){
		if(this.moveSign==0){
			this.moveObj.style.top = this.currPlace;
		}else{
			this.moveObj.style.left= this.currPlace;
		}
	}
	//��������λ�ã�����__num�ǽ�Ҫ����λ�õ�ֵ
	this.tunePlace = function(__num){
		this.endPlace  = __num; 
		this.currPlace = this.endPlace;
		this.setcurrPlace();
	}
	//����ֹͣ����
	this.moveStop = function(){ window.clearTimeout(this.moveLoad);}
}