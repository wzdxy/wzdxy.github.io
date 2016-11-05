
window.onload=function(){
	var arrayobj=['a','b','1','3','a','3'];				//原数组
	var newarr=[];										//用于暂存的新数组
	var flag,
		index;

	for (var i = 0; i < arrayobj.length; i++) {
		index=i;
		flag=1;
		for (var j = 0; j < newarr.length; j++) {		//判断新数组是否已存在该元素
			if(arrayobj[index]==newarr[j]){
				flag=0;									//存在则修改flag为0
			}
		};
		if (flag) {										//不存在则压入
			newarr.push(arrayobj[i]);
		};
	};

	// IE8不支持，已弃
	// for (var i = 0; i < arrayobj.length; i++) {		
	// 	if(newarr.indexOf(arrayobj[i])==-1){			//判断新数组是否已存在该元素
	// 		newarr.push(arrayobj[i]);					//不存在则压入
	// 	}
	// };

	arrayobj=newarr;									//替换数组
	var wrap=document.getElementById('wrap');			
	var ndiv=wrap.getElementsByTagName('div');			//获取四个小方块
	for (var i = 0; i < arrayobj.length; i++) {			
		ndiv[i].innerHTML=arrayobj[i];					//修改方块内容
	};
}
