<?php include "../common/header.php"; ?>
	<main role="main" class="col-lg-12">
		<h2>Edit Role</h2>
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
			</select>
			<hr/>
			<table class="table table-striped table-hover" id="permTable">
				
			</table>
		  </div>
		  <input type="hidden" name="roleId" id="roleId" value="<?php echo ((int)$_GET['id']); ?>" />
		  <button type="submit" class="btn btn-primary">Save Changes</button>
		</form>
    </main>
	<script type="text/javascript" src="../js/editRole.js"></script>
<?php include "../common/footer.php"; ?>
