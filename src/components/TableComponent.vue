<template>
    <div class="mb-5"></div>
    <div class="filter-wrapper col-4 mb-3">
        <select class="form-select">
            <option selected>Filter Status</option>
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
                <td>{{ issue.id }}</td>
                <td>
                    {{ issue.title }}
                </td>
                <td>{{ issue.user.login }}</td>
                <td>{{ new Date(issue.created_at).toLocaleString() }}</td>
                <td>{{ issue.state }}</td>
            </tr>
            <tr v-if="issues.length == 0" class="text-center">
                <td colspan="5">Data is loading, please wait ...</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'
import axios from 'axios'
export default {
    name: 'TableComponents',
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