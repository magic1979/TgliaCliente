
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:@
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler@
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//document.addEventListener("resume", onResume, false);
        app.receivedEvent('deviceready');

		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		var myScroll;
		var myScroll2;
		

		myScroll = new iScroll('wrapper', { click: true });
		
		setTimeout (function(){
			myScroll.refresh();
		}, 1500);


		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off@
		$('input, select')
		.on('focus', function (e) {
			$('header, footer').css('position', 'absolute');
			})
		.on('blur', function (e) {
			$('header, footer').css('position', 'fixed');
			//force page redraw to fix incorrectly positioned fixed elements
			//setTimeout( function() {
			//window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
			//		   }, 20 );
			});
			
	
		$(document).keydown(function (eventObj){
			getKey(eventObj);
		});
        
        
        //localStorage.setItem("info", "0")
        
        
        if(localStorage.getItem("info")=="1"){
            
            $("#informativa").hide();
            
            $("#menucliente").show();
            
            $("#mieiservizi").show();
        
        }
        else{
			
            $("#menucliente").hide();
            
            $("#mieiservizi").hide();
            
            $("#informativa").show();
        }
        
        
        $(document).on("touchstart", "#chiudiinfo", function(e){
                       
           localStorage.setItem("info", "1")
           
           window.location.href = "#page";
           
           $("#informativa").hide();
           
           $("#menucliente").show();
           
           $("#mieiservizi").show();
		   
		   setTimeout (function(){
				myScroll.refresh();
			}, 1000);
           
        })
		
		
		setTimeout (function(){
			myScroll.refresh();
		}, 200);
        
		
		var email = localStorage.getItem("email");
		var loginvera = localStorage.getItem("loginvera");
		var ciao = "";
		var ciao1 = "";
		var distanza = "";
		var Categoria="";
		var Provincia="";
		var model = "Iphone";
		var Badge10 = localStorage.getItem("Badge10");
		var db;
		var dbCreated = false;
		
	
		if((email=="")||(!email)){
			$("#btnprofilo").attr("href", "#page4");
			$("#btnprofilo").attr("onclick", "javascript:checklogin();");
		}else{
			$("#btnprofilo").attr("href", "#mypanel");
			$("#btnprofilo").attr("onclick", "#");
		}
		
		if((Badge10=="")||(!Badge10)||(Badge10==0)){
			localStorage.setItem("Badge10", 0)
			$('#badde').removeClass('badge1').addClass('badge2');
			
		}else{
			$('#badde').removeClass('badge2').addClass('badge1');
			$("#badde").attr("data-badge", Badge10);
			$("#badde").html('<img src="img/CartW.png" width="20px">');
			
			$('#badde2').removeClass('badge2').addClass('badge1');
			$("#badde2").attr("data-badge", Badge10);
			$("#badde2").html('<img src="img/CartW.png" width="20px">');
		}
        
		
		var servizio = getParameterByName('servizio');
		
        var negozio = getParameterByName('id_negozio');
		
		if (negozio === null || negozio=="null" || typeof(negozio) == 'undefined' || negozio==0 || negozio=="") {
            
        }
        else{
			
            localStorage.setItem("negozio", negozio);
			
		   $.ajax({
           type: "GET",
           url:"http://www.gtechplay.com/tagliafila/www/lista_servizibyid.asp",
           contentType: "application/json",
           data: {id_servizio:localStorage.getItem("negozio")},
           cache: false,
           crossDomain: true,
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success: function (result) {
           
           $.each(result, function(i,item){
                  
			  
			  localStorage.setItem("nome_negozio", item.nome);
			  localStorage.setItem("citta_negozio", item.citta);
			  localStorage.setItem("indirizzo_negozio", item.indirizzo);
			  localStorage.setItem("tel_negozio", item.tel);
			  
			  //<img src='http://msop.it/tagliafila/img/"+item.img+"' width='150' class='circolare'>
			  
			  $("#nome_negozio").html(item.nome);
			  $("#ind_negozio").html(item.indirizzo + ", " + item.citta);
 
            });
			
			
			 var loggato = localStorage.getItem("loginvera")
            
             if((loggato=="")||(!loggato)){
                //window.location.href = "Login.html";
             }else{
                
               verifica_alert();
             }
			 
			 setTimeout (function(){
			    myScroll.refresh();
		     }, 1000);
           
           
           },
           error: function( jqXhr, textStatus, errorThrown ){
           
              alert(errorThrown)
           
           
           },
           dataType:"jsonp"});
        }

		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			
			if(servizio=="1"){
                $("#menucliente").hide();
                
                $("#informativa").hide();
                
                $("#mieiservizi").show();
                
                listznegozi()
            }
	
			var msg;
			var test;
			var P1 = '110';
	
			var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
			db.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
			})
			
	
			
			mostrapunti()
			
			$(".spinner").hide();
			
			buildprodotto('Pizza','Roma',1);
			
			
			if ((localStorage.getItem("emailStory")=="")||(!localStorage.getItem("emailStory"))||(localStorage.getItem("emailStory")==0)){
				//alert("Non ci sta")
			}
			else{
				if(localStorage.getItem("emailStory")==localStorage.getItem("email2")){
					//alert("stesso utente")
				}
				else{
					//alert("cancella")
					if(localStorage.getItem("email3")!=1){
						navigator.notification.confirm(
						'Stai cercando di accedere con un altro utente, assicurati prima di svuotare il tuo carrello per non perdere i punti della tua card prima di procedere.',  // message
							onConfirm,              // callback to invoke with index of button pressed
							'Attenzione',            // title
							'Prosegui,Annulla'      // buttonLabels
					);
					}
				}
			}
			
			
			//REG DEVICE PER PUSH
			var loggato = localStorage.getItem("loginvera")
			
			if((loggato=="")||(!loggato)){
				//alert("blocco1")
			}else{
				
				
				/*if(localStorage.getItem("Registrato")!=1){
					
					
					setTimeout (function(){
								
								PushbotsPlugin.getToken(function(token){
														localStorage.setItem("Token", token);
														
														RegToken()
														});
								
								}, 2000);
					
				}
				else{
					
				}*/
				
			}

			
			$("#footer").show();
			
			//alert("6")
			
		}
		else{
			
			var tabella = "<table align='center' border='0' width='100%' height='120px'>";
			tabella = tabella + "<tr><td align='center'><a href='javascript:riparti()' class='btn'><font color='#fff'>Connetti</font></a></td></tr>";
			tabella = tabella + "</table>";
			
			$("#noconn").html(tabella);
			
			
			$("#footer").show();
		}
    }
	
}


