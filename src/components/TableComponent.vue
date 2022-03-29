<template>
    <div class="mb-5"></div>
    <div class="main">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Filters</span>
            <input type="text" class="form-control filter" placeholder="is:issue is:open" aria-describedby="basic-addon1" @keydown.enter="changeState" @focus="showDefaultText">
        </div>
    </div>
    <div class="mb-3"></div>
    <div class="box">
        <div class="box-header" v-if="issues.length">
            <div class="box-header-title d-flex">
                <div class="d-flex">
                    <div class="issue-open" :class="[state === 'open' ? '' : 'text-muted']">
                        327 Open
                    </div>
                    <div class="issue-close" :class="[state === 'open' ? 'text-muted' : '']">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg> 9,371 Closed
                    </div>
                </div>
                <div class="d-flex">
                    <div class="author">Author</div>
                    <div class="author">Label</div>
                    <div class="author">Projects</div>
                    <div class="author">Milestones</div>
                    <div class="assignee">Assignee</div>
                    <div class="sort">Sort</div>
                </div>
            </div>
            <div class="box-body-wrapper" v-for="issue in issues" :key="issue.id">
                <div class="box-body-content">
                    <h5>{{ issue.title }} 
                        <span v-for="label in issue.labels" :key="label.id">
                            <span class="badge badge-primary" :style="{'background-color': '#'+label.color, 'margin-right' : '10px'}">{{ label.name }}</span>
                        </span>
                    </h5>
                    <p class="text-muted">#{{ issue.id }} opened {{ dateDifference(issue.created_at) }} {{ issue.user.login }}</p>
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
import axios from 'axios'
import IssuesListComponent from './IssuesListComponent.vue'
import getTimeDateYearDifference from '../composables/getTimeDateYearDifference'
import getPagination from '../composables/pagination'
import getState from '../composables/changeState'

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
            var stateValue = getState(e.target.value, this.state, this.issues)
            this.state = stateValue.state
            this.issues = stateValue.issues
        },
        showDefaultText(e){
            e.target.value = "is:issue is:open"
        },
        pagination(page_name){
            var pagination = getPagination(page_name, this.page, this.issues)
            this.page = pagination.page
            this.issues = pagination.issues
        }
    },
    setup(){
        const state = ref('open')
        const issues = ref([])
        const page = ref(1)

        watchEffect(() => {
            axios.get('https://api.github.com/repos/vuejs/vue/issues',{
            params: {
                state: state.value,
                page: page.value
            }
            })
            .then(response => {
                issues.value = response.data
            }).catch((error) => {
            })
        })

        return {state, issues, page}
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
.box-header-title > div{
    margin-left: 1rem;
}
.box-header-title{
    padding: 1rem
}
.box-body-content {
    border-bottom: 1px solid #2c3239;
    padding: 0.5rem 1.5rem 0rem 1.5rem;
}
#basic-addon1{
    background: #21262d;
    color: white;
    border: 1px solid #2c3239;
}
input.form-control.filter{
    background: #010409;
    border:1px solid #2c3239;
    color: white;
}
.loading{
    padding: 7rem;
    text-align: center;
}
</style>