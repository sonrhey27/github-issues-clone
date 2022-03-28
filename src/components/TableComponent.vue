<template>
    <div class="mb-5"></div>
    <div class="filter-wrapper col-4 mb-3">
        <select class="form-select" v-model="state">
            <option selected disabled>Filter Status</option>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Close</option>
        </select>
    </div>
    <div class="mb-5"></div>
    <table class="table table-striped">
        <thead>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date Info</th>
            <th>Status</th>
        </thead>
        <tbody>
            <tr v-for="issue in issues" :key="issue.id">
                <IssuesListComponent :issue="issue" />
            </tr>
            <tr v-if="issues.length == 0" class="text-center">
                <td colspan="5">Data is loading, please wait ...</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import IssuesListComponent from './IssuesListComponent.vue'

export default {
    name: 'TableComponents',
    components: {
        IssuesListComponent
    },
    setup(){
        const state = ref('open')
        const issues = ref([])

        watchEffect(() => {
            axios.get('https://api.github.com/repos/vuejs/vue/issues',{
            params: {
                state: state.value
            }
            })
            .then(response => {
                issues.value = response.data
            })
        })

        return {state, issues}
    }
}
</script>

<style>

</style>