function verifica_alert(){
    
    $.ajax({
           type: "GET",
           url:"http://www.gtechplay.com/tagliafila/www/verifica_alert.asp",
           contentType: "application/json",
           data: {email:localStorage.getItem("email"),negozio:localStorage.getItem("negozio")},
           cache: false,
           crossDomain: true,
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success: function (result) {

               $.each(result, function(i,item){
                      
                      if(item.Token=="1"){
                      
                        navigator.notification.alert(
                           'Devi effettuare una recensione dopo il servizio offerto',  // message
                           alertDismissed,         // callback
                           'Recensione',            // title
                           'OK'                  // buttonName@
                         );
                      
                      }
                      
                });
           
           },
           error: function( jqXhr, textStatus, errorThrown ){
           
              alert(errorThrown)
           
           
           },
           dataType:"jsonp"});
    
}


$(document).on("tap", "#btn_coloredonna", function(e){
               
   localStorage.setItem("addidprestazione", "15");
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();
   
   
    ////window.location.href = "#page2";
	

    listznegozi()
   
   //listaprestazione("15")
               
})


$(document).on("tap", "#goordini", function(e){
   

	   
    window.location.href = "Profilo2.html";
	
               
})

$(document).on("tap", "#gopreferiti", function(e){
               
   localStorage.setItem("addidprestazione", "0");
   
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();

	///myScroll2 = new iScroll('wrapper2', { click: true });
	
	setTimeout (function(){
		myScroll.refresh();
	}, 1000);
   
    //window.location.href = "#page2";
	

    listznegozi()
   
   //listaprestazione("15")
               
})



$(document).on("tap", "#btn_tagliodonna", function(e){
               
   localStorage.setItem("addidprestazione", "10");
   
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();
   
    //window.location.href = "#page2";
   
    listznegozi()
   
   //listaprestazione("15")
               
})

$(document).on("tap", "#btn_tagliouomo", function(e){
               
   localStorage.setItem("addidprestazione", "11");
   
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();
   
   //window.location.href = "#page2";
   
   listznegozi()
   
   //listaprestazione("15")
       
})

$(document).on("tap", "#btn_permanente", function(e){
               
   localStorage.setItem("addidprestazione", "12");
   
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();
   
    //window.location.href = "#page2";
    listznegozi()
   
   //listaprestazione("15")
               
})



$(document).on("tap", "#btn_shampouomo", function(e){
               
   localStorage.setItem("addidprestazione", "13");
   
   
   $("#menucliente").hide();
   
   $("#mieiservizi").show();
   
   //window.location.href = "#page2";
   
   listznegozi()
   
   //listaprestazione("15")
   
})



$(document).on("touchstart", "#menuR", function(e){
               
   window.location.href = "menu.html";
   
})

$(document).on("touchstart", "#badde2", function(e){
               
   window.location.href = "cart.html";
   
})


$(document).on("touchstart", "#btnprofilo7", function(e){
               
   window.location.href = "rating.html";
})



$(document).on("touchstart", "#altro", function(e){
	
	
	$("#nome_negozio").html(localStorage.getItem("nome_negozio"));
	$("#ind_negozio").html( localStorage.getItem("indirizzo_negozio") + ", " + localStorage.getItem("citta_negozio"));
               
   $("#btnpanel").click();
   
});


$(document).on("touchstart", "#premi", function(e){
               
    window.location.href = "premi.html";
})


$(document).on("touchstart", "#index_negozio", function(e){
               
    window.location.href = "index.html";
 })
 
 
 $(document).on("touchstart", "#indietro", function(e){
               
    window.location.href = "index.html?servizio=1";
               
})
 
 
 $(document).on("touchstart", "#add_prefer", function(e){
               
    navigator.notification.alert(
	'Aggiunto a preferiti',  // message
	alertDismissed,         // callback
	'Preferiti',            // title
	'OK'                  // buttonName
	);
 })



