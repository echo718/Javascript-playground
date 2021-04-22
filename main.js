

var variables=-1;
window.onload=function(){
    function get_content(){
        var objs=[];
        document.getElementById("display").innerHTML=null;
        
       for(let i=0;i<rawdata.length;i++){
            if(rawdata[i].productMedia[0] != null)
            {
                for(let j=0;j<rawdata[i].productMedia.length;j++){
                    
                    // 创建每个item
                    objs[j] =document.createElement("div");
                    objs[j].style="text-align:center;";
                    objs[j].className=" col-sm-6 col-lg-3 mt-5 block ";
                    // 创建每个item里面的img
                    var img=document.createElement("img");
                    img.className="img";
                    img.style="width:100%;height:200px;"
                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[i].productMedia[j].url;
                    objs[j].appendChild(img);  
                    // 创建每个item里面的title
                    var title=document.createElement("div");
                    title.className="title";
                    // 创建价格
                    var price=document.createElement("div");
                    price.className="price";
                    

                    prodId=rawdata[i].productMedia[j].prodId;
                    for(let x=0;x<rawdata.length;x++){
                        
                        if(prodId==rawdata[x].prodId){
                            title.innerHTML=rawdata[x].title;
                            price.innerHTML="Price:$"+rawdata[x].price;
                        }
                    }
                    objs[j].appendChild(title);
                    objs[j].appendChild(price);
                    document.getElementById("display").appendChild(objs[j]);
                }
            }
              
        }  
    }  
    
    function get_filter(){

        // price filter
        var price=document.createElement("div");
        document.getElementById("filter").appendChild(price);
        price.className="col-4 pt-4";
        price.style="background-color:yellow;";
        // price文本
        var price_txt=document.createElement("span");
        price.appendChild(price_txt);
        price_txt.innerText="Price";
        // price 选择器
        var price_select=document.createElement("select");
        price_select.style="width:150px;margin-left:2%;";
        price.appendChild(price_select);
        
        var option0=document.createElement("option");
        price_select.appendChild(option0);
        option0.innerHTML="All";
        option0.value="0";
        var option1=document.createElement("option");
        price_select.appendChild(option1);
        option1.innerHTML="0-50";
        option1.value="1";
        var option2=document.createElement("option");
        price_select.appendChild(option2);
        option2.innerHTML="51-100";
        option2.value="2";

        var options=[];
        options={option0,option1,option2};
        // price 选择器 button
        var price_btn=document.createElement("button");
        price.appendChild(price_btn);
        price_btn.id="price_filter";
        price_btn.innerHTML="filter";
        price_btn.style="width:70px;height:30px;background:green;color:white;margin-left:2%;";

        document.getElementById("price_filter").onclick=function(){
           
            var option_value= price_select.options.selectedIndex;
            switch(option_value){
                case 1:
                   
                    get_price(1);
                    
                    break;
                case 2:
                    get_price(2);
                    
                    break;
                default :
                    get_content();
                  

            }
        }

        // Sort filter
        var sort=document.createElement("div");
        document.getElementById("filter").appendChild(sort);
        sort.className="col-4 pt-4";
        sort.style="background-color:yellow;";

        // sort 文本
        var sort_txt=document.createElement("span");
        sort.appendChild(sort_txt);
        sort_txt.innerText="Sort";

        // sort btn ascending
        var sort_btn_asc=document.createElement("button");
        sort.appendChild(sort_btn_asc);
        sort_btn_asc.innerText="Ascending";
        sort_btn_asc.id="asc"
        sort_btn_asc.style="background-color:green;width:100px;height:30px;color:white;margin-left:2%;";

         // sort btn decending
         var sort_btn_dec=document.createElement("button");
         sort.appendChild(sort_btn_dec);
         sort_btn_dec.innerText="Decending";
         sort_btn_dec.id="dec"
         sort_btn_dec.style="background-color:green;width:100px;height:30px;color:white;margin-left:2%;";

        // click btn_asc
        document.getElementById("asc").onclick=function(){
                var arr= new Array();
           
                var display= document.getElementById("display");
                
                var arr= display.getElementsByClassName("block");
                
                var arr_new=new Array();
                for(var k=0;k<arr.length;k++){   
 
                    arr_new[k]=new Array();  //声明二维
                     
                  
                }
                for(let i=0;i<arr.length;i++){
                    
                    arr_new[i].img=arr[i].getElementsByClassName("img");
                    arr_new[i].title=arr[i].getElementsByClassName("title");
                    arr_new[i].price=arr[i].getElementsByClassName("price");
                    arr_new[i].price_txt=arr[i].getElementsByClassName("price")[0].innerText.slice(7);
                }
             
                //asending
                function compare(property){
                    return function(a,b){
                        var value1=a[property];
                        var value2=b[property];
                        return value1 - value2;
                    }
                }
                
                var arr_new_final=new Array();
                // 得到asending数组
                arr_new_final=arr_new.sort(compare('price_txt'));
              
                document.getElementById("display").innerHTML=null;
              
                var objs=[];
                for(let i=0;i<arr_new_final.length;i++){
                    objs[i] =document.createElement("div");
                    objs[i].style="text-align:center;";
                    objs[i].className=" col-sm-6 col-lg-3 mt-5 block ";
                    document.getElementById("display").appendChild(objs[i]);

                   
                    var img_new=arr_new_final[i].img[0];
                   

                    var title_new=arr_new_final[i].title[0];
                    var price_new=arr_new_final[i].price[0];
                    console.log(typeof(img_new),typeof(title_new))
                     
                    
                     objs[i].appendChild(img_new);
                     objs[i].appendChild(title_new);
                     objs[i].appendChild(price_new);
                }
               

             

            
           
        }

        // click btn_dec
        document.getElementById("dec").onclick=function(){
            var arr= new Array();
       
            var display= document.getElementById("display");
            
            var arr= display.getElementsByClassName("block");
            
            var arr_new=new Array();
            for(var k=0;k<arr.length;k++){   

                arr_new[k]=new Array();  //声明二维
                 
              
            }
            for(let i=0;i<arr.length;i++){
                
                arr_new[i].img=arr[i].getElementsByClassName("img");
                arr_new[i].title=arr[i].getElementsByClassName("title");
                arr_new[i].price=arr[i].getElementsByClassName("price");
                arr_new[i].price_txt=arr[i].getElementsByClassName("price")[0].innerText.slice(7);
            }
         
            //decending
            function compare(property){
                return function(a,b){
                    var value1=a[property];
                    var value2=b[property];
                    return value2 - value1;
                }
            }
            
            var arr_new_final=new Array();
            // 得到asending数组
            arr_new_final=arr_new.sort(compare('price_txt'));
          
            document.getElementById("display").innerHTML=null;
          
            var objs=[];
            for(let i=0;i<arr_new_final.length;i++){
                objs[i] =document.createElement("div");
                objs[i].style="text-align:center;";
                objs[i].className=" col-sm-6 col-lg-3 mt-5 block ";
                document.getElementById("display").appendChild(objs[i]);

               
                var img_new=arr_new_final[i].img[0];
               

                var title_new=arr_new_final[i].title[0];
                var price_new=arr_new_final[i].price[0];
                console.log(typeof(img_new),typeof(title_new))
                 
                
                 objs[i].appendChild(img_new);
                 objs[i].appendChild(title_new);
                 objs[i].appendChild(price_new);
            }
           

         

        
       
    }


     
    }

    var price_index=0;
    var z=0;

    function get_price(variables){
        switch(variables){
            case 1:
                var price_set=new Array();
                document.getElementById("display").innerHTML=null;
                
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>0 && rawdata[price_select].price<50){
                        
                        price_set[z]=rawdata[price_select].prodId;
                        z++;
                    }
                }
                // console.log(price_set)

                var objs_price=[];
                for(z=0;z<price_set.length;z++){
                   for(let a=0;a<rawdata.length;a++){
                       if(rawdata[a].prodId==price_set[z]){
                            if(rawdata[a].productMedia !=null){
                                for(let j=0;j<rawdata[a].productMedia.length;j++){
                                    // 创建每个item
                                    objs_price[j] =document.createElement("div");
                                    objs_price[j].style="text-align:center;";
                                    objs_price[j].className=" col-sm-6 col-lg-3 mt-5 block ";
                                    // 创建每个item里面的img
                                    var img=document.createElement("img");
                                    img.style="width:100%;height:200px;"
                                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                    objs_price[j].appendChild(img);  
                                    // 创建每个item里面的title
                                    var title=document.createElement("div");
                                    title.className="title";
                    
                                    // 创建价格
                                    var price=document.createElement("div");
                                    price.className="price";
                                    
                                    prodId=rawdata[a].productMedia[j].prodId;
                                    for(let x=0;x<rawdata.length;x++){
                                        
                                        if(prodId==rawdata[x].prodId){
                                            title.innerHTML=rawdata[x].title;
                                            price.innerHTML="Price:$"+rawdata[x].price;
                                        }
                                    }
                                    objs_price[j].appendChild(title);
                                    objs_price[j].appendChild(price);
                                    document.getElementById("display").appendChild(objs_price[j]);
                                }
                            }
                       }
                   }
                  
                }

                break;
            case 2:
                    var price_set=new Array();
                    document.getElementById("display").innerHTML=null;
                
                    for(let price_select=1;price_select<rawdata.length;price_select++){
                        if(rawdata[price_select].price>=50 && rawdata[price_select].price<100){
                            
                            price_set[z]=rawdata[price_select].prodId;
                            z++;
                        }
                    }
                    // console.log(price_set)
    
                    var objs_price=[];
                    for(z=0;z<price_set.length;z++){
                       for(let a=0;a<rawdata.length;a++){
                           if(rawdata[a].prodId==price_set[z]){
                                if(rawdata[a].productMedia !=null){
                                    for(let j=0;j<rawdata[a].productMedia.length;j++){
                                        // 创建每个item
                                        objs_price[j] =document.createElement("div");
                                        objs_price[j].style="text-align:center;";
                                        objs_price[j].className=" col-sm-6 col-lg-3 mt-5 block ";
                                        // 创建每个item里面的img
                                        var img=document.createElement("img");
                                        img.style="width:100%;height:200px;"
                                        img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                        objs_price[j].appendChild(img);  
                                        // 创建每个item里面的title
                                        var title=document.createElement("div");
                                        title.className="title";
                    
                                        // 创建价格
                                        var price=document.createElement("div");
                                        price.className="price";

                                        prodId=rawdata[a].productMedia[j].prodId;
                                        for(let x=0;x<rawdata.length;x++){
                                            
                                            if(prodId==rawdata[x].prodId){
                                                title.innerHTML=rawdata[x].title;
                                                price.innerHTML="Price:$"+rawdata[x].price;
                                            }
                                        }
                                        objs_price[j].appendChild(title);
                                        objs_price[j].appendChild(price);
                                        document.getElementById("display").appendChild(objs_price[j]);
                                    }
                                }
                           }
                       }
                      
                    }
                    break;
            default:
                get_content();
               
        }
    }
    
get_content();
get_filter();
}
