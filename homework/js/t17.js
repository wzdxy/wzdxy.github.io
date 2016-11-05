/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData; //"2016-01-01":10
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
var formGraTime=document.getElementById('form-gra-time');
var citySelect=document.getElementById("city-select");
var item;
var text="";

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

//添加点击事件
function on(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on'+eventName,listener);
    }
    else
        element['on'+eventName]=listener;
}


/**
 * 渲染图表
 */
function renderChart() {
  var aqiCharWrap=document.getElementById('aqi-chart-wrap');
  var color;
  var inner='';
  var i=0;
  for (var item in chartData) {
    if (chartData[item]<100) {
      color="#98fb98";
      }else if (chartData[item]<200) {
        color="#00bfff";
      }else if (chartData[item]<400) {
        color="#fb3";
      }else {
        color="c00";
      };
    inner+='<div class="chat_item'+i+' "style="height:'+chartData[item]+'px;background-color:'+color+'">'+'<span class="detail">date: '+item+'<br />num: '+chartData[item]+'</span>'+'</div>';
            i++;
  };
  aqiCharWrap.innerHTML=inner;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
    // 设置对应数据
  var ipt=document.getElementsByTagName('input');
  for (var i = 0; i < ipt.length; i++) {
    if(ipt[i].checked&&ipt[i].value!=pageState.nowGraTime){
      pageState.nowGraTime=ipt[i].value;
      initAqiChartData();      
    }
  };


  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
     on(formGraTime,'click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  text='';
  for(item in aqiSourceData){
    text+='<option>'+item+'</option>';
    citySelect.innerHTML=text;
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  on(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData={};
  var sum=0,i=0,char={};
  for(item in aqiSourceData){
    if (citySelect.value==item) {
      char=aqiSourceData[item];
    };
  }
  switch(pageState.nowGraTime){
    case 'day':
      chartData=char;

      break;
    case 'week':
      sum=0;i=0;
      var week=0;
      for(item in char){
        sum+=char[item];
        i++;
        if(new Date(item).getDay()==6){
          week++;
          chartData['2016年第'+week+'周']=parseInt(sum/i);
          i=0;
          sum=0;
        }
      }
      if (i!=0) {
        week++;
        chartData['2016年第'+week+'周']=parseInt(sum/i);
      };
      break;
    case 'month':
      sum=0; i=0;
      var mouth=1;
      for(item in char){
        var date=new Date(item);
        if(date.getMonth()!=mouth){
          mouth=date.getMonth();
          if(sum!=0)
            chartData[date.getFullYear()+'-'+(mouth ? ('0'+mouth) : mouth)]=parseInt(sum/i);
          sum=0;
          i=0;
        }
        sum+=char[item];
        i++;
      }
      if(i!=0){
        mouth++;
        chartData[date.getFullYear()+'-'+(mouth ? ('0'+mouth) : mouth)]=parseInt(sum/i);
      }
      break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();