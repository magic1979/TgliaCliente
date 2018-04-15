document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //document.addEventListener("resume", onResume, false);
	
	/*last_click_time = new Date().getTime();
	
	document.addEventListener('click', function (e) {
							  
	  click_time = e['timeStamp'];
	  
	  if (click_time && (click_time - last_click_time) < 300) { e.stopImmediatePropagation();
	  
	  e.preventDefault();
	  
	  return false;
	  
	  }
	  
	  last_click_time = click_time;
	  
	  }, true);*/
	  
	  
	  document.addEventListener("touchend", tryToAvoidDoubleTap, true);
	  
	    var lastTapTime = new Date().getTime();
		
		function tryToAvoidDoubleTap(e){
			var tapTime = e["timeStamp"];
			if (tapTime && (tapTime - lastTapTime) < 300) {
				// prevent double tap to happen
				e.stopImmediatePropagation();
				e.preventDefault();
				
			}
			
			lastTapTime = tapTime;
         }
	  
	
	
	var myScroll;
		   
    myScroll = new iScroll('wrapper', {
		click: true,
		useTransform: false,
		//bounce: false,
		onBeforeScrollStart: function (e)
		{
			var target = e.target;
			while (target.nodeType != 1) {
			target = target.parentNode;
			}
			
			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'OPTION') {
			e.preventDefault();
			}
		}

	 });
	
	
	setTimeout (function(){
			myScroll.refresh();
		}, 1500);

	
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
	
	// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
	$('input, select')
	.on('focus', function (e) {
		$('header, footer').css('position', 'absolute');
		})
	.on('blur', function (e) {
		$('header, footer').css('position', 'fixed');
		//force page redraw to fix incorrectly positioned fixed elements
		//setTimeout( function() {_
		//window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
		//		   }, 20 );
		});
	
	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
	});
	
	var email = localStorage.getItem("email");
	var ciao = "";
	var ciao1 = "";
	var distanza = "";
	var Categoria="";
	var Provincia="";
	var model = "Ipad";
	var Badge10 = localStorage.getItem("Badge10");
	var db;
	var dbCreated = false;
	var pippo = "0";
	//var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
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

	
    if(connectionStatus=='online'){
		$(".spinner").hide();
		
		seleziona();
		
		mostrapunti()
			
		mostraOrario()
    }
    
    else{
        $('#noconn').show();
        
		var tabella = "<table align='center' border='0' width='100%' height='120px'>";
		tabella = tabella + "<tr><td align='center'><a href='javascript:riparti()' class='btn'><font color='#fff'>Aggiungi</font></a></td></tr>";
		tabella = tabella + "</table>";
		
		$("#noconn").html(tabella);
		

    }

}

function someFunctionOnDblClick(){
	e.preventDefault();
}

