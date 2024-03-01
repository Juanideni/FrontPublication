<template #addons>

  <div style="position: absolute; left: 85%; top: 10%">
    <button class="btn btn-success">
      <router-link to="/create"> New Publication</router-link>
    </button>
  </div>
  <div class="container">
    <div
      class="card"
      v-for="(publication, index) of allPublications"
      :key="index"
      style="max-width: 22rem"
    >
      <div class="card-header">
        <carousel>
          <slide v-for="image in publication.imagesPublication" :key="image">
            <img :src="apiImagesFolder + image.urlImage "/>
            <Navigation />
          </slide>
        </carousel>
      </div>
      <div class="card-body">
        <div class="card-title d-flex justify-content-between">
          <h6 class="d-flex justify-content-start">
            <i class="bi bi-geo-alt"></i> {{ publication.location }}
          </h6>
          <h6 class="d-flex justify-content-start">
            {{ publication.squareMeter }} mt²
          </h6>
        </div>
        <p class="card-text d-flex justify-content-start">
          {{
            publication.description.length > 40
              ? publication.description.substring(0, 40) + "..."
              : publication.description
          }}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-start">
          {{ publication.typeProperty }}
        </li>
        <li class="list-group-item d-flex justify-content-start">
          Rooms: {{ publication.rooms }}
        </li>
        <li class="list-group-item d-flex justify-content-start">
          Antiquity: {{ publication.antiquity }} years
        </li>
      </ul>
      <div class="card-footer">
        <router-link
          :to="{ path: '/readPublication/' + publication.id }"
          href="#"
          ><i class="bi bi-search btn btn-primary"></i
        ></router-link>
        <router-link :to="{ path: '/edit/' + publication.id }" href="#"
          ><i class="bi bi-pencil-square btn btn-warning"></i
        ></router-link>
        <i
          class="bi bi-trash3-fill btn btn-danger"
          v-on:click="deleteImage(publication.id)"
        ></i>
      </div>
    </div>
  </div>

      
</template>



<script>
import PublicationService from "@/services/PublicationService";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "Publications",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      allPublications: null,
      apiImagesFolder: "https://localhost:44388/images/publications/",
      imgIndex: 0,
      firstImage: [],
    };
  },
  mounted() {
    PublicationService.getPublications()
      .then((res) => {
        this.allPublications = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    reloadData() {
      PublicationService.getPublications().then((res) => {
        this.allPublications = res.data;
      });
    },
    deletePublication(id) {
      PublicationService.deletePublication(id).then(() => {
        alert("Deleted successfully");
        this.$router.push("/");
        this.reloadData();
      });
    },
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 10%;
}

.card {
  background-color: #f0f0f0;
  border: 1px solid #0a0a0a;
  padding: 10px; /* Reducir el padding */
  margin-bottom: 20px; /* Ajustar el margen inferior */
  text-align: center;
}

.card img {
  max-width: 100%;
  max-height: 300px; /* Limitar la altura máxima de la imagen */
  height: auto;
  display: block;
  margin: 0 auto 10px;
}

.card-body {
  max-height: 150px; /* Limitar la altura máxima del cuerpo de la tarjeta */
  overflow: hidden; /* Ocultar el contenido que excede la altura máxima */
}

.card-title,
.card-text {
  overflow: hidden; /* Ocultar el contenido que excede el espacio asignado */
  text-overflow: ellipsis; /* Agregar puntos suspensivos (...) para indicar que hay más texto oculto */
  white-space: nowrap; /* Evitar que el texto se desborde a múltiples líneas */
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