$(document).on("touchstart", "#profilo", function(e){
               
   var loggato = localStorage.getItem("loginvera")
   var tblProfile;
   
   if((loggato=="")||(!loggato)){
   window.location.href = "Login.html";
   }else{
   
   window.location.href = "Profilo.html";
   }
})


$(document).on("touchstart", "#contattaci", function(e){
	
               
    window.location.href = "tel:+39"+localStorage.getItem("tel_negozio")+"";
	
 })


$(document).on("touchstart", "#dove", function(e){
               
    gomappa();
})

$(document).on("tap", "#ritorna", function(e){
               

    window.location.href = "#page";
               
})


function listznegozi(){
	
	 $("#mieiservizi").html("");
	
	
	$("#mieiservizi").show();
	
	
	if(localStorage.getItem("addidprestazione")=="15"){
    
       $("#nome").html("<img src='img/coloredonna.jpg' width='100%'><br><br>");
	}
	
	if(localStorage.getItem("addidprestazione")=="10"){
    
       $("#nome").html("<img src='img/tagliodonna.jpg' width='100%'><br><br>");
	}
	
	
	if(localStorage.getItem("addidprestazione")=="11"){
    
       $("#nome").html("<img src='img/tagliouomo.jpg' width='100%'><br><br>");
	}
	
	if(localStorage.getItem("addidprestazione")=="12"){
    
       $("#nome").html("<img src='img/permanente.jpg' width='100%'><br><br>");
	}
	
	
	if(localStorage.getItem("addidprestazione")=="13"){
    
       $("#nome").html("<img src='img/shampouomo.jpg' width='100%'><br><br>");
	}
	
	if(localStorage.getItem("addidprestazione")=="0"){
    
       $("#nome").html("<img src='img/preferiti.jpg' width='100%'><br><br>");
	}
    
	
    $("#spinner").show();
	
	
    var ciccio = 1
 
 
    $.ajax({
           type: "GET",
           //url: "http://msop.it/tagliafila/check_listanegozio.php",
           url:"http://www.gtechplay.com/tagliafila/www/lista_servizi.asp",
           contentType: "application/json",
           data: {id_servizio:localStorage.getItem("addidprestazione")},
           cache: false,
           crossDomain: true,
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success: function (result) {
			   
		   //alert("2")
           
           var tabella1 =""
           
           $("#spinner").hide();
           var listacompleta="";
           
           $.each(result, function(i,item){
                  
                  pluto = item.id_servizio
                  
                  tabella1 = "<table width='80%' align='center'>";
                  
                  tabella1 = tabella1 + "<tr><td align='right' width='150' valign='center'><a id='"+item.codice+"'> <img src='http://msop.it/tagliafila/img/"+item.img+"' width='150' class='nocircolare'> </a></td><td align='left' width='100%' valign='center'><font size='4'><b>"+item.nome+"</b></font></td></tr>"
                  
                  tabella1 = tabella1 + "<tr><td align='left' width='100%' valign='center' colspan='2'>"+item.citta+", "+item.indirizzo+"</td></tr>"
                  
                  tabella1 = tabella1 + "<tr><td align='left' width='100%' valign='center' colspan='2'><br><br><br></td></tr></table><br>";
                  
                  $("#mieiservizi").append(tabella1);
                  
                  
				  
                  $(document).on("tap", "#"+item.codice+"", function(e){
                                 
                     window.location.href = "index_negozio.html?id_negozio="+this.id+"";
                                 
                    /*if(this.id=="cc_15"){
                                 
                      window.location.href = "index_negozio.html?id_negozio="+item.codice+"";
                    }
                    else{
                                 
                         navigator.notification.alert(
                          'Nessun negozio configurato',  // message
                          alertDismissed,         // callback
                          'Negozio',            // title
                          'Done'                  // buttonName@
                          );
                                 
                    }*/
                                 
                    //passo2(this.id)
                     
                });
                  
                  
            });
			
			
			$("#mieiservizi2").append("<table id='#' width='100%' height='50' align='center' valign='center'><tr><td><br></td></tr></table>");
			
			
			 myScroll.scrollTo(0, 0);
			//myScroll.scrollToElement("#nome", "1s");
           
           
           setTimeout (function(){
			   
			    myScroll.scrollTo(0, 0);
			     

                myScroll.refresh();
				
				e.stopImmediatePropagation();
           
                e.preventDefault();
				
					   
            }, 1000);
			
	
           
           },
           error: function( jqXhr, textStatus, errorThrown ){
           
              alert(errorThrown)
           
           
           },
           dataType:"jsonp"});
    
}



function onConfirm(button) {
	
	if (button==1){
		localStorage.setItem("email3", 1);
		dlt()
	}
	else{
		localStorage.setItem("email2", localStorage.getItem("emailStory"));
		
		localStorage.setItem("loginvera", "")
		localStorage.setItem("email", "")
		
		window.location.href = "Login.html";
	}
}

