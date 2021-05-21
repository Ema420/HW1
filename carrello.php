<?php
	require_once "auth.php";
	if(!$userid = checkAuth()){
		header("Location: homepage.php");
		exit;
	}
?>


<html>
	<?php
		 // Carico le informazioni dell'utente loggato per visualizzarle nella sidebar (mobile)
		 $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
		 $userid = mysqli_real_escape_string($conn, $userid);
		 $query = "SELECT * FROM utente WHERE id = '$userid'";
		 $res = mysqli_query($conn, $query);
		 $userinfo = mysqli_fetch_assoc($res); 
	?>
	
	<head>
		<link rel="stylesheet" href='carrello.css'>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Acme&family=Lexend:wght@600&family=Dosis:wght@300;800&family=Staatliches&display=swap" rel="stylesheet">
		
		<script src="carrello.js" defer></script>		
	</head>
		<body>
			<header>
				<div id="primary">
					<nav id="links">
						<a href="home_utente.php">Home</a>
						<a href="storico.php">Storico</a>
						<a href="logout.php">LogOut</a>
						<a href='presentazione.php'>About</a>
						<div id='menu'>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</nav>
					<div id="flex-right">
						<header id="title">
							<h1>Eventi aggiunti al Carrello</h1>
					
						</header>
						<section>
							<div class="content">

							</div>
							<div class='checkout'>
								<button>Checkout</button>
							</div>
						</section>
					</div>
				</div>
			</header>
			<footer>
				<strong>Emanuele Gurrieri O46001995</strong>
				<strong>Progetto Web Programming A.A. 2020/2021</strong>
			</footer>
		
</body></html>