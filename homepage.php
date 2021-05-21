
<?php

	include "auth.php";
	//verifico se è aperta già una sessione
	if(checkAuth()){
		header("Location: home_utente.php"); //linkare homepage dell'utente
		exit;
	}
	$_ERROR = array();
	//verifica dati post login
	if(!empty($_POST["login_username"]) && !empty($_POST["login_password"])){
		$conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));
		
		$username = mysqli_real_escape_string($conn, $_POST["login_username"]);
		$password = mysqli_real_escape_string($conn, $_POST["login_password"]);
		$query = "SELECT id, username, password FROM utente WHERE username = '".$_POST["login_username"]."'";
		
		$res = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
		if(mysqli_num_rows($res) > 0){
			
			$entry = mysqli_fetch_assoc($res);
			
			if(password_verify($_POST["login_password"], $entry["password"])){
				
				$_SESSION["login_username"] = $entry["username"];
				$_SESSION["username_id"] = $entry["id"];
				header("Location: home_utente.php");
				mysqli_free_result($res);
				mysqli_close($conn);
				exit;

			} else {
				$_ERROR[] = "Password Sbagliata";
			}
		} else {
			$_ERROR[] = "Username non valido.";
		}
	} else {
		//$_ERROR[] = "inserisci username e password";
		
	}


	//Controllo la presenza dei campi e inserisco nel DB, fase di registrazione

	if(isset($_POST["name"]) && isset($_POST["surname"]) && isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["password_confirm"]) && isset($_POST["allow"])){

		$conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));

		$username = mysqli_real_escape_string($conn, $_POST["username"]);
		$query = "SELECT username FROM utente WHERE username = '$username'";
		$res = mysqli_query($conn, $query);
		if(mysqli_num_rows($res) > 0){
			$_ERROR = "username già utilizzato";
		}
		
		if(strlen($_POST["password"]) < 8){
			$_ERROR = "password troppo corta";
		}

		if(strcmp($_POST["password"], $_POST["password_confirm"]) != 0){
			$_ERROR = "le password non coincidono";
		}

		$email = mysqli_real_escape_string($conn, $_POST["email"]);
		$query = "SELECT email FROM utente WHERE email = '$email'";
		$res = mysqli_query($conn, $query);
		if(mysqli_num_rows($res) > 0){
			$_ERROR = "email già utilizzata";
		}

		if(count($_ERROR) == 0){
			$name = mysqli_real_escape_string($conn, $_POST["name"]);
			$surname = mysqli_real_escape_string($conn, $_POST["surname"]);
			$password = mysqli_real_escape_string($conn, $_POST["password"]);
			$password = password_hash($password, PASSWORD_BCRYPT);
			$date = date("Y-m-d");
			$query = "INSERT INTO utente(id, username, data, password, email, name, surname) 
						VALUES ('', '$username', '$date', '$password', '$email', '$name', '$surname')";
			
			
			if(mysqli_query($conn, $query)){
				$_SESSION["login_username"] = $_POST["username"];
				$_SESSION["username_id"] = mysqli_insert_id($conn);
				mysqli_close($conn);
				header("Location: home_utente.php");
			}else {
				$_ERROR = "Errore di connessione al DB";
			}
		}
	} 
?>


<html>
	<head>
		<link rel="stylesheet" href='homepage.css'>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Acme&family=Dosis:wght@300;500;800&family=Staatliches&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500;800&display=swap" rel="stylesheet">
		<script src="homepage.js" defer></script>
	</head>
		<body>
			<header>
				<div class='row'>
					<nav>
						<a class='button'>Home</a>
						<a class='button' onclick='openLogin()'>Login</a>
						<a class='button'>About</a>
						<div id='menu'>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</nav>
					<div id="flex-right">
						<header id="title">
							<div id="overlay"></div>
							<h1>
							Benvenuto in Management Events!
							</h1>
					
						</header>
						<section>
							<p>
								Management Event è il sito dove puoi trovare e gestire tutti gli eventi dell'Italia. Puoi prenotare, salvare e condividere gli eventi con gli amici.
								Puoi scegliere tra Sport, Musica e Teatro. E se sei registrato avrai tante funzionalità in più.
							</p>
							<div>
							<div class="content">
								<p>
								<img src=".\img1.jpeg">
								</p>
								
									<h2>Sport</h2>
									<span>Tutti gli eventi sportivi dal Calcio al Tennis, e anche quelli più estremi...</span>
									
								
							</div>
							<div class="content">
								<p>
								<img src=".\img3.jpg">
								</p>
								
									<h2>Teatro</h2>
									<span>Scopri tutte le rappresentazioni teatrali...</span>
									
							</div>	
							
							<div class="content">
								<p>
								<img src=".\img2.jpg">
								</p>
									<h2>Musica</h2>
									<span>Trova tutti i concerti più adatti a te...</span>
									
								
							</div>
						</div>
						<div class='row'>
							<div class='content'>
								<img src="login.png">
								<button class='button' onclick='openLogin()'>Accedi</button>
									<em>
										Se sei già registrato clicca "Accedi" per accedere.
									</em>
							</div>
							<article id='login' <?php  if(!$_ERROR){ echo "class='hide'";} else { echo "class='modale'";}?>>
								<div class='popup'>
									<h2>Inserisci le tue credenziali!</h2>
								<form name='login' method='post'>
									<label> Username <input type='text' name='login_username'></input></label>
									<label> Password <input type='password' name='login_password'></input></label>
									<?php  if($_ERROR) { echo "<h4>".$_ERROR[0]."</h4>";} ?>
									<label> &nbsp <input type='submit' value='Accedi' id='accedi'></input></label>
								</div>
								</form>

							</article>
							<div class='content'>
								<img src="register.png">
							
								<button class='button' onclick='openSignIn()'>Registrati</button>
									
									<em>Registrati per usufruire di tutti i servizi!
									</em>
							</div>
							<article id='signin' class='hide'>
								<div class='popup'>
								<h2>Compila tutti i campi per registrarti e usufruire dei vantaggi!</h2>
								<form name='signin' method='post'>
									<label> Nome <input type='text' name='name'></input></label>
									<label> Cognome <input type='text' name='surname'></input></label>
									<label> Email <input type='text' name='email'></input></label>
									<label> Username <input type='text' name='username'></input></label>
									<label> Password <input type='password' name='password'></input></label>
									<label> Conferma Password <input type='password' name='password_confirm'></input></label>
									<label> Acconsento al trattamento dei dati personali <input type='checkbox' name='allow[]' value='ok'></input></label>
									<label> &nbsp <input type='submit' value='Registrati' id='registrati'></input></label>
								</form>
								</div>
							</article>
						</div>
						</section>
					</div>
				</div>
			</header>
			<footer>
				<strong>Emanuele Gurrieri O46001995</strong>
				<strong>Progetto Web Programming A.A. 2020/2021</strong>
			</footer>
		
		</body>
</html>