function seleziona() {
	//db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	var timeout;
    var lastTap = 0;
	
	var Badge10 = localStorage.getItem("Badge10");
	$("#badde3").attr("data-badge", Badge10);
	var TOT = localStorage.getItem("TOT");
	
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">ORDINE</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">QTA</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">COSTO</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2"></font></th><th><font color="white" size="2"></font></th></tr></thead><tbody id="contenutoCart">';
	
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 var Punita;
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 Punita = (Number(results.rows.item(i).Descrizione).toFixed(2) / Number(results.rows.item(i).Qta).toFixed(2))
					 
					 var n = results.rows.item(i).Nome.indexOf("Punti");
					 
					 //alert(n)
					 
					 if (n != -1){
						
						landmark = landmark + '<tr><td><font size="3">'+ results.rows.item(i).Nome +'</font></td><td><font size="3">'+ results.rows.item(i).Qta +'<font color="#000" size="1"> x('+ Number(Punita).toFixed(2) +'&euro;)</font></td><td><font size="3">'+ Number(results.rows.item(i).Descrizione).toFixed(2) +'&euro;</font></td><td align="center"></td><td align="center"></td></tr>';
					 }
					 else
					 {
						landmark = landmark + '<tr><td><font size="3">'+ results.rows.item(i).Nome +'</font></td><td><font size="3">'+ results.rows.item(i).Qta +'<font color="#000" size="1"> x('+ Number(Punita).toFixed(2) +'&euro;)</font></td><td><font size="3">'+ Number(results.rows.item(i).Descrizione).toFixed(2) +'&euro;</font></td><td align="center"><a id="meno_'+parseInt(results.rows.item(i).id)+'"><div width="28px" class="home"></div></a></td><td align="center"><a id="add_'+parseInt(results.rows.item(i).id)+'"><div width="28px" class="home1"></div></td></tr>';
					 }
					 
					 
					 var timeout;
					 var lastTap = 0;
	
					 $(document).on("touchstart", "#add_"+parseInt(results.rows.item(i).id)+"", function(e){
						 
						var currentTime = new Date().getTime();
						var tapLength = currentTime - lastTap;
						
						clearTimeout(timeout);
						
						if (tapLength < 500 && tapLength > 0) {
							
							e.preventDefault();
							
						} 
						else {
							
							timeout = setTimeout(function() {
												
									var numerofesta = this.id
									numerofesta = numerofesta.replace("add_","")
									
									AggProd(numerofesta)
									
								  
								    clearTimeout(timeout);
								
							 }, 500);
							
						}
		
						
						lastTap = currentTime;
                        
                    });
                     
					 
					 
					 
	
                    $(document).on("touchstart", "#meno_"+parseInt(results.rows.item(i).id)+"", function(e){
		
                       var currentTime = new Date().getTime();
						var tapLength = currentTime - lastTap;
						
						clearTimeout(timeout);
						
						if (tapLength < 500 && tapLength > 0) {
							
							e.preventDefault();
							
						} 
						else {
							
							timeout = setTimeout(function() {
												
									var numerofesta = this.id
									numerofesta = numerofesta.replace("add_","")
									
									SottProd(numerofesta)
									
								  
								    clearTimeout(timeout);
								
							 }, 500);
							
						}
		
						
						lastTap = currentTime;
                        
                    });
					
		 
					 
					}
					 
					 landmark = landmark + '</tbody></table>';
					 $('#contenutoCart').html(landmark);
					 
					 selPrezzo();
					 
					 selPunti();
					 
					 
					 e.preventDefault();
	  
	      			 return false;

					 }, null);
				   });
}

function selPrezzo(){
	db.transaction(function (tx) {
       tx.executeSql('SELECT SUM(Descrizione) as TOT FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 for (i = 0; i < len; i++){
						$('#TOTPrezzo').html(Number(results.rows.item(i).TOT).toFixed(2));
						document.getElementById("totordine").value = Number(results.rows.item(i).TOT).toFixed(2);
					 }
					 
					 
					 }, null);
				   });
	
	$("#noconn").hide();
}


function selPunti(){
	document.getElementById("totpunti").value = localStorage.getItem("Punti");
}

function dlt(){
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	db.transaction(function (tx) {
				   tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
								 }, null);
				   });
	
	
	localStorage.setItem("Badge10", 0)
	
	Badge10 = localStorage.getItem("Badge10");
	

	$('#badde3').removeClass('badge3').addClass('badge2');
	
	
	localStorage.setItem("TOT", 0)
	
	seleziona();
}

function dlt2(){
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	db.transaction(function (tx) {
				   tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
								 }, null);
				   });
	
	
	localStorage.setItem("Badge10", 0)
	
	Badge10 = localStorage.getItem("Badge10");
	
	
	$('#badde3').removeClass('badge3').addClass('badge2');
	
	
	localStorage.setItem("TOT", 0)
	
	seleziona();
}


function AggProd(prod) {
	
	//alert("3")

	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	var aggiornamento = 0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/tagliafila/www/check_Prodotto.asp",
		   contentType: "application/json",
		   data: {id:prod},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  msg=item.Nome;
				  prezzo=item.Deal;
				  
				  });
		   
		   db.transaction(function (tx) {
						  tx.executeSql('UPDATE Ordine set Qta=Qta+1, Descrizione=Descrizione + '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
										aggiornamento = 1;
										//alert("Prod:" + prod);
										}, null);
						  });
		   
		   $(".spinner").hide();
		   
		   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
		   var Badge10 = localStorage.getItem("Badge10");
		   
		   
		   $('#badde3').removeClass('badge2').addClass('badge1');
		   $("#badde3").attr("data-badge", Badge10);
		   
		   $( "#carro" ).effect( "bounce", "slow" );
		   
		   
		   if(aggiornamento==0){
		   agg2(prod)
		   //alert("Prod:" + prod);
		   }
		   
		   seleziona();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});
	
	
}

