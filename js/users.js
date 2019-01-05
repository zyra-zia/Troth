var troth = {};
troth.roles = [];
troth.permissions = [];

$(document).ready(function(){
	loadRoles()
	.then(function(){
		return loadPermissions();
	})
	.then(function(){
		populateRoleAndPermissionSelects();
		loadUsers();
	});
	
	//button handlers
	assignRole();
	assignPermission();
	removeRole();
	removePermission();
	deleteUser();
});

async function deleteUser(){
	$("#deleteUserBtn").click(function(){
		//check that at least one user is selected
		if(checkUserSelection() == false){
			return;
		}
		
		var addresses = getCheckedAddresses();
		console.log(addresses);
		utils.getContract().then(function(contract){
			contract.removeUsers(addresses).send({
				shouldPollResponse:false
			})
			.then(function(tx){
				if(tx != undefined){
					
					$("#userTable input:checked").closest("tr").remove();
					
					$("#mainModal .modal-body").text("Users removed successfully");
					$("#mainModal").modal("show");
				}
			});
		});
	});
}

async function assignRole(){
	$("#assignRoleBtn").click(function(){
		//check that at least one user is selected
		if(checkUserSelection() == false){
			return;
		}
		
		var roleId = $("#assign-role").val();
		var addresses = getCheckedAddresses();
		
		utils.getContract().then(function(contract){
			contract.assignRoleToUsers(roleId, addresses).send({
				shouldPollResponse:false
			})
			.then(function(tx){
				if(tx != undefined){
					addRolePermToTable(addresses, $("#assign-role option:selected").text());
					$("#mainModal .modal-body").text("Role assigned successfully");
					$("#mainModal").modal("show");
				}
			});
		});
	});
}

async function assignPermission(){
	$("#assignPermBtn").click(function(){
		//check that at least one user is selected
		if(checkUserSelection() == false){
			return;
		}
		
		var permId = $("#assign-perm").val();
		var addresses = getCheckedAddresses();
		
		utils.getContract().then(function(contract){
			contract.assignPermissionToUsers(permId, addresses).send({
				shouldPollResponse:false
			})
			.then(function(tx){
				if(tx != undefined){
					addRolePermToTable(addresses, $("#assign-perm option:selected").text());
					$("#mainModal .modal-body").text("Permission assigned successfully");
					$("#mainModal").modal("show");
				}
			});
		});
	});
}

async function removeRole(){
	$("#removeRoleBtn").click(function(){
		//check that at least one user is selected
		if(checkUserSelection() == false){
			return;
		}
		
		var roleId = $("#remove-role").val();
		var addresses = getCheckedAddresses();
		
		utils.getContract().then(function(contract){
			contract.unassignRoleFromUsers(roleId, addresses).send({
				shouldPollResponse:false
			})
			.then(function(tx){
				if(tx != undefined){
					removeRolePermFromTable(addresses, $("#remove-role option:selected").text());
					$("#mainModal .modal-body").text("Role removed successfully");
					$("#mainModal").modal("show");
				}
			});
		});
	});
}

async function removePermission(){
	$("#removePermBtn").click(function(){
		//check that at least one user is selected
		if(checkUserSelection() == false){
			return;
		}
		
		var permId = $("#remove-perm").val();
		var addresses = getCheckedAddresses();
		
		utils.getContract().then(function(contract){
			contract.unassignPermissionFromUsers(permId, addresses).send({
				shouldPollResponse:false
			})
			.then(function(tx){
				if(tx != undefined){
					removeRolePermFromTable(addresses, $("#remove-perm option:selected").text());
					$("#mainModal .modal-body").text("Permission removed successfully");
					$("#mainModal").modal("show");
				}
			});
		});
	});
}


function addRolePermToTable(addresses, text){
	for(var i=0; i<addresses.length; i++){
		var addr = addresses[i];
		var existingText = $("tr[data-id="+addr+"] .rolePerms").text();
		if(existingText.indexOf(text) < 0){
			var newText = existingText + "," + text;
			$("tr[data-id="+addr+"] .rolePerms").text(newText);
		}
	}
}

