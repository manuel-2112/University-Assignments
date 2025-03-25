<?php
	session_start();
?>

<?php include("../templates/header.php") ?>
<section class="vh-100">
    <div class="container-fluid">
        <div class="row">
        <div class="col-sm-6 text-black">
            <br>
            <div class="px-5 ms-xl-4">
            <span class="h1 fw-bold mb-0">Entrega 3</span>
            </div>

            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

            <form role="form" action="login_validation.php" method="post" style="width: 23rem;">

                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Ingrese sus datos:</h3>

                <div class="form-outline mb-4">
                <label class="form-label" for="form2Example18">Usuario</label>
                <input type="text" name="username" id="form2Example18" class="form-control form-control-lg" required autofocus >
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form2Example28">Contraseña</label>
                <input type="password" name="password" id="form2Example28" class="form-control form-control-lg" required >
                </div>

                <div class="pt-1 mb-4">
                    <button type="submit" name="login" class="btn btn-outline-info">Ingresar</button>
                </div>

            </form>
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

<div class="position-absolute bottom-0 end-0">
    <a href="../index.php" class="btn btn-outline-info" type="button" >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0  1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
    </svg>
    Volver
    </a>
</div>

<?php include('../templates/footer.php') ?>