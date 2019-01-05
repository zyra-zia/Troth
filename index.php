<?php include "common/header.php"; ?>
	
	<main role="main" class="col-lg-12">
      <h2>Dashboard</h2>
	  <p><a href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/users/add.php" class="btn btn-secondary btn-lg">Add User</a></p>
	  <p><a href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/role/add.php" class="btn btn-secondary btn-lg">Create Role</a></p>
		  <p><a href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/permission/add.php" class="btn btn-secondary btn-lg">Create Permission</a></p>
		  
		  <p><a href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/users/index.php" class="btn btn-secondary btn-lg">Assign Roles/Permissions to Users</a></p>
	
<?php include "common/footer.php"; ?>