function gocart() {
	//db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
	$(document).on('pagebeforeshow', function () {
		$(this).find('a[data-rel=back]').buttonMarkup({
		iconpos: 'notext'
	});
				   
	//setTimeout(function() {
		//$(window).scrollTop($(window).scrollTop()+1);
		//window.scrollTo(0,0);
	//}, 500);
				   
 });
	
	var email = localStorage.getItem("email");
	var Badge10 = localStorage.getItem("Badge10");
	$("#badde3").attr("data-badge", Badge10);
	
	if (Badge10 > 0){
		$('#badde3').removeClass('badge2').addClass('badge3');
	}

	
	if((email=="")||(!email)){
		$("#btnprofilo3").attr("href", "#page4");
		$("#btnprofilo3").attr("onclick", "javascript:checklogin();");
	}else{
		$("#btnprofilo3").attr("href", "#mypanel");
		$("#btnprofilo3").attr("onclick", "#");
	}
	
	//$("#riepilogo9").html("");
	

	//$('#contenutoCart').html(landmark);
	seleziona();
}

function AggProd(prod) {
	
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
		return;
	}
	
	var aggiornamento = 0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	if (prod==1){
		msg="Pizza";
		prezzo="6.50";
	}
	else if (prod==2){
		msg="Panino";
		prezzo="4.50";
	}
	else{
		msg="Menu";
		prezzo="8.00";
	}

	
	localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
	var Badge10 = localStorage.getItem("Badge10");

	$('#badde').removeClass('badge2').addClass('badge1');
	$("#badde").attr("data-badge", Badge10);
	$("#badde").html('<img src="img/CartW.png" width="20px">');
	
	$('#badde2').removeClass('badge2').addClass('badge1');
	$("#badde2").attr("data-badge", Badge10);
	$("#badde2").html('<img id="carro2" src="img/CartW.png" width="20px">');
	
	$('#badde3').removeClass('badge2').addClass('badge1');
	$("#badde3").attr("data-badge", Badge10);
	
	$('#badde4').removeClass('badge2').addClass('badge1');
	$("#badde4").attr("data-badge", Badge10);
	$("#badde4").html('<img src="img/CartW.png" width="20px">');
	
	$( "#carro2" ).effect( "bounce", "slow" );
	
	db.transaction(function (tx) {
		tx.executeSql('UPDATE Ordine set Qta=Qta+1, Descrizione=Descrizione + '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
			aggiornamento = 1;
			//alert("Prod:" + prod);
		}, null);
	});
	
	localStorage.setItem("emailStory", localStorage.getItem("email"));
	
	//se sono diverse cancello carrello

	if(aggiornamento==0){
		agg2(prod)
		//alert("Prod:" + prod);
	}
	
	
}

function SottProd(prod) {
	var aggiornamento = 0;
	var azione=0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	if (prod==1){
		msg="Pizza";
		prezzo="6.50";
	}
	else if (prod==2){
		msg="Panino";
		prezzo="4.50";
	}
	else{
		msg="Menu";
		prezzo="8.00";
	}
	
	var Badge10;
	/*if (parseInt(localStorage.getItem("Badge10")) > 0){
		localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
	
		Badge10 = localStorage.getItem("Badge10");
	
		$("#badde").attr("data-badge", Badge10);
		$("#badde").html('<img src="img/CartW.png" width="20px">');
	
		$("#badde2").attr("data-badge", Badge10);
		$("#badde2").html('<img src="img/CartW.png" width="20px">');
		
	}
	else {
		Badge10 = 0;
		
		$("#badde").attr("data-badge", Badge10);
		$("#badde").html('<img src="img/CartW.png" width="20px">');
		
		$("#badde2").attr("data-badge", Badge10);
		$("#badde2").html('<img src="img/CartW.png" width="20px">');

	}*/
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
					 var len = results.rows.length, i;

						for (i = 0; i < len; i++){
							if (parseInt(results.rows.item(i).Qta) > 1){
								tx.executeSql('UPDATE Ordine set Qta=Qta-1, Descrizione=Descrizione - '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
										//alert("UPD");
										
											  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
											  
											  Badge10 = localStorage.getItem("Badge10");
											  
											  $("#badde").attr("data-badge", Badge10);
											  $("#badde").html('<img src="img/CartW.png" width="20px">');
											  
											  $("#badde2").attr("data-badge", Badge10);
											  $("#badde2").html('<img src="img/CartW.png" width="20px">');
											  
											  $("#badde3").attr("data-badge", Badge10);
											  
											  $("#badde4").attr("data-badge", Badge10);

								   }, null);
							}
							else{
									tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
										//alert("DEL");
										$(".buttonOrdine").hide();
												  
												  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
												  Badge10 = localStorage.getItem("Badge10");
												  
												  $("#badde").attr("data-badge", Badge10);
												  $("#badde").html('<img src="img/CartW.png" width="20px">');
												  
												  $("#badde2").attr("data-badge", Badge10);
												  $("#badde2").html('<img src="img/CartW.png" width="20px">');
												  
												  $("#badde3").attr("data-badge", Badge10);
												  
												  $("#badde4").attr("data-badge", Badge10);
												  
								   }, null);
							}
						}

					 }, null);
				   });
	
	seleziona();
}

function agg(){
	
	/*db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	var msg;
	var test;
	var P1 = '110';
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
       
	});*/
	
}

