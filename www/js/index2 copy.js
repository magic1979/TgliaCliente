
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
		document.addEventListener("resume", onResume, false);
        app.receivedEvent('deviceready');
		
		var loginfacebook = localStorage.getItem("loginfacebook");
		//alert(loginfacebook);
		
		if (loginfacebook == "SI") {
			//alert('http://graph.facebook.com/' + localStorage.getItem("pics") + '/picture?type=small');
			if(!localStorage.getItem("pics")||localStorage.getItem("pics")==""){
				document.getElementById("userPic").src = 'http://www.mistertod.it/Tod10.png';
			}
			else{
				document.getElementById("userPic").src = 'http://graph.facebook.com/' + localStorage.getItem("pics") + '/picture?type=small';
			}
			
			$("#Nome").html(localStorage.getItem("nome"));
			//$("#EmailCliente").html(localStorage.getItem("email"));
			
		}
		else{
			var loginvera = localStorage.getItem("loginvera");
			//alert(localStorage.getItem("nome"));
			
			if (loginvera == "SI") {
				$("#Nome").html(localStorage.getItem("nome"));
				document.getElementById("userPic").src = 'http://www.mistertod.it/Tod10.png';
				//document.getElementById("userPic").src = 'http://www.mistertod.it/Tod10.png';
				//localStorage.setItem("idfacebook", "")@
				//alert("exit");
				//$(document).FaceGap('logout');
			}
		}
		
		
		if(localStorage.getItem("step1")!="GO" && localStorage.getItem("step2")!="GO"){
			window.location.href = "#page7";
		}
		

		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
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
			setTimeout( function() {
        window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
					   }, 20 );
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
		var model = device.model;
		var Badge10 = localStorage.getItem("Badge10");
		
		if((email=="")||(!email)){
			$("#btnprofilo").attr("href", "#page4");
			$("#btnprofilo").attr("onclick", "javascript:checklogin();");
		}else{
			$("#btnprofilo").attr("href", "#mypanel");
			$("#btnprofilo").attr("onclick", "#");
		}
		
		if((Badge10=="")||(!Badge10)){
			localStorage.setItem("Badge10", 0)
		}else{
			$('#badde').removeClass('badge2').addClass('badge1');
			$("#badde").attr("data-badge", Badge10);
			$("#badde").html('<img src="img/upload.png" width="18px">');
			
			$('#badde2').removeClass('badge2').addClass('badge1');
			$("#badde2").attr("data-badge", Badge10);
			$("#badde2").html('<img src="img/upload.png" width="18px">');
		}
			

		
		/*var filtro = '<table id="filtroTB" width="320px" align="center"><tr><td width="160px"><select id="Categoria" name="Categoria" data-theme="b"><option value="All" selected>Schegli Tra</option><option value="Ristoranti">Ristoranti</option><option value="Hotel">Hotel e Spa</option><option value="Eventi">Eventi</option><option value="Sport">Sport</option><option value="Salute">Bellezza</option><option value="Corsi">Corsi</option></select></td><td width="160px"><select id="Provincia" name="Provincia" data-theme="b"><option value="Tutte" selected>Provincia</option><option value="Roma">Roma</option><option value="Napoli">Napoli</option><option value="Agrigento">Agrigento</option></select></td><td width="80px" align="left"></td></tr></table>';
		
		
		//$('#selezione').html(filtro);
		
		//alert(localStorage.getItem("Categoria") + localStorage.getItem("Provincia"));
		
		if (localStorage.getItem("Categoria") === null || typeof(localStorage.getItem("Categoria")) == 'undefined') {
			$("#Categoria").val("All");
		}
		else{
			$("#Categoria").val(localStorage.getItem("Categoria"));
		}
		
		if (localStorage.getItem("Provincia") == null || typeof(localStorage.getItem("Provincia")) == 'undefined') {
			$("#Provincia").val("Tutte");
		}
		else{
			$("#Categoria").val(localStorage.getItem("Categoria"));
		}
		
		
		$('#Categoria').on('change', function(){
          var $this = $(this),
          $value = $this.val();
		  //alert($value);
		  Categoria = $value;
		  localStorage.setItem("Categoria", Categoria)
		  buildprodotto(Categoria,localStorage.getItem("Provincia"),1);
		});
		
		$('#Provincia').on('change', function(){
		  var $this = $(this),
		  $value = $this.val();
		  //alert($value);
		  Provincia = $value;
		  localStorage.setItem("Provincia", Provincia)
		  buildprodotto(localStorage.getItem("Categoria"),Provincia,1);
		});*/
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			$('#noconn').hide();
			$('#noconn2').hide();
			
			checkPos();
			$(".spinner").hide();
			
			buildprodotto('Pizza','Roma',1);
			
		}
		else{
			$('#noconn').show();
			$('#noconn2').show();
			
			var tabella = '<table align="center" border="0" width="100%" height="60px" class="conn">';
			tabella = tabella + '<tr><td align="center" width="50px"><img src="img/wire.png" width="32px"></td><td align="left"><font color="white" size="2">Nessuna connessione attiva</font></td><td><a href="javascript:verificawifi()"><div width="40px" class="home"></div></a></td></tr>';
			tabella = tabella + '</table>';
			
			$('#noconn').html(tabella);
			$('#noconn2').html(tabella);
			
			$("#verifica").bind ("click", function (event)
				{
				var connectionStatus = false;
				connectionStatus = navigator.onLine ? 'online' : 'offline';
								 
				if(connectionStatus=='online'){
					app.initialize();
				}
				else{
					$(".spinner").hide();
								 
					navigator.notification.alert(
						'Nessuna connessione ad internet rilevata',  // message
						alertDismissed,         // callback
						'Attenzione',            // title
						'OK'                  // buttonName
                 );
				}
								 
			 });
			
			
			$(".spinner").hide();
			$(this).find('a[data-rel=back]').buttonMarkup({
					iconpos: 'notext'
			});
			
		}
    }
	
};

function pagina22() {
	
	var email = localStorage.getItem("email");
	var Badge10 = localStorage.getItem("Badge10");
	
	if((email=="")||(!email)){
		$("#btnprofilo2").attr("href", "#page4");
		$("#btnprofilo2").attr("onclick", "javascript:checklogin();");
	}else{
		$("#btnprofilo2").attr("href", "#mypanel");
		$("#btnprofilo2").attr("onclick", "#");
	}
	
	$(document).on('pagebeforeshow', function () {
		$(this).find('a[data-rel=back]').buttonMarkup({
		iconpos: 'notext'
	});
				   
				   setTimeout(function() {
							  $(window).scrollTop($(window).scrollTop()+1);
							  //window.scrollTo(0,0);
							  }, 1000);
			
				   setTimeout(function() {
						//alert();
					}, 1000);
				   
	 });
}

function AggProd() {
	localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
	var Badge10 = localStorage.getItem("Badge10");

	$('#badde').removeClass('badge2').addClass('badge1');
	$("#badde").attr("data-badge", Badge10);
	$("#badde").html('<img src="img/upload.png" width="18px">');
	
	$('#badde2').removeClass('badge2').addClass('badge1');
	$("#badde2").attr("data-badge", Badge10);
	$("#badde2").html('<img src="img/upload.png" width="18px">');
}

function SottProd() {
	if (parseInt(localStorage.getItem("Badge10")) > 0){
		localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
	
		var Badge10 = localStorage.getItem("Badge10");
	
		$('#badde').removeClass('badge2').addClass('badge1');
		$("#badde").attr("data-badge", Badge10);
		$("#badde").html('<img src="img/upload.png" width="18px">');
	
		$('#badde2').removeClass('badge2').addClass('badge1');
		$("#badde2").attr("data-badge", Badge10);
		$("#badde2").html('<img src="img/upload.png" width="18px">');
	}
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
		
		//alert('Lat' + ciao + 'Lng' + ciao1);
	}
	
	
	function onError(error) {
		
		localStorage.setItem("geostory", "NO")
	}
	
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

function send() {
	window.plugin.email.open({
	 to:      ['info@pokeranswer.it'],
	subject: 'Contatto',
	body:    'Scrivici pure, risponderemo alle tue domande nel piu breve tempo possibile...<br><br>TeamPokerAnswer<br><img src="http://www.pokeranswer.it/img/logo256.png" width="80px">',
	isHtml:  true
});
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

//$(window).off("scroll");

	
$(document).on('pagebeforeshow', function () {
	$(this).find('a[data-rel=back]').buttonMarkup({
	  iconpos: 'notext'
	});
	
		setTimeout(function() {
			$(window).scrollTop($(window).scrollTop()+1);
			//window.scrollTo(0,0);
        }, 1000);
			   
});
	
	var landmark2 ="";
	$(".spinner").show();
	var Recensione = "";
	var model = device.model;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  	$("#idheader").html("<table id='idheader' height='50'><tr><td width='30px' align='center'></td><td width='240px' align='center' valign='middle'><font color='#FFFFFF' size='3'>"+ item.Nome +"</font></td><td width='50px' align='center' valign='middle'><img src='Tod10.png' width='22'></td></tr></table>");
				  
				  if((item.TitRecensione=="")||(!item.TitRecensione)){
					var Recensione = "";
				  }
				  else{
					Recensione = "<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>"+ item.TitRecensione +"<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Recensione +"</font></td></tr>";
				  }
				  
					
				if (model.indexOf('iPad') >= 0) {
				  $("#prodotto").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='440px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td colspan='3'><font color='#454545' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'>Valore: <strike>"+ item.Valore +"</strike></font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>"+ item.Deal +"&euro; </b></font></td><td align='right' colspan='2'><font color='#454545' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>In Sintesi<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dettagli<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Condizioni<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Condizioni +"</font></td></tr>"+ Recensione +"<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",1);' data-transition='slide' class='zocial email'>&nbsp;&nbsp;&nbsp;Regala Coupon&nbsp;&nbsp;&nbsp;</a></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='javascript:condividi("+ idProdotto +");' class='zocial facebook'>Condividi su Facebook</a></td></tr></table>");
				  }
				  else{
					$("#prodotto").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td colspan='3'><font color='#454545' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'>Valore: <strike>"+ item.Valore +"</strike></font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>"+ item.Deal +"&euro; </b></font></td><td align='right' colspan='2'><font color='#454545' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>In Sintesi<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dettagli<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Condizioni<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Condizioni +"</font></td></tr>"+ Recensione +"<tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",1);' data-transition='slide' class='zocial email'>&nbsp;&nbsp;&nbsp;Regala Coupon&nbsp;&nbsp;&nbsp;</a></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><a href='javascript:condividi("+ idProdotto +");' class='zocial facebook'>Condividi su Facebook</a></td></tr></table>");
				  }
				  
					$("#clock").countdown("2015/"+ item.MeseScadenza +"/"+ item.GiornoScadenza +" "+ item.OraScadenza +":"+ item.MinutiScadenza +":00", function(event) {
							$(this).html(event.strftime('%D giorni %H:%M:%S'));
					});
				  
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

	
	$("#idfooter").html("<table id='idfooter' border='1'><tr><td width='200px' align='center'><span id='clock'></span></td><td width='120px' align='center'><a href='#page3' onclick='javascript:riepilogo("+ idProdotto +",0);' data-transition='slide' class='ui-btn ui-shadow ui-corner-all'>Acquista!</a></td></tr></table>");
	
}

function riepilogo(idProdotto,regalo) {
	
	
	$(document).on('pagebeforeshow', function () {
		$(this).find('a[data-rel=back]').buttonMarkup({
		iconpos: 'notext'
		});
	});
	
	var model = device.model;
	
	
	$("#idheader3").html("<table id='idheader' height='50'><tr><td width='30px' align='center'></td><td width='240px' align='center' valign='middle'><font color='#FFFFFF' size='3'>CONFERMA</font></td><td width='50px' align='center' valign='middle'><img src='Tod10.png' width='22'></td></tr></table>");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Riepilogo.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.ID != 0){
				  
				  $("#riepilogo1").html("<font color='#454545' size='3'><b>"+ item.DescrizioneS +"</b></font>");
				  
				if (model.indexOf('iPad') >= 0) {
				  if(regalo==0){
					$("#riepilogo").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='70%'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='30%'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy <input type='hidden' data-theme='b' name='NomeRegalo' id='NomeRegalo' value='0' placeholder='Email'><input type='hidden' data-theme='b' name='TuoRegalo' id='TuoRegalo' value='0' placeholder='Email'><input type='hidden' data-theme='b' name='EmailRegalo' id='EmailRegalo' value='0' placeholder='Email'> <input type='hidden' data-theme='b' name='Messaggio' id='Messaggio' value='0' placeholder='Email'></font></td></tr></table>");
				   }
				  else{
				  $("#riepilogo").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='70%'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='30%'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='NomeRegalo' id='NomeRegalo' value='' placeholder='Nome Destinatario'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='TuoRegalo' id='TuoRegalo' value='' placeholder='Tuo Nome'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='EmailRegalo' id='EmailRegalo' value='' placeholder='Email Destinatario'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='Messaggio' id='Messaggio' value='Un Regalo per te' placeholder='Messaggio'></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy</font></td></tr></table>");
				  }
				}
				else{
				  if(regalo==0){
				  $("#riepilogo").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='220px'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='100px'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy <input type='hidden' data-theme='b' name='NomeRegalo' id='NomeRegalo' value='0' placeholder='Email'><input type='hidden' data-theme='b' name='TuoRegalo' id='TuoRegalo' value='0' placeholder='Email'><input type='hidden' data-theme='b' name='EmailRegalo' id='EmailRegalo' value='0' placeholder='Email'> <input type='hidden' data-theme='b' name='Messaggio' id='Messaggio' value='0' placeholder='Email'></font></td></tr></table>");
				  }
				  else{
				  $("#riepilogo").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='220px'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='100px'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='NomeRegalo' id='NomeRegalo' value='' placeholder='Nome Destinatario'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='TuoRegalo' id='TuoRegalo' value='' placeholder='Tuo Nome'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='EmailRegalo' id='EmailRegalo' value='' placeholder='Email Destinatario'></td></tr><tr><td colspan='3'><input type='text' data-theme='b' name='Messaggio' id='Messaggio' value='Un Regalo per te' placeholder='Messaggio'></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy</font></td></tr></table>");
				  }

				}
				  
				  
					$("#idfooter3").html("<table id='idfooter' align='center'><tr><td width='100%' align='center' valign='bottom'><font color='#FFFFFF' size='1'>La transazione avviene con connessione sicura</font></td></tr></table>");
				  
				  }
				  else{
				  $("#riepilogo").html("Nessun risultato trovato");
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

function compra(idProdotto) {
	var num1 = Math.floor((Math.random() * 20) + 1);
	var num2 = Math.floor((Math.random() * 20) + 1);
	var num3 = Math.floor((Math.random() * 20) + 1);
	var num4 = Math.floor((Math.random() * 20) + 1);
	var num5 = Math.floor((Math.random() * 20) + 1);
	var num6 = Math.floor((Math.random() * 20) + 1);
	
	transazioneprodotto = num1+""+num2+""+num3+""+num4+""+num5+""+num6;
	
	var item_number= transazioneprodotto;
	//prendere il nome prodotto e il prezzo con WS per passare al pagina di pagamento
	var amount = "";
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	var NomeRegalo = self.document.formia9.NomeRegalo.value;
	var TuoRegalo = self.document.formia9.TuoRegalo.value;
	var EmailRegalo = self.document.formia9.EmailRegalo.value;
	var Messaggio = self.document.formia9.Messaggio.value;
	
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
	if (TuoRegalo == "") {
		navigator.notification.alert(
									 'inserire il tuo nome',  // message
									 alertDismissed,         // callback
									 'Tuo Nome',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (EmailRegalo == "") {
		navigator.notification.alert(
									 'inserire un email valida',  // message
									 alertDismissed,         // callback
									 'Email Destinatario',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (Messaggio == "") {
		navigator.notification.alert(
									 'inserire un messaggio valido',  // message
									 alertDismissed,         // callback
									 'Messaggio',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  amount = item.Deal;
				  nome = item.Nome;
				  EmailEsercente = item.EmailEsercente;
				  
				  vendoPayPal(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente,NomeRegalo,TuoRegalo,EmailRegalo,Messaggio);
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


function compracc(idProdotto) {
	var num1 = Math.floor((Math.random() * 20) + 1);
	var num2 = Math.floor((Math.random() * 20) + 1);
	var num3 = Math.floor((Math.random() * 20) + 1);
	var num4 = Math.floor((Math.random() * 20) + 1);
	var num5 = Math.floor((Math.random() * 20) + 1);
	var num6 = Math.floor((Math.random() * 20) + 1);
	
	transazioneprodotto = num1+""+num2+""+num3+""+num4+""+num5+""+num6;
	
	var item_number= transazioneprodotto;
	var amount = "";
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	var NomeRegalo = self.document.formia9.NomeRegalo.value;
	var TuoRegalo = self.document.formia9.TuoRegalo.value;
	var EmailRegalo = self.document.formia9.EmailRegalo.value;
	var Messaggio = self.document.formia9.Messaggio.value;
	
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
	if (TuoRegalo == "") {
		navigator.notification.alert(
									 'inserire il tuo nome',  // message
									 alertDismissed,         // callback
									 'Tuo Nome',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (EmailRegalo == "") {
		navigator.notification.alert(
									 'inserire un email valida',  // message
									 alertDismissed,         // callback
									 'Email Destinatario',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}
	
	if (Messaggio == "") {
		navigator.notification.alert(
									 'inserire un messaggio valido',  // message
									 alertDismissed,         // callback
									 'Messaggio',            // title
									 'OK'                  // buttonName@
									 );
		return;
	}

	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  amount = item.Deal;
				  nome = item.Nome;
				  EmailEsercente = item.EmailEsercente;
				  
				  vendoCC(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente,NomeRegalo,TuoRegalo,EmailRegalo,Messaggio);
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

function vendoCC(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente,NomeRegalo,TuoRegalo,EmailRegalo,Messaggio){
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
				   var ref = window.open('http://www.mistertod.it/wbssella.asp?Transprodotto='+ transazioneprodotto +'', '_blank', 'location=no');
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



function checklogin() {
	$(document).on('pagebeforeshow', function () {
		$(this).find('a[data-rel=back]').buttonMarkup({
		iconpos: 'notext'
	});
				   
	setTimeout(function() {
		$(window).scrollTop($(window).scrollTop()+1);
		//window.scrollTo(0,0);
	}, 1000);
});
	
	$("#idheader4").html("<table id='idheader' height='50'><tr><td width='320px' align='center' valign='middle'><font class='fontsforweb_fontid_2802' color='#FFFFFF' size='5.5'>Mister Tod</font></span></td></tr></table>");
	
	var emailutente = "";
	
	if(emailutente==""){
		
		$("#datilogin").html("<a href='javascript:loginFacebook();' class='zocial facebook'>Login Facebook</a>")

	}else{
		$("#btnprofilo4").attr("href", "#page");

	}
}

function login() {
	
	var email2 = self.document.formia2.email.value;
	var pin2 = self.document.formia2.password.value;
	
	if (email2 == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pin2 == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	EmailAddr = self.document.formia2.email.value;
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

		LoginVera(email2,pin2);
	
}

function LoginVera(email,pin){
	//alert("Login");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Login.asp",
		   contentType: "application/json",
		   data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				if (item.Token == '1024'){
				  if (item.Attivo == '1'){
					localStorage.setItem("loginvera", "SI")
					$("#datilogin").html("Ciao "+item.Nome)
				  
				   $("#Nome").html("Ciao " + item.Nome);
				   localStorage.setItem("nome", item.Nome);
				   $("#EmailCliente").html(email);
				  localStorage.setItem("email", email);
				  document.getElementById("userPic").src = 'http://www.mistertod.it/Tod10.png';
				  
					$("#btnprofilo").attr("href", "#mypanel");
					$("#btnprofilo").attr("onclick", "#");
					$("#campireg").hide();
					$("#userPic").hide();
					window.location.href = "#page";
				  }
				  else{
					navigator.notification.alert(
											   'Credenziali non corrette',  // message
											    alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				}
				else{
				  navigator.notification.alert(
											   'Credenziali non corrette',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
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

function NextPage(Pagina) {
	buildprodotto(localStorage.getItem("Categoria"),localStorage.getItem("Provincia"),Pagina);
}

function buildprodotto(Categoria,Provincia,Pagina) {
	
	localStorage.setItem("Categoria", "");
	localStorage.setItem("Provincia", "");
	
	var idProdotto = 1;
	var landmark2="";
	$(".spinner").show();
	var model = device.model;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Home4.asp",
		   contentType: "application/json",
		   data: {Categoria:Categoria,Provincia:Provincia,Pagina:Pagina},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				if (item.ID != 0){
				  distanza = getDistance(localStorage.getItem("lat"),localStorage.getItem("lng"),item.Lat,item.Long).toFixed(1);
				  
				  //landmark2 = landmark2 + item.Cod_Prodotto + item.IMG + item.Descrizione + item.Provincia + item.Valore + distanza + item.Deal;
				  
				  if (model.indexOf('iPad') >= 0) {
					landmark2 = landmark2 + "<a style='text-decoration: none;' href='#page2' onclick='javascript:prodotto("+ item.Cod_Prodotto +");' data-transition='slide'><img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table height='30px' border='0' width='90%'><tr><td align='left' colspan='2'><font size='3' color='#454545'>"+ item.Descrizione +"</font></td></tr><tr><td align='left' width='50%'><font size='2' color='#454545'>"+ item.Nome +"</font></td><td align='right'><font size='2' color='#454545'>"+ item.Citta +"</font></font></td></tr><tr><td align='left' width='50%'><font size='2' color='#454545'>Distanza:Km "+ distanza +" </font></td><td align='right'><font size='4' color='#FF8000'>"+ item.Indirizzo +"</font></td></tr></table></a><br><hr class='div3'>";
				  }
				  else{
					landmark2 = landmark2 + "<a style='text-decoration: none;' href='#page2' onclick='javascript:pagina22("+ item.Cod_Prodotto +");' data-transition='slide'><img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='330px' height='180px'><table height='30px' border='0' width='320px'><tr><td align='left' colspan='2'><font size='3' color='#454545'>"+ item.Descrizione +"</font></td></tr><tr><td align='left' width='160px'><font size='2' color='#454545'>"+ item.Nome +"</font></td><td align='right'><font size='2' color='#454545'>"+ item.Citta +"</font></font></td></tr><tr><td align='left' width='160px'><font size='2' color='#454545'>Distanza:Km "+ distanza +" </font></td><td align='right'><font size='4' color='#FF8000'>"+ item.Indirizzo +"</font></td></tr></table></a><br><hr class='div3'>";
				  }
				  
				  if(item.Conteggio>18){
					$("#NextPagina2").show();
				  }
				  else{
					$("#NextPagina2").hide();
				  }
				  
				}
				else{
				  landmark2 ="Nessun risultato trovato";
				}
				
			});
		   
		   $(".spinner").hide();
		   $("#classifica").html(landmark2);
		   
		   if(Pagina==1){
			$("#NextPagina").attr("href", "javascript:NextPage(2)");
		   }
		   else{
		   $("#NextPagina").attr("href", "javascript:NextPage(1)");
		   }
		   
		   //window.scrollTo(0, 0);
		   
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

function condividi(idProdotto) {
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Riepilogo.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.ID != 0){
				  
				  	window.plugins.socialsharing.shareViaFacebook(''+ item.DescrizioneS +'', 'http://www.mistertod.it/plugin/up/'+ item.IMG +'.png', 'http://www.mistertod.it', function() {}, function(errormsg){notifiche('Nessuna Condivisione')});
				  
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

function chie() {
	
	$(document).on('pagebeforeshow', function () {
			$(this).find('a[data-rel=back]').buttonMarkup({
			iconpos: 'notext'
			 });
	});
	
	
	$("#idheader5").html("<table id='idheader' height='50'><tr><td width='320px' align='center' valign='middle'><font color='#FFFFFF' size='3'>Chi e' MisterTod</font></td></tr></table>");
	
	$("#idfooter5").html("<table id='idfooter' align='center'><tr><td width='320px' align='center'><font size='2'>© MisterTod di PokerParade. Tutti i diritti riservati</font></td></tr></table>");
	
}

function loginFacebook() {
	localStorage.setItem("loginfacebook", "SI")
	
	openFB.login(
	function(response) {
	if(response.status === 'connected') {
			getInfo();
	} else {
				navigator.notification.alert(
				'Al momento non puoi collegarti a Facebook',  // message
				alertDismissed,         // callback
				'Attenzione',            // title
				'OK'                  // buttonName
				);
		}
	}, {scope: 'email'});
	
	//app.initialize();
}

function getInfo() {
	openFB.api({
			path: '/me',
			success: function(data) {
			console.log(JSON.stringify(data));
			   
			   //document.getElementById("userName").innerHTML = data.name;
			   //document.getElementById("userMail").innerHTML = data.email;
			   //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
			   
			document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
			localStorage.setItem("pics", data.id)
			$("#datilogin").html("Ciao" + " " + data.name)
			   
			$("#Nome").html(data.name)
			localStorage.setItem("nome", data.name)
			$("#EmailCliente").html(data.email)
			localStorage.setItem("email", data.email)
			localStorage.setItem("step2", "GO");
			   
			$("#btnprofilo").attr("href", "#mypanel");
			$("#btnprofilo").attr("onclick", "#");
			iscrivitiFB(data.email,data.name)
			   
			},
		error: errorHandler});
}



function logoutFacebook() {
	
	openFB.logout(
		function() {
			$("#datilogin").html("<a href='javascript:loginFacebook();' class='zocial facebook'>Login Facebook</a>")
			localStorage.setItem("email", "")
			localStorage.setItem("loginfacebook", "NO")
			localStorage.setItem("loginvera", "NO")
			$("#campireg").show();
			$("#userPic").hide();
			location.reload();
		},
	errorHandler);
}

function compraFB() {
	var pagina = "donazione";
	var ref = window.open('http://www.facebook.com', '_blank', 'location=no');
	
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
			   url:"http://www.mistertod.it/www/Check_RecPassword.asp",
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

function iscriviti(){
	
	var emailreg = self.document.formia.emailreg.value;
	var pinreg = self.document.formia.Password.value;
	var nomereg = self.document.formia.nome.value;
	
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
									 'Email',            // title
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
									 'Caratteri email non consentiti',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	localStorage.setItem("emailreg", emailreg);
	localStorage.setItem("pinreg", pinreg);
	localStorage.setItem("nomereg", nomereg);
	
	window.location.href = "TerminiTotal.html";
}

function iscrivitiFB(emailfb,nomefb){
	$('#spinner').show();
	
	var emailreg = emailfb;
	var pinreg = "01010101";
	var nomereg = nomefb;
	

	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Reg.asp",
		   contentType: "application/json",
		   data: {email:emailreg,nome:nomereg,pin:pinreg},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				window.location.href = "#page";
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

function step1() {
	
	localStorage.setItem("step1", "GO")
	localStorage.setItem("ProvSte1", document.getElementById("ProvStep1").value)
	
	localStorage.setItem("Provincia", localStorage.getItem("ProvSte1"))

}


function step1bis() {
	
	localStorage.setItem("step1", "GO")
	
	localStorage.setItem("Provincia", "Roma")
	
	
}


function step2() {
	
	localStorage.setItem("step2", "GO")
	var indirizzo = self.document.formia8.emailMail.value;
	
	if (indirizzo == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	EmailAddr = self.document.formia8.emailMail.value;
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


	
	//alert(indirizzo);
	//alert(localStorage.getItem("ProvSte1"));
	localStorage.setItem("Provincia", localStorage.getItem("ProvSte1"));
	localStorage.setItem("Categoria", "All");
	
	$(".spinner8").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Newsletter.asp",
		   contentType: "application/json",
		   data: {email:indirizzo,prov:localStorage.getItem("ProvSte1")},
		   //data: {ID: $value},
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
					$.each(result, function(i,item){
						   window.location.href = "#page";
					});
				$("#spinner8").hide();
			  },
		   error: function(){
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   },
		   dataType:"jsonp"});
	
	
}

function step2bis() {
	
	localStorage.setItem("step2", "GO");
	localStorage.setItem("Categoria", "All");
}
