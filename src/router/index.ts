import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodosView from "../views/TodosView.vue";
import CreateTodoView from "../views/CreateTodoView.vue";
import EditTodoView from "../views/EditTodoView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/todos",
      name: "todos",
      component: TodosView,
    },
    {
      path: "/create-todo",
      name: "create-todo",
      component: CreateTodoView,
    },
    {
      path: "/todos/:id/edit",
      name: "edit-todo",
      component: EditTodoView,
    },
  ],
});

export default router;
