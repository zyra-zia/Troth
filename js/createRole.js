$(document).ready(function(){
	populatePermissions();
	validateForm();
});

function populatePermissions(){
	utils.getContract().then(function(contract){
				
		contract.getPermissionTitles().call().then(function(value){
			//example value = "0-Create Project,1-Edit Messages,"
			var split = value.split(",");
			for(var i=0; i<split.length; i++){
				if(split[i].length >= 1){
					var split2 = split[i].split("-");
					if(split2.length < 2)
						return;
					var id = split2[0];
					var title = split2[1];
					var html = "<option class=\"permOptions\" value=\""+id+"\">"+title+"</option>";
					$("#selectPermissions").append(html);
				}
			}
			
			$("#selectPermissions").change(function(event){
				var permId = $("#selectPermissions").val();
				if(permId == -1){
					return;
				}
				
				//if permission already selected then return
				if($("#permTable tr[data-id="+permId+"]").length > 0){
					return;
				}
				
				var permTitle = $("#selectPermissions option:selected").text();
				var html = "<tr data-id=\""+permId+"\"><td>"+permTitle+"</td><td class=\"remove\"><span data-feather=\"x-circle\"></span></td></tr>";
				$("#permTable").append(html);
				feather.replace();
				
				//remove permission on x click
				$("#permTable .feather").click(function(){
					$(this).closest("tr").remove();
				});
			});
		});
		
	});
}

function createRole(title, description){
	$(".alert").css("display", "none");
	
	var permIds = [];
	$("#permTable tr").each(function(){
		permIds.push(parseInt($(this).attr("data-id")));
	});
	
	console.log(permIds);
	
	utils.getContract().then(function(contract){
		
		contract.createRole(title, description, permIds).send({
			shouldPollResponse:false
		}).then(function(tx){
			if(tx !== undefined){
				$(".alert").css("display", "block");
				$("#inputTitle").val("");
				$("#textDescription").val("");
				$("#permTable tr").remove();
				$("#selectPermissions option[value=-1]").prop('selected', true);
			}
		});
		
	});
}

function validateForm(){
	$("#add-role-form").submit(function(event){
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
			createRole(title, desc);
			$(".invalid-feedback",this).css("display","none");
		}
	});
	
}
