<?php include "../common/header.php"; ?>
	<main role="main" class="col-lg-12">
		<h2>Users</h2>
		<hr/>
		<h4 class="filter">Assign Roles and Permissions:</h4>
		<div class="inline row">
			<div class="col-6">
				<div class="row">
					<select class="form-control col-8 form-control-sm" id="assign-role" >
						<!--option value="0">Project Manager</option>
						<option value="1">Admin</option>
						<option value="2">Super Admin</option>
						<option value="3">User</option-->
					</select>
					<button class="btn btn-secondary btn-sm col-4" id="assignRoleBtn">Assign Role</button>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<select class="form-control col-8 form-control-sm" id="assign-perm" >
						<!--option value="0">Create Project</option>
						<option value="1">Add Project</option>
						<option value="2">Send Message</option>
						<option value="3">Edit own message</option-->
					</select>
					<button class="btn btn-secondary btn-sm col-4"  id="assignPermBtn">Assign Permission</button>
				</div>
			</div>
			<div class="col-12" style="margin-top: 10px;"></div>
			<div class="col-6">
				<div class="row">
					<select class="form-control col-8 form-control-sm" id="remove-role" >
						<!--option value="0">Project Manager</option>
						<option value="1">Admin</option>
						<option value="2">Super Admin</option>
						<option value="3">User</option-->
					</select>
					<button class="btn btn-secondary btn-sm col-4"  id="removeRoleBtn">Remove Role</button>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<select class="form-control col-8 form-control-sm" id="remove-perm" >
						<!--option value="0">Create Project</option>
						<option value="1">Add Project</option>
						<option value="2">Send Message</option>
						<option value="3">Edit own message</option-->
					</select>
					<button class="btn btn-secondary btn-sm col-4"  id="removePermBtn">Remove Permission</button>
				</div>
			</div>
			<div class="col-12" style="margin-top: 10px;"></div>
			<div class="col-6">
				<button class="btn btn-secondary btn-sm col-4" id="deleteUserBtn">Delete User(s)</button>
			</div>
		</div>
		<hr/>
		<!--h4 class="filter"><span data-feather="filter"></span> Filter By:</h4>
		<div class="inline row">
			<div class="col-3">
				<label for="inputTitle">Has Role: </label>
				<select class="form-control form-control-sm" id="hasRole" >
				</select>
			</div>
			<div class="col-3">
				<label for="textDescription">Has Permission: </label>
				<select class="form-control form-control-sm" id="hasPerm" >
				</select>
			</div>
			<div class="col-3">
				<label for="textDescription">Does not have Role: </label>
				<select class="form-control form-control-sm" id="noRole" >
				</select>
			</div>
			<div class="col-3">
				<label for="textDescription form-control-sm">Does not have Permission: </label>
				<select class="form-control" id="noPerm" >
				</select>
			</div>
		</div>
		<div class="row active-filters">
			<div class="col-lg-12">
				<span class="badge badge-dark">Admin <span data-feather="x-circle"></span></span> 
				<span class="badge badge-dark">Super Admin <span data-feather="x-circle"></span></span> 
				<span class="badge badge-dark">Edit Project <span data-feather="x-circle"></span></span>
			</div>
		</div>
		
		<hr/-->
		<table class="table table-striped table-sm" id="userTable">
			<thead>
				<tr>
					<th><input type="checkbox" name="selectAll" id="selectAll" /></th>
					<th>User Address</th>
					<th>Roles and Permissions</th>
				</tr>
			</thead>
			<tbody>
				<!--tr>
					<th><input type="checkbox" /></th>
					<td>TBJHZu4Sm86aWHtt6VF6KQSzot8vKTuTKx</td>
					<td>Admin, Create Project, Edit Project</td>
				</tr>
				<tr>
					<th><input type="checkbox" /></th>
					<td>TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC</td>
					<td>Admin, Super Admin, Project Manager</td>
				</tr>
				<tr>
					<th><input type="checkbox" /></th>
					<td>TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY</td>
					<td>-</td>
				</tr>
				<tr>
					<th><input type="checkbox" /></th>
					<td>TBJHZu4Sm86aWHtt6VF6KQSzot8vKTuTKx</td>
					<td>-</td>
				</tr-->
          </tbody>
        </table>
    </main>
	<script type="text/javascript" src="../js/users.js"></script>
<?php include "../common/footer.php"; ?>