function agg2(prod){
	//db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	if (prod==1){
		msg="Pizza";
		prezzo="6.50";
		}
	else if (prod==2){
		msg="Panino";
		prezzo="4.50";
	}
	else{
		msg="Menu";
		prezzo="8.00";
	}
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
	   
       tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', 1, 1, "'+ prezzo +'", "'+ msg +'")');
	});
	
	seleziona();
}


function seleziona() {
	var Badge10 = localStorage.getItem("Badge10");
	$("#badde3").attr("data-badge", Badge10);
	var TOT = localStorage.getItem("TOT");
	
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">ORDINE</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">QTA</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">COSTO</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2"></font></th><th><font color="white" size="2"></font></th></tr></thead><tbody id="contenutoCart">';
	
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 landmark = landmark + '<tr><td><font size="3">'+ results.rows.item(i).Nome +'</font></td><td><font size="3">'+ results.rows.item(i).Qta +'</font></td><td><font size="3">'+ results.rows.item(i).Descrizione +'</font></td><td align="center"><a href="javascript:SottProd('+ parseInt(results.rows.item(i).id) +')"><div width="28px" class="home"></div></a></td><td align="center"><a href="javascript:AggProd('+ parseInt(results.rows.item(i).id) +')"><div width="28px" class="home1"></div></td></tr>';
					 
					  //TOT = (Number(TOT) + Number(results.rows.item(i).Descrizione));
					 
					 //$("#buttonOrdine").show();
					 
					 //miaVariabile = msg.split(",");
					 
					 //document.write(miaVariabile[0] + "<br>");
					 //document.write(miaVariabile[1] + "<br>");
					 
					 //$('#esempio').html(miaVariabile[0] + miaVariabile[1]);
					 //$('#contenutoCart').html(msg);
					 
					 }
					 
					 landmark = landmark + '</tbody></table>';
					 $('#contenutoCart').html(landmark);
					 
					 selPrezzo();
					 //$('#TOTPrezzo').html(TOT.toFixed(2));
					 //localStorage.setItem("TOT", TOT.toFixed(2))
					 
					 
					 }, null);
				   });

}

function dlt(){
	localStorage.setItem("Badge10", 0)
	$('#badde').removeClass('badge1').addClass('badge2');
	
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
	}, null);
	});
	
	
	localStorage.setItem("Badge10", 0)
	
	Badge10 = localStorage.getItem("Badge10");
	
	$("#badde").attr("data-badge", Badge10);
	
	$("#badde2").attr("data-badge", Badge10);

	$('#badde3').removeClass('badge3').addClass('badge2');
	
	$('#badde4').removeClass('badge3').addClass('badge2');
	
	localStorage.setItem("TOT", 0)

	seleziona();
}

function selPrezzo(){
	db.transaction(function (tx) {
       tx.executeSql('SELECT SUM(Descrizione) as TOT FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
						$('#TOTPrezzo').html(Number(results.rows.item(i).TOT).toFixed(2));
					 }

					 
					 }, null);
				   });
	
	document.removeEventListener('touchmove', handleTouch, false);

}

function compraConsegna(){
	navigator.notification.alert(
								 'Riceverai la conferma e i tempi di consegna entro pochi minuti, grazie.',  // message
								 alertDismissed,         // callback
								 'Ordine Spedito',            // title
								 'Chiudi'                  // buttonName
								 );
}


function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}

function checkPos() {
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	
	function onSuccess(position) {
		ciao = position.coords.latitude;
		ciao1 = position.coords.longitude;
		
		localStorage.setItem("lat", ciao)
		localStorage.setItem("lng", ciao1)
		
		localStorage.setItem("geostory", "SI")
		
		//$("#radio").attr("href", "maps:saddr="+ ciao +","+ ciao1 +"&daddr=Via di Acilia,17,Roma");
		
		
		//alert('Lat' + ciao + 'Lng' + ciao1);
		/*$("#radio").attr("href", "maps:saddr="+ ciao +","+ ciao1 +"&daddr=Via di Acilia,17,Roma");
		$("#radio2").attr("href", "maps:saddr="+ ciao +","+ ciao1 +"&daddr=Via di Acilia,17,Roma");
		$("#radio9").attr("href", "maps:saddr="+ ciao +","+ ciao1 +"&daddr=Via di Acilia,17,Roma");*/
	}
	
	
	function onError(error) {
		
		localStorage.setItem("geostory", "NO")
		
		/*$("#radio").attr("maps:q=Via di Acilia, 17,Roma");
		$("#radio2").attr("maps:q=Via di Acilia, 17,Roma");
		$("#radio9").attr("maps:q=Via di Acilia, 17,Roma");*/

	}
	
}


function gomappa(){
	
	var addressLongLat = ''+localStorage.getItem("indirizzo_negozio")+', '+localStorage.getItem("citta_negozio")+'';
	
	//window.open("http://maps.apple.com/?q="+addressLongLat, '_system');
	
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	window.open("http://maps.google.com/?q="+addressLongLat, '_system');
	
	
}

