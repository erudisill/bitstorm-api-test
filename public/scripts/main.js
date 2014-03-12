Number.prototype.toHex = function(padLen) {
	
	var temp = this.toString(16).toUpperCase();
	var result = ("00000000" + temp).slice(-padLen);
	return ("0x" + result);
};


var main = {};

main.getAllPings = function() {
	var jqxhr =	$.ajax({
		type: "GET",
		url: "/pings",
		dataType: "json",
	});
	return jqxhr;
};

main.insertPing = function() {
	var stat = "STANDARD";
	var now = new Date();
	if (now % 3) {
		stat = "MOVEMENT";
	}
	
	var ping = { 
		messageType: 0x03,
		nodeType: 0x03,
		extAddr: 0x0000000000008001,
		shortAddr: 0x8008,
		softVersion: 0x0101010,
		channelMask: 0x00000080,
		panId: 0x1234,
		workingChannel: 0x0f,
		parentShortAddr: 0x0000,
		lqi: 0xFF,
		rssi: 0xb6,
		battery: 0x56,
		cs: 0xaa
	};
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/pings",
		data: JSON.stringify(ping),
		dataType: "json"
	})
	.done(function(result) {
		console.log("insertPing: inserted");
		console.log(result);
	})
	.error(function(err) {
		console.log(err);
	});
};

main.clearPings = function() {
	bootbox.confirm("Are you sure you want to clear ALL pings?", function(result) {
		if (result == true) {
			$.ajax({
				type: "DELETE",
				url: "/pings"		
			})
			.done(function(result) {
				console.log("clearPings: cleared!");
				$("#info_cleared").fadeIn();
			})
			.error(function(err) {
				console.log("clearPings: error");
				console.log(err);
			});
		}
	});
};




main.startHome = function() {
	main.getAllPings()
	.done(function(data) {
		var t = $("#pingsTemplate").html();
		_.each( data, function(item) {
			$("#pingsBody").append(_.template(t, item));
		})
		$("#spinner").fadeOut();
	});
};

$(document).ready(function() {
	$("#menu").load("./_menu.html", function() {
		$(menu_active).addClass("active");
		
		if (menu_active == "#menu_home") {
			main.startHome();
		}
	});
});
