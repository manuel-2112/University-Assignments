<?php session_start(); ?>
<?php
    include("../templates/header.php");
?>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
    <link href="../css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>

<section class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="../index.php">Entrega 3</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="../views/perfil.php">Mi perfil</a></li>
                    <li>
                      <form class="dropdown-item" action="../views/logout.php" method="get">
                          <input class="btn btn-outline-info" type="submit" value="Cerrar sesion" ></input>
                      </form>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Inicio</div>
                        <a class="nav-link" href="../index.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Dashboard
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Registrado como:</div>
                    <?php echo $_SESSION['username'] ?>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Detalles evento:</h1><br>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Artista</li>
                    </ol>
                    <div class="row">
                        <?php
                        $name = str_replace('_',' ',$_SESSION['username']);
                        $nombre_evento = $_POST['evento'];
                        #Llama a conexión, crea el objeto PDO y obtiene la variable $db
                        require("../config/connection.php");
                        $query = "SELECT L.recinto, E.fecha FROM Eventos as E, Lugar as L WHERE E.lid = L.lid AND E.nombre = '$nombre_evento';";
                        $result = $db -> prepare($query);
                        $result -> execute();
                        $recintos = $result -> fetchAll();
                        ?>

                        <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Recintos del Evento
                        </div>
                        <div class="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                    <tr>
                                    <th>Nombre Recinto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <?php
                                foreach ($recintos as $recinto) {
                                    echo("<tr> <td>$recinto[0]</td></tr>");} ?>  
                                </tbody>
                            </table>
                        </div>
                        </div>

                        <?php
                        $name = str_replace('_',' ',$_SESSION['username']);
                        $nombre_evento = $_POST['evento'];
                        #Llama a conexión, crea el objeto PDO y obtiene la variable $db
                        require("../config/connection.php");
                        $query = "SELECT A.nombre_escenico FROM Artistas as A, Eventos as E WHERE A.aid = E.aid AND E.nombre = '$nombre_evento';";
                        $result = $db -> prepare($query);
                        $result -> execute();
                        $recintos = $result -> fetchAll();
                        ?>

                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Artistas en el Evento
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                        <th>Nombre Artista</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    foreach ($recintos as $recinto) {
                                        echo("<tr> <td>$recinto[0]</td></tr>");} ?>  
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Tour del Evento
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                        <th>Nombre Tour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr> <td>Este Evento no corresponde a ningun Tour</td></tr> 
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <?php
                        $name = str_replace('_',' ',$_SESSION['username']);
                        $nombre_evento = $_POST['evento'];
                        #Llama a conexión, crea el objeto PDO y obtiene la variable $db
                        require("../config/connection.php");
                        $query = "SELECT HO.nombre_hotel, C.ciudad, P.pais, T.tipo_traslado FROM Hoteles as HO, Paises as P, Ciudades as C, Hospedaje as H, Reservas as R, Artistas as A, Eventos as E, Traslados as T WHERE P.paid = C.paid AND C.cid = HO.cid AND HO.hoid = H.hoid AND H.hid = R.hid AND R.aid = A.aid AND A.aid = E.aid AND LOWER(A.nombre_escenico) = '$name' AND E.nombre = '$nombre_evento';";
                        $result = $db -> prepare($query);
                        $result -> execute();
                        $recintos = $result -> fetchAll();
                        ?>

                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Estadía y Traslado
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                        <th>Hotel</th>
                                        <th>Ciudad</th>
                                        <th>País</th>
                                        <th>Tipo Traslado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    foreach ($recintos as $recinto) {
                                        echo("<tr> <td>$recinto[0]</td><td>$recinto[1]</td><td>$recinto[2]</td><td>$recinto[3]</td></tr>");} ?>  
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <?php
                        $name = str_replace('_',' ',$_SESSION['username']);
                        $nombre_evento = $_POST['evento'];
                        #Llama a conexión, crea el objeto PDO y obtiene la variable $db
                        require("../config/connection.php");
                        $query = "SELECT EC.asiento as categoria FROM EntradasCortesia as EC, Eventos as E, Artistas as A WHERE EC.eid = E.eid AND LOWER(A.nombre_escenico) = '$name' AND E.nombre = '$nombre_evento';";
                        $result = $db -> prepare($query);
                        $result -> execute();
                        $recintos = $result -> fetchAll();
                        ?>

                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Entradas de Cortesía
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                        <th>Categoría</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    foreach ($recintos as $recinto) {
                                        echo("<tr> <td>$recinto[0]</td></tr>");} ?>  
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Hecho por Grupos 31/32</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="../js/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
    <script src="../js/datatables-simple-demo.js"></script>
</section>

<?php include('../templates/footer.php') ?>