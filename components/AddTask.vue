<template>
    <div class="w-100">
        <v-text-field v-model="taskName" rounded variant="solo" placeholder="New Task" autofocus required>
            <template v-slot:append-inner>
                <v-btn @click="handleAddTask" color="primary" icon="mdi-plus"></v-btn>
            </template>
        </v-text-field>
    </div>
</template>
<script setup>
    import { useStore } from 'vuex';

    const store = useStore();
    let taskName = ref('');

    const handleAddTask = () => {
        if (taskName.value) {
            store.dispatch('createTask', taskName.value);
            taskName.value = '';
        }
    }
</script>