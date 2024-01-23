import { createStore } from "vuex";

interface Task {
  id: Number,
  name: String,
  status: {
    done: boolean,
  },
};

const syncStorage = (tasks: Task[]) => {
  console.log('Syncing localstorage...');
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const store = createStore({
  state() {
    return {
      tasks: [] as Task[],
      lastId: 0,
    };
  },
  mutations: {
    initState(state, payload) {
        const { tasks, lastId } = payload;
        state.tasks = tasks;
        state.lastId = lastId;
    },
    modifyStatus(state, index) {
      state.tasks[index].status.done = !state.tasks[index].status.done;
      syncStorage(state.tasks);
    },
    createTask(state, payload) {
        state.lastId = payload.id;
        state.tasks.push(payload);
        syncStorage(state.tasks);
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
      syncStorage(state.tasks);
    },
    deleteAllTasks(state) {
      state.tasks = [];
      state.lastId = 1;
      syncStorage(state.tasks);
    },
    deleteCompletedTasks(state, tasks) {
      state.tasks = tasks;
      syncStorage(state.tasks);
    },
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
    modifyStatus({ commit, state }, taskId) {
      const index = state.tasks.findIndex((task: {id: Number}) => task.id === taskId);
      if (index >= 0) {
        commit('modifyStatus', index);
      }
    },
    createTask({ commit, state}, name) {
      const taskObj = {
        id: state.lastId + 1,
        name,
        status: {
          done: false,
        },
      }

      commit('createTask', taskObj);
    },
    deleteTask({ commit, state }, taskId) {
      const index = state.tasks.findIndex((task: {id: Number}) => task.id === taskId);
      if (index >= 0) {
        commit('deleteTask', index);
      }
    },
    deleteAllTasks({ commit }) {
      commit('deleteAllTasks');
    },
    deleteCompletedTasks({ commit, state }) {
      const remainingTasks = state.tasks.filter(item => !item.status.done);
      commit('deleteCompletedTasks', remainingTasks);
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});