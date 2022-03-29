<template>
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