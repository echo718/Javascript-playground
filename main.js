window.onload=function(){

    function get_content(){
        var objs=[];
       
       for(let i=0;i<rawdata.length;i++){
            if(rawdata[i].productMedia[0] != null){
                for(let j=0;j<rawdata[i].productMedia.length;j++){
                    // 创建每个item
                    objs[j] =document.createElement("div");
                    objs[j].style="text-align:center;";
                    objs[j].className=" col-sm-6 col-lg-3 mt-5  ";
                    // 创建每个item里面的img
                    var img=document.createElement("img");
                    img.style="width:100%;height:200px;"
                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[i].productMedia[j].url;
                    objs[j].appendChild(img);  
                    // 创建每个item里面的title
                    var title=document.createElement("div");
                    // 创建价格
                    var price=document.createElement("div");
                    
                    prodId=rawdata[i].productMedia[j].prodId;
                    for(let x=0;x<rawdata.length;x++){
                        
                        if(prodId==rawdata[x].prodId){
                            title.innerHTML=rawdata[x].title;
                            price.innerHTML="Price:"+rawdata[x].price;
                        }
                    }
                    objs[j].appendChild(title);
                    objs[j].appendChild(price);
                    document.getElementById("display").appendChild(objs[j]);
                }
            }  
       }  
    } 
get_content();
}
