<?php include "../common/header.php"; ?>
	<div class="alert alert-success" role="alert">
		Permission created successfully!
	</div>
	<main role="main" class="col-lg-12">
		<h2>Add New Permission</h2>
		<form id="add-perm-form">
		  <div class="form-group">
			<label for="inputTitle">Title</label>
			<input type="text" class="form-control" id="inputTitle" placeholder="Enter Title">
			<div class="invalid-feedback" id="title-feedback">
				Please provide a valid title. Use only a-z, A-Z, 0-9, _ , - .
			</div>
		  </div>
		  <div class="form-group">
			<label for="textDescription">Description</label>
			<textarea class="form-control" id="textDescription" placeholder="Enter Description" maxlength="250" ></textarea>
			<div class="invalid-feedback" id="desc-feedback">
				Please provide a valid description with a max length of 250 characters.
			</div>
		  </div>
		  
		  <button type="submit" class="btn btn-primary">Create Permission</button>
		</form>
    </main>
	<script type="text/javascript" src="../js/createPermission.js"></script>
<?php include "../common/footer.php"; ?>
