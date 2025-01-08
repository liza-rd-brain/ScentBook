<template>
    <v-app-bar class="custom-app-bar" :elevation="3">
        <template v-slot:prepend>
            <NuxtLink to="/">
                <v-img src="/perfume.png" width="40px" />
            </NuxtLink>
        </template>
        <v-app-bar-title>ScentBook</v-app-bar-title>
    </v-app-bar>
</template>

<style scoped>
.custom-app-bar {
    padding: 0 40px;
}

.custom-app-bar .v-toolbar__content {
    padding: 0 16px;
    /* Add padding to the toolbar content */
}

.custom-app-bar .v-img {
    border: 2px solid white;
    /* Add a border to the image */
    border-radius: 50%;
    /* Make the image circular */
}
</style>

<script>
export default {
    name: 'AppHeader',
};
</script>