function agg2(prod){
	
	//alert("4")
	
	//db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/tagliafila/www/check_Prodotto.asp",
		   contentType: "application/json",
		   data: {id:prod},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  msg=item.Nome;
				  prezzo=item.Deal;
				  
				  });
		   
		   db.transaction(function (tx) {
						  tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
						  tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', 1, 1, "'+ prezzo +'", "'+ msg +'")');
						  });
		   
		   $(".spinner").hide();
		   
		   e.preventDefault();
	  
	       return false;
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});
	
}

function SottProd(prod) {
	
	//alert("5")
	
	var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
	
	var aggiornamento = 0;
	var azione=0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/tagliafila/www/check_Prodotto.asp",
		   contentType: "application/json",
		   data: {id:prod},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  msg=item.Nome;
				  prezzo=item.Deal;
				  
				  });
		   
		   var Badge10;
		   
		   $(".spinner").hide();
		   
		   db.transaction(function (tx) {
						  tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
										var len = results.rows.length, i;
										
										for (i = 0; i < len; i++){
										if (parseInt(results.rows.item(i).Qta) > 1){
										tx.executeSql('UPDATE Ordine set Qta=Qta-1, Descrizione=Descrizione - '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
													  //alert("UPD");
													  
													  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
													  
													  Badge10 = localStorage.getItem("Badge10");
													  
													  $("#badde3").attr("data-badge", Badge10);
													  $( "#carro" ).effect( "bounce", "slow" );
													  
													  }, null);
										}
										else{
										tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
													  //alert("DEL");
													  $(".buttonOrdine").hide();
													  
													  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
													  Badge10 = localStorage.getItem("Badge10");
													  
													  $("#badde3").attr("data-badge", Badge10);
													  $( "#carro" ).effect( "bounce", "slow" );
													  
													  }, null);
										}
										}
										
										}, null);
						  });
						  
		   seleziona();
		   
		   e.preventDefault();
	  
	       return false;
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});
	
}


function cambiap() {

    window.location.href = "index.html";

}



$(document).on("touchstart", "#menuR", function(e){
               
      window.location.href = "menu.html";
               
})

$(document).on("touchstart", "#promo", function(e){
               
      window.location.href = "index_negozio.html";
               
})


$(document).on("touchstart", "#btnprofilo7", function(e){
               
   window.location.href = "rating.html";
})


$(document).on("touchstart", "#premi", function(e){
               
               window.location.href = "premi.html";
               })



$(document).on("touchstart", "#altro", function(e){
               
     $("#btnpanel").click();
               
 });


$(document).on("touchstart", "#premi", function(e){
               
               window.location.href = "premi.html";
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
               
               window.location.href = "tel:+3906111111";
               })


$(document).on("touchstart", "#dove", function(e){
               
               gomappa();
               })



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
    var ref = window.open('http://maps.apple.com/?daddr=via ostiense,38,roma&saddr=via stamira,7 roma', '_blank', 'location=yes');
}

function alertDismissed() {
    $(".spinner").hide();
	
}



function verificawifi(){
    $("#verifica").click();
}

function onResume() {
    onDeviceReady();
}

function onConfirm(button) {
    $(".spinner").hide();
    
    $("#mySelect").val("01");
    $("#mySelect").selectmenu("refresh");
    
    if (button==1){
        window.location.href = "Token.html";
    }
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

function rati() {
	$('#rati1').raty({ score: 3 });
}


$(document).on("touchstart", "#compraConsegna", function(e){
               
    compraConsegna();
               
})


function compraConsegna(){
	var loggato = localStorage.getItem("loginvera")
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
	}else{
		
		compra()
	}
	
}

