<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Troth</title>
	<link rel="stylesheet" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/css/style.css" >
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
	<script type="text/javascript" src="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/js/util.js"></script>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
	
	<!-- Modal -->
	<div class="modal fade" id="mainModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel">Success</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  </div>
		</div>
	  </div>
	</div>
	
    <div id="root">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
		  <a class="navbar-brand" href="#">Troth</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		</nav>
		
		<div class="nav-scroller bg-white shadow-sm secondary-nav">
		  <nav class="nav nav-underline">
			<a class="nav-link" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/users/add.php"><span data-feather="plus-circle"></span> New User</a>
			<a class="nav-link" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/role/add.php"><span data-feather="plus-circle"></span> New Role</a>
			<a class="nav-link" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/permission/add.php"><span data-feather="plus-circle"></span> New Permission</a>
			<a class="nav-link" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/index.php"><span data-feather="users"></span> Users</a>
			<a class="nav-link" href="<?php echo $_SERVER["DOCUMENT_ROOT"]; ?>/role/index.php"><span data-feather="list"></span> Roles and Permissions</a>
		  </nav>
		</div>
	</div>