$(document).on("touchstart", "#gomappa2", function(e){
	
	var addressLongLat = "Roma, Italia";
	
	//window.open("http://maps.apple.com/?q="+addressLongLat, '_system');
	
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	window.open("http://maps.google.com/?q="+addressLongLat, '_system');
	
	
})



function gofacebook(){
	var ref = window.open('https://m.facebook.com/', '_system', 'location=no');
}


function getDistance(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1);
	var a =
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dLon/2) * Math.sin(dLon/2)
	;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}



function apri() {
	var pagina = "donazione";
	var ref = window.open('http://www.pokeranswer.it/live/'+ pagina +'.asp', '_blank', 'location=no');
	//www.pokeranswer.it/live/aams.html
}

function GoBack() {
	$(window).scroll(function() {
					 if($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
					 buildprodotto(localStorage.getItem("Categoria"),localStorage.getItem("Provincia"),2,1);
					 }
					 });
	  history.go(-1);
	
	}

function prodotto(idProdotto) {
	
	//loaded();
	//$(window).off("scroll");
	
	$(document).on('pagebeforeshow', function () {
				   $(this).find('a[data-rel=back]').buttonMarkup({
																 iconpos: 'notext'
																 });


				   setTimeout (function(){
						myScroll.refresh();
					}, 1000);

				   });

	
	
	var landmark2 ="";
	$(".spinner").show();
	var Recensione = "";
	var model = "Iphone";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://gtechplay.com/bck/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  $("#idheader").html("<table id='idheader' height='50'><tr><td width='30px' align='center'></td><td width='240px' align='center' valign='middle'><font color='#FFFFFF' size='3'>"+ item.Nome +"</font></td><td width='50px' align='center' valign='middle'></td></tr></table>");
				  
				  if((item.TitRecensione=="")||(!item.TitRecensione)){
				  var Recensione = "";
				  }
				  else{
				  Recensione = "<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>"+ item.TitRecensione +"<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Recensione +"</font></td></tr>";
				  }
				  
				  
				  if (model == "Ipad") {
				  $("#prodotto").html("<img src='http://gtechplay.com/public/bck/"+ item.IMG +".png' width='700px' height='440px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td colspan='3'><font color='#FFFFFF' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#FFFFFF' size='2'>Valore: <strike>"+ item.Valore +"</strike></font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>"+ item.Deal +"&euro; </b></font></td><td align='right' colspan='2'><font color='#FFFFFF' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>In Sintesi<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Dettagli<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Condizioni<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Condizioni +"</font></td></tr>"+ Recensione +"<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",1);' data-transition='slide' class='zocial email'>&nbsp;&nbsp;&nbsp;Regala Coupon&nbsp;&nbsp;&nbsp;</a></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='javascript:condividi("+ idProdotto +");' class='zocial facebook'>Condividi su Facebook</a></td></tr></table>");
				  }
				  else{
				  $("#prodotto").html("<img src='http://gtechplay.com/public/bck/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td colspan='3'><font color='#FFFFFF' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#FFFFFF' size='2'>Valore: <strike>"+ item.Valore +"</strike></font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>"+ item.Deal +"&euro; </b></font></td><td align='right' colspan='2'><font color='#FFFFFF' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>In Sintesi<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Dettagli<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='3'>Condizioni<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#FFFFFF' size='2'>"+ item.Condizioni +"</font></td></tr>"+ Recensione +"<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",1);' data-transition='slide' class='zocial email'>&nbsp;&nbsp;&nbsp;Regala Coupon&nbsp;&nbsp;&nbsp;</a></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='javascript:condividi("+ idProdotto +");' class='zocial facebook'>Condividi su Facebook</a></td></tr></table>");
				  }
				  
				  //$("#clock").countdown("2015/"+ item.MeseScadenza +"/"+ item.GiornoScadenza +" "+ item.OraScadenza +":"+ item.MinutiScadenza +":00", function(event) {
										//$(this).html(event.strftime('%D giorni %H:%M:%S'));
										//});
				  
				  });
		   
		   $(".spinner").hide();
		   
		   setTimeout (function(){
				myScroll.refresh();
			}, 1000);
		   
		   
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
	
	
	$("#idfooter").html("<table id='idfooter' border='1'><tr><td width='200px' align='center'><span id='clock'></span></td><td width='120px' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",0);' data-transition='slide' class='ui-btn ui-shadow ui-corner-all'>Acquista!</a></td></tr></table>");
	
	
}


