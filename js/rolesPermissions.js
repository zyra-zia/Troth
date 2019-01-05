var troth = {};
troth.roles = [];
troth.permissions = [];

$(document).ready(function(){
	loadRoles()
	.then(function(){
		return loadPermissions();
	})
	.then(function(){
		createRolePermissionTable();
	});
});

function createRolePermissionTable(){
	//create role headers
	for(var i=0; i<troth.roles.length; i++){
		var headingHtml = "<th data-id=\""+troth.roles[i].id+"\">"+troth.roles[i].title+" <span class=\"edit-delete-span\"><span data-feather=\"save\"></span> <span data-feather=\"edit\"></span> <span data-feather=\"trash-2\"></span></span></th>";
		$(".roleHeadings").append(headingHtml);
	}
	
	//create permission cells and add checkboxes to rest of table
	for(var j=0; j<troth.permissions.length; j++){
		var tdHtml = "<tr><td data-id=\""+troth.permissions[j].id+"\">"+troth.permissions[j].title+" <span class=\"edit-delete-span\"><span data-feather=\"edit\"></span> <span data-feather=\"trash-2\"></span></span></td>";
		
		for(var k=0; k<troth.roles.length; k++){
			tdHtml += "<td data-role=\""+troth.roles[k].id+"\" data-perm=\""+troth.permissions[j].id+"\"><input type=\"checkbox\"></td>";
		}
		tdHtml += "</tr>";
		
		$("tbody").append(tdHtml);
	}
	
	//now check the checkboxes
	for(var m=0; m<troth.roles.length; m++){
		var roleId = troth.roles[m].id;
		var perms = troth.roles[m].permissions;
		
		if(perms == undefined)
			continue;
		for(var n=0; n<perms.length; n++){
			var p = perms[n];
			$("td[data-role="+roleId+"][data-perm="+p+"] input").prop("checked", true);
		}
	}
	
	feather.replace();
	
	setCheckboxHandlers();
	saveButtonHandlers();
	deleteButtonHandlers();
	editButtonHandlers();
	
}

function setCheckboxHandlers(){
	$("table input[type=checkbox]").change(function(){
		//enable save icon for this role
		var id = $(this).closest("td").attr("data-role");
		$("th[data-id="+id+"] .feather-save").css("color", "red").addClass("show");
	});
}

function saveButtonHandlers(){
	$("table th .feather-save").click(function(){
		var roleId = $(this).closest("th").attr("data-id");
		var perms = getRolePermsFromTable(roleId);
		
		utils.getContract().then(function(value){
			var contract = value;
			
			return contract.updatePermissionsForRole(roleId, perms).send({
				shouldPollResponse:false
			});
		})
		.then(function(tx){console.log(tx);
			if(tx !== undefined){
				$("th[data-id="+roleId+"] .feather-save").css("color", "black").removeClass("show");
				$("#mainModal .modal-body").text("Role has been updated successfully.");
				$("#mainModal").modal("show");
			}
		});
	});
}

function deleteButtonHandlers(){
	//delete a role
	$("table th .feather-trash-2").click(function(){
		var roleId = $(this).closest("th").attr("data-id");
		
		utils.getContract().then(function(value){
			var contract = value;
			
			return contract.deleteRole(roleId).send({
				shouldPollResponse:false
			});
		})
		.then(function(tx){console.log(tx);
			if(tx !== undefined){
				$("#mainModal .modal-body").text("Role has been deleted successfully.");
				$("#mainModal").modal("show");
				
				//update table
				$("th[data-id="+roleId+"]").remove();
				$("td[data-role="+roleId+"]").remove();
			}
		});
	});
	
	//delete a permission
	$("table td .feather-trash-2").click(function(){
		var permId = $(this).closest("td").attr("data-id");
		
		utils.getContract().then(function(value){
			var contract = value;
			
			return contract.deletePermission(permId).send({
				feeLimit:1000000,
				shouldPollResponse:false
			});
		})
		.then(function(tx){
			if(tx !== undefined){console.log(tx);
				$("#mainModal .modal-body").text("Permission has been deleted successfully.");
				$("#mainModal").modal("show");
				
				//update table
				$("td[data-id="+permId+"]").remove();
				$("td[data-perm="+permId+"]").remove();
			}
		});
	});
}

function editButtonHandlers(){
	//edit a role
	$("table th .feather-edit").click(function(){
		var roleId = $(this).closest("th").attr("data-id");
		window.location.href = utils.base_url + "role/edit.php?id=" + roleId;
	});
	
	//edit a permission
	$("table td .feather-edit").click(function(){
		var permId = $(this).closest("td").attr("data-id");
		window.location.href = utils.base_url + "permission/edit.php?id=" + permId;
	});
}

function getRolePermsFromTable(roleId){
	var perms = [];
	$("table td[data-role="+roleId+"]").each(function(){
		if($("input", this).prop("checked") == true){
			perms.push($(this).attr("data-perm"));
		}
	});
	
	return perms;
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
		
	//now get permissions for roles
	for(var i=0; i<troth.roles.length; i++){
		getPermsForRoles(i, troth.roles[i].id);
	}
}

async function getPermsForRoles(arrayIndex, roleId){
	var contract = await utils.getContract();
	var value = await contract.getRoleDetails(roleId).call();
	troth.roles[arrayIndex].permissions = value.perms;
}