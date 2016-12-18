$('#arrival_date').datepicker();
$('#departure_date').datepicker();

//var deleteBtn = '<button class="btn btn-danger" id="delete">Delete</button>';

////////////////////////////////////////////////////Save info from registration form///////////////////////////////
$('#submit_btn').on('click', function() {
	var user = {};
	user.fullName = $('#full_name').val();
	user.nationality = $('#nationality').val();
	user.gender = $('input[name="gender"]').val();
	user.arrivalPurpose = $('#arrival_purpose').val();
	user.arrivalDate = $('#arrival_date').val();
	user.departureDate = $('#departure_date').val();
	user.regDuration = $('#reg_duration').val();

	// console.log(JSON.stringify(user))
	$.ajax({
	  type: "POST",
	  url: "http://localhost:3000/user",
	  data: user,
	  success: function(data) { console.log(data) },
	  dataType: 'json'
	});
	
})

/////////////////////////////////////////////////Show DataBase//////////////////////////////////////////////////
$('#showdb_btn').on('click', function() {
	$.ajax({
	  type: "GET",
	  url: "http://localhost:3000/user",
	  success: function(msg) {
	  	//console.log(msg);
	  	for (var i = 0; i < msg.length; i++) {
	  		var trow = $("<tr />");	  		

			var foreign = "<tr><td>" + msg[i].fullName + "</td>"
							+ "<td>" + msg[i].nationality + "</td>"
							+ "<td>" + msg[i].arrivalPurpose + "</td>"
							+ "<td>" + msg[i].arrivalDate + "</td>"
							+ "<td>" + msg[i].regDuration + "</td>"
							+ "<td>" + '<button class="btn btn-danger delete" data-id="'+ msg[i]._id + '">Delete</button>'
							+'<button class="btn btn-primary show_more_btn" data-id="' + msg[i]._id + '">Show full info</button>' + "</td></tr>";

			$('tbody').append(foreign);

		}
	  },
	  dataType: 'json'
	});
})


///////////////////////////////////////////Delete from db////////////////////////////////////////////

$('body').on('click', '.delete', function()  {
	
	alert('deleted');
	var delObj = {_id: this.dataset.id};
	$.ajax({
	  type: "DELETE",
	  url: "http://localhost:3000/user",
	  data: delObj,
	  success: function(msg) { console.log(msg); },
	  dataType: 'json'
	});
})

////////////////////////////////////////////////////////////////////////Show More info//////////////////////////////////////////////
$('body').on('click', '.show_more_btn', function()  {
	$('.show_more').css('display', 'block');
	var a = this.dataset.id;
	$.ajax({
	  type: "GET",
	  url: "http://localhost:3000/user",
	  success: function(msg) {
	  	for (var i = 0; i < msg.length; i++) {
	  		if (msg[i]._id == a){
	  			var info = '<li> Full Name: <strong>' + msg[i].fullName + '</strong></li>'
	  					 + '<li> Nationality: <strong>' + msg[i].nationality + '</strong></li>'
	  					 + '<li> Gender: <strong>' + msg[i].gender + '</strong></li>'
	  					 + '<li> Arrival purpose: <strong>' + msg[i].arrivalPurpose + '</strong></li>'
	  					 + '<li> Arrival date: <strong>' + msg[i].arrivalDate + '</strong></li>'
	  					 + '<li> Planned date of departure: <strong>' + msg[i].departureDate + '</strong></li>'
	  					 + '<li> Registration duration: <strong>' + msg[i].regDuration + '</strong></li>';
	  			$('#more_info').append(info);
	  		}
		}
	  },
	  dataType: 'json'
	});
	
})
/////////////////////////////////////////////////////Modal Window Close//////////////////////////////////////////////
$('.modal_close').click( function(){ 
		$('.show_more')
			.animate({opacity: 0, top: '45%'}, 200,  
				function(){ 
					$(this).css('display', 'none'); 
				}
			);
	});