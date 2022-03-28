<template>
    <td>{{ issue.id }}</td>
    <td>
        {{ issue.title }}
        <span v-for="label in issue.labels" :key="label.id">
            <span class="badge badge-primary" :style="{'background-color': '#'+label.color, 'margin-right' : '10px'}">{{ label.name }}</span>
        </span>
    </td>
    <td>{{ issue.user.login }}</td>
    <td>{{ new Date(issue.created_at).toLocaleString() }}</td>
    <td>{{ issue.state }}</td>
</template>

<script>
export default {
name: 'IssuesListComponent',
props: ['issue']
}
</script>

<style>

</style>