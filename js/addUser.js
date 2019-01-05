$(document).ready(function(){
	validateForm();
});

function addUser(address){
	utils.getContract().then(function(contract){
		
		contract.addUser(address).send({
			shouldPollResponse:false
		}).then(function(tx){
			if(tx !== undefined){
				$("#mainModal .modal-body").text("User has been added successfully.");
				$("#mainModal").modal("show");
				$("#inputAddress").val("");
			}
		});
		
	});
}

function validateForm(){
	$("#add-user-form").submit(function(event){
		event.preventDefault();
        event.stopPropagation();
		
		var isValid = true;
		
		var address = $("#inputAddress").val();
		var tre = /^[a-z0-9]+$/i;
		
		if(tre.test(address) != true || address.length < 34 || address.length > 34){
			isValid = false;
			
			$("#address-feedback").css("display", "block");
		}
		else{
			$("#address-feedback").css("display", "none");
		}
		
        if (isValid === true) {
			addUser(address);
			$(".invalid-feedback",this).css("display","none");
		}
	});
	
}
