var chose_suanfa=null;//模拟算法的选择，0,1,2
var start_time=null;//开始模拟的时间
var Ram=null;//内存
var outprint=null;//打印机数量

var come_process=new Array();//到来进程

var finish_process=new Array();//完成进程,记录顺序

var wait_process=new Array();//阻塞进程

var now_process=null;//当前进程

var ready=new Array();//就绪进程

var table_5_num=0;//结果预览输入进程情况的个数

var time=0;//总时间

var suanfa_1_i=0;//算法1的进程程度，，第几个进程

var suanfa_2_i=0;//算法2的进程程度，，第几个进程

var suanfa_3_i=0;//算法3的进程程度，，第几个进程

//新建进程，，加入到到来数组

function create_process(name,sub_time,over_time,request_ram,request_outprint){
		var new_process=new Object();
		new_process.name=name;//名字
		new_process.sub_time=sub_time;//提交时间
		new_process.over_time=over_time;//估计执行时间
		new_process.request_ram=request_ram;//内存
		new_process.request_outprint=request_outprint;//打印机
		new_process.need_time=over_time;//剩余时间
		new_process.zhouzhuan_time=0;
		
		new_process.get_name=function(){return this.name},
		new_process.get_sub_time=function(){return this.sub_time},
		new_process.get_over_time=function(){return this.over_time},
		new_process.get_need_time=function(){return this.need_time},
		new_process.get_request_ram=function(){return this.request_ram},
		new_process.get_request_outprint=function(){return this.request_outprint}
		
		
//		new_process.set_need_time=function(){return this.need_time},
		
		
		return new_process;
}




///////////////////////////////////////////////

//初始设置
function btn_init(){
	var input_ram=document.getElementsByClassName('input_text')[0];
	var input_outprint=document.getElementsByClassName('input_text')[1];
	
	input_ram.title=input_ram.value;
	input_outprint.title=input_outprint.value;
	
	Ram=input_ram.value;
	outprint=input_outprint.value;
	
	input_outprint.disabled="disabled";
	input_ram.disabled="disabled";
	
	input_ram.style.opacity="0.5";
	input_outprint.style.opacity="0.5";
}

//新建进程
function btn_create(){
	var name=document.getElementsByClassName('input_text')[2];
	var sub_time=document.getElementsByClassName('input_text')[3];
	var over_time=document.getElementsByClassName('input_text')[4];
	var request_ram=document.getElementsByClassName('input_text')[5];
	var request_outprint=document.getElementsByClassName('input_text')[6];
	
	
	name.style.opacity="0.2";
	sub_time.style.opacity="0.2";
	over_time.style.opacity="0.2";
	request_ram.style.opacity="0.2";
	request_outprint.style.opacity="0.2";
	
	var process_create=create_process(name.value,sub_time.value,over_time.value,request_ram.value,request_outprint.value);
	
	
	
//	console.log(process_create.get_name());
	come_process.push(process_create);
	
	table_5_num++;
	
	alert(process_create.get_name()+"has created");
	
		table[5].id.rows[table_5_num].cells[0].innerText=process_create.get_name();
		table[5].id.rows[table_5_num].cells[1].innerText=process_create.get_sub_time();
		table[5].id.rows[table_5_num].cells[2].innerText=process_create.get_over_time();
		table[5].id.rows[table_5_num].cells[3].innerText=process_create.get_request_ram();
		table[5].id.rows[table_5_num].cells[4].innerText=process_create.get_request_outprint();
		table[5].id.rows[table_5_num].cells[5].innerText=process_create.get_need_time();
	
}
//开始模拟
function start_system(){
	var chose=document.getElementsByName('chose');
	
	for(var i=0;i<chose.length;i++){
		if(chose[i].checked){
			chose_suanfa=i;
		}
	}
	
	switch (chose_suanfa){
		case 0: chose_suanfa_1();
			break;
		case 1:chose_suanfa_2();
			break;
		case 2:chose_suanfa_3();
			break;
		default:
			break;
	}
}
//阻塞按钮
function btn_wait_process(){
	if(chose_suanfa==0){
		suanfa_1_i++;//选择下一个
		
		if(suanfa_1_i>=ready.length){
			for(var cell=0;cell<6;cell++){
				table[0].id.rows[1].cells[cell].innerHTML="&nbsp";
			}
		}
		
//		chose_suanfa_1_callback()
		//加入wait进程队列
		wait_process.push(ready[suanfa_1_i-1]);
		
		//更新wait表
		table[4].id.rows[wait_process.length].cells[0].innerText=ready[suanfa_1_i-1].get_name();
		table[4].id.rows[wait_process.length].cells[1].innerText=ready[suanfa_1_i-1].get_sub_time();
		table[4].id.rows[wait_process.length].cells[2].innerText=ready[suanfa_1_i-1].get_over_time();
		table[4].id.rows[wait_process.length].cells[3].innerText=ready[suanfa_1_i-1].get_request_ram();
		table[4].id.rows[wait_process.length].cells[4].innerText=ready[suanfa_1_i-1].get_request_outprint();
		table[4].id.rows[wait_process.length].cells[5].innerText=ready[suanfa_1_i-1].get_need_time();
		
	}
}

