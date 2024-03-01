<template>
  <div>
    <h4 class="mb-3 form-title">See Publication</h4>
    <form class="needs-validation" novalidate enctype="multipart/form-data">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="operation" class="form-label">Type of Operation</label>
          <input
            class="form-select"
            id="operation"
            v-model="this.publication.typeOperation"
            disabled
          />
        </div>

        <div class="col-md-6">
          <label for="property" class="form-label">Type of property</label>
          <input
            class="form-select"
            id="property"
            v-model="this.publication.typeProperty"
            disabled
          />
          <div class="invalid-feedback">Please select a valid property.</div>
        </div>

        <div class="col-6">
          <label for="location" class="form-label">Location </label>
          <input
            type="text"
            class="form-control"
            id="location"
            placeholder="San Francisco, Córdoba, Argentina"
            v-model="this.publication.location"
            disabled
          />
          <div class="invalid-feedback">Please enter a valid location.</div>
        </div>

        <div class="col-6">
          <label for="antiquity" class="form-label">Antiquity (in years)</label>
          <input
            type="number"
            class="form-control"
            id="antiquity"
            placeholder="7"
            v-model="this.publication.antiquity"
            disabled
          />
          <div class="invalid-feedback">Please enter a valid value.</div>
        </div>

        <div class="col-6">
          <label for="rooms" class="form-label">Rooms</label>
          <input
            type="number"
            class="form-control"
            id="rooms"
            placeholder="5"
            v-model="this.publication.rooms"
            disabled
          />
          <div class="invalid-feedback">Please enter a valid value.</div>
        </div>

        <div class="col-sm-6">
          <label for="squareMeter" class="form-label">Square Meter (m²)</label>
          <input
            type="number"
            class="form-control"
            id="squareMeter"
            placeholder="25"
            value=""
            v-model="this.publication.squareMeter"
            disabled
          />
          <div class="invalid-feedback">Valid square meter is disabled.</div>
        </div>

        <div class="col-12">
          <label for="description" class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            placeholder="Information about the property"
            v-model="this.publication.description"
            disabled
          />
        </div>
      </div>

      <hr class="my-4" />

      <div>
        <div>
          <label for="currentImages" class="form-label">Current Photos</label>
          <div class="container">
            <div
              class="card"
              v-for="image in this.publication.imagesPublication"
              :key="image.id"
            >
              <img :src="apiImagesFolder + image.urlImage" />
            </div>
          </div>
        </div>
        <br />
      </div>

      <button class="w-100 btn btn-primary btn-lg" v-on:click="backToHome()">
        Back to Home
      </button>
    </form>
  </div>
</template>

<script>
import PublicationService from "@/services/PublicationService";

export default {
  name: "ReadPublication",
  props: ["id"],
  data() {
    return {
      idPublication: null,
      apiImagesFolder: "https://localhost:44388/images/publications/",
      publication: {
        typeOperation: "",
        typeProperty: "",
        description: "",
        rooms: 0,
        squareMeter: 0,
        antiquity: "",
        location: "",
        images: [],
      },
    };
  },
  mounted() {
    this.idPublication = this.id;
    PublicationService.getPublicationById(this.id).then((res) => {
      this.publication = res.data;
    });
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    
  },
};
</script>

<style scoped>
form,
.form-title {
  width: 50%;
  position: relative;
  left: 25%;
}
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.card {
    background-color: #181818;
    padding: 20px;
    text-align: center;
}

.card img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto 10px;
    border-radius: 8%;

}
</style>
