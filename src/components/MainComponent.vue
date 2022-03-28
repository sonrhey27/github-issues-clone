<template>
<div class="header">
    <h1>Github Issues Clone</h1>
    <h6 class="text-italic">Using Vue 3</h6>
</div>
<div class="container">
    <TableComponent />
</div>
</template>

<script>
import TableComponent from './TableComponent.vue'
export default {
name: "MainComponent",
components: {
    TableComponent
}
}
</script>

<style>

</style>