<template>
    <div class="mb-5"></div>
    <div class="main">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Filters</span>
            <input type="text" class="form-control filter" placeholder="is:issue is:open" aria-describedby="basic-addon1" v-model="state">
        </div>
    </div>
    <div class="mb-3"></div>
    <div class="box">
        <div class="box-header">
            <div class="box-header-title d-flex">
                <div class="issue-open">
                    327 Open
                </div>
                <div class="issue-close text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg> 9,371 Closed
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
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import axios from 'axios'
import IssuesListComponent from './IssuesListComponent.vue'

export default {
    name: 'TableComponents',
    components: {
        IssuesListComponent
    },
    methods:{
        dateDifference(created_at) {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            const date1 = new Date(created_at)
            const date2 = new Date()
            // get day difference
            const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

            var days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

            if(days <= 31){
                return days + " days ago by";
            }

            //get the month and year created
            var month = date1.toLocaleString('default', { month: 'long' });
            var day = date1.getDate();
            var year = date1.getFullYear();

            if(date1.getFullYear() == date2.getFullYear()){
                return month + " "+ day + " by";
            }else{
                return month + " "+ day + ", " + year + " by";
            }
        },
    },
    setup(){
        const state = ref('open')
        const issues = ref([])

        if(state.value === "open" || state.value === "closed" || state.value === "all"){
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
        }

        return {state, issues}
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
</style>