//算法先来先服务
function chose_suanfa_1(){
	//按照到来时间顺序排序
	
	ready=come_process.concat();
	
	
	for(var i=0;i<come_process.length;i++){
		for(var j=i+1;j<come_process.length;j++){
			if(ready[i].get_sub_time()>ready[j].get_sub_time()){
				var temp=ready[i];
				ready[i]=ready[j];
				ready[j]=temp;
			}
		}
	}
	var isover=false;
	suanfa_1_i=0;
	
	time=parseInt(ready[0].get_sub_time());
	
	chose_suanfa_1_ready_table(suanfa_1_i);
	
	ss_1=setInterval(function(){
		
		
		if(isover){
			isover=false;
			//处理阻塞之后无进程
			if(suanfa_1_i<ready.length){
				//更新finish 表
			
				finish_process.push(ready[suanfa_1_i]);
				
				table[6].id.rows[suanfa_1_i+1].cells[0].innerText=ready[suanfa_1_i].get_name();
				table[6].id.rows[suanfa_1_i+1].cells[1].innerText=ready[suanfa_1_i].get_sub_time();
				table[6].id.rows[suanfa_1_i+1].cells[2].innerText=ready[suanfa_1_i].get_over_time();
				table[6].id.rows[suanfa_1_i+1].cells[3].innerText=ready[suanfa_1_i].get_request_ram();
				table[6].id.rows[suanfa_1_i+1].cells[4].innerText=ready[suanfa_1_i].get_request_outprint();
				table[6].id.rows[suanfa_1_i+1].cells[5].innerText=ready[suanfa_1_i].get_need_time();
	//			更新time，加上执行的时间
				console.log(time);
				time=parseInt(time);
				time+=parseInt(ready[suanfa_1_i].get_over_time());
				console.log(time);
				
				table[6].id.rows[suanfa_1_i+1].cells[6].innerText=ready[suanfa_1_i].zhouzhuan_time=time-ready[suanfa_1_i].get_sub_time();
				
				table[6].id.rows[suanfa_1_i+1].cells[7].innerText=(ready[suanfa_1_i].zhouzhuan_time/ready[suanfa_1_i].get_over_time()).toFixed(2);
				
				suanfa_1_i++;
			}
			
			
			//
			if(suanfa_1_i>=ready.length&&finish_process.length!=0&&wait_process.length==0){
				
				clearInterval(ss_1);
//				计算各个进程的平均周转时间
				var time_all=0;
				for(var average=0;average<ready.length;average++){
					time_all+=parseInt(ready[average].zhouzhuan_time);
					
				}
				time_all/=ready.length;
				time_all.toFixed(2);
				for(var average=1;average<=ready.length;average++){
					table[6].id.rows[average].cells[8].innerText=time_all;
				}
				
			}
			chose_suanfa_1_ready_table(suanfa_1_i);
		}
		else{
			isover=chose_suanfa_1_callback(suanfa_1_i);
		}
		
	},1000);
	
}
//传入当前正在运行的index, 将后续的进程打印到ready
function chose_suanfa_1_ready_table(i){
	
	if(i+1==ready.length){
		for(var j=1;j<=4;j++){
			for(var row=1;row<4;row++){
				for(var cell=0;cell<6;cell++){
					table[j].id.rows[row].cells[cell].innerHTML="&nbsp";
				}

			}
		}
	}
	else{
		
		for(var j=1;j<=4;j++){
			for(var row=1;row<4;row++){
				for(var cell=0;cell<6;cell++){
					table[j].id.rows[row].cells[cell].innerHTML="&nbsp";
				}

			}
		}
		
		for (var j=i+1;j<ready.length;j++){
		
			var table_index=(j-i-1)/3;
			table_index=parseInt(table_index);
			table[1+table_index].id.rows[j-i].cells[0].innerText=ready[j].get_name();
			table[1+table_index].id.rows[j-i].cells[1].innerText=ready[j].get_sub_time();
			table[1+table_index].id.rows[j-i].cells[2].innerText=ready[j].get_over_time();
			table[1+table_index].id.rows[j-i].cells[3].innerText=ready[j].get_request_ram();
			table[1+table_index].id.rows[j-i].cells[4].innerText=ready[j].get_request_outprint();
			table[1+table_index].id.rows[j-i].cells[5].innerText=ready[j].get_need_time();	
		}
	}

}
function chose_suanfa_1_callback(i){
		now_process=ready[i];
		
		if(i>=ready.length){
			return true;
		}
		if(now_process.get_need_time()<=0){
			return true;
		}
		
		table[0].id.rows[1].cells[0].innerText=now_process.get_name();
		table[0].id.rows[1].cells[1].innerText=now_process.get_sub_time();
		table[0].id.rows[1].cells[2].innerText=now_process.get_over_time();
		table[0].id.rows[1].cells[3].innerText=now_process.get_request_ram();
		table[0].id.rows[1].cells[4].innerText=now_process.get_request_outprint();
		
		now_process.need_time-=1;
		console.log(now_process.need_time);
		table[0].id.rows[1].cells[5].innerText=now_process.get_need_time();
		if(now_process.get_need_time()<=0){
			
			return true;
		}
		else{
		
			return false;
		}
}


