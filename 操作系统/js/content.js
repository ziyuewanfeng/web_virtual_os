(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        onResize = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth<=409.6){
                docEl.style.fontSize='20px';
            }else{
                docEl.style.fontSize = 20 * (clientWidth / 1024) + 'px';
                docEl.style.overflowX = 'hidden';
            }
        };
    var ready = false;
    if(ready == false){
        ready = true;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth<=409.6){
            docEl.style.fontSize='20px';
        }else{
            docEl.style.fontSize = 20 * (clientWidth / 1024) + 'px';
        }
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, onResize, false);
    doc.addEventListener('DOMContentLoaded', onResize, false);
})(document, window);
function input_text(){
	
$('.input_text').each(function(){
	
	var $this=$(this);
	var value=$(this).attr('title');
	$this.focus(function(){
		if($this.val()==value){
			$this.val("");
//			$this.css()
			$(this).css({"opacity":"0.8",
//				"background-color":"blue"
			});
		}
	
	});
	$this.blur(function(){
		if($this.val().length==0){
			$this.val(value);
			$(this).css({"opacity":"0.2",
			"background-color":"white"
			});
		}
	
	});
});
	
}
input_text();

//换页
function btn_chose_1(){
	var btn1=document.getElementsByClassName('button')[0];
	var btn2=document.getElementsByClassName('button')[1];
	
	btn1.style.color="aqua";
	btn2.style.color="white";
	
	var content1=document.getElementsByClassName('content_1')[0];
	var content2=document.getElementsByClassName('content_2')[0];
	
	content1.style.display="block";
	content2.style.display="none";
	
}
function btn_chose_2(){
	var btn1=document.getElementsByClassName('button')[0];
	var btn2=document.getElementsByClassName('button')[1];
	
	btn1.style.color="white";
	btn2.style.color="aqua";
	
	var content1=document.getElementsByClassName('content_1')[0];
	var content2=document.getElementsByClassName('content_2')[0];
	
	content1.style.display="none";
	content2.style.display="block";
	
}

btn_chose_1();


//关闭页面
function close_window(){
	if 
(confirm("您确定要关闭本页吗？")){
//window.opener=null;
//window.open('','_self');
//window.close();
//self.close();
//window.opener.location.href = window.opener.location.href;
window.opener.location.href='about:blank';
window.close();


}
else{}
}



