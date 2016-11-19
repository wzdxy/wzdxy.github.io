/**
 * Created by Z on 2016/11/19.
 */
let linkageSelect=function (select,options) {
    this.ele=$(select);
    this.data=options.data;
    this.maxDepth=options.depth;
    this.selects=[];
};
linkageSelect.prototype={
    init:function () {
        // this.createSelect(0,this.data);
        let select=$('<select></select>');
        $(select).addClass('form-control select-level-'+0);
        $(select).attr('select-level',0);
        let html='';
        let array=[];
        for(let i=0,m=this.data.length;i<m;i++){
            html+='<option>'+this.data[i].name+'</option>';
            array.push(this.data[i].name);
        };
        $(select).html(html);
        $(select).select('refresh');
        this.ele.append($(select));
        this.selects.push({
            level:0,
            data:array
        });

        for(let i=1;i<this.maxDepth;i++){
            let select=$('<select></select>');
            $(select).addClass('form-control select-level-'+i);
            $(select).attr('select-level',i);
            $(select).html('<option>请选择上一级</option>');
            this.ele.append($(select));
        }
        this.ele.find('select').bind('change',function (e) {
            let selectLevel=e.target.getAttribute('select-level'));
            
        })
    },
    createSelect:function (depth,data) {
        let select=$('<select></select>');
        $(select).addClass('form-control select-level-'+0);
        let html='';
        let array=[];
        for(let i=0,m=data.length;i<m;i++){
            html+='<option>'+data[i].name+'</option>';
            array.push(data[i].name);
        };
        $(select).html(html);
        $(select).select('refresh');
        this.ele.append($(select));
        this.selects.push({
            level:depth,
            data:array
        });
        for(let i=1;i<this.maxDepth;i++){
            let select=$('<select></select>');
            $(select).addClass('form-control select-level-'+i);
            $(select).html('<option>请选择上一级</option>');
            this.ele.append($(select));
        }
    },
}

;$(function () {
    let select=new linkageSelect('#mySelect',{
        data:[
            {
                name: 'hlj',
                children: [{name:'harbin'},{name:'zhaodong'},{name:'daqing'}],
            },
            {
                name:'jilin',
                children:[{name:'changchun'},{name:'jilin'},{name:'siping'}],
            },
            {
                name:'liaoning',
                children:[{name:'shenyang'},{name:'dalian'}],
            }
        ],
        depth:2,
    });
    select.init();
});