//算法2  时间片轮转
function chose_suanfa_2(){
	//按照到来时间顺序排序
	
	ready=come_process.concat();
	
	
	
	for(var i=0;i<come_process.length;i++){
		for(var j=i+1;j<come_process.length;j++){
			if(ready[i].get_sub_time()>ready[j].get_sub_time()){
				var temp=ready[i];
				ready[i]=ready[j];
				ready[j]=temp;
			}
		}
	}
	
	time=parseInt(ready[0].get_sub_time());
	
	suanfa_2_i=0;
	
	ss=setInterval(function(){
		
			suanfa_2_i=suanfa_2_i%(ready.length);
			console.log(suanfa_2_i);
			var isOK=true;
			for(var z=0;z<ready.length;z++ ){
				if(parseInt(ready[z].get_need_time())>0){
					isOK=false;
					break;
				}
			}
			
			if(parseInt(ready[suanfa_2_i].get_need_time())>0){
				//更新ready表
				//除了当前进程，打印出其他的进程
				chose_suanfa_2_ready_table(suanfa_2_i);
				for(var j=0;j<2;j++){
					if(parseInt(ready[suanfa_2_i].need_time)-1>=0){
						let x=suanfa_2_i;
						
						setTimeout(function(){
						//当前的进程
						
						console.log(x);
						
						
						now_process=ready[x];
						//进程的剩余时间-1
						ready[x].need_time=parseInt(ready[x].get_need_time())-1;
						//更新当前的表
						table[0].id.rows[1].cells[0].innerText=now_process.get_name();
						table[0].id.rows[1].cells[1].innerText=now_process.get_sub_time();
						table[0].id.rows[1].cells[2].innerText=now_process.get_over_time();
						table[0].id.rows[1].cells[3].innerText=now_process.get_request_ram();
						table[0].id.rows[1].cells[4].innerText=now_process.get_request_outprint();
						
						table[0].id.rows[1].cells[5].innerText=now_process.get_need_time();
						
						
					
					
						},1000);
						time+=1;
					}
					
					
				}
				
				//更新time
				
				
			}else{
				if(parseInt(ready[suanfa_2_i].get_need_time())==0){
					finish_process.push(ready[suanfa_2_i]);
				
					table[6].id.rows[suanfa_2_i+1].cells[0].innerText=ready[suanfa_2_i].get_name();
					table[6].id.rows[suanfa_2_i+1].cells[1].innerText=ready[suanfa_2_i].get_sub_time();
					table[6].id.rows[suanfa_2_i+1].cells[2].innerText=ready[suanfa_2_i].get_over_time();
					table[6].id.rows[suanfa_2_i+1].cells[3].innerText=ready[suanfa_2_i].get_request_ram();
					table[6].id.rows[suanfa_2_i+1].cells[4].innerText=ready[suanfa_2_i].get_request_outprint();
					table[6].id.rows[suanfa_2_i+1].cells[5].innerText=ready[suanfa_2_i].get_need_time();
		//			更新time，加上执行的时间
					console.log(time);
//					time=parseInt(time);
//					time+=parseInt(ready[i].get_over_time());
//					console.log(time);
					
					table[6].id.rows[suanfa_2_i+1].cells[6].innerText=ready[suanfa_2_i].zhouzhuan_time=time-ready[suanfa_2_i].get_sub_time();
					
					table[6].id.rows[suanfa_2_i+1].cells[7].innerText=(ready[suanfa_2_i].zhouzhuan_time/ready[suanfa_2_i].get_over_time()).toFixed(2);
					
				}
			}
			
			
			if(isOK){
				clearInterval(ss);
				var time_all=0;
				for(var average=0;average<ready.length;average++){
					time_all+=parseInt(ready[average].zhouzhuan_time);
					
				}
				time_all/=ready.length;
				time_all.toFixed(2);
				for(var average=1;average<=ready.length;average++){
					table[6].id.rows[average].cells[8].innerText=time_all;
				}
			}
			
			suanfa_2_i++;
			console.log("suanfa_2_i++:"+suanfa_2_i);
			
	},2000);
	
}
//将除了i和已经完成的打印出来
function chose_suanfa_2_ready_table(i){
	
	//清空表
		for(var j=1;j<=4;j++){
			for(var row=1;row<4;row++){
				for(var cell=0;cell<6;cell++){
					table[j].id.rows[row].cells[cell].innerHTML="&nbsp";
				}

			}
		}
	
	
	
	
	let row_now=1;
	
	//输出i的后面未完成的数据
		for (var j=i+1;j<ready.length;j++){
			
		
			if(parseInt(ready[j].get_need_time())!=0){
				
				
				var table_index=(j-i-1)/3;
				
				table_index=parseInt(table_index);
				table[1+table_index].id.rows[j-i].cells[0].innerText=ready[j].get_name();
				table[1+table_index].id.rows[j-i].cells[1].innerText=ready[j].get_sub_time();
				table[1+table_index].id.rows[j-i].cells[2].innerText=ready[j].get_over_time();
				table[1+table_index].id.rows[j-i].cells[3].innerText=ready[j].get_request_ram();
				table[1+table_index].id.rows[j-i].cells[4].innerText=ready[j].get_request_outprint();
				table[1+table_index].id.rows[j-i].cells[5].innerText=ready[j].get_need_time();	
			
				row_now++;
			}
		}
	//输出i的前面未完成的数据
		
		for (var j=row_now;j<i+row_now;j++){
		
			if(parseInt(ready[j-row_now].get_need_time())!=0){
				var table_index=(row_now)/3;
			
			
				table_index=parseInt(table_index);
				table[1+table_index].id.rows[j].cells[0].innerText=ready[j-row_now].get_name();
				table[1+table_index].id.rows[j].cells[1].innerText=ready[j-row_now].get_sub_time();
				table[1+table_index].id.rows[j].cells[2].innerText=ready[j-row_now].get_over_time();
				table[1+table_index].id.rows[j].cells[3].innerText=ready[j-row_now].get_request_ram();
				table[1+table_index].id.rows[j].cells[4].innerText=ready[j-row_now].get_request_outprint();
				table[1+table_index].id.rows[j].cells[5].innerText=ready[j-row_now].get_need_time();	
					
			}
		}
		
		
	

}


