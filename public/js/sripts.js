$('#arrival_date').datepicker();
$('#departure_date').datepicker();




////////////////////////////////////////////////////Save info from registration form///////////////////////////////
$('#submit_btn').on('click', function() {
	var user = {};
	user.fullName = $('#full_name').val();
	user.nationality = $('#nationality').val();
	user.arrivalPurpose = $('#arrival_purpose').val();
	user.arrivalDate = $('#arrival_date').val();
	user.departureDate = $('#departure_date').val();
	user.regDuration = $('#reg_duration').val();
	document.getElementById("myform").reset();
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
	  	$('tbody').html('');
	  	//console.log(msg);
	  	for (var i = 0; i < msg.length; i++) { 		

			var foreign = "<tr><td>" + msg[i].fullName + "</td>"
							+ "<td>" + msg[i].nationality + "</td>"
							+ "<td>" + msg[i].arrivalPurpose + "</td>"
							+ "<td>" + msg[i].arrivalDate + "</td>"
							+ "<td>" + msg[i].regDuration + " month</td>"
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
	  					 + '<li> Arrival purpose: <strong>' + msg[i].arrivalPurpose + '</strong></li>'
	  					 + '<li> Arrival date: <strong>' + msg[i].arrivalDate + '</strong></li>'
	  					 + '<li> Planned date of departure: <strong>' + msg[i].departureDate + '</strong></li>'
	  					 + '<li> Registration duration: <strong>' + msg[i].regDuration + ' month</strong></li>';
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

////////////////////////////////////Show arrivals last 14 days////////////////////////////////

$('#last14_btn').click( function(){ 

	$.ajax({
	  type: "GET",
	  url: "http://localhost:3000/user",
	  success: function(msg) {
	  	$('tbody').html('');

	  	for (var i = 0; i < msg.length; i++) {
	  		var now = new Date();
	  		var arrDate = new Date(msg[i].arrivalDate);

	  		//var y = msg[i].regDuration;
	  		var dayToX = Math.floor((now - arrDate)/1000/60/60/24); //сколько дней прошло с приезда
	  		//var maxDays = y * 31; // на сколько дней дана регистрация
	  		
	  		if (dayToX < 15){
	  			var foreign = "<tr><td>" + msg[i].fullName + "</td>"
							+ "<td>" + msg[i].nationality + "</td>"
							+ "<td>" + msg[i].arrivalPurpose + "</td>"
							+ "<td>" + msg[i].arrivalDate + "</td>"
							+ "<td>" + msg[i].regDuration + " month</td>"
							+ "<td>" + '<button class="btn btn-danger delete" data-id="'+ msg[i]._id + '">Delete</button>'
							+'<button class="btn btn-primary show_more_btn" data-id="' + msg[i]._id + '">Show full info</button>' + "</td></tr>";

				$('tbody').append(foreign);
	  		}
		}
	  },
	  dataType: 'json'
	});

});

/////////////////////////////////////////////Registration expired/////////////////////////////////////
$('#expired_btn').click( function(){ 
	$.ajax({
	  type: "GET",
	  url: "http://localhost:3000/user",
	  success: function(msg) {
	  	$('tbody').html('');
	  	for (var i = 0; i < msg.length; i++) {
	  		var now = new Date();
	  		var arrDate = new Date(msg[i].arrivalDate);
	  		var y = msg[i].regDuration;
	  		var dayToX = Math.floor((now - arrDate)/1000/60/60/24); //сколько дней прошло с приезда
	  		var maxDays = y * 31; // на сколько дней дана регистрация
	  		
	  		if (dayToX > maxDays){
	  			var foreign = "<tr><td>" + msg[i].fullName + "</td>"
							+ "<td>" + msg[i].nationality + "</td>"
							+ "<td>" + msg[i].arrivalPurpose + "</td>"
							+ "<td>" + msg[i].arrivalDate + "</td>"
							+ "<td>" + msg[i].regDuration + " month</td>"
							+ "<td>" + '<button class="btn btn-danger delete" data-id="'+ msg[i]._id + '">Delete</button>'
							+'<button class="btn btn-primary show_more_btn" data-id="' + msg[i]._id + '">Show full info</button>' + "</td></tr>";

				$('tbody').append(foreign);
	  		}
		}
	  },
	  dataType: 'json'
	});
});

////////////////////////////////////////////Show countries//////////////////////////////////////////////////////////////
$('#show_countries_btn').click( function(){ 
	var country = prompt('Enter country', '');
	$.ajax({
	  type: "GET",
	  url: "http://localhost:3000/user",
	  success: function(msg) {
	  	$('tbody').html('');
	  	for (var i = 0; i < msg.length; i++) {
	  		
	  		
	  		if (msg[i].nationality == country){
	  			var foreign = "<tr><td>" + msg[i].fullName + "</td>"
							+ "<td>" + msg[i].nationality + "</td>"
							+ "<td>" + msg[i].arrivalPurpose + "</td>"
							+ "<td>" + msg[i].arrivalDate + "</td>"
							+ "<td>" + msg[i].regDuration + " month</td>"
							+ "<td>" + '<button class="btn btn-danger delete" data-id="'+ msg[i]._id + '">Delete</button>'
							+'<button class="btn btn-primary show_more_btn" data-id="' + msg[i]._id + '">Show full info</button>' + "</td></tr>";

				$('tbody').append(foreign);
	  		}
		}
	  },
	  dataType: 'json'
	});
});

//////////////////////////////////////////////////Menu////////////////////////////////////////////////
$('.glyphicon-menu-hamburger').on('mouseover', function(){

	$('.admin_menu').css('overflow', 'visible');
	});
