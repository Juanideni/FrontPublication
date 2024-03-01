import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateOrEditView from '../views/CreateOrEditView.vue'
import ReadPublicationView from '../views/ReadPublicationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateOrEditView
    },
    {
      path: '/edit/:id', // Define la ruta para la edición con un parámetro de ruta llamado ":id"
      name: 'edit',
      component: CreateOrEditView, // Utiliza el mismo componente para la edición
      props: true // Habilita el paso de props a través de la URL
    },
    {
      path: '/readPublication/:id', // Define la ruta para la edición con un parámetro de ruta llamado ":id"
      name: 'readPublication',
      component: ReadPublicationView, // Utiliza el mismo componente para la edición
      props: true // Habilita el paso de props a través de la URL
    }
  ]
})

export default router
