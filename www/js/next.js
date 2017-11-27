document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //document.addEventListener("resume", onResume, false);
	
	$("#nomeneg").html("<font color='#fff' size='3'>" + " " + localStorage.getItem("nomenegozio"));
	$("#cittaneg").html("<font color='#000' size='2'>" + " " + localStorage.getItem("citta"));
	$("#indirizzoneg").html("<font color='#000' size='2'>" + " " + localStorage.getItem("indirizzo"));
    

	$(document).on("touchstart", "#indietro", function(e){
		//window.location.href = "index.html";
				   
        window.location.href = "index.html";
				   
	});

	
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';

	
	var email = localStorage.getItem("email");

	//$("#radio").attr("href", "maps:saddr="+ localStorage.getItem("ciao") +","+ localStorage.getItem("ciao1") +"&daddr=Via di Acilia,17,Roma");


    if(connectionStatus=='online'){
		$(".spinner").hide();

        $("#spinner").show();
        
        //alert("http://msop.it/tagliafila/check_miaimg.php?idnegozio="+localStorage.getItem("idnegozio")+"")
        
        $.ajax({
               type: "GET",
               url: "http://msop.it/tagliafila/check_miaimg.php?idnegozio="+localStorage.getItem("idnegozio")+"",
               cache: false,
               crossDomain: true,
               contentType: "application/json",
               timeout: 7000,
               jsonp: 'callback',
               crossDomain: true,
               success: function (result) {
               
               $("#spinner").hide();
               
               $.each(result, function(i,item){
                      
                      //alert(item.miaimg)
                      
                      var miafoto = item.miaimg
                      miafoto = miafoto.replace(".jpg","")
                      
                      $("#miaimg").html("<img src='http://msop.it/tagliafila/img/"+item.miaimg+"' width='100%'>");
                      localStorage.setItem("miafoto",miafoto);
                      
               });
               
               
               },
               error: function( jqXhr, textStatus, errorThrown ){
               
               alert(errorThrown)
               $("#miaimg").html("<img src='img/immagine.jpg' width='100%'>");
               
               },
               dataType:"jsonp"});
		
    }
    
    else{
		
		$("#noconn").html(tabella);
		
    }
    
    
    $(document).on("touchstart", "#edita", function(e){
                   
        window.location.href = "edita.html";
                   
    });
    
}

function seleziona() {
	
	//alert(localStorage.getItem("email"))
	
	var landmark2="";
	$(".spinner").show();
	
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_MieNotifiche.asp",
		   contentType: "application/json",
		   data: {email:localStorage.getItem("email")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
			if(item.ID==0) {
				landmark2 = landmark2 + "Nessuna notifica presente.";
			}
			else{
				//alert("ok")
				
				//var anno = item.Data.slice(0,4)
				//var mese = item.Data.slice(4,6)
				//var giorno = item.Data.slice(6,8)
				
				var comp =  item.Giorno + "/" +  item.Mese + "/" +  item.Anno + "&nbsp;-&nbsp;" + item.Ora + ":" + item.minuti
				  
				landmark2 = landmark2 + "<table height='30px' border='0' width='320px'><tr><td align='left' colspan='2'><font size='4' color='#454545'><img src='img/push.png' width='18'>&nbsp;"+ comp +"</font></td></tr><tr><td align='left' colspan='2'><font size='2' color='#454545'>"+ item.Push  +"</font></td></tr></table><hr><br>";
				}

			});
		   
		   //landmark2 = landmark2 + "<br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br>";

		   
		   $(".spinner").hide();
		   
		    $("#recensione1").html(landmark2);
		   
		   $("#noconn").hide();
		   
		   myScroll.refresh();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
}




function onResume() {
    onDeviceReady();
}

function alertDismissed() {
	$(".spinner").hide();
}





