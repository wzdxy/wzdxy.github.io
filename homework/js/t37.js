window.onload=function () {
    
    flyOut("flybtn1","flyout1",getHello(),"今天心情好吗？");
}

function flyOut(flyBtnId,flyOutId,head,text) {
    var flyBtn=document.getElementById(flyBtnId);
    var flyOut=document.getElementById(flyOutId);
    var flyOutHead=flyOut.getElementsByTagName('h4')[0];
    var flyOutText=flyOut.getElementsByTagName('p')[0];
    flyBtn.onclick=function () {        
        flyOutHead.innerHTML=head;
        flyOutText.innerHTML=text;
        flyOut.style.display="block";
        var yBtn=flyOut.getElementsByTagName('button')[0];
        var nBtn=flyOut.getElementsByTagName('button')[1];
        yBtn.onclick=function () {
            document.getElementById('flyoutconsole').innerHTML='愿你每天都有好心情';
            flyOut.style.display="none";
        }
        nBtn.onclick=function () {
            document.getElementById('flyoutconsole').innerHTML='笑一笑，十年少';
            flyOut.style.display="none";
        }
    }
    
}

function getHello() {
    var now=new Date();
    var hours=now.getHours();
    if(hours>17){
        return "晚上好";
    }else if(hours>11){
        return "下午好";
    }else if(hours>8){
        return "上午好";
    }else if(hours>3){
        return "早上好";
    }else{
        return "夜深了";
    }
    
}