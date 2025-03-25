<?php session_start(); ?>
<?php
    include("templates/header.php");
?>

<?php if (isset($_SESSION['username'])) {?>
    <section class="vh-100">
    <div class="container-fluid">
        <div class="row">
        <div class="col-sm-6 text-black">
            <br>
            <div class="px-5 ms-xl-4">
            <span class="h1 fw-bold mb-0">Entrega 3</span>
            </div>

            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            
            <div>
              
                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Elija un opción:</h3>
                
                <form action="views/login.php" method="post">
                    <button style="width:500px" type="submit" class="btn btn-outline-info btn-lg btn-block">Iniciar sesión</button>
                </form>
                <br>
                <form action="consultas/importar_usuarios.php" method="post">
                    <button style="width:500px" type="submit" class="btn btn-outline-info btn-lg btn-block">Importar usuarios</button>
                </form>

            </div>

            <div class="position-absolute bottom-0 start-10">
                <p> &#128512; Hecho por Grupos 31-32 2022-02</p>
            </div>
        </div>

        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://i.pinimg.com/originals/a9/10/bb/a910bb5c898d242bea6b167c30ef6e07.jpg"
            alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
        </div>
        </div>
    </div>
</section>
<?php } elseif ($_SESSION['tipo'] == 'Productora') {
    include('views/productora.php');
 } elseif ($_SESSION['tipo'] == 'Artista') {
    include('views/artista.php');
 } ?>


<?php include('templates/footer.php') ?>