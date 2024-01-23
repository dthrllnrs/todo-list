<template>
    <v-app>
        <v-layout>
            <v-main class="d-flex justify-center align-center flex-wrap flex-column px-5">
              <h3 class="text-h3 text-white font-weight-bold w-100 text-center mb-3">Vue ToDo List</h3>
                <v-card class="main-card px-5">
                  <!-- filters and actions -->
                  <div class="w-100 d-flex justify-end align-center flex-wrap py-3">
                    <v-chip size="small" class="ps-2 pe-0 bg-primary me-2 mb-3 mb-sm-0">
                      Tasks
                      <v-badge color="white" inline :content="tasks.length"></v-badge>
                    </v-chip>
                    <v-chip size="small" class="ps-2 pe-0 bg-primary me-2 mb-3 mb-3 mb-sm-0">
                      Tasks Done
                      <v-badge color="white" inline :content="tasksDone"></v-badge>
                    </v-chip>
                    <v-fade-transition>
                      <v-btn
                        v-show="tasksDone"
                        color="red-darken-1"
                        size="small"
                        prepend-icon="mdi-delete"
                        class="text-capitalize me-2 mb-3 mb-sm-0"
                        @click.stop="handleDeleteCompletedTasks"
                      >
                        Tasks Done
                      </v-btn>
                    </v-fade-transition>
                    <v-btn
                      color="red-darken-1"
                      size="small"
                      prepend-icon="mdi-delete"
                      class="text-capitalize mb-3 mb-sm-0"
                      @click="handleDeleteAllTasks"
                    >
                      Tasks
                    </v-btn>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <!-- main list -->
                  <template v-if="tasks.length">
                    <v-list class="main-list" :active-class="''">
                      <v-slide-y-transition group>
                        <ListItem v-for="task in tasks" :key="task" :task="task"></ListItem>
                      </v-slide-y-transition>
                    </v-list>
                  </template>
                  <!-- empty placeholder -->
                  <div class="placeholder" v-else>
                    <p class="text-disabled">Add your first task.</p>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <!-- task input -->
                  <AddTask></AddTask>
                </v-card>

                <!-- info -->
                <Info></Info>
              </v-main>
        </v-layout>
    </v-app>
</template>
<script setup>
  import { useStore } from 'vuex';

  const store = useStore();

  const tasks = computed(() => store.state.tasks);
  const tasksDone = computed(() => store.state.tasks.filter(task => task.status.done).length);

  const handleDeleteAllTasks = () => {
    store.dispatch('deleteAllTasks');
  }

  const handleDeleteCompletedTasks = () => {
    store.dispatch('deleteCompletedTasks');
  }

  onMounted(() => {
    store.dispatch('initState');
  });
</script>
<style lang="scss">
  @import 'vuetify/styles/settings/_variables';

  main {
    background-image: linear-gradient(
      to bottom,
      #1fa84f 0%,
      #1b8b5f 50%,
      #0f4c2e 100%
    );
    .main-card {
      width: 100%;
      @media #{map-get($display-breakpoints, 'sm-and-up')} {
        width: 500px;
      }
      .main-list {
        height: 300px;
        overflow-y: auto;
      }
      .placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
      }
    }

  }

</style>