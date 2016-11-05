window.onload=function () {
    var sortChart=document.getElementById('sortchat1');    
    innerChart(data,sortChart);     //渲染表格
    chartClick(sortChart);          //注册点击事件
    
}

var flag=-1;
function sortData(data,sortChart,propToSortBy) {    
    if(propToSortBy=='name'){                               
        return 0;
    }    
    data.sort(by(propToSortBy,flag));                       //用sort函数给data排序
    innerChart(data,sortChart);                             //排序完成后重新渲染
    chartClick(sortChart);                                  //重新注册点击事件
    var targetTd=document.getElementById(propToSortBy);     //给表头设置已排序标志并切换flag
    if (flag==1) {
        flag=-1;
        targetTd.setAttribute('class','sortdown');
    }else{
        flag=1;
        targetTd.setAttribute('class','sortup');
    }
}

//注册表头点击事件
function chartClick(sortChart) {                            
    var row=sortChart.getElementsByTagName('tr')[0];
    row.onclick=function (ev) {
        //var ev=event||ev;
        
        var target=ev.target||ev.srcElement;
        if(target.tagName.toLowerCase()=='th'){
            sortData(data,sortChart,target.id);     
        }
    }    
}

//创建表格，参数为源数据data和目标表格sortChart
function innerChart(data,sortChart) {     
    sortChart.innerHTML='';
    var fragment=document.createDocumentFragment();     //暂存仓库
    for (var i = 0; i < data.length; i++) {             //根据数组长度创建各行
        var tr=document.createElement('tr');
        for(var prop in data[i]){                       //创建行内单元格
            var td;
            if(i==0){                                   //表头
                td=document.createElement('th');
                td.setAttribute("id",prop);                
            }else{                                      //内容
                td=document.createElement('td');
            }                        
            td.innerHTML=data[i][prop];                 
            tr.appendChild(td);                         //将单元格插入行
        }
        fragment.appendChild(tr);                       //将行存入仓库
    }
    sortChart.appendChild(fragment);                    //填充表格
}

//排序的函数
function by(propname,flag) {
    return function (o,p) {
        var a=o[propname],b=p[propname];
        if (a==b||typeof(a)!='number'||typeof(b)!='number') {
            return 0;
        }else if(flag==-1){
            return a>b?1:-1;
        }else if(flag==1){
            return a>b?-1:1;
        }else{
            return 0;
        }
    }
}



var data=[
    {
        name:"姓名",
        math:"数学",
        english:"英语",
        computer:"计算机",
    },
    {
        name:"张三",
        math:80,
        english:50,
        computer:33,
    },
    {
        name:"李四",
        math:70,
        english:60,
        computer:100,
    },
    {
        name:"王五",
        math:40,
        english:80,
        computer:50,
    },
    {
        name:"六六",
        math:44,
        english:89,
        computer:60,
    },
    {
        name:"呵呵",
        math:99,
        english:99,
        computer:99,
    },
    {
        name:"逗比",
        math:100,
        english:5,
        computer:20,
    },
    {
        name:"嘻嘻嘻",
        math:10,
        english:75,
        computer:34,
    },
];


