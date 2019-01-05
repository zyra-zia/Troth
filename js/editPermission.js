$(document).ready(function(){
	
	populateForm()
	.then(function(){
		validateForm();
	});
	
});

async function populateForm(){
	var permId = parseInt($("#permId").val());
	
	var contract = await utils.getContract();
	
	var permDetails = await contract.getPermissionDetails(permId).call();
	console.log(permDetails);
	$("#inputTitle").val(permDetails.title);
	
	$("#textDescription").val(permDetails.description);
}

function editPermission(title, description){
	$(".alert").css("display", "none");
	
	utils.getContract().then(function(contract){
		
		var id = $("#permId").val();
		
		contract.updatePermission(id, title, description).send({
			shouldPollResponse:false
		}).then(function(tx){
			if(tx !== undefined){
				$("#mainModal .modal-body").text("Permission has been updated successfully.");
				$("#mainModal").modal("show");
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
			editPermission(title, desc);
			$(".invalid-feedback",this).css("display","none");
		}
	});
	
}
