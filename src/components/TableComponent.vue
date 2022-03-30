<template>
    <div class="mb-5"></div>
    <div class="main">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Filters</span>
            <input type="text" class="form-control filter" :placeholder="'is:issue is:'+state" aria-describedby="basic-addon1" @keydown.enter="changeState" @focus="showDefaultText">
        </div>
    </div>
    <div class="mb-3"></div>
    <div class="box">
        <div class="box-header" v-if="issues.length">
            <div class="box-header-title d-flex">
                <div class="issue-open" :class="[state === 'open' ? '' : 'text-muted']">
                    <i class="fa-regular fa-circle-dot"></i> 327 Open
                </div>
                <div class="issue-close" :class="[state === 'closed' ? '' : 'text-muted']">
                    <i class="fa-solid fa-check"></i> 9,371 Closed
                </div>
                <div class="issue-open" :class="[state === 'all' ? '' : 'text-muted']">
                    <i class="fa-solid fa-list"></i> All
                </div>
            </div>
            <div class="box-body-wrapper" v-for="issue in issues" :key="issue.id">
                <div class="box-body-content">
                    <h5>
                        <i v-if="issue.state == 'open'" class="fa-regular fa-circle-dot open"></i> 
                        <i v-if="issue.state == 'closed'" class="fa-regular fa-circle-check closed"></i> 
                        {{ issue.title }} 
                        <span v-for="label in issue.labels" :key="label.id">
                            <span class="badge badge-primary" :style="{'background-color': '#'+label.color, 'margin-right' : '10px'}">{{ label.name }}</span>
                        </span>
                    </h5>
                    <p class="text-muted">#{{ issue.id }} <span v-if="issue.state == 'open'"> opened </span> <span v-if="issue.state == 'closed'"> closed </span> {{ dateDifference(issue.created_at) }} {{ issue.user.login }}</p>
                </div>
            </div>
        </div>
        <div class="box-header loading" v-if="issues.length == 0">
            <h4>Data is loading, please wait ...</h4>
        </div>
        <div class="mt-3"></div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-link" :disabled="page == 1" @click="pagination('previous')"><span class="fa fa-caret-left"></span> Previous</button>
            <button type="button" class="btn btn-link" @click="pagination('next')">Next <span class="fa fa-caret-right"></span> </button>
        </div>
    </div>
</template>

<script>
import { computed, ref, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import IssuesListComponent from './IssuesListComponent.vue'
import getTimeDateYearDifference from '../composables/getTimeDateYearDifference'
import getPagination from '../composables/pagination'
import getState from '../composables/changeState'
import getRouteState from '../composables/saveRouteState'
import getRouteEntry from '../composables/routeEntry'

export default {
    name: 'TableComponents',
    components: {
        IssuesListComponent
    },
    methods:{
        dateDifference(created_at){
            return getTimeDateYearDifference(created_at)
        },
        changeState(e){
            const stateValue = getState(e.target.value, this.state, this.issues)
            const routestate = getRouteState(this.$router, this.page, stateValue.state)
            this.state = stateValue.state
            this.issues = stateValue.issues
        },
        showDefaultText(e){
            e.target.value = "is:issue is:"+this.state+""
        },
        pagination(page_name){
            const pagination = getPagination(page_name, this.page, this.issues)
            const routestate = getRouteState(this.$router, pagination.page, this.state)
            this.page = pagination.page
            this.issues = pagination.issues
        }
    },
    setup(){
        const route = useRoute()
        const routeEntry = getRouteEntry(route.query)
        const state = ref(routeEntry.state)
        const issues = ref([])
        const page = ref(routeEntry.page)

        watchEffect(() => {
            alert(state.value)
            axios.get('https://api.github.com/repos/vuejs/vue/issues', {
                params: {
                    state: state.value,
                    page: page.value
                }
            })
            .then(response => {
                issues.value = response.data
            })
        })

        return { state, issues, page }
    }
}
</script>

<style>
.box-header {
    border: 1px solid #2c3239;
    border-radius: 5px;
    min-height: 40rem;
}
.box-header-title {
    border-bottom: 1px solid #2c3239;
}
.box-header-title > div {
    margin-left: 0.5rem;
}
.box-header-title {
    padding: 1rem
}
.box-body-content {
    border-bottom: 1px solid #2c3239;
    padding: 0.5rem 1.5rem 0rem 1.5rem;
}
#basic-addon1 {
    background: #21262d;
    color: white;
    border: 1px solid #2c3239;
}
input.form-control.filter {
    background: #010409;
    border:1px solid #2c3239;
    color: white;
}
.loading {
    padding: 7rem;
    text-align: center;
}
.closed {
    color: #a371f7;
}
.open {
    color: #3fb950;
}
</style>