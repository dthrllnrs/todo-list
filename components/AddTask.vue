<template>
    <div class="w-100">
        <v-text-field
            v-model="taskName"
            rounded
            variant="solo"
            placeholder="New Task"
            :class="{ 'shake': !isValid }"
            autofocus 
            required
        >
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
    let isValid = ref(true);

    const handleAddTask = () => {
        const trimmedVal = taskName.value.trim();
        if (taskName.value) {
            if (trimmedVal) {
                store.dispatch('createTask', trimmedVal);
            } else {
                handleInputError();
            }
            taskName.value = '';
        } else {
            handleInputError();
        }
    }

    const handleInputError = () => {
        isValid.value = false;

        // Reset the shaking effect after a short delay
        setTimeout(() => {
          isValid.value = true;
        }, 600);
    }
</script>
<style lang="scss" scoped>

    @keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    25%, 75% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(5px);
    }
    }

    .shake {
        animation: shake 0.6s ease-in-out;
    }    
</style>