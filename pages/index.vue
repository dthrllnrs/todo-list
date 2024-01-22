<template>
    <v-app>
        <v-layout>
            <v-main class="d-flex justify-center align-center flex-wrap flex-column px-5">
              <h3 class="text-h3 text-white font-weight-bold w-100 text-center mb-3">Vue ToDo List</h3>
                <v-card class="main-card px-5">
                  <div class="w-100 d-flex justify-end align-center flex-wrap py-3">
                    <!-- <v-chip-group> -->
                      <v-chip size="small" class="ps-2 pe-0 bg-primary me-2 mb-3 mb-sm-0">
                        Tasks
                        <v-badge color="white" inline :content="tasks.length"></v-badge>
                      </v-chip>
                      <v-chip size="small" class="ps-2 pe-0 bg-primary me-2 mb-3 mb-3 mb-sm-0">
                        Tasks Done
                        <v-badge color="white" inline :content="tasksDone"></v-badge>
                      </v-chip>
                    <!-- </v-chip-group> -->
                    <v-btn v-if="tasks.length" color="red-darken-1" size="small" prepend-icon="mdi-delete" class="text-capitalize me-2 mb-3 mb-sm-0">
                      Tasks Done
                    </v-btn>
                    <v-btn color="red-darken-1" size="small" prepend-icon="mdi-delete" class="text-capitalize mb-3 mb-sm-0">
                      Tasks
                    </v-btn>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-list class="main-list">
                    <ListItem v-for="task in tasks" :key="task" :task="task"></ListItem>
                  </v-list>
                </v-card>
              </v-main>
        </v-layout>
    </v-app>
</template>
<script setup>
  import { useStore } from 'vuex';

  const store = useStore();

  const tasks = computed(() => store.state.tasks);
  const tasksDone = computed(() => store.state.tasks.filter(task => task.status.done).length);

  onMounted(() => {
    localStorage.setItem('tasks', JSON.stringify([
  {
    id: 1,
    name: 'Learn Vue',
    status: {
      done: false
    },
  },
  {
    id: 2,
    name: 'Learn Vuex',
    status: {
      done: true
    },    
  }
]));
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
    }

  }

</style>