$(document).ready(function(){
	
	validateForm();
	
});

function createPermission(title, description){
	$(".alert").css("display", "none");
	
	utils.getContract().then(function(contract){
		
		contract.createPermission(title, description).send({
			shouldPollResponse:false
		}).then(function(tx){
			if(tx !== undefined){
				$(".alert").css("display", "block");
				$("#inputTitle").val("");
				$("#textDescription").val("");
			}
		});
		
	});
}

function validateForm(){
	$("#add-perm-form").submit(function(event){
		event.preventDefault();
        event.stopPropagation();
		
		var isValid = true;
		
		var title = $("#inputTitle").val();
		var tre = /^[a-z0-9_-\s]+$/i;
		
		if(tre.test(title) != true || title.length == 0){
			isValid = false;
			
			$("#title-feedback").css("display", "block");
		}
		else{
			$("#title-feedback").css("display", "none");
		}
		
		var desc = $("#textDescription").val();
		
		if(desc.length == 0){
			$("#desc-feedback").css("display", "none");
		}
		else if(desc.length > 250){
			isValid = false;
			
			$("#desc-feedback").css("display", "block");
		}
		else{
			$("#desc-feedback").css("display", "none");
		}
		
        if (isValid === true) {
			createPermission(title, desc);
			$(".invalid-feedback",this).css("display","none");
		}
	});
	
}
