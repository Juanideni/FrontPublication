<template>
  <div v-if="idPublication == undefined">
    <h4 class="mb-3 form-title">Create Publication</h4>
    <form class="needs-validation" novalidate enctype="multipart/form-data">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="operation" class="form-label">Type of Operation</label>
          <select
            class="form-select"
            id="operation"
            required
            v-model="typeOperationSelected"
          >
            <option value="" disabled selected>Choose...</option>
            <option v-for="operation in typeOperationData" :key="operation.id">
              {{ operation.text }}
            </option>
          </select>
          <div class="invalid-feedback">Please select a valid operation.</div>
        </div>

        <div class="col-md-6">
          <label for="property" class="form-label">Type of property</label>
          <select
            class="form-select"
            id="property"
            required
            v-model="typePropertySelected"
          >
            <option value="" disabled selected>Choose...</option>
            <option v-for="property in typePropertyData" :key="property.id">
              {{ property.text }}
            </option>
          </select>
          <div class="invalid-feedback">Please select a valid property.</div>
        </div>

        <div class="col-6">
          <label for="location" class="form-label">Location </label>
          <input
            type="text"
            class="form-control"
            id="location"
            placeholder="San Francisco, Córdoba, Argentina"
            v-model="location"
            required
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
            v-model="antiquity"
            required
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
            v-model="rooms"
            required
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
            v-model="squareMeter"
            required
          />
          <div class="invalid-feedback">Valid square meter is required.</div>
        </div>

        <div class="col-12">
          <label for="description" class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            placeholder="Information about the property"
            v-model="description"
            required
          />
        </div>
      </div>

      <div class="mb-3 mt-1">
        <label for="formFileMultiple" class="form-label"
          >Add some photos!</label
        >
        <input
          class="form-control"
          type="file"
          id="formFileMultiple"
          ref="fileInput"
          multiple
          @change="handleFileUpload"
          accept="image/jpeg"
        />
      </div>
      <hr class="my-4" />

      <button
        class="w-100 btn btn-primary btn-lg"
        v-on:click="newPublication()"
      >
        Save
      </button>
    </form>
  </div>

  <div v-else>
    <h4 class="mb-3 form-title">Edit Publication</h4>
    <form class="needs-validation" novalidate enctype="multipart/form-data">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="operation" class="form-label">Type of Operation</label>
          <select
            class="form-select"
            id="operation"
            required
            v-model="typeOperationSelected"
          >
            <option
              v-for="operation in typeOperationData"
              :key="operation.id"
              :value="operation.text"
            >
              {{ operation.text }}
            </option>
          </select>
          <div class="invalid-feedback">Please select a valid operation.</div>
        </div>

        <div class="col-md-6">
          <label for="property" class="form-label">Type of property</label>
          <select
            class="form-select"
            id="property"
            required
            v-model="typePropertySelected"
          >
            <option
              v-for="property in typePropertyData"
              :key="property.id"
              :value="property.text"
            >
              {{ property.text }}
            </option>
          </select>
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
            required
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
            required
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
            required
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
            required
          />
          <div class="invalid-feedback">Valid square meter is required.</div>
        </div>

        <div class="col-12">
          <label for="description" class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            placeholder="Information about the property"
            v-model="this.publication.description"
            required
          />
        </div>
      </div>

      <hr class="my-4" />

      <div>
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
                <div class="footer d-flex justify-content-center">
                  <i
                    class="bi bi-trash3-fill btn btn-danger"
                    v-on:click="deleteImage(image.id)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        <div class="mb-3 mt-1">
          <label for="formFileMultiple" class="form-label"
            >Add more photos!</label
          >
          <input
            class="form-control"
            type="file"
            id="formFileMultiple"
            ref="fileInput"
            multiple
            @change="handleFileUpload"
            accept="image/jpeg"
          />
        </div>
      </div>

      <button
        class="w-100 btn btn-primary btn-lg"
        v-on:click="newPublication(true)"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import PublicationService from "@/services/PublicationService";
import ImagePublicationService from "@/services/ImagePublicationService";

