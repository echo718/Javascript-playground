var variables=-1;
var price_index=0;
var z=0;//category用到
var x=0;//price用到
var category_prodID=new Array();
var j=0,y=0;
var price_variable=0,category_variable=0;
var cate_txt=null;
window.onload=function(){
    
    get_content();
    get_filter();
}
// 初始渲染全部item
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
                objs[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                // 创建每个item里面的img
                var img=document.createElement("img");
                img.className="img";
                img.style="width:100%;height:200px;"
                img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[i].productMedia[j].url;
                objs[j].appendChild(img);  
                // 创建每个item里面的title
                var title=document.createElement("div");
                title.className="title";
                title.style="height:75px;"
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

// 筛选价格和排序
function get_filter(){

    // price filter
    var price=document.createElement("div");
    document.getElementById("filter").appendChild(price);
    price.className="col-lg-3 pt-4 mb-2";
    price.style="white-space:nowrap;"
    
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
    var option2=document.createElement("option");
    price_select.appendChild(option2);
    option2.innerHTML="101-150";
    option2.value="3";
    var option2=document.createElement("option");
    price_select.appendChild(option2);
    option2.innerHTML="151-200";
    option2.value="4";
    var option2=document.createElement("option");
    price_select.appendChild(option2);
    option2.innerHTML="over 200";
    option2.value="5";

    var options=[];
    options={option0,option1,option2};
    // price 选择器 button
    var price_btn=document.createElement("button");
    price.appendChild(price_btn);
    price_btn.id="price_filter";
    price_btn.innerHTML="filter";
    price_btn.style="width:70px;height:30px;background:green;color:white;margin-left:2%;";
    // 点击价格筛选调用get_price函数
    document.getElementById("price_filter").onclick=function(){
       
        var option_value= price_select.options.selectedIndex;
        price_variable=option_value;
        
        switch(option_value){
            case 1:
               
                get_price(1);
                
                break;
            case 2:
                get_price(2);
                
                break;
            case 3:
            
                get_price(3);
                
                break;
            case 4:
                get_price(4);
                
                break;
            case 5:
                get_price(5);
                
                break;
            default :
                get_price(-1);
              

        }
    }

    // Sort filter
    var sort=document.createElement("div");
    document.getElementById("filter").appendChild(sort);
    sort.className="col-lg-3 pt-4 mb-2";
    sort.style="white-space:nowrap;"
    

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
                objs[i].className=" col-sm-4 col-lg-2 mt-5 block ";
                document.getElementById("display").appendChild(objs[i]);

               
                var img_new=arr_new_final[i].img[0];
               

                var title_new=arr_new_final[i].title[0];
                var price_new=arr_new_final[i].price[0];
           
                 
                
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
            objs[i].className=" col-sm-4 col-lg-2 mt-5 block ";
            document.getElementById("display").appendChild(objs[i]);

           
            var img_new=arr_new_final[i].img[0];
           

            var title_new=arr_new_final[i].title[0];
            var price_new=arr_new_final[i].price[0];
           // console.log(typeof(img_new),typeof(title_new))
             
            
             objs[i].appendChild(img_new);
             objs[i].appendChild(title_new);
             objs[i].appendChild(price_new);
        }
    }

    // Category filter
     
     var category=document.createElement("div");
     document.getElementById("filter").appendChild(category);
     category.className="col-lg-3 pt-4 mb-2";
     category.style="white-space:nowrap;"
     
     // category 文本
     var category_txt=document.createElement("span");
     category.appendChild(category_txt);
     category_txt.innerText="Category";
     // category 选择器

     var category_select=document.createElement("select");
     category_select.style="width:150px;margin-left:2%;";
     category.appendChild(category_select);

     var option0_category=document.createElement("option");
     category_select.appendChild(option0_category);
     option0_category.innerHTML="All";
     option0_category.value="0";

     var j=0;
     var categoryName=new Array();
     for(let i=0;i<rawdata.length;i++){
        if(rawdata[i].productMedia[0] != null){
            if(rawdata[i].category!=null){
                categoryName[j]=rawdata[i].category.categoryName;
                j++;
            }
        }                   
     }
       
    
    function unique(array) {
        var sortArr = array.concat().sort() //返回新数组
        var res = [sortArr[0]]
        for(var i=1; i < sortArr.length; i++) {
          if(sortArr[i] !== sortArr[i-1]) {
              res.push(sortArr[i])
              
          }
        }
        return res
    }
    var categoryName_new=unique(categoryName);

    var options_category=[];
    for(let x=0;x<categoryName_new.length;x++){
        options_category[x]=document.createElement("option");
        category_select.appendChild(options_category[x]);
        options_category[x].innerHTML=categoryName_new[x];
        options_category[x].value="x";
    }
    //  var options_category=[];
    //  options_category={option0,option1,option2};

     // category 选择器 button
     var category_btn=document.createElement("button");
     category.appendChild(category_btn);
     category_btn.id="category_filter";
     category_btn.innerHTML="Show";
     category_btn.style="width:70px;height:30px;background:green;color:white;margin-left:2%;";

    document.getElementById("category_filter").onclick=function(){
        var option_value= category_select.options.selectedIndex; 
        
        category_variable=option_value;
        
        var option_txt= category_select.options[category_select.selectedIndex].innerText;
        cate_txt=option_txt;
        

        if(option_value<19 ){
            get_category(option_txt);
        }else{
           alert("");
        }
    }

    // 恢复选择
    var all=document.createElement("div");
    document.getElementById("filter").appendChild(all);
    all.className="col-lg-3  pt-4 mb-2";

    
    // price文本
    var all_txt=document.createElement("button");
    all_txt.id="all"
    all_txt.style="width:70px;height:30px;background:green;color:white;margin-left:20%;"
    all.appendChild(all_txt);
    all_txt.innerText="All";
    // 点击all按钮获取全部元素
    document.getElementById("all").onclick=function(){
        location.reload();
    }

}



