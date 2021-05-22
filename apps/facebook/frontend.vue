<template>
    <div>
        <!-- Display comments from plugin configuration page. -->
        <facebook-comments
            :settings="{
                href:
                    'https://developers.facebook.com/docs/plugins/comments#configurator',
                num_posts: 4,
                order_by: 'time',
                width: 600,
                // other settings...
            }"
        />

        <!-- Display login button. -->
        <facebook-login-button
            :settings="{
                scope: ['email', 'user_likes'],
                button_type: 'continue_with',
                use_continue_as: true,
                size: 'large',
                width: 600,
                // other settings...
            }"
            @auth:statusChange="onAuthStatusChange"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@awtrix/common";

export default defineComponent({
    data() {
        return {};
    },

    mounted() {
        this.lock();
    },

    methods: {
        async onAuthStatusChange(response) {
            // Print details.
            if (response.authResponse) {
                const sdk = await this.$facebookSdk();
                const me = await sdk.api("/me");
                console.log(`Good to see you, ${me.name}.`);
            } else {
                console.log("User cancelled login or did not fully authorize.");
            }
        },
    },
});
</script>

<style>
</style>