export default {
  name: "CreatePublication",
  props: ["id"],
  data() {
    return {
      typeOperationData: [
        { id: 1, text: "Rent" },
        { id: 2, text: "Buy" },
      ],
      typePropertyData: [
        { id: 1, text: "House" },
        { id: 2, text: "Apartment" },
        { id: 3, text: "Farmhouse" },
        { id: 4, text: "Cottage" },
        { id: 5, text: "Chalet" },
        { id: 6, text: "Office" },
      ],
      typeOperationSelected: null,
      typePropertySelected: null,
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
    if (this.id !== undefined) {
      PublicationService.getPublicationById(this.id).then((res) => {
        this.publication = res.data;
        this.typePropertySelected = res.data.typeProperty;
        this.typeOperationSelected = res.data.typeOperation;
      });
    }
  },
  methods: {
    handleFileUpload() {
      this.publication.images = this.$refs.fileInput.files;
    },
     newPublication(isUpdate) {
      if (isUpdate) {
        this.publication.typeOperation = this.typeOperationSelected;
        this.publication.typeProperty = this.typePropertySelected;
        this.publication.rooms = Math.round(this.publication.rooms);
        this.publication.antiquity = Math.round(
          this.publication.antiquity
        ).toString();
        if (this.isValid(this.publication, true)) {
          try {
             PublicationService.putPublication(
              this.id,
              this.publication
            ).then(() => {
              alert("Successfully Edited!");
            });
          } catch (error) {
          } finally {
            this.$router.push("/");
          }
        } else {
          // Si la validación falla, muestra algún mensaje o realiza alguna acción
          alert("Por favor, completa todos los campos correctamente.");
        }
      } else {
        this.publication.typeOperation = this.typeOperationSelected;
        this.publication.typeProperty = this.typePropertySelected;
        this.publication.rooms = Math.round(this.rooms);
        this.publication.description = this.description;
        this.publication.squareMeter = this.squareMeter;
        this.publication.antiquity = Math.round(this.antiquity).toString();
        this.publication.location = this.location;

        if (this.isValid(this.publication, false)) {
          try {
            PublicationService.postPublication(this.publication).then(
              () => {
                alert("Successfully Created!");
              }
            );
          } catch (error) {
          } finally {
            this.$router.push("/");
          }
        } else {
          // Si la validación falla, muestra algún mensaje o realiza alguna acción
          alert("Por favor, completa todos los campos correctamente.");
        }
      }
    },
    isValid(publication, isUpdate) {
      if (isUpdate) {
        var publicationContieneImagenes =
          publication.images.length > 0 ||
          publication.imagesPublication.length > 0;

        if (
          publication.typeOperation !== null &&
          publication.typeProperty !== null &&
          publication.location !== undefined &&
          publication.antiquity !== "NaN" &&
          publication.rooms !== Number.isNaN() &&
          publication.squareMeter !== undefined &&
          publication.description !== undefined &&
          publicationContieneImagenes
        ) {
          return true;
        } else {
          false;
        }
      } else {
        if (
          publication.typeOperationSelected !== null &&
          publication.typePropertySelected !== null &&
          publication.location !== undefined &&
          publication.antiquity !== "NaN" &&
          publication.rooms !== Number.isNaN() &&
          publication.squareMeter !== undefined &&
          publication.description !== undefined &&
          publication.images.length > 0
        ) {
          return true;
        } else {
          false;
        } // Suponiendo que tienes un arreglo images con las imágenes seleccionadas
      }
    },
    reloadDataEdit(id) {
      PublicationService.getPublicationById(this.id).then((res) => {
        this.publication = res.data;
        this.typePropertySelected = res.data.typeProperty;
        this.typeOperationSelected = res.data.typeOperation;
      });
    },
    deleteImage(id) {
      ImagePublicationService.deleteImagePublication(id).then(() => {
        this.reloadDataEdit(this.id);
        alert("Image deleted!");
      });
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
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Para que el contenido se distribuya verticalmente */
  height: 100%; /* Para que el contenido de la tarjeta ocupe toda la altura */
}

.card img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 10px;
  border-radius: 8%;
}
</style>
