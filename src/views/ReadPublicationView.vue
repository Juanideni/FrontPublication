<template>
    <ReadPublication :id = "id"/>
</template>

<script>
    import ReadPublication from '@/components/controllers/ReadPublication.vue';

    export default{
    name: "ReadPublicationView",
    components: { ReadPublication },
    props: ['id'],
}
</script>