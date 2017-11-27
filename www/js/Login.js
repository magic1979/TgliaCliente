document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
	//$("body").bind('touchmove', function(e){e.preventDefault()})
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
    localStorage.setItem("registrato","1")
    
	
	
	localStorage.setItem("pagina","log")
	
     document.addEventListener('backbutton', function(e) {
							   
		if(localStorage.getItem("pagina")=="log"){
							   
	        navigator.notification.confirm(
	       'Vuoi chiudere purple miles?',  // message
	        onConfirm2,              // callback to invoke with index of button pressed
	       'Spegni',            // title
	       'Spegni,Annulla'      // buttonLabels
	        );
							   
		}
							   
		if(localStorage.getItem("pagina")=="imp"){
							   
		  $("#conferma").tap();
							   
		}
							   
	 }, false);
	
	
	
	var IDPage;

	
	
    IDPage = getParameterByName('id');
	

	
	
	$(document).on("tap", "#emaildimenticata", function(e){
				   
			//alert()
				   
			navigator.notification.prompt(
				'Inserisci il tuo indirizzo email',  // message
				onPrompt,                  // callback to invoke
				'Recupera la Password',            // title
				['Invia','Annulla'],             // buttonLabels
				''                 // defaultText
			);
				   
	});
	
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
				   url:"http://msop.it/rides/Check_RecPassword.asp",
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

	
    
    $(document).on("tap", "#pagi7", function(e){
		
            window.plugins.nativepagetransitions.fade({
                "duration"       :  500, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  400,
                "href" : "#page7"
            });
                   
                   var myScroll2;
                   
                   myScroll2 = new IScroll('#wrapper2', { click: true });
                   setTimeout (function(){
                            myScroll2.refresh();
                    }, 1000);
                   
                   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
                   
                   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                   
                   
                   e.stopImmediatePropagation();
                   
                   e.preventDefault();
                   
                   return false;
                   
                   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
                   
    });
	
	
	$(document).on("tap", "#indietro8", function(e){
				   window.location.href = "#page6";
				   
				   var myScroll2;
				   
				   myScroll2 = new IScroll('#wrapper2', { click: true });
				   setTimeout (function(){
							   myScroll2.refresh();
							   }, 1000);
				   
				   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
				   
				   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				   
				   
				   
				   prendimezzi()
				   
				   prendinazione()
				   
				   //$("#fuso").html(nazione);
				   
				   //$("#fuso").selectmenu("refresh");
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	
	
	$(document).on("tap", "#prova", function(e){
				   if(localStorage.getItem("pagina")=="log"){
				   
				   navigator.notification.confirm(
												  'Vuoi chiudere purple miles?',  // message
												  onConfirm2,              // callback to invoke with index of button pressed
												  'Spegni',            // title
												  'Spegni,Annulla'      // buttonLabels
												  );
				   
				   }
				   
				   if(localStorage.getItem("pagina")=="imp"){
				   
				   $("#conferma").tap();
				   
				   }

				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#accedi1", function(e){
				   
		window.plugins.nativepagetransitions.fade({
                "duration"       :  600, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  400,
                "href" : "#page"
            });
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#homepage", function(e){
				   
				   window.location.href = "index.html";
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#conferma", function(e){
		//window.location.href = "#page1";
		localStorage.setItem("pagina","log")
				   
		localStorage.setItem("lingua", document.getElementById("lingua").value);
		localStorage.setItem("fuso", document.getElementById("fuso").value);
        localStorage.setItem("citta", document.getElementById("citta").value);
		
		localStorage.setItem("veicolo", document.getElementById("veicolo").value);
				   
		
		if(IDPage==2){
		  window.location.href = "mappass.html";
		}
		else{
				   
		  window.location.href = "#page";
				   
		}
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   

		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#impostazioni", function(e){
				   window.location.href = "#page6";
				   localStorage.setItem("pagina","imp")
				   
				   var myScroll2;

				   myScroll2 = new IScroll('#wrapper2', { click: true });
				   setTimeout (function(){
					  myScroll2.refresh();
				   }, 1700);
				   
				   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
				   
				   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				   
				   
				   prendimezzi()
				   
                   prendinazione()
				   
				   //prendicittaid(localStorage.getItem("citta"))
				   
				   //$("#fuso").html(nazione);
				   
				   //$("#fuso").selectmenu("refresh");
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
    });
	
	$(document).on("tap", "#home", function(e){
				   
			if(IDPage==2){
			  window.location.href = "mappass.html";
			}
			else{
			  window.location.href = "#page";
				   
			  setTimeout (function(){
				myScroll.refresh();
			  }, 1000);
				   
			}

			e.stopImmediatePropagation();
				   
			e.preventDefault();
				   
			return false;
				   
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});

	
	$(document).on("touchstart", "#accedi", function(e){
		//window.location.href = "index.html";
		login();
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
		
	});
	
	$(document).on("touchstart", "#iscriviti", function(e){
				   //window.location.href = "index.html";
				   iscriviti();
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	$(document).on("tap", "#recuperopsw", function(e){
   
				   
		  var ref = window.open('http://www.purplemiles.com/www/rec_pw.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');

	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
		
	});
	
	$(document).on("tap", "#logfacebook", function(e){
				   
		  loginFacebook()
		
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		 return false;
				   
		 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#infofacebook", function(e){
				   
		getInfo()
				   
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#logoutfacebook", function(e){
				   
		 logout()
				   
				   
		 e.stopImmediatePropagation();
				   
		 e.preventDefault();
				   
		 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#legenda", function(e){
				   
		var ref = window.open('http://www.purplemiles.com/www/legenda.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');
				   
	});
	
	$(document).on("tap", "#regsito", function(e){
				   
		var ref = window.open('http://www.purplemiles.com/www/enter.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');

		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
	});
	
	
	if(IDPage==2){

		
		$("#impostazioni").tap();
		
	}
	

		document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
		document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
		
		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
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
    
         setTimeout(function() {
           $(".spinner").hide();
         }, 5000);
	
	
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){


			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0, so always add + 1

			var ora = today.getHours()
			if(ora<10){ora="0"+ora}

			var minuti = today.getMinutes();
			if(minuti<10){minuti="0"+minuti}

			var secondi = today.getSeconds();
			if(secondi<10){secondi="0"+secondi}


			var yyyy = today.getFullYear();
			if(dd<10){dd="0"+dd}
			if(mm<10){mm="0"+mm}
			today = dd+'/'+mm+'/'+yyyy;

			$("#stamp").html(yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00");
			var ora_cell = yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00";
			
			localStorage.setItem("ora_cell", ora_cell);
			
			$(".spinner").hide();
			
			document.getElementById("email").value = localStorage.getItem("email2")
			
			//var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
			
		}
		else{
			
				navigator.notification.alert(
					'Nessuna connessione ad internet rilevata',  // message
					alertDismissed,         // callback
					'Attenzione',            // title
					'OK'                  // buttonName
                 );
		}
	

	
    }



function getKey(key){
 if ( key == null ) {
 keycode = event.keyCode;
 
 } else {
 keycode = key.keyCode;
 }
 
 if (keycode ==13){
	 
   setTimeout(function() {
	 login();
   }, 200);
 
 }
 
 }


function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}


function login() {
	
	var email2 = self.document.formia2.email.value;
	var pin2 = self.document.formia2.password.value;
	
	if (email2 == "") {
		navigator.notification.alert(
									 'inserire Username',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pin2 == "") {
		navigator.notification.alert(
									 'inserire una Password',  // message
									 alertDismissed,         // callback
									 'Password',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	/*EmailAddr = self.document.formia2.email.value;
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
	}*/
	

	LoginVera(email2,pin2);
	
}


function LoginVera(email,pin){

	$("#spinner").show();
    
    $.ajax({
           type: "POST",
           url: "http://servizi.marcopolowit.it/tagliafilarest/api/login/login?username="+email+"&password="+pin+"",
           //data: {email:"c2FsdmF0b3JlLmJydW5pQGdtYWlsLmNvbQ",password:"c2FzYTc5"},
           cache: false,
           crossDomain: true,
           contentType: "application/x-www-form-urlencoded",
           success: function (result) {
           
             $("#spinner").hide();
           
             var pippo = jQuery.parseJSON( result );
           
             if (pippo.Email === null || pippo.Email=="null" || typeof(pippo.Email) == 'undefined' || pippo.Email==0 || pippo.Email=="") {
           
              alert("Dati errati")
           
              return
           
             }

             //alert( pippo.Email)
             localStorage.setItem("email", pippo.Email);
             localStorage.setItem("idcliente", pippo.IDCliente);
             localStorage.setItem("nome", pippo.Nome);
             localStorage.setItem("cognome", pippo.Cognome);
           
             localStorage.setItem("citta", pippo.Citta);
             localStorage.setItem("civico", pippo.Civico);
             localStorage.setItem("telefono", pippo.Telefono);
             localStorage.setItem("cap", pippo.CAP);
             localStorage.setItem("regione", pippo.Sesso);
             localStorage.setItem("indirizzo", pippo.Indirizzo);
           
             localStorage.setItem("pin", pin);
           
             if(localStorage.getItem("registrato")=="1"){
               registradame(pippo.IDCliente,"Nome","Cognome",pippo.Email,"Citta","Civico","Telefono","Cap","Sesso","Indirizzo",email,pin)
             }
             else{
           
              window.plugins.nativepagetransitions.fade({
					"duration"       :  500, // in milliseconds (ms), default 400
					"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
					"androiddelay"   :  400,
					"href" : "index.html"
				});
			
             }
           
           },
           error: function(jqXhr, textStatus, errorThrown){
           
             alert(errorThrown)
             $("#spinner").hide();
             window.location.href = "index.html";
           
           }
           
    });
    
	/*$.ajax({
		   type:"GET",
		   url:"http://msop.it/addall/check_accesso.php?email="+ email +"&pin="+ pin +"&lat="+ lat +"&lon="+ lng +"",
		   contentType: "application/json",
		   //data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				//alert(item.Token);
				  
				if (item.Token == 1){
				  localStorage.setItem("email", email);
				  localStorage.setItem("email2", email);
				  localStorage.setItem("emailpass", email);
				  
				  localStorage.setItem("emailfacebook", "0");
				  
				  localStorage.setItem("nick", item.nick);
				  
				  localStorage.setItem("fotoprof", item.foto.replace(".jpg","").replace(".png",""));
				  
				  
				  if(localStorage.getItem("fotoprof")=="default"){
				    localStorage.setItem("nomefoto", "default")
				    localStorage.setItem("nomeimg", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }
				  else{
				    localStorage.setItem("nomefoto", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }
				  

				  window.location.href = "index.html";
				  
				}
				else{
                  if (item.Token == 11){
				         navigator.notification.alert(
											   'Utente non verificato, attivati cliccando sul link dopo la registrazione',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
                        );
                  }
                  else{
                      navigator.notification.alert(
                                               'Email e/o password non corretti',  // message
                                               alertDismissed,         // callback
                                               'Attenzione',            // title
                                               'Done'                  // buttonName@
                                               );
                  }
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
		   dataType:"jsonp"});*/
}



function LoginFacebookVera(email,nome){

	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/addall/check_facebook.php?email="+ email +"&nome="+ nome +"&lat="+ lat +"&lon="+ lng +"",
		   contentType: "application/json",
		   //data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  //alert(item.Token);
				  
				  if (item.Token == 1){
				  
				  localStorage.setItem("email2", email);
				  localStorage.setItem("emailpass", email);
				  
				  localStorage.setItem("emailfacebook", "1");
				  
				  localStorage.setItem("nick", item.nick);
				 
				  
				  localStorage.setItem("fotoprof", item.foto.replace(".jpg","").replace(".png",""));
				  
				  if(localStorage.getItem("fotoprof")=="default"){
				    localStorage.setItem("nomefoto", "default")
				  }
				  else{
				    localStorage.setItem("nomefoto", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }

				  localStorage.setItem("email", email);
				  window.location.href = "index.html";
				  
				  }
				  else{
				  if (item.Token == 11){
				  navigator.notification.alert(
											   'Utente non verificato, attivati cliccando sul link dopo la registrazione',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				  else{
				  navigator.notification.alert(
											   'Email e/o password non corretti',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
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



function iscriviti(){
	
	
	var emailreg = self.document.formia.emailreg.value;
	var pinreg = self.document.formia.pinreg.value;
	var nomereg = self.document.formia.nick.value;
	
	/*var cell = self.document.formia.cell.value;
    var patente = self.document.formia.patente.value;
    var patentemese = self.document.formia.patentemese.value;
    var patenteanno = self.document.formia.patenteanno.value;
	var sono = self.document.formia.sono.value;
	
	
	if (sono == "autista") {
		
		if (patente == "") {
			navigator.notification.alert(
										 'inserire N. di patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		if (patentemese == "Mese") {
			navigator.notification.alert(
										 'inserire mese di scadenza patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		if (patenteanno == "Anno") {
			navigator.notification.alert(
										 'inserire anno di scadenza patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
	}*/
	
	if (emailreg == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pinreg == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (nomereg == "") {
		navigator.notification.alert(
									 'inserire il Nome',  // message
									 alertDismissed,         // callback
									 'Nome',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	
	EmailAddr = self.document.formia.emailreg.value;
	Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (Filtro.test(EmailAddr)) {
		
	}
	else {
		navigator.notification.alert(
									 'Verificare la email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	

	
	$(".spinner").show();
    
    var mail = "salvatore.bruni3@gmail.com"
    
    //var registrami = '{"CAP": "87040","Citta": "Castrolibero","Civico": "2","Email": "gianni.zingarelli@gmail.com","IDCategoria": "9","IDProvincia": "29","Indirizzo": "Via Tommaso Campanella","Nazione": "Italia","NomeEsercente": "Giovanni Zingarelli","PartitaIVA": "","Regione": "Calabria","Telefono": "3401843799","Utente": {"Password": "giov","UserName": "giov"}}'
    
    var registrami = '{"Citta": "Roma","Cap": "00154","Sesso": "M","IDProvincia": "86","Civico": "2","Email": "'+emailreg+'","Cognome": "Yopmail","Nome": "Salvatore","DataNascita": "22/03/1979","Indirizzo": "Via Ostiense","Telefono": "3476121055","Utente": {"Password": "'+pinreg+'","UserName": "'+nomereg+'"}}'
    
    
    $.ajax({
           url: "http://servizi.marcopolowit.it/tagliafilarest/api/SignupCliente/AddCliente",
           dataType: "json",
           type: "post",
           contentType: "application/json; charset=UTF-8",
           data: registrami ,
           processData: false,
           crossDomain: true,
           success:function(result){
           
             localStorage.setItem("registrato","1")
           
             var pippo = jQuery.parseJSON( result );
           
             alert(pippo.id)
             //alert( pippo.code_error)
           },
           error: function( jqXhr, textStatus, errorThrown ){
           
           
             alert(errorThrown)
           
           
           },
    dataType:"json"});
}



function registradame(IDCliente,Nome,Cognome,Email,Citta,Civico,Telefono,CAP,Sesso,Indirizzo,email,pin){
    
    
    $.ajax({
           type:"GET",
           url:"http://msop.it/tagliafila/check_reg_cli.php?id="+IDCliente+"&nome=nome&cognome="+Cognome+"&email="+Email+"&cap="+CAP+"&citta="+Citta+"&civico="+Civico+"&idprovincia=89&indirizzo="+Indirizzo+"&regione=Lazio&telefono="+Telefono+"&utente="+email+"&password="+pin+"&username="+email+"",
           contentType: "application/json",
           //data: {email:email,pin:pin},
           timeout: 7000,
           jsonp: 'callback',
           crossDomain: true,
           success:function(result){
           
           $.each(result, function(i,item){
                  //alert(item.Token);
                  
                  if (item.Token == 1){
                    localStorage.setItem("registrato","0")
					
                    window.plugins.nativepagetransitions.fade({
						"duration"       :  500, // in milliseconds (ms), default 400
						"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
						"androiddelay"   :  400,
						"href" : "index.html"
					});
                  
                  }
                  else{
                  
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




function alertDismissed() {
	
}


function gpsonSuccess(position){
	
	
	var ciao = position.coords.latitude;
	var ciao1 = position.coords.longitude;
	var gradi = position.coords.heading;
	
	localStorage.setItem("lat", ciao)
	localStorage.setItem("lng", ciao1)
	localStorage.setItem("gradi", gradi)
	
	localStorage.setItem("geostory", "SI")
	
	/*alert('Latitude: '          + position.coords.latitude          + '\n' +
	 'Longitude: '         + position.coords.longitude         + '\n' +
	 'Altitude: '          + position.coords.altitude          + '\n' +
	 'Accuracy: '          + position.coords.accuracy          + '\n' +
	 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	 'Heading: '           + position.coords.heading           + '\n' +
	 'Speed: '             + position.coords.speed             + '\n' +
	 'Timestamp: '         + position.timestamp                + '\n');*/
	
	
	//$("#distanza").html("<span style = 'font-size: 18px;'>"+ position.coords.speed +","+ position.coords.heading  +"</span>");
	
	
}


function gpsonError(){
	
	var lat = "41.889191";
	var lng = "12.492475";
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	navigator.notification.alert(
								 'Possibile errore GPS, assicurati di avere il gps del telefono attivato.',  // message
								 alertDismissed,         // callback
								 'Attenzione',           // title
								 'Done'                  // buttonName
								 );
	
}




function EmailDimenticata() {
	
	
}


function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	//var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
	
}

function onConfirm2(button) {
	if(button==1){    //If User selected No, then we just do nothing

		
		for(i=0; i<10000; i++)
		{
			window.clearInterval(i);
		}
		
		for(i=0; i<3; i++)
		{
			navigator.app.exitApp();
		}
		
		//navigator.app.exitApp();
		
		navigator.device.exitApp();
		
		
		e.stopImmediatePropagation();
		
		e.preventDefault();
		
		return;
	}
	
}



function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }

