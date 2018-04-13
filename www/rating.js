/*Simple system of rating with javascript*/

/*condition of loop while*/
var count = 1;
/*Number of stars in rating*/
var itensCount = 5;

/*path of image that representing the star not selected(can be changed)*/
var imgUnSelected = "imgs/starunselected.png";

/*path of image that representing the star selected(can be changed)*/
var imgSelected = "imgs/starselected.png";

/*determines whether or not the classification will be changeable*/
var readOnly = false;

$(document).ready(function(){
	while(count <= itensCount){
		if(!readOnly){
			$('#rating').append('<img id="'+count+'" onclick="changeListener('+count+');" src="'+imgUnSelected+'" />').css('display','inline');
		}else{
			$('#rating').append('<img id="'+count+'" src="'+imgUnSelected+'" />').css('display','inline');
		}
		count++;
	}
	
	changeListener(3);
	
});
	/*ATTENTION: for know the number of stars selected, use the value of id variable*/


	/*
	* alternate between functions of select and not select as click on image
	* @param id image star
	*/
	function changeListener(id){
		alert(id);
		var conditionStar = $('#'+id).attr('src');
			
		if(conditionStar !== imgSelected){
			listenerSelected(id);
		}else{
			listenerUnSelected(id);
		}
	}

	/*
	* increases the classification according to the clicks
	*
	* case you want just show one rating, call this function placing the number of stars
	* like parameter and assign the value true in variable readOnly
	*
	* @param id image star
	*/
	function listenerSelected(id){
		//alert(id);
	var conditionStar = $('#'+id).attr('src');
			
		if(conditionStar !== imgSelected){

			if(!readOnly){
				$('<img id="'+id+'" onclick="changeListener('+id+');" src="'+imgSelected+'" />').replaceAll('#'+id);
			}else{
				$('<img id="'+id+'" src="'+imgSelected+'" />').replaceAll('#'+id);
			}

			if(id > 0){
				listenerSelected(id-1);
			}

		}
	}

	/*
	* decreases the classification according to the clicks
	* @param id image star
	*/
	function listenerUnSelected(id){
		//alert(id);
		var conditionStar = $('#'+id).attr('src');
			
		if(conditionStar === imgSelected){
			while(id < itensCount){		
				id++;
				if(!readOnly){	
					$('<img id="'+id+'" onclick="changeListener('+id+');" src="'+imgUnSelected+'" />').replaceAll('#'+id);						
				}else{
					$('<img id="'+id+'" src="'+imgUnSelected+'" />').replaceAll('#'+id);						
				}
			}
		}
	}
