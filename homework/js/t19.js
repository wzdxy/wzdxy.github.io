window.onload=function(){
	numRandom();
	inner();
	onClick();
}
var arrData=new Array();

// 验证输入合法性
var checkNum=function(numToIn){
	var re=/^\d+(.\d+)*$/;
	if (!numToIn||!(re.test(numToIn))||numToIn>100||numToIn<10) {
		alert("请输入一个10~100之间的数字");
		return false;
	}else return true;
}

// 注册点击事件 调用函数
var onClick=function(){
	var li_btn=document.getElementById('l_inbtn');
	var ri_btn=document.getElementById('r_inbtn');
	var lo_btn=document.getElementById('l_outbtn');
	var ro_btn=document.getElementById('r_outbtn');		
	var sort_btn=document.getElementById('sort_btn');		
	var random_btn=document.getElementById('random_btn');
	var clear_btn=document.getElementById('clear_btn');
	li_btn.onclick=function(){
		leftIn();	//左侧进入
	}
	ri_btn.onclick=function(){
		rightIn();	//右侧进入
	}
	lo_btn.onclick=function(){
		leftOut();	//左侧出
	}
	ro_btn.onclick=function(){
		rightOut();	//右侧出
	}
	sort_btn.onclick=function(){  
		var protact_Div=document.getElementById('pro');
		protact_Div.style.display='block';
		sortArr(); //排序
	}
	random_btn.onclick=function(){
		numRandom(); //随机生成数据
	}
	clear_btn.onclick=function(){
		numClear() //清空
	}
}
// 排序
function sortArr(){
	var i=0;
	timer=setInterval(function(){
		if (i==arrData.length) {       //排序完成
			clearInterval(timer);
			inner();
			innerShow();
		};
		if(i<arrData.length){
			for (var j = arrData.length-1; j > i; j--) {				
				if (arrData[i]>arrData[j]) {
					innerLooked(i,j); //填充即将被交换的数值
					var t=arrData[i];
					arrData[i]=arrData[j];
					arrData[j]=t;
				};
			};
			i++;
		}

	},300);
	//clearInterval(timer);
	
}

// 渲染
function inner(){
	var ul=document.getElementById('list');
	var inner='';
	//根据数值大小确定灰度和高度
	for (var i = 0; i < arrData.length; i++) {
		inner+='<li style="background-color:rgb('+Math.ceil(Math.sqrt(arrData[i])*20)+','+Math.ceil(Math.sqrt(arrData[i])*20)+','+Math.ceil(Math.sqrt(arrData[i])*20)+') ;height:'+arrData[i]*5+'px"}><span>'+arrData[i]+'</span></li>';
	};
	ul.innerHTML=inner;
}

// 可视化渲染
function innerLooked(bigIndex,smallIndex){
	var ul=document.getElementById('list');
	var inner='';
	//交换的元素用红色和绿色填充
	for (var i = 0; i < arrData.length; i++) {
		if(i==bigIndex){
			inner+='<li style="height:'+arrData[i]*5+'px;background-color:#f44"}><span style="color:#F44">'+arrData[i]+'</span></li>';	
		}else if(i==smallIndex){
			inner+='<li style="height:'+arrData[i]*5+'px;background-color:#98fb98"}><span style="color:#98fb98">'+arrData[i]+'</span></li>';	
		}else{
			inner+='<li style="background-color:rgb('+Math.ceil(Math.sqrt(arrData[i])*20)+','+Math.ceil(Math.sqrt(arrData[i])*20)+','+Math.ceil(Math.sqrt(arrData[i])*20)+') ;height:'+arrData[i]*5+'px"}><span>'+arrData[i]+'</span></li>';
		}
	};
	ul.innerHTML=inner;
	
}

// 排完了 秀一下
function innerShow(){
	var ul=document.getElementById('list');
	var nLi=ul.getElementsByTagName('li');
	var i=0;
	var r=0;
	var g=0;
	var b=0;
	var full=arrData.length;
	var timer=setInterval(function(){
		if (i==full-1) {
	 		clearInterval(timer);	 
		};
		//计算rgb值
		if(i<full/3){
			r=255;
			g=Math.ceil(255*3*i/full);
			b=0;
		}else if(i<full/2){
			r=Math.ceil(750-i*(250*6/full));
			g=255;
			b=0;
		}else if(i<full*2/3){
			r=0;
			g=255;
			b=Math.ceil(i*(250*6/full)-750);
		}else if(i<full*5/6){
			r=0;
			g=Math.ceil(1250-i*(250*6/full));
			b=255;
		}else{
			r=Math.ceil(150*i*(6/full)-750);
			g=0;
			b=255;
		}
		
		nLi[i].style.backgroundColor='rgb('+r+','+g+','+b+')';
		nLi[i].style.color='rgb('+(r-80)+','+(g-80)+','+(b-80)+')';
		i++;
	},12);
	//去掉提示信息
	var protact_Div=document.getElementById('pro');
	protact_Div.style.display='none';
}

// 随机生成50个数
function numRandom(){
	arrData=Array();
	var m=Math.ceil(Math.random()*60);
	for (var i = 0; i < m; i++) {
		arrData[i] = Math.ceil(Math.random() * 100);
	};
	inner();
}

// 清空
function numClear(){
	arrData=Array();
	inner();
}

//在左边添加
function leftIn(){
	var textBox=document.getElementById('numinput');
	numToIn=parseFloat(textBox.value);
	if (arrData.length>=60) {
		alert("到达上限");
		return 0;
	};
	if (checkNum(numToIn)) {
		arrData.splice(0,0,numToIn);
		inner(arrData);
		textBox.value="";
	};
}
// 在右边添加
function rightIn(){
	var textBox=document.getElementById('numinput');
	numToIn=parseFloat(textBox.value);
	if (arrData.length>=60) {
		alert("到达上限");
		return 0;
	};
	if (checkNum(numToIn)) {
		arrData.push(numToIn);
		inner(arrData);
		textBox.value="";
	};
}

//删除第一个数
function leftOut(){
	if (arrData.length==0) {
		alert("队列已经为空，不能删除");
		return 0;
	};
	var outNum=arrData.shift();
	alert(outNum);
	inner(arrData);
}

//删除最后一个数
function rightOut(){
	if (arrData.length==0) {
		alert("队列已经为空，不能删除");
		return 0;
	};
	var outNum=arrData.pop();
	alert(outNum);
	inner(arrData);
}