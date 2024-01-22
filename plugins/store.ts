import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tasks: [],
      lastId: 0,
    };
  },
  mutations: {
    initState(state, payload) {
        const { tasks, lastId } = payload;
        state.tasks = tasks;
        state.lastId = lastId;
    },
    createTask(state, payload) {
        const id = state.tasks.length;
    }
  },
  actions: {
    initState({ commit }) {
        const serializedTasks = localStorage.getItem('tasks');
        if (serializedTasks) {
            const tasks = JSON.parse(serializedTasks);
            let lastId = 0;
            if (tasks.length) {
                lastId = Math.max(...tasks.map((task: { id: Number; }) => task.id), 0);
            }

            commit('initState', {
                tasks,
                lastId,
            });
        } 
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});