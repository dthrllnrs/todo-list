<template>
    <div class="info">
        <v-fade-transition>
            <v-btn 
                class="show-btn"
                color="indigo-darken-3"
                size="small"
                :class="{'shown': !showInfo}"
                @click="showInfo = true"
            >
                Show info
            </v-btn>
        </v-fade-transition>
        <v-slide-x-reverse-transition>
            <v-chip
                class="bg-indigo-darken-3 pe-0"
                :class="{'shown': showInfo}"
            >
                This application uses the browser's Local Storage to store data
                <v-btn 
                    density="comfortable"
                    variant="text"
                    icon="mdi-close-circle"
                    @click="showInfo = false"
                ></v-btn>
            </v-chip>
        </v-slide-x-reverse-transition>
    </div>
</template>
<script setup>
    let showInfo = ref(true);
</script>
<style lang="scss" scoped>
    .info {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 20px;
        width: 100%;
        .show-btn {
            position: absolute;
            right: 20px;
            bottom: 20px;
            visibility: hidden;
            opacity: 0;
        }
        .v-chip {
            position: absolute;
            right: 20px;
            bottom: 20px;
            visibility: hidden;
            opacity: 0;
        }

        .v-chip, .show-btn {
            &.shown {
                visibility: visible;
                opacity: 1;
            }
        }
    }
</style>