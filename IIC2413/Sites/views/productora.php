<section class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="index.php">Entrega 3</a>
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
                    <li><a class="dropdown-item" href="views/perfil.php">Mi perfil</a></li>
                    <li>
                      <form class="dropdown-item" action="views/logout.php" method="get">
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
                        <a class="nav-link" href="index.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Dashboard
                        </a>
                        <div class="sb-sidenav-menu-heading">Consultas</div>
                        <a class="nav-link" href="views/consulta1_productora.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Mis Eventos
                        </a>
                        <a class="nav-link" href="views/consulta2_productora.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Filtrar Eventos
                        </a>
                        <a class="nav-link" href="views/form_nuevo_evento.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Crear Evento
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
                    <h1 class="mt-4">Dashboard</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Productora</li>
                    </ol>
                    <div class="row">
                      <div class="col-xl-3 col-md-6">
                          <div class="card bg-info text-white mb-4">
                              <div class="card-body">
                                <a href="views/consulta1_productora.php"><div class="d-flex justify-content-between">
                                  <p>Mis eventos</p>
                                  <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                  </div></a>
                              </div>
                              
                              <div class="card-footer d-grid">
                                  <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#detalles1">
                                      Detalles
                                    </button>
                              </div>
                          </div>
                      </div>

                      <div class="col-xl-3 col-md-6">
                          <div class="card bg-info text-white mb-4">
                              <div class="card-body">
                                  <a href="views/consulta2_productora.php"><div class="d-flex justify-content-between">
                                  <p>Filtrar Eventos</p>
                                  <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                  </div></a>
                              </div>
                              
                              <div class="card-footer d-grid">
                                  <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#detalles2">
                                      Detalles
                                    </button>
                              </div>
                          </div>
                      </div>

                      <div class="col-xl-3 col-md-6">
                          <div class="card bg-info text-white mb-4">
                              <div class="card-body">
                                  <a href="views/form_nuevo_evento.php"><div class="d-flex justify-content-between">
                                  <p>Crear Eventos</p>
                                  <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                  </div></a>
                              </div>
                              
                              <div class="card-footer d-grid">
                                  <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#detalles3">
                                      Detalles
                                    </button>
                              </div>
                          </div>
                      </div>
                      
                    
                    </div>

                      <div class="modal fade" id="detalles1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                              <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles: Mis eventos</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                Lista todos los eventos de la productora.
                              </div>
                              </div>
                          </div>
                      </div>

                      <div class="modal fade" id="detalles2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                              <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles: Filtrar Eventos por Fecha</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                  Esta consulta permite filtrar mis eventos por fecha.
                              </div>
                              </div>
                          </div>
                      </div>

                      <div class="modal fade" id="detalles3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                              <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles: Crear Evento</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                  Esta consulta permite crear un nuevo evento.
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
    <script src="js/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
    <script src="js/datatables-simple-demo.js"></script>
</section>