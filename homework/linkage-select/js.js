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
        let _this=this;                                                              //初始化第一级菜单，并填充数据
        let select=$('<select></select>');
        $(select).addClass('form-control select-level-'+0);
        $(select).attr('select-level',0);
        let html='<option value="no-select">请选择</option>';
        let level0=this.data[0];
        for(let i=0,m=level0.length;i<m;i++){
            let treeNode=[i];
            html+='<option value='+ level0[i]+' tree-node='+treeNode.join('-')+'>'+level0[i]+'</option>';
        };
        $(select).html(html);
        $(select).select('refresh');
        this.ele.append($(select));
        for(let i=1;i<this.maxDepth;i++){                                             //初始化剩余几级菜单，留空
            let select=$('<select></select>');
            $(select).addClass('form-control select-level-'+i);
            $(select).attr('select-level',i);
            $(select).html('<option value="no-select">请选择上一级</option>');
            this.ele.append($(select));
        }

        this.ele.find('select').bind('change',function (e) {                          //添加onchange事件
            let thisArray=[];
            let thisOptions=e.target.getElementsByTagName('option');
            let selectLevel=e.target.getAttribute('select-level');
            let selectValue=e.target.value;
            let treeNode=[];
            if(thisOptions.value=='no-select')return;
            for(let i=0,m=thisOptions.length;i<m;i++){                                //计算当前选中了第几项
                let itemValue=thisOptions[i].value;
                if(itemValue==selectValue){
                    treeNode=thisOptions[i].getAttribute('tree-node').split('-');
                }
                thisArray.push(thisOptions[i].innerHTML);
            }

            let index=thisArray.indexOf(selectValue)-1;
            treeNode.push(index);                                                    //得到树的路径
            if(treeNode.length>_this.maxDepth)return;
            let nextLevel=parseInt(selectLevel)+1;
            let nextSelect=_this.ele.find("[select-level="+nextLevel+"]");
            let nextArray=_this.data[treeNode.length-1];                             //根据路径遍历数据得到下一级的数组
            for(let i=1;i<treeNode.length;i++){
                nextArray=nextArray[treeNode[i]];
            }
            let html='<option value="no-select">请选择</option>';                    //填充html
            for(let i=0,m=nextArray.length;i<m;i++){
                html+='<option value='+ nextArray[i] +' tree-node='+treeNode.join('-')+'>'+nextArray[i]+'</option>';
            };
            nextSelect.html(html);
            nextSelect.select('refresh');
            for(let i=treeNode.length,m=_this.maxDepth;i<m;i++){                    //刷新之后的所有菜单
                let curSelect=_this.ele.find('[select-level='+i+']');
                curSelect.html('<option value="no-select">请选择上一级</option>');
                curSelect.select('refresh');
            }
        })
    },
}

;$(function () {
    let data1=[
        //depth=1
        [
            '黑龙江','吉林','北京'
        ],

        //depth=2
        [
            ['哈尔滨','肇东','大庆'],
            ['长春','吉林','四平'],
            ['北京']
        ],

        //depth=3
        [
            [['道里区','南岗区'],['西原区','正阳区'],['东风区']],
            [['朝阳区','南关区','二道区'],['朝阳区','道里区'],['四平']],
            [['朝阳区','海淀区','昌平区']]
        ],

        //depth=4
        [
            [
                [
                    ['果戈里大街','中央大街'],['索菲亚教堂','太阳岛']
                ],[
                    ['中央红超市','人民医院'],['市政府','人工湖']
                ],[
                    ['新玛特'],['东风新村']
                ]
            ],[
                [
                    ['吉林大学朝阳校区','吉林大学南区','吉林大学中日联谊医院'],['吉林大学南关校区'],['中日联谊医院']
                ],[
                    ['吉林大学吉林分校'],['吉林大学吉林二校']
                ],[
                    ['吉林大学四平分校','吉林大学四平二校']
                ]
            ],
            [
                [
                    ['朝阳公园'],
                    ['中关村','海淀驾校'],
                    ['积水潭医院回龙观分院','十三陵']
                ]
            ],
        ]
    ];
    let data2=[
        [
            {name:'黑龙江',value:'hlj'},{name:'吉林',value:'jl'},{name:'北京',value:'bj'}
        ],
        [
            [{name:'哈尔滨',value:'harbin'},{name:'肇东',value:'zd'},{name:'大庆',value:'dq'},],
            [{name:'长春',value:'cc'},{name:'吉林',value:'jl'},{name:'四平',value:'sp'}],
            [{name:'北京',value:'bj'},]
        ],
        [
            [['道里区','南岗区'],['西原区','正阳区'],['东风区']],
            [['朝阳区','南关区','二道区'],['朝阳区','道里区'],['四平']],
            [['朝阳区','海淀区','昌平区']]
        ],
        [
            [
                [
                    ['果戈里大街','中央大街'],['索菲亚教堂','太阳岛']
                ],[
                ['中央红超市','人民医院'],['市政府','人工湖']
            ],[
                ['新玛特'],['东风新村']
            ]
            ],
            [
                [
                    ['吉林大学朝阳校区','吉林大学南区','吉林大学中日联谊医院'],['吉林大学吉林分校'],['吉林大学吉林二校'],['jilin'],['siping']
                ],[
                ['jilin']
            ],[
                ['jilin']
            ]
            ],
            [
                [
                    ['朝阳公园'],['中关村','海淀驾校'],['积水潭医院回龙观分院','十三陵']
                ]
            ],
        ]
    ];
    let select=new linkageSelect('#mySelect',{
        data:data1,
        depth:4,
    });
    let select2=new linkageSelect('#mySelect2',{
        data:data1,
        depth:4,
    });
    select.init();
    select2.init();
});