function buildprodotto(Categoria,Provincia,Pagina) {
	
	localStorage.setItem("Categoria", "");
	localStorage.setItem("Provincia", "");
	
	var idProdotto = 1;
	var landmark2="";
	$(".spinner").show();
	var model = "Iphone";
	var MeseScadenza = "06";
	var GiornoScadenza = "14";
	var OraScadenza = "15";
	var MinutiScadenza = "00";
	
	// inserire nel WS le date di scadenza
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://gtechplay.com/tagliafila/www/Check_HomeV2.asp",
		   contentType: "application/json",
		   //data: {Categoria:Categoria,Provincia:Provincia,Pagina:Pagina},
		   data: {Categoria:"offerte",negozio:localStorage.getItem("negozio")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
			   
			    
			   
				if (item.ID != 0){
				   distanza = getDistance(localStorage.getItem("lat"),localStorage.getItem("lng"),item.Lat,item.Long).toFixed(1);
				  
				  var immagine = item.IMG;
				  //immagine = immagine.slice(0,-4);
				  
				   //var n1 = immagine.indexOf(".png");
				  
				  if (model== "Ipad") {
					landmark2 = landmark2 + "<a style='text-decoration: none;' href='#page2' onclick='javascript:pagina22("+ item.Cod_Prodotto +");' id='linkdettagli' ><img src='http://gtechplay.com/public/bck/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table height='30px' border='0' width='90%'><tr><td align='left' colspan='2'><font size='3' color='#FFFFFF'>"+ item.Descrizione +"</font></td></tr><tr><td align='left' width='50%'><font size='2' color='#FFFFFF'>"+ item.Nome +"</font></td><td align='right'><font size='2' color='#FFFFFF'>"+ item.Citta +"</font></font></td></tr><tr><td align='left' width='50%'><font size='2' color='#FFFFFF'>Distanza:Km "+ distanza +" </font></td><td align='right'><font size='4' color='#0e85af'>"+ item.Indirizzo +"</font></td></tr></table></a><br><hr class='div3'>";
				  }
				  else{
					landmark2 = landmark2 + "<div id="+ item.Cod_Prodotto +"'><a style='text-decoration: none;' id='add_"+item.Cod_Prodotto+"' rel='external' onclick='#' data-transition='slide' id='linkdettagli"+ item.Cod_Prodotto +"'><img src='http://gtechplay.com/public/bck/"+ item.IMG +".png' width='100%'><table height='30px' border='0' width='320px'><tr><td align='left' colspan='2'><font size='3' color='#FFFFFF'>"+ item.Descrizione +"</font></td></tr><tr><td align='left' width='160px'><br><font size='2' color='#FFFFFF'>Acquistati:</font><font size='2' color='#0e85af'> "+ item.Acquistati +"</font></td><td align='right'><br><font size='2' color='#0e85af'>Vale:<strike>"+ item.Valore +"&euro;</strike> "+ item.Sconto +"%</font></font></td></tr><tr><td align='left' width='160px' valign='center'><font size='2' color='#FFFFFF'>Scade tra: </font><font size='2' color='#0e85af'>"+ item.GiorniRimanenti +" </font><font size='2' color='#FFFFFF'>giorni</font></td><td id='deallo"+ item.Cod_Prodotto +"' colspan='2' align='right'><font size='5' color='#0e85af'>"+ item.Deal +"&euro;</font></td></tr><tr id='vis2"+ item.Cod_Prodotto +"' style='display:none' class='visione'><td align='left' colspan='2'><font size='1' color='#FFFFFF' class='someclass'>"+ item.Dettagli +"</font></td></tr></table></a><br><hr class='div3'></div>";
                  
                  
                    $(document).on("tap", "#add_"+item.Cod_Prodotto+"", function(e){
                                 
                         var numerofesta = this.id
                         numerofesta = numerofesta.replace("add_","")
                         
                         window.location.href = "index3.html?prod="+ numerofesta +"";
                     
                     });
                  
                  
				  }
				  
				  idProdotto = idProdotto+1;
                
				  
				  
				}
				else{
				  landmark2 ="Nessun risultato trovato";
				}
				  
				
			});
		   
		   $(".spinner").hide();
		   $("#noconn").hide();
		   
		   $("#classifica").html(landmark2);
		   
		   setTimeout (function(){
				myScroll.refresh();
			}, 2000);
           
           
           $(document).on("touchstart", "#linkdettagli"+ item.Cod_Prodotto +"", function(e){
                          
              alert("menu.html");
                          
            })
		   
			
		   //myScroll = new IScroll('#wrapper', { click: true });
		   
		   
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
	
			//$('#getting-started').countdown('2015/06/30', function(event) {
				//$(this).html(event.strftime('%w sett. %d giorni %H:%M:%S'));
			//});

}

function vedi(prod) {
	
	//alert("vedi" + prod);
	
	//var elementHeight = element.height();
	var windowHeight  = $(window).height();
	
	var altezza= windowHeight;
	//alert(altezza);
	
	if (prod!=4){
		myScroll.scrollTo(0, -altezza, 0);
	}
	else
	{
		myScroll.scrollTo(0, 0, 0);
	}
	
	// chiamare prodotto e costruire una nuova pagina solo con uno tutto aperto.
	
	setTimeout(function() {
			   $("#vis1"+ prod +"").toggle( "slide" );
			   $("#vis2"+ prod +"").toggle( "slide" );
			   $("#deallo"+ prod +"").attr("colspan", "1");
			   $("#linkdettagli"+ prod +"").attr("href", "javascript:NOvedi("+ prod +")");
			   
			   
			   setTimeout(function() {
						  myScroll.refresh();
			   }, 300);
	}, 300);
	

	
	//myScroll.refresh();
}

function NOvedi(prod) {
	//alert("Novedi" + prod);
	
	setTimeout(function() {
	$("#vis1"+ prod +"").hide();
	$("#vis2"+ prod +"").hide();
	$("#deallo"+ prod +"").attr("colspan", "2");
	$("#linkdettagli"+ prod +"").attr("href", "javascript:vedi("+ prod +")");
	
	myScroll.refresh();
	}, 300);

}