function removeRolePermFromTable(addresses, text){
	for(var i=0; i<addresses.length; i++){
		var addr = addresses[i];
		var existingText = $("tr[data-id="+addr+"] .rolePerms").text();
		if(existingText.indexOf(text) >= 0){
			var newText = existingText.replace(text, "");
			$("tr[data-id="+addr+"] .rolePerms").text(newText);
		}
	}
}

function getCheckedAddresses(){
	var addresses = [];
	$("#userTable input:checked").each(function(){
		var tr = $(this).closest("tr");
		addresses.push($(tr).attr("data-id"));
	});
	
	return addresses;
}

function checkUserSelection(){
	if($("#userTable input:checked").length > 0){
		return true;
	}
	else{
		$("#mainModal .modal-body").text("Please select a user.");
		$("#mainModal").modal("show");
		return false;
	}
}

async function loadUsers(){
	var contract = await utils.getContract();
	
	var users = await contract.getUsersForOwner().call();
	for(var i=0; i<users.length; i++){
		html = "<tr data-id=\""+users[i]+"\"><th><input type=\"checkbox\" /></th><td>"+users[i]+"</td><td class=\"rolePerms\"></td></tr>";
		$("#userTable tbody").append(html);
		
		loadUserRoles(users[i]);
		loadUserPermissions(users[i]);
	}
}

async function loadUserRoles(address){
	var contract = await utils.getContract();
	
	contract.getUserRoles(address).call().then(function(value){console.log("roles", value);
		var td = $("tr[data-id="+address+"] .rolePerms");
		for(var i=0; i<value.length; i++){
			var roleTitle = troth.roles[value[i]].title;
			$(td).append(roleTitle + " ");
		}
	});	
}

async function loadUserPermissions(address){
	var contract = await utils.getContract();
	
	contract.getUserPermissions(address).call().then(function(value){console.log("perms", value);
		var td = $("tr[data-id="+address+"] .rolePerms");
		for(var i=0; i<value.length; i++){
			var permTitle = troth.permissions[value[i]].title;
			$(td).append(permTitle + " ");
		}
	});	
}

function populateRoleAndPermissionSelects(){
	for(var i=0; i<troth.roles.length; i++){
		var roleId = troth.roles[i].id;
		var roleTitle = troth.roles[i].title;
		
		var html = "<option value=\"" + roleId +"\">" + roleTitle + "</option>";
		$("#assign-role").append(html);
		$("#remove-role").append(html);
		$("#hasRole").append(html);
		$("#noRole").append(html);
	}
	
	for(var i=0; i<troth.permissions.length; i++){
		var permId = troth.permissions[i].id;
		var permTitle = troth.permissions[i].title;
		
		var html = "<option value=\"" + permId +"\">" + permTitle + "</option>";
		$("#assign-perm").append(html);
		$("#remove-perm").append(html);
		$("#hasPerm").append(html);
		$("#noPerm").append(html);
	}
}

async function loadPermissions(){
	var contract = await utils.getContract();
	
	var perms = await contract.getPermissionTitles().call();
	
	var split = perms.split(",");
	for(var i=0; i<split.length; i++){
		if(split[i].length >= 1){
			var split2 = split[i].split("-");
			if(split2.length < 2)
				return;
			var id = split2[0];
			var title = split2[1];
					
			troth.permissions.push({id: id, title: title});
		}
	}
}

async function loadRoles(){
	var contract = await utils.getContract();
		
	var value = await contract.getRoleTitles().call();
		
	var split = value.split(",");
	for(var i=0; i<split.length; i++){
		if(split[i].length >= 1){
			var split2 = split[i].split("-");
			if(split2.length < 2)
				return;
			var id = split2[0];
			var title = split2[1];
			
			troth.roles.push({id: id, title: title});
		}
	}
}