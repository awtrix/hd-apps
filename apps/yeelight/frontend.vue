<template>
    <div style="padding: 30px">
        <button @click="toggle" :style="{ backgroundColor: status == 'on' ? 'green' : 'red' }">Toggle Light</button>
        <p>Current Status: {{ status }}</p>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    data () {
        return {
            status: 'n/a',
        }
    },

    mounted () {
        setInterval(() => this.updateStatus(), 500)
    },

    methods: {
        async toggle () {
            await fetch('/api/app/time-app/toggle')
        },

        async updateStatus () {
            const result = await fetch('/api/app/time-app/status')
            this.status = await result.text()
        },
    },
})
</script>
