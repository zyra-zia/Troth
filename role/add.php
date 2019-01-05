<?php include "../common/header.php"; ?>
	<div class="alert alert-success" role="alert">
		Role created successfully!
	</div>
	<main role="main" class="col-lg-12">
		<h2>Add New Role</h2>
		<form id="add-role-form">
		  <div class="form-group">
			<label for="inputTitle">Title</label>
			<input type="text" class="form-control" id="inputTitle" placeholder="Enter Title">
			<div class="invalid-feedback" id="title-feedback">
				Please provide a valid title. Use only a-z, A-Z, 0-9, _ , - .
			</div>
		  </div>
		  <div class="form-group">
			<label for="textDescription">Description</label>
			<textarea class="form-control" id="textDescription" placeholder="Enter Description"></textarea>
			<div class="invalid-feedback" id="desc-feedback">
				Please provide a valid description with a max length of 250 characters.
			</div>
		  </div>
		  <div class="form-group">
			<label for="selectPermissions">Add Permissions</label>
			<select class="form-control" id="selectPermissions" >
				<option value="-1">Please select a permission</option>
			  <!--option value="0">Create Project</option>
			  <option value="1">Add Project</option>
			  <option value="2">Send Message</option>
			  <option value="3">Edit own message</option-->
			</select>
			<hr/>
			<table class="table table-striped table-hover" id="permTable">
				<!--tr>
					<td>Create Project</td>
					<td class="remove"><span data-feather="x-circle"></span></td>
				</tr>
				<tr>
					<td>Edit Project</td>
					<td class="remove"><span data-feather="x-circle"></span></td>
				</tr-->
			</table>
		  </div>
		  <button type="submit" class="btn btn-primary">Create Role</button>
		</form>
    </main>
	<script type="text/javascript" src="../js/createRole.js"></script>
<?php include "../common/footer.php"; ?>
