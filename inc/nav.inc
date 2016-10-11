<nav class="navbar navbar-default">
	<div class="container-fluid">
		<ul class="nav navbar-nav">
			<li <?php if ($thisPage == "Index") echo "class=\"active\"" ?>><a href="index.php">HOME</a></li>
			<li <?php if ($thisPage == "SoftwareEngineering") echo "class=\"active\"" ?>><a href="softwareengineering.php">SOFTWARE ENGINEERING</a></li>
			<li <?php if ($thisPage == "UserInterface") echo "class=\"active\"" ?>><a href="userinterface.php">USER INTERFACE DESIGN</a></li>
			<li <?php if ($thisPage == "GraphicDesign") echo "class=\"active\"" ?>><a href="graphicdesign.php">GRAPHIC DESIGN</a></li>
			<li <?php if ($thisPage == "FineArts") echo "class=\"active\"" ?>><a href="finearts.php">FINE ARTS</a></li>
		</ul>
	</div>
</nav>
<br>