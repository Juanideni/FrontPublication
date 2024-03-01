<template>
  <CreatePublication :id="id"/>
</template>

<script>
import CreatePublication from '@/components/controllers/CreatePublication.vue';


export default{
    name: "CreateOrEditView",
    components: { CreatePublication },
    props: ['id'],
}
</script>