//算法3 短进程优先
function chose_suanfa_3(){
	//临时数组
	var temp_array=come_process.concat();
	//按到来时间排序
	for(var i=0;i<come_process.length;i++){
		for(var j=i+1;j<come_process.length;j++){
			if(parseInt(temp_array[i].get_sub_time())>parseInt(temp_array[j].get_sub_time())){
				var temp=ready[i];
				ready[i]=ready[j];
				ready[j]=temp;
			}
		}
	}
	//同一时间按照执行时间排序
	for(var z=0;z<temp_array.length;z++){
		ready.push(temp_array[z]);
	
	
		let temp_array_length=ready.length;
		
		for(var i=temp_array_length;i<temp_array.length;i++){
			if(temp_array[i].get_sub_time()==temp_array[0].get_sub_time()){
				ready.push(temp_array[i]);
				z++;
			}
		}
		
		if(ready.length!=temp_array_length){
			//这个时间的按照执行时间排序
			for(let i=temp_array_length-1;i<ready.length;i++){
				for(let j=i+1;j<ready.length;j++){
					if(parseInt(temp_array[i].get_over_time())>parseInt(temp_array[j].get_over_time())){
						var temp=ready[i];
						ready[i]=ready[j];
						ready[j]=temp;
					}
				}
			}
			
			
		}
	}
	
	
	
	
	
	
	
	var isover=false;
	suanfa_1_i=0;
	
	time=parseInt(ready[0].get_sub_time());
	
	chose_suanfa_1_ready_table(suanfa_1_i);
	
	ss_1=setInterval(function(){
		
		
		if(isover){
			isover=false;
			//处理阻塞之后无进程
			if(suanfa_1_i<ready.length){
				//更新finish 表
			
				finish_process.push(ready[suanfa_1_i]);
				
				table[6].id.rows[suanfa_1_i+1].cells[0].innerText=ready[suanfa_1_i].get_name();
				table[6].id.rows[suanfa_1_i+1].cells[1].innerText=ready[suanfa_1_i].get_sub_time();
				table[6].id.rows[suanfa_1_i+1].cells[2].innerText=ready[suanfa_1_i].get_over_time();
				table[6].id.rows[suanfa_1_i+1].cells[3].innerText=ready[suanfa_1_i].get_request_ram();
				table[6].id.rows[suanfa_1_i+1].cells[4].innerText=ready[suanfa_1_i].get_request_outprint();
				table[6].id.rows[suanfa_1_i+1].cells[5].innerText=ready[suanfa_1_i].get_need_time();
	//			更新time，加上执行的时间
				console.log(time);
				time=parseInt(time);
				time+=parseInt(ready[suanfa_1_i].get_over_time());
				console.log(time);
				
				table[6].id.rows[suanfa_1_i+1].cells[6].innerText=ready[suanfa_1_i].zhouzhuan_time=time-ready[suanfa_1_i].get_sub_time();
				
				table[6].id.rows[suanfa_1_i+1].cells[7].innerText=(ready[suanfa_1_i].zhouzhuan_time/ready[suanfa_1_i].get_over_time()).toFixed(2);
				
				//找出小于完成时间的进程
				let The_start=ready.length;
				for(var i=suanfa_1_i+1;i<ready.length;i++){
					if(parseInt(ready[i].get_sub_time())>parseInt(ready[suanfa_1_i].get_over_time())){
						The_start=i+1;
						break;
					}
				}
				//找出执行时间最短的
				console.log("The_start:"+The_start);
				
				for(var i=suanfa_1_i+1;i<The_start;i++){
					for(var j=i+1;j<The_start;j++){
						console.log("ready[i]:"+ready[i].get_over_time());
						console.log(parseInt(ready[i].get_over_time())>parseInt(ready[j].get_over_time()));
						if(parseInt(ready[i].get_over_time())>parseInt(ready[j].get_over_time())){
							var temp=ready[i];
							ready[i]=ready[j];
							ready[j]=temp;
							console.log("ready[i]:"+ready[i].get_over_time());			
						}
					}
				}
				
				suanfa_1_i++;
			}
			
			
			//
			if(suanfa_1_i>=ready.length&&finish_process.length!=0&&wait_process.length==0){
				
				clearInterval(ss_1);
//				计算各个进程的平均周转时间
				var time_all=0;
				for(var average=0;average<ready.length;average++){
					time_all+=parseInt(ready[average].zhouzhuan_time);
					
				}
				time_all/=ready.length;
				time_all.toFixed(2);
				for(var average=1;average<=ready.length;average++){
					table[6].id.rows[average].cells[8].innerText=time_all;
				}
				
			}
			chose_suanfa_1_ready_table(suanfa_1_i);
		}
		else{
			isover=chose_suanfa_1_callback(suanfa_1_i);
		}
		
	},1000);
	
	
}
