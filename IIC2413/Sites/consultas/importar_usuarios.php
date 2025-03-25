<?php include('../templates/header.php'); ?>  
    <?php
        require("../config/connection.php");
        $query_tabla = "SELECT crear_tabla_usuarios();";
        $result_tabla = $db -> prepare($query_tabla);
        $result_tabla -> execute();
        $data_tabla = $result_tabla -> fetchAll();

        $query_productoras = "SELECT importar_productoras();";
        $result_productoras = $db2 -> prepare($query_productoras);
        $result_productoras -> execute();
        $data_productoras = $result_productoras -> fetchAll();
        
        $query_usuarios = "SELECT * FROM usuarios;";
        $result_usuarios = $db2 -> prepare($query_usuarios);
        $result_usuarios -> execute();
        $data_usuarios = $result_usuarios -> fetchAll();

        foreach ($data_usuarios as $productora){
            $query_copia = "SELECT insertar_productora('$productora[1]'::varchar, '$productora[2]'::varchar, '$productora[3]'::varchar)";
            $result_copia = $db -> prepare($query_copia);
            $result_copia -> execute();
            $data_copia = $result_copia -> fetchAll();
        }

        $query_artistas = "SELECT importar_artistas();";
        $result_artistas = $db -> prepare($query_artistas);
        $result_artistas -> execute();
        $data_artistas = $result_artistas -> fetchAll();
        
        $query1 = "SELECT * FROM usuarios;";
        $result1 = $db -> prepare($query1);
        $result1 -> execute();
        $data1 = $result1 -> fetchAll();
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

<section>
    <div class="position-absolute top-0 end-0">
    <a href="../index.php" class="btn btn-outline-info" type="button" >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0  1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
    </svg>
    Volver
    </a>
    </div>
    <div id="layoutSidenav_content">
        <div class="container-fluid px-4">
            <h1 class="mt-4">Usuarios</h1><br>

            <div class="row">
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        Usuarios
                    </div>
                    <div class="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Contraseña</th>
                                <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                foreach ($data1 as $usuario) {
                                    echo("<tr>");
                                    echo("<td>$usuario[0]</td>");
                                    echo("<td>$usuario[1]</td>");
                                    echo("<td>$usuario[2]</td>");
                                    echo("<td>$usuario[3]</td>");
                                    echo("</tr>");
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/scripts.js"></script>
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
<script src="../js/datatables-simple-demo.js"></script>
</section>

<?php include('../templates/footer.php') ?>
