<script setup lang="ts"></script>

<template>
  <main>
    <!-- cosas que podria meter en esta pagina:
    La guia de estilos
    El resto de tecnologías utilizadas pero sin degranarlas, quizas en un carrusel
    La memoria se podría añadir
    Describir un poco mas que es este proyecto y porque lo he hecho
    De las imagenes de las tarjetas recuerda usar imagenes de menor resolucion para movil! -->

    <!-- Hero -->
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-4 text-center text-lg-start my-3">
          <h1 class="fw-bolder">
            Gestiona a tus clientes de la forma más cómoda posible.
          </h1>
          <p>
            ¿Eres dietista y necesitas gestionar varios clientes? Empieza a
            hacerlo de forma gratuita con Dietario.
          </p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
            Empieza ahora!
          </button>
        </div>
        <div class="col-md-12 col-lg-4 text-center my-3">
          <picture class="img-fluid">
            <!-- para el tamaño muy pequeño -->
            <source media="(max-width: 576px)" srcset="@/assets/images/cliente-xsmall.png" />
            <!-- para el tamaño pequeño -->
            <source media="(max-width: 768px)" srcset="@/assets/images/cliente-small.png" />
            <!-- para el tamaño medio -->
            <source media="(max-width: 992px)" srcset="../assets/images/cliente-medium.png" />
            <!-- para el tamaño grande -->
            <source media="(max-width: 1139px)" srcset="@/assets/images/cliente-large.png" />
            <!-- para el tamaño muy grande -->
            <source media="(min-width: 1140px)" srcset="@/assets/images/cliente-xlarge.png" />
            <!-- Por defecto -->
            <img src="@/assets/images/cliente-large.png" alt="Clientes" />
          </picture>
        </div>
      </div>
      <!-- Body -->
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-4 text-center my-3">
          <picture class="img-fluid">
            <!-- para el tamaño muy pequeño -->
            <source media="(max-width: 576px)" srcset="@/assets/images/hero-xsmall.jpg" />
            <!-- para el tamaño pequeño -->
            <source media="(max-width: 768px)" srcset="@/assets/images/hero-small.jpg" />
            <!-- para el tamaño medio -->
            <source media="(max-width: 992px)" srcset="../assets/images/hero-medium.jpg" />
            <!-- para el tamaño grande -->
            <source media="(max-width: 1139px)" srcset="@/assets/images/hero-large.jpg" />
            <!-- para el tamaño muy grande -->
            <source media="(min-width: 1140px)" srcset="@/assets/images/hero-xllarge.jpg" />
            <!-- Por defecto -->
            <img src="@/assets/images/hero-large.jpg" alt="Desayuno saludable" />
          </picture>
        </div>
        <div class="col-md-12 col-lg-4 text-center text-lg-start my-3">
          <h1 class="fw-bolder">
            Elige entre 400 tipos de alimentos diferentes.
          </h1>
          <p>
            Obtén información sobre los macronutrientes, ácidos grasos, vitaminas y minerales de cada ingrediente que
            utilices en tus dietas.
          </p>
        </div>
      </div>
      <!-- Carousel -->
      <div class="row justify-content-center">
        <h1>Aplicación</h1>
        <div class="col-12 text-center my-3">
          <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner shadow ">
              <div class="carousel-item active">
                <picture class="d-block w-100">
                  <!-- para el tamaño muy pequeño -->
                  <source media="(max-width: 576px)" srcset="@/assets/images/gest_cli-xsmall.png" />
                  <!-- para el tamaño pequeño -->
                  <source media="(max-width: 768px)" srcset="@/assets/images/gest_cli-small.png" />
                  <!-- para el tamaño medio -->
                  <source media="(max-width: 992px)" srcset="../assets/images/gest_cli-medium.png" />
                  <!-- para el tamaño grande -->
                  <source media="(max-width: 1139px)" srcset="@/assets/images/gest_cli-large.png" />
                  <!-- para el tamaño muy grande -->
                  <source media="(min-width: 1140px)" srcset="@/assets/images/gest_cli-xlarge.png" />
                  <!-- Por defecto -->
                  <img src="@/assets/images/gest_cli-large.png" alt="Gestión de clientes" />
                </picture>
                <!-- <img src="@/assets/images/Captura.png" class="d-block w-100" alt="Gestión de clientes"> -->
              </div>
              <div class="carousel-item">
                <picture class="d-block w-100">
                  <!-- para el tamaño muy pequeño -->
                  <source media="(max-width: 576px)" srcset="@/assets/images/gest_ing-xsmall.png" />
                  <!-- para el tamaño pequeño -->
                  <source media="(max-width: 768px)" srcset="@/assets/images/gest_ing-small.png" />
                  <!-- para el tamaño medio -->
                  <source media="(max-width: 992px)" srcset="../assets/images/gest_ing-medium.png" />
                  <!-- para el tamaño grande -->
                  <source media="(max-width: 1139px)" srcset="@/assets/images/gest_ing-large.png" />
                  <!-- para el tamaño muy grande -->
                  <source media="(min-width: 1140px)" srcset="@/assets/images/gest_ing-xlarge.png" />
                  <!-- Por defecto -->
                  <img src="@/assets/images/gest_ing-large.png" alt="Gestión de ingredientes" />
                </picture>
                <!-- <img src="@/assets/images/Captura1.png" class="d-block w-100" alt="..."> -->
              </div>
              <div class="carousel-item">
                <picture class="d-block w-100">
                  <!-- para el tamaño muy pequeño -->
                  <source media="(max-width: 576px)" srcset="@/assets/images/gest_dietas-xsmall.png" />
                  <!-- para el tamaño pequeño -->
                  <source media="(max-width: 768px)" srcset="@/assets/images/gest_dietas-small.png" />
                  <!-- para el tamaño medio -->
                  <source media="(max-width: 992px)" srcset="../assets/images/gest_dietas-medium.png" />
                  <!-- para el tamaño grande -->
                  <source media="(max-width: 1139px)" srcset="@/assets/images/gest_dietas-large.png" />
                  <!-- para el tamaño muy grande -->
                  <source media="(min-width: 1140px)" srcset="@/assets/images/gest_dietas-xlarge.png" />
                  <!-- Por defecto -->
                  <img src="@/assets/images/gest_dietas-large.png" alt="Gestión de dietas" />
                </picture>
                <!-- <img src="@/assets/images/Captura3.png" class="d-block w-100" alt="..."> -->
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span> -->
              <span class="carousel-control-icon material-symbols-outlined" aria-hidden="true"> chevron_left </span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> -->
              <span class="carousel-control-icon material-symbols-outlined" aria-hidden="true"> chevron_right </span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Cards -->
      <!-- <div class="row justify-content-center">
        <h2>Tecnologías utilizadas</h2>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img src="@/assets/images/Vue-1336415565.png" class="card-img-top" alt="Logo VueJs" />
            <div class="card-body">
              <h5 class="card-title">VueJS</h5>
              <p class="card-text">
                Para este proyecto hemos utilizado VueJS como Framework
                principal para crear el FrontEnd.
              </p>
              <a href="https://vuejs.org/" target="_blank" class="btn btn-primary">Ir</a>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img src="@/assets/images/bootstrap-logo-shadow.png" class="card-img-top" alt="Logo Bootstrap" />
            <div class="card-body">
              <h5 class="card-title">Bootstrap</h5>
              <p class="card-text">
                Hemos utilizado Bootstrap como base para crear la estética del
                proyecto. Hemos modificado y creado algunas de las clases
                existentes para adaptarlas a nuestro objetivo.
              </p>
              <a href="https://getbootstrap.com/" target="_blank" class="btn btn-primary">Ir</a>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img src="@/assets/images/nodejs-icon-logo-png-transparent.png" class="card-img-top" alt="Logo NodeJs" />
            <div class="card-body">
              <h5 class="card-title">NodeJs</h5>
              <p class="card-text">
                Hemos creado una API REST para el BackEnd utilizando el
                framework NodeJs. Dentro de el framework de NodeJS hemos
                utilizado la librería Express.
              </p>
              <a href="https://nodejs.org/en" target="_blank" class="btn btn-primary">Ir</a>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </main>

  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg class="bi" width="30" height="24">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>
      <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Alberto Velázquez Rapado</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="me-3">
        <a class="text-body-secondary" href="https://github.com/AlVelRap/"><img src="@/assets/images/github-mark.svg" width="24" height="24"
            alt="Logo Github" /></a>
      </li>
    </ul>
  </footer>
</template>