function compraoff(id) {
	//alert(id);
	$("#compraofferta"+ id +"").show();
}



function compraEmail() {
	window.plugin.email.open({
		to:      ['info@mistertod.it'],
		subject: 'Contatti',
		body:    '',
		isHtml:  true
	});
}

function EmailDimenticata() {
	navigator.notification.prompt(
								  'Inserisci il tuo indirizzo email',  // message
								  onPrompt,                  // callback to invoke
								  'Recupera la Password',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  'Email'                 // defaultText
								  );
}

function onPrompt(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'inserire indirizzo email',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		EmailAddr = results.input1;
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) {
			
		}
		else {
			navigator.notification.alert(
										 'Caratteri email non consentiti',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}

		//Recupera la Password
		//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://gtechplay.com/bck/www/Check_RecPasswordV2.asp",
			   contentType: "application/json",
			   data: {email:results.input1},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					if(item.Token==1024){
					  navigator.notification.alert(
												   'Invio eseguito correttamente',  // message
												   alertDismissed,         // callback
												   'Recupero Password',            // title
												   'OK'                  // buttonName
												   );
					}
					else{
						navigator.notification.alert(
												   'Recupero fallito, riprova in seguito',  // message
												   alertDismissed,         // callback
												   'Errore Recupero',            // title
												   'OK'                  // buttonName
												   );
					}

			   
					  
				});
			   
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName@
											);
			   
			   },
		dataType:"jsonp"});

		
	}
		
}

function errorHandler(error) {
	navigator.notification.alert(
								 'Possibile errore di rete, riprova tra qualche minuto',  // message
								 alertDismissed,         // callback
								 'Attenzione',            // title
								 'Done'                  // buttonName
								 );
}


function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
		
		document.activeElement.blur();
		$("input").blur()
		return false;
		
	}
	
}


function alertDismissed() {
	
}

function rati() {
	$('#rati1').raty({ score: 3 });
}





function saldopunti(){
	var loggato = localStorage.getItem("loginvera")
	
	
	if((loggato=="")||(!loggato)){
		//alert("No")
		window.location.href = "Login.html";
	}else{
		//window.location.href = "profilo.html";
		//window.location.href = "Login.html";
		
		/*localStorage.getItem("Nome")
		localStorage.getItem("Cognome")
		localStorage.getItem("Punti")
		localStorage.getItem("Indirizzo")
		localStorage.getItem("Citta")
		localStorage.getItem("Telefono")
		localStorage.getItem("email")*/
		
		var tblProfile = "<tr><td><b>PROFILO</b></td></tr><tr><td>" + localStorage.getItem("Nome") +"&nbsp;"+ localStorage.getItem("Cognome") +"</td></tr><tr><td>" + localStorage.getItem("Indirizzo") + "</td></tr><tr><td>&nbsp;&nbsp;</td></tr><tr><td>SALDO PUNTI: "+ localStorage.getItem("Punti") +"</td></tr>"
		
		$("#profile").html(tblProfile)
		$("#profile").show()
		
	}
	//localStorage.setItem("email", "")
	//localStorage.setItem("loginfacebook", "NO") @
	//localStorage.setItem("loginvera", "NO")
	
	
	/*navigator.notification.alert(
								 'hai 19 punti al momento, se raggiungi 32 punti una bibita in omaggio',  // message
								 alertDismissed,         // callback
								 'Saldo Punti',            // title
								 'Chiudi'                  // buttonName
								 );*/
	
}

function mostrapunti(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	//Se email story == NO allora cancello
	
	if((loggato=="")||(!loggato)){
		tblProfile = "<tr><td><a href='javascript:saldopunti()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-check ui-btn-icon-left' data-theme='b'>Login</a></td></tr>"
	}else{
		
		tblProfile = "<tr><td>SALDO PUNTI: "+ localStorage.getItem("Punti") +"</td></tr><tr><td><a href='javascript:uscire()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-delete ui-btn-icon-left' data-theme='b'>Logout</a></td></tr>"
	
	}
	
	$("#profile").html(tblProfile)
	$("#profile").show()
	
}


function uscire(){
localStorage.setItem("loginvera", "")
localStorage.setItem("email", "")
	
window.location.href = "index.html";
}


function goprofilo(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
	}else{
		
		window.location.href = "Profilo.html";
	}
}

function exitapp(){
	navigator.app.exitApp();
}

function riparti(){
	
	window.location.href = "index.html";
	
}

function RegToken(){
	//alert("entrato2")
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/vogliadipizza2/www/bck/Check_RegToken.asp",
		   contentType: "application/json",
		   data: {email:localStorage.getItem("email"),token:localStorage.getItem("Token"),platform:"Ios"},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == '1024'){
				  //alert(item.Token)
				  localStorage.setItem("Registrato", "1");
				  
				  }
				  else{
				  //alert(item.Token)
				  localStorage.setItem("Registrato", "0");
				  
				  }
				  });
		   
		   $(".spinner").hide();
		   //window.location.href = "index.html";
		   
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                          results = regex.exec(location.search);
                          return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                          }