$("#datacal").focus(function() {
                    mostracal();
                    });

function mostracal(){
    
    var options = {
        
    date: new Date(),
        
    mode: 'date',
        
    doneButtonLabel: 'OK',
    doneButtonColor: '#000000',
    cancelButtonLabel: 'RESET',
    cancelButtonColor: '#000000'
        
    };
    
    
    datePicker.show(options, function(date){
        var datta = String(date).substring(4, 15);
        
        var datta1 = datta.replace("Sep","09")
        var datta2 = datta1.replace("Oct","10")
        var datta3 = datta2.replace("Nov","11")
        var datta4 = datta3.replace("Dec","12")
        var datta5 = datta4.replace("Jan","01")
        var datta6 = datta5.replace("Feb","01")
        var datta7 = datta6.replace("Mar","03")
        var datta8 = datta7.replace("Apr","04")
        var datta9 = datta8.replace("May","05")
        var datta10 = datta9.replace("Jun","06")
        var datta11 = datta10.replace("Jul","07")
        var datta12 = datta11.replace("Aug","08")
        
        //document.getElementById("datacal").value = datta12
        var dattag = String(datta).substring(3, 2);
        var dattam = String(datta12).substring(0, 2);
        var dattaa = String(datta).substring(6, 4);
        
        document.getElementById("datacal").value = datta
        
        $("#datacal").blur();
                    
       });
}

$(document).on("touchstart", "#compracc", function(e){
               
    compraCC();
               
 })


function compraCC(){
	var loggato = localStorage.getItem("loginvera")
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
	}else{
		compraCarta()
	}
	
}


