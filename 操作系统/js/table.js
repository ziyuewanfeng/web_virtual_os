

function change(){
	var img=document.getElementById('imgage');
	img.style.src="url(img/fullScreen-bg.png)";
}

//传进table id 返回行列长度
function table_deal(table_id){
	var obj=new Object();
	obj.id=document.getElementById(table_id);
	obj.rows_length=function(){
		return this.id.rows.length;
	}
	obj.cells_length=function(){
		var id_cells=new Array();
		for(var i=0;i<this.rows_length();i++){
			id_cells=this.id.rows[i].cells.length;
		}
		return id_cells;
	}
	return obj;
//	var obj_1=table_deal('table_2');
//	console.log(obj_1.rows_length());
//	console.log(obj_1.cells_length());
}


var table=new Array();

for(var i=0;i<7;i++) {
		var temp=table_deal("table_"+(i+1).toString());
		table.push(temp);
	}
//重置
reinit();

function reinit(){
	 chose_suanfa=null;//模拟算法的选择，0,1,2
	 start_time=null;//开始模拟的时间
	 Ram=null;//内存
	 outprint=null;//打印机数量
	
	 come_process=new Array();//到来进程
	
	 finish_process=new Array();//完成进程
	
	 wait_process=new Array();//阻塞进程
	
	 now_process=null;//当前进程
	
	for(var i=0;i<table.length;i++){
		for(var j=1;j<table[i].rows_length();j++){
			for(var z=0;z<table[i].cells_length();z++){
				table[i].id.rows[j].cells[z].innerHTML="&nbsp";
			}
		}
	}
	
	var chose=document.getElementsByName('chose')[0];
	chose.checked="checked";
	
	
	var input_ram=document.getElementsByClassName('input_text')[0];
	var input_outprint=document.getElementsByClassName('input_text')[1];
	var name=document.getElementsByClassName('input_text')[2];
	var sub_time=document.getElementsByClassName('input_text')[3];
	var over_time=document.getElementsByClassName('input_text')[4];
	var request_ram=document.getElementsByClassName('input_text')[5];
	var request_outprint=document.getElementsByClassName('input_text')[6];
	
	
	input_outprint.title=input_outprint.value="4";
	input_ram.title=input_ram.value="100";
	
	
	input_outprint.style.opacity=input_ram.style.opacity="0.2";
	
	name.value=name.title;
	sub_time.value=sub_time.title;
	over_time.value=over_time.title;
	request_ram.value=request_ram.title;
	request_outprint.value=request_outprint.title;
	
}

