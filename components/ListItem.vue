<template>
    <v-list-item :value="task" color="primary" class="item mb-3 rounded-lg" rounded="large">
        <template v-slot:prepend>
            <v-btn 
                size="x-small"
                density="comfortable"
                icon="mdi-check"
                :color="task.status.done ? 'grey-lighten-1' : 'green-darken-1'"
                class="text-white"
            >
            </v-btn>
        </template>
        <v-list-item-title 
            v-text="task.name" 
            class="px-5" 
            :class="{'text-disabled': task.status.done, 'text-decoration-line-through': task.status.done}"
        >
        </v-list-item-title>
        <template v-slot:append>
            <v-btn density="comfortable" variant="text" icon="mdi-delete" color="red-darken-1" class="delete-btn"></v-btn>
        </template>
    </v-list-item>
</template>
<script setup>
    const props = defineProps(['task']);
    const { task } = props;

    console.log(task);
</script>

<style lang="scss" scoped>
    .item {
        border: 1px solid #E0E0E0;
        .delete-btn {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.5s linear;
        }

        &:hover {
            .delete-btn {
                visibility: visible;
                opacity: 1;
            }
        }
    }
</style>