function compra() {
	/*var metodopp = "Cash";
	
	if(metodo==1){
		metodopp = "Cash";
	}
	else{
		metodopp = "Take";
	}*/
    
    var metodopp = "Negozio";
	
	var num1 = Math.floor((Math.random() * 20) + 1);
	var num2 = Math.floor((Math.random() * 20) + 1);
	var num3 = Math.floor((Math.random() * 20) + 1);
	var num4 = Math.floor((Math.random() * 20) + 1);
	var num5 = Math.floor((Math.random() * 20) + 1);
	var num6 = Math.floor((Math.random() * 20) + 1);
	
	transazioneprodotto = num1+""+num2+""+num3+""+num4+""+num5+""+num6;
	
	var item_number= transazioneprodotto;
	//prendere il nome prodotto e il prezzo con WS per passare al pagina di pagamento
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	var NomeRegalo = self.document.formia9.NomeRegalo.value;
	var Indirizzo = self.document.formia9.Indirizzo.value;
	//var EmailRegalo = self.document.formia9.EmailRegalo.value;
	var Telefono = self.document.formia9.Telefono.value;
	var amount = self.document.formia9.totordine.value;
	var amountPunti = self.document.formia9.totpunti.value;
	var OraConsegna = self.document.formia9.OraConsegna.value;
	var Note = self.document.formia9.Note.value;
    var DataC = self.document.formia9.datacal.value;
	
	if ((email == "")||(!email)) {
		navigator.notification.alert(
									 'Devi prima effettuare il Login',  // message
									 alertDismissed,         // callback
									 'Login',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (NomeRegalo == "") {
		navigator.notification.alert(
									 'inserire Nome Destinario',  // message
									 alertDismissed,         // callback
									 'Nome Destinatario',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	if (Indirizzo == "") {
		navigator.notification.alert(
									 'inserire un indirizzo corretto',  // message
									 alertDismissed,         // callback
									 'Indirizzo',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	
	if (Telefono == "") {
		navigator.notification.alert(
									 'inserire un telefono valido',  // message
									 alertDismissed,         // callback
									 'Telefono',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (amount == 0) {
		navigator.notification.alert(
									 'Non hai prodotti nel carrello',  // message
									 alertDismissed,         // callback
									 'Ordine',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	if (OraConsegna == "") {
		navigator.notification.alert(
									 'Non hai inserito un orario di desiderata',  // message
									 alertDismissed,         // callback
									 'Ora Consegna',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
    
    if (DataC == "") {
        navigator.notification.alert(
                                     'Non hai inserito una data di desiderata',  // message
                                     alertDismissed,         // callback
                                     'Ora Consegna',            // title
                                     'OK'                  // buttonName@
                                     );
        return;
    }
	
	//alert(amount)
	
	var ordinazione="";
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 var Punita;
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 Punita = (Number(results.rows.item(i).Descrizione).toFixed(2) / Number(results.rows.item(i).Qta).toFixed(2))
					 
					 ordinazione = ordinazione + ' ' + results.rows.item(i).Qta +' '+ results.rows.item(i).Nome +', ';
					 
					 }
                     
                     var pippo = "0";
                     
                     //alert("http://www.gtechplay.com/tagliafila/www/Check_TransactionV2.asp?email="+email+"&id_prodotto="+transazioneprodotto+"&qta=1&tot="+amount+"&totPunti="+amountPunti+"&transazionemia="+transazioneprodotto+"&NomeProdotto=OrdineApp&EmailEsercente=salvatore.bruni@gmail.com&idTransazione="+metodopp+"&Ordine="+ordinazione+"&Indirizzo="+Indirizzo+"&Telefono="+Telefono+"&OraConsegna="+OraConsegna+"&datac="+DataC+"&Note="+Note+"")
					 
					 $(".spinner").show();
					 $.ajax({
							type:"GET",
							url:"http://www.gtechplay.com/tagliafila/www/Check_TransactionV2.asp",
							contentType: "application/json",
							data: {email:email,id_prodotto:transazioneprodotto,qta:1,tot:amount,totPunti:amountPunti,transazionemia:transazioneprodotto,NomeProdotto:"Ordine App",EmailEsercente:"salvatore.bruni@gmail.com",idTransazione:metodopp,Ordine:ordinazione,Indirizzo:Indirizzo,Telefono:Telefono,OraConsegna:OraConsegna,datac:DataC,Note:Note},
							timeout: 7000,
							jsonp: 'callback',
							crossDomain: true,
							success:function(result){
							
							$.each(result, function(i,item){
                                   
                                   alert(item.Token)
                                   
								   if (item.Token == "1024"){
                                   
                                        pippo = "1";
								   
                                         navigator.notification.alert(
                                            'Ordine eseguito correttamente',
                                             alertDismissed,         // callback
                                            'Grazie',            // title
                                            'Done'                  // buttonName
                                        );
								   
                                       localStorage.setItem("Punti", item.Punti);
                                   
                                       dlt2();
								   
								   
								   }
                                   
                                  if(item.Token == "2"){
                                   
                                   pippo = "1";
                                   
                                    navigator.notification.alert(
                                        'Data e Ora non diponibile',  // message
                                        alertDismissed,         // callback
                                        'Attenzione',            // title
                                        'Done'                  // buttonName
                                        );
                                   
                                   }
                                   
								   if(pippo = "0"){
								     navigator.notification.alert(
                                        'Possibile errore di rete, riprova tra qualche minuto',  // message
                                        alertDismissed,         // callback
                                        'Attenzione',            // title
                                        'Done'                  // buttonName
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
														 'Done'                  // buttonName
														 );
							
							},
							dataType:"jsonp"});
					 
					 }, null);
				   
				   });
				  
		
}

function compraCarta() {
	
	
	var num1 = Math.floor((Math.random() * 20) + 1);
	var num2 = Math.floor((Math.random() * 20) + 1);
	var num3 = Math.floor((Math.random() * 20) + 1);
	var num4 = Math.floor((Math.random() * 20) + 1);
	var num5 = Math.floor((Math.random() * 20) + 1);
	var num6 = Math.floor((Math.random() * 20) + 1);
	var num7 = Math.floor((Math.random() * 20) + 1);
	var num8 = Math.floor((Math.random() * 20) + 1);
	
	transazioneprodotto = num1+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8;
	
	var item_number= transazioneprodotto;
	//prendere il nome prodotto e il prezzo con WS per passare al pagina di pagamento
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	var NomeRegalo = self.document.formia9.NomeRegalo.value;
	var Indirizzo = self.document.formia9.Indirizzo.value;
	//var EmailRegalo = self.document.formia9.EmailRegalo.value;
	var Telefono = self.document.formia9.Telefono.value;
	var amount = self.document.formia9.totordine.value;
	var amountPunti = self.document.formia9.totpunti.value;
	var OraConsegna = self.document.formia9.OraConsegna.value;
	var Note = self.document.formia9.Note.value;
	var DataC = self.document.formia9.datacal.value;
	
	if ((email == "")||(!email)) {
		navigator.notification.alert(
									 'Devi prima effettuare il Login',  // message
									 alertDismissed,         // callback
									 'Login',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (NomeRegalo == "") {
		navigator.notification.alert(
									 'inserire Nome Destinario',  // message
									 alertDismissed,         // callback
									 'Nome Destinatario',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	if (Indirizzo == "") {
		navigator.notification.alert(
									 'inserire un indirizzo corretto',  // message
									 alertDismissed,         // callback
									 'Indirizzo',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	
	if (Telefono == "") {
		navigator.notification.alert(
									 'inserire un telefono valido',  // message
									 alertDismissed,         // callback
									 'Telefono',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (amount == 0) {
		navigator.notification.alert(
									 'Non hai prodotti nel carrello',  // message
									 alertDismissed,         // callback
									 'Ordine',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (OraConsegna == "") {
		navigator.notification.alert(
									 'Non hai inserito un orario di consegna desiderata',  // message
									 alertDismissed,         // callback
									 'Ora Consegna',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
    
    if (DataC == "") {
        navigator.notification.alert(
                                     'Non hai inserito una data di desiderata',  // message
                                     alertDismissed,         // callback
                                     'Ora Consegna',            // title
                                     'OK'                  // buttonName@
                                     );
        return;
    }
	
	
	var ordinazione="";
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 var Punita;
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 Punita = (Number(results.rows.item(i).Descrizione).toFixed(2) / Number(results.rows.item(i).Qta).toFixed(2))
					 
					 ordinazione = ordinazione + ' ' + results.rows.item(i).Qta +' '+ results.rows.item(i).Nome +', ';
					 
					 }
                     
                    // alert("http://www.gtechplay.com/tagliafila/www/Check_TransactionV2.asp?email="+email+"&id_prodotto="+transazioneprodotto+"&qta=1&tot="+amount+"&totPunti="+amountPunti+"&transazionemia="+transazioneprodotto+"&NomeProdotto=OrdineApp&EmailEsercente=salvatore.bruni@gmail.com&idTransazione="+metodopp+"&Ordine="+ordinazione+"&Indirizzo="+Indirizzo+"&Telefono="+Telefono+"&OraConsegna="+OraConsegna+"&datac="+DataC+"&Note="+Note+"")
                     
					 
					 $(".spinner").show();
					 $.ajax({
							type:"GET",
							url:"http://www.gtechplay.com/tagliafila/www/Check_TransactionV2.asp",
							contentType: "application/json",
							data: {email:email,id_prodotto:transazioneprodotto,qta:1,tot:amount,totPunti:amountPunti,transazionemia:transazioneprodotto,NomeProdotto:"Ordine App",EmailEsercente:"salvatore.bruni@gmail.com",idTransazione:"CC",Ordine:ordinazione,Indirizzo:Indirizzo,Telefono:Telefono,OraConsegna:OraConsegna,datac:DataC,Note:Note},
							timeout: 7000,
							jsonp: 'callback',
							crossDomain: true,
							success:function(result){
							
							$.each(result, function(i,item){
                               if (item.Token == "1024"){
                               
                               //localStorage.setItem("Punti", item.Punti);
                               dlt2()
                               
                               var ref = window.open('http://www.gtechplay.com/tagliafila/wbspaypal.asp?Transprodotto='+ transazioneprodotto +'', '_blank', 'location=no');
                               
                               ref.addEventListener('loadstop', function(event) { if (event.url.match("mobile/close")) { ref.close(); } });
                               
                               }
                               else{
                               navigator.notification.alert(
                                                            'Possibile errore di rete, riprova tra qualche minuto',  // message
                                                            alertDismissed,         // callback
                                                            'Attenzione',            // title
                                                            'Done'                  // buttonName
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
														 'Done'                  // buttonName
														 );
							
							},
							dataType:"jsonp"});
					 
					 }, null);
				   
				   });
	
		
}

function vendoPayPal(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente,NomeRegalo,TuoRegalo,EmailRegalo,Messaggio){
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Transaction.asp",
		   contentType: "application/json",
		   data: {email:email,id_prodotto:idProdotto,qta:1,tot:amount.replace(".",","),trans:transazioneprodotto,NomeProdotto:nome,EmailEsercente:EmailEsercente,NomeRegalo:NomeRegalo,TuoRegalo:TuoRegalo,EmailRegalo:EmailRegalo,Messaggio:Messaggio},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == "1024"){
				  var ref = window.open('http://www.mistertod.it/wbspaypal.asp?Transprodotto='+ transazioneprodotto +'&Nome='+ nome +'', '_blank', 'location=no');
				  
				  //var ref = window.open(encodeURI(url), '_blank', options);
				  ref.addEventListener('loadstop', function(event) { if (event.url.match("mobile/close")) { ref.close(); } });


				  }
				  else{
				  navigator.notification.alert(
											   'Possibile errore di rete, riprova tra qualche minuto',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
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
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}

function saldopunti(){
	var loggato = localStorage.getItem("loginvera")
	
	
	if((loggato=="")||(!loggato)){
		//alert("No")
		window.location.href = "Login.html";
	}else{

		
		var tblProfile = "<tr><td><b>PROFILO</b></td></tr><tr><td>" + localStorage.getItem("Nome") +"&nbsp;"+ localStorage.getItem("Cognome") +"</td></tr><tr><td>" + localStorage.getItem("Indirizzo") + "</td></tr><tr><td>&nbsp;&nbsp;</td></tr><tr><td>SALDO PUNTI: "+ localStorage.getItem("Punti") +"</td></tr>"
		
		$("#profile").html(tblProfile)
		$("#profile").show()
		
	}

}

function mostrapunti(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		tblProfile = "<tr><td><a href='javascript:saldopunti()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-check ui-btn-icon-left' data-theme='b'>Login</a></td></tr>"
	}else{
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://www.gtechplay.com/tagliafila/www/check_login_punti.asp",
			   contentType: "application/json",
			   data: {email:localStorage.getItem("email")},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  //alert(item.Token);
					  
					  if (item.Token == 1024){

						localStorage.setItem("Punti", Number(item.Punti).toFixed(2));

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
								 'Done'                  // buttonName
				);
	
			   },
			   dataType:"jsonp"});


		tblProfile = "<tr><td>SALDO PUNTI: "+ Number(localStorage.getItem("Punti")).toFixed(2) +"</td></tr><tr><td><a href='javascript:uscire()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-delete ui-btn-icon-left' data-theme='b'>Logout</a></td></tr>"
		
		document.getElementById("NomeRegalo").value = localStorage.getItem("Nome") + " " + localStorage.getItem("Cognome")
		document.getElementById("Indirizzo").value = localStorage.getItem("Indirizzo") + "," + localStorage.getItem("Civico")
		//document.getElementById("EmailRegalo").value = localStorage.getItem("email")
		document.getElementById("Telefono").value = localStorage.getItem("Telefono")
		
	}
	
	$("#profile").html(tblProfile)
	$("#profile").show()
	
}


function mostraOrario(){
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/tagliafila/www/Check_Orario.asp",
		   contentType: "application/json",
		   //data: {email:localStorage.getItem("email")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (item.Token == 1024){
				  
						$("#oraConsegna2").show()
						$("#oraConsegna2").html("Giorni:" + item.Giorno + " - Nelle Ore:" + item.Ora)
					    $("#zoneServite").html(item.Zona)
				  
				  }
				  });
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   // buttonName
		   },
		   dataType:"jsonp"});
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

function gomappa(){
	var addressLongLat = '41.903266,12.684647';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
}

function riparti(){
	
	window.location.href = "index.html";
	
}

function gofacebook(){
	var ref = window.open('https://m.facebook.com/gabriele.fucito.5', '_system', 'location=no');
}

