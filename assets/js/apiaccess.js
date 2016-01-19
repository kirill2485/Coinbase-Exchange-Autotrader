var pricehistory=[];
var hi=3;
var enableScrolling=true;
function toggleScrolling(){
    if(enableScrolling==false){
        console.log("started");
        enableScrolling=true;
        document.getElementById("toggleScrolling").innerHTML="Disable scrolling";
    }
    else{
        enableScrolling=false;
        hi=2;
        document.getElementById("toggleScrolling").innerHTML="Enable scrolling";
    }
    
}

var lastprice;
var currentprice;
function getter(){
        $.ajax({
            url: "https://api.exchange.coinbase.com/products/BTC-USD/trades?limit=13",
            dataType: 'json',
            success: function(results){
            currentprice=parseFloat(results[0]["price"]);
            lastprice=parseFloat(results[3]["price"]);
            for (i=2; currentprice==lastprice; i++){
                lastprice==results[i]["price"]; //this will give an error when there is no price to give - expected
            }
        }                    
    });
}
function setter(){
    $.ajax({
            url: "https://api.exchange.coinbase.com/accounts/",
            dataType: 'json',
            contentType: 'application/json',
            headers:{
                    'CB-ACCESS-KEY': 'some value',
                    'Access-Control-Allow-Origin': '*' 
            },
            success: function(results){
                console.log(results[1]);
            }
        });
    }
setter();
getter();
priceCheck();
var originalprice;
function priceCheck(){
    
    if(true){
        var buyorsell="<font color='#00de00'>Buy ";
        console.log(enableScrolling);
        getter();
        setTimeout(priceCheck,700);
        
        document.getElementById("test").innerHTML="The current price is " + currentprice;
        document.getElementById("test2").innerHTML="The last price was " + lastprice;
        $("#tx").append("<br> "+ buyorsell + " 0.14 BTC </font> at " + currentprice + " USD/BTC");
        if (originalprice!=currentprice){
            $("#ph").append("<br>"+ currentprice + " USD/BTC");
            pricehistory.push(currentprice);
            if(pricehistory[pricehistory.length-1]<pricehistory[pricehistory.length-2]<pricehistory[pricehistory.length-3]){
                console.log("sell");
            }
        }
        var element = document.getElementById("tx", "ph");
        if (enableScrolling==true){
            element.scrollTop = element.scrollHeight;
        }
        console.log(pricehistory[2]);
        console.log(pricehistory.length);
        originalprice=currentprice;
    }
}