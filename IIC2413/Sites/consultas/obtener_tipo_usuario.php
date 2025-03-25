<?php
    function returnTipoUsuario($username, $user_password) {
        require("../config/connection.php");

        $query = "SELECT tipo, CAST(contrasena as text) FROM usuarios WHERE username = '$username' LIMIT 1;";
        $result = $db -> prepare($query);
        $result -> execute();
        $data = $result -> fetchAll();
        $output_tipo = $data[0]['tipo'];
        $output_password = $data[0]['contrasena'];        

        if ($output_password == $user_password) {
            return $output_tipo;
        } else {
            return [];
        }
    }
?>