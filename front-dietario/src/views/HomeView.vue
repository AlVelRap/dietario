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
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#login"
          >
            Empieza ahora!
          </button>
        </div>
        <div class="col-md-12 col-lg-4 text-center my-3">
          <picture class="img-fluid">
            <!-- para el tamaño muy pequeño -->
            <source
              media="(max-width: 576px)"
              srcset="@/assets/images/hero-xsmall.jpg"
            />
            <!-- para el tamaño pequeño -->
            <source
              media="(max-width: 768px)"
              srcset="@/assets/images/hero-small.jpg"
            />
            <!-- para el tamaño medio -->
            <source
              media="(max-width: 992px)"
              srcset="../assets/images/hero-medium.jpg"
            />
            <!-- para el tamaño grande -->
            <source
              media="(max-width: 1139px)"
              srcset="@/assets/images/hero-large.jpg"
            />
            <!-- para el tamaño muy grande -->
            <source
              media="(min-width: 1140px)"
              srcset="@/assets/images/hero-xllarge.jpg"
            />
            <!-- Por defecto -->
            <img
              src="@/assets/images/hero-large.jpg"
              alt="Desayuno saludable"
            />
          </picture>
        </div>
      </div>
      <!-- Cards -->
      <div class="row justify-content-center">
        <h2>Tecnologías utilizadas</h2>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/images/Vue-1336415565.png"
              class="card-img-top"
              alt="Logo VueJs"
            />
            <div class="card-body">
              <h5 class="card-title">VueJS</h5>
              <p class="card-text">
                Para este proyecto hemos utilizado VueJS como Framework
                principal para crear el FrontEnd.
              </p>
              <a
                href="https://vuejs.org/"
                target="_blank"
                class="btn btn-primary"
                >Ir</a
              >
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/images/bootstrap-logo-shadow.png"
              class="card-img-top"
              alt="Logo Bootstrap"
            />
            <div class="card-body">
              <h5 class="card-title">Bootstrap</h5>
              <p class="card-text">
                Hemos utilizado Bootstrap como base para crear la estética del
                proyecto. Hemos modificado y creado algunas de las clases
                existentes para adaptarlas a nuestro objetivo.
              </p>
              <a
                href="https://getbootstrap.com/"
                target="_blank"
                class="btn btn-primary"
                >Ir</a
              >
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-7 col-lg-4 my-3">
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/images/nodejs-icon-logo-png-transparent.png"
              class="card-img-top"
              alt="Logo NodeJs"
            />
            <div class="card-body">
              <h5 class="card-title">NodeJs</h5>
              <p class="card-text">
                Hemos creado una API REST para el BackEnd utilizando el
                framework NodeJs. Dentro de el framework de NodeJS hemos
                utilizado la librería Express.
              </p>
              <a
                href="https://nodejs.org/en"
                target="_blank"
                class="btn btn-primary"
                >Ir</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer
    class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
  >
    <div class="col-md-4 d-flex align-items-center">
      <a
        href="/"
        class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
      >
        <svg class="bi" width="30" height="24">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>
      <span class="mb-3 mb-md-0 text-body-secondary"
        >© 2023 Alberto Velázquez Rapado</span
      >
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="me-3">
        <a class="text-body-secondary" href="#"
          ><img
            src="@/assets/images/github-mark.svg"
            width="24"
            height="24"
            alt="Logo Github"
        /></a>
      </li>
    </ul>
  </footer>
</template>
