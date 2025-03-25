<?php
                      $name = str_replace('_',' ',$_SESSION['username']);
                      $nombre_evento = $_POST['evento'];
                      #Llama a conexión, crea el objeto PDO y obtiene la variable $db
                      require("config/connection.php");
                      $query = "SELECT L.recinto, E.fecha FROM Eventos as E, Lugar as L WHERE E.lid = L.lid AND LOWER(E.nombre) = '$nombre_evento';";
                      $result = $db -> prepare($query);
                      $result -> execute();
                      $recintos = $result -> fetchAll();
                    ?>

                    <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        Resultados
                    </div>
                    <div class="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                <th>Nombre Evento</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php
                              foreach ($recintos as $recinto) {
                                echo("<tr> <td>$recinto[0]</td><td></td> "); 
                                echo("<td>");

                                ?>
                                <form action="consultas/detalles_evento.php" method="post"> 
                                   <button type = 'sumbit' value="<?php $recinto[0] ?>" name = 'evento'>Ver detalles</button>
                                </form>
                                <?php echo("</td></tr>"); } ?>  