<?php include "../common/header.php"; ?>
	<main role="main" class="col-lg-12">
		<h2>Add New User</h2>
		<form id="add-user-form">
		  <div class="form-group">
			<label for="inputAddress">Address</label>
			<input type="text" class="form-control" id="inputAddress" placeholder="Enter Public Address of User">
			<div class="invalid-feedback" id="address-feedback">
				Please provide a valid Tron address.
			</div>
		  </div>
		  
		  <button type="submit" class="btn btn-primary">Add User</button>
		</form>
    </main>
	<script type="text/javascript" src="../js/addUser.js"></script>
<?php include "../common/footer.php"; ?>