// 被调用 来筛选价格区间
function get_price(variables){
    switch(variables){
        case 1:
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            console.log(cate_txt)
            if(cate_txt==null || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               console.log(1)
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>0 && rawdata[price_select].price<50){
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                    }
                }
              
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                    if(element.price>0 && element.price<50){
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                    }
                }
                price_set=cate_prodID_new;
            }
            var objs_price=[];
            console.log(price_set);
            for(z=0;z<price_set.length;z++){
                for(let a=0;a<rawdata.length;a++){
                    if(rawdata[a].prodId==price_set[z]){
                        
                        if(rawdata[a].productMedia !=null){
                            for(let j=0;j<rawdata[a].productMedia.length;j++){
            
                                // 创建每个item
                                objs_price[j] =document.createElement("div");
                                objs_price[j].style="text-align:center;";
                                objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                // 创建每个item里面的img
                                

                                var img=document.createElement("img");
                                img.style="width:100%;height:200px;"
                                img.className="img";
                                img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                objs_price[j].appendChild(img);  
                                
                                // 创建每个item里面的title
                                var title=document.createElement("div");
                                title.className="title";
                                title.style="height:75px;"
                
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
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            
            if(cate_txt==null  || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>=50 && rawdata[price_select].price<100){
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                    }
                }
             
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                    if(element.price>=50 && element.price<100){
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                    }
                }
                price_set=cate_prodID_new;
            }
           
                var objs_price=[];
                for(z=0;z<price_set.length;z++){
                   for(let a=0;a<rawdata.length;a++){
                       if(rawdata[a].prodId==price_set[z].prodId){
                            if(rawdata[a].productMedia !=null){
                                for(let j=0;j<rawdata[a].productMedia.length;j++){
                                    // 创建每个item
                                    objs_price[j] =document.createElement("div");
                                    objs_price[j].style="text-align:center;";
                                    objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                    // 创建每个item里面的img
                                    var img=document.createElement("img");
                                    img.style="width:100%;height:200px;";
                                    img.className="img";
                                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                    objs_price[j].appendChild(img);  
                                    // 创建每个item里面的title
                                    var title=document.createElement("div");
                                    title.className="title";
                                    title.style="height:75px;"
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
        case 3:
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            console.log(cate_txt)
            if(cate_txt==null  || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>=100 && rawdata[price_select].price<150){
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                    }
                }
                console.log(price_set)
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                    if(element.price>=100 && element.price<150){
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                    }
                }
                price_set=cate_prodID_new;
            }

            var objs_price=[];
            for(z=0;z<price_set.length;z++){
                for(let a=0;a<rawdata.length;a++){
                    if(rawdata[a].prodId==price_set[z]){
                        if(rawdata[a].productMedia !=null){
                            for(let j=0;j<rawdata[a].productMedia.length;j++){
                                // 创建每个item
                                objs_price[j] =document.createElement("div");
                                objs_price[j].style="text-align:center;";
                                objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                // 创建每个item里面的img
                                var img=document.createElement("img");
                                img.style="width:100%;height:200px;";
                                img.className="img";
                                img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                objs_price[j].appendChild(img);  
                                // 创建每个item里面的title
                                var title=document.createElement("div");
                                title.className="title";
                                title.style="height:75px;"
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
        case 4:
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            
            if(cate_txt==null  || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>=150 && rawdata[price_select].price<200){
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                    }
                }
             
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                    if(element.price>=150 && element.price<200){
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                    }
                }
                price_set=cate_prodID_new;
            }

            var objs_price=[];
            for(z=0;z<price_set.length;z++){
                for(let a=0;a<rawdata.length;a++){
                    if(rawdata[a].prodId==price_set[z]){
                        if(rawdata[a].productMedia !=null){
                            for(let j=0;j<rawdata[a].productMedia.length;j++){
                                // 创建每个item
                                objs_price[j] =document.createElement("div");
                                objs_price[j].style="text-align:center;";
                                objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                // 创建每个item里面的img
                                var img=document.createElement("img");
                                img.style="width:100%;height:200px;";
                                img.className="img";
                                img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                objs_price[j].appendChild(img);  
                                // 创建每个item里面的title
                                var title=document.createElement("div");
                                title.className="title";
                                title.style="height:75px;"
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
        case 5:
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            
            if(cate_txt==null  || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               
                for(let price_select=1;price_select<rawdata.length;price_select++){
                    if(rawdata[price_select].price>=200){
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                    }
                }
             
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                    if(element.price>=200 ){
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                    }
                }
                price_set=cate_prodID_new;
            }

                var objs_price=[];
                for(z=0;z<price_set.length;z++){
                    for(let a=0;a<rawdata.length;a++){
                        if(rawdata[a].prodId==price_set[z]){
                            if(rawdata[a].productMedia !=null){
                                for(let j=0;j<rawdata[a].productMedia.length;j++){
                                    // 创建每个item
                                    objs_price[j] =document.createElement("div");
                                    objs_price[j].style="text-align:center;";
                                    objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                    // 创建每个item里面的img
                                    var img=document.createElement("img");
                                    img.style="width:100%;height:200px;";
                                    img.className="img";
                                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                    objs_price[j].appendChild(img);  
                                    // 创建每个item里面的title
                                    var title=document.createElement("div");
                                    title.className="title";
                                    title.style="height:75px;"
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
           
            x=0;
            document.getElementById("display").innerHTML=null;
            var price_set=new Array();
            
            if(cate_txt==null  || cate_txt=="All"){
                  // 如果category没有选择任何-得到符合价格区间的prodId的array:price_set
               
                for(let price_select=1;price_select<rawdata.length;price_select++){
                   
                        
                        price_set[x]=rawdata[price_select].prodId;
                        x++;
                   
                }
             
            }else{
              //  调用get_category得到符合category和price区间的prodId 数组 cate_prodID_new
                var cate_prodID= get_category(cate_txt);
                var cate_prodID_new=new Array();
                for(let element of cate_prodID){
                  
                   
                      
                        cate_prodID_new[x]=new Array();
                        cate_prodID_new[x].prodId=element.prodId;
                        cate_prodID_new[x].price=element.price;
                        x++;
                   
                }
                price_set=cate_prodID_new;
            }

                var objs_price=[];
                for(z=0;z<price_set.length;z++){
                    for(let a=0;a<rawdata.length;a++){
                        if(rawdata[a].prodId==price_set[z]){
                            if(rawdata[a].productMedia !=null){
                                for(let j=0;j<rawdata[a].productMedia.length;j++){
                                    // 创建每个item
                                    objs_price[j] =document.createElement("div");
                                    objs_price[j].style="text-align:center;";
                                    objs_price[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                                    // 创建每个item里面的img
                                    var img=document.createElement("img");
                                    img.style="width:100%;height:200px;";
                                    img.className="img";
                                    img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                                    objs_price[j].appendChild(img);  
                                    // 创建每个item里面的title
                                    var title=document.createElement("div");
                                    title.className="title";
                                    title.style="height:75px;"
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
                
           
    }
}

//  被调用来筛选category
function get_category(category_variables){
    
    var category_prodID=new Array();
    j=0;
   
    /*************************************** */
   // console.log(price_variable,2)
    
    /************************************* */
    if(category_variables=="All"){
        for(let i=0;i<rawdata.length;i++){
            if(rawdata[i].productMedia[0] != null){
                if(rawdata[i].category!=null){
                    category_prodID[j]=new Array();
                    category_prodID[j].prodId=rawdata[i].prodId;
                    category_prodID[j].price=rawdata[i].price;
                    j++;
                }
            }
        }
    }else{
        for(let i=0;i<rawdata.length;i++){
            if(rawdata[i].productMedia[0] != null){
                if(rawdata[i].category!=null){
                   
                    if(category_variables == rawdata[i].category.categoryName){
                        category_prodID[j]=new Array();
                        category_prodID[j].prodId=rawdata[i].prodId;
                        category_prodID[j].price=rawdata[i].price;
                        j++;
                    }
                }
            }
        }
    }
   
    
   console.log(category_prodID)
   //  得到联合价格筛选后的prodId和price
     var category_prodID_New=new Array();
     
     switch(price_variable){
         case 1:
             y=0;
             for(let element of category_prodID ){
                if( element.price>=1 &&element.price<51 ){
                    category_prodID_New[y]=new Array();
                    category_prodID_New[y].prodId=element.prodId;
                    category_prodID_New[y].price=element.price;
                    y++;
             }           
        };
        break;
        case 2:
            y=0;
            for(let element of category_prodID ){
               if( element.price>=51 &&element.price<101 ){
                   category_prodID_New[y]=new Array();
                   category_prodID_New[y].prodId=element.prodId;
                   category_prodID_New[y].price=element.price;
                   y++;
            }           
       };
       break;
       case 3:
           y=0;
        for(let element of category_prodID ){
           if( element.price>=101 && element.price<151 ){
               category_prodID_New[y]=new Array();
               category_prodID_New[y].prodId=element.prodId;
               category_prodID_New[y].price=element.price;
               y++;
                    }           
            };
        break;
        case 4:
            y=0;
            for(let element of category_prodID ){
            if( element.price>=151 &&element.price<201 ){
                category_prodID_New[y]=new Array();
                category_prodID_New[y].prodId=element.prodId;
                category_prodID_New[y].price=element.price;
                y++;
            }           
        };
        break;
        case 5:
            y=0;
          //  console.log(5,y)
            for(let element of category_prodID ){
              //  console.log(6,y)
            if( element.price>=201  ){
               // console.log(7,y)
                category_prodID_New[y]=new Array();
                category_prodID_New[y].prodId=element.prodId;
                category_prodID_New[y].price=element.price;
                y++;
            }           
        };
        break;

        default:
            category_prodID_New=category_prodID;
           
    }
   // console.log(category_prodID_New)
     /*********************************** */
    // 调用get_content(传参数)？
    var objs_category=[];
    // console.log("nullset")
    document.getElementById("display").innerHTML=null;
    
    for(z=0;z<category_prodID_New.length;z++){
        
        for(let a=0;a<rawdata.length;a++){
         //    如果 category_prodID 中prodId在rawdata中存在，就显示在#display
            if(rawdata[a].prodId==category_prodID_New[z].prodId){
                
                 if(rawdata[a].productMedia !=null){
                    
                     for(let j=0;j<rawdata[a].productMedia.length;j++){
                      
                         // 创建每个item
                         objs_category[j] =document.createElement("div");
                         objs_category[j].style="text-align:center;";
                         objs_category[j].className=" col-sm-4 col-lg-2 mt-5 block ";
                         // 创建每个item里面的img
                         

                         var img=document.createElement("img");
                         img.style="width:100%;height:200px;"
                         img.className="img";
                         img.src="https://storage.googleapis.com/luxe_media/wwwroot/"+rawdata[a].productMedia[j].url;
                         objs_category[j].appendChild(img);  
                         
                         // 创建每个item里面的title
                         var title=document.createElement("div");
                         title.className="title";
                         title.style="height:75px;"
         
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
                         objs_category[j].appendChild(title);
                         objs_category[j].appendChild(price);
                         document.getElementById("display").appendChild(objs_category[j]);
                     }
                 }
            }
        }
       
     }

     return category_prodID;

}
