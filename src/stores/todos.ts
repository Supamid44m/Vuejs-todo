import { ref } from "vue";
import { defineStore } from "pinia";
import type { Todo } from "@/models/todos.model";
import axios from "axios";

const BASE_URL = "https://664b134ea300e8795d441d1a.mockapi.io";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todoList: [] as unknown as Todo,
    selectTodo: {} as unknown as Todo,
    selectTodoName: "" as String,
    statuses: ["doing", "done"],
    isDeletePopup: false as Boolean,
  }),
  actions: {
    async getTodo() {
      try {
        const response = await axios.get(`${BASE_URL}/Todos`);
        if (response) {
          this.todoList = response.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    async loadTodo(id: number) {
      try {
        const response = await axios.get(`${BASE_URL}/Todos/${id}`);
        if (response) {
          this.selectTodo = response.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    async createTodo(body: Todo) {
      try {
        const response = await axios.post(`${BASE_URL}/Todos`, body);
      } catch (error) {
        console.log("error", error);
      }
    },
    async updateTodo(id: number, body: Todo) {
      try {
        const response = await axios.put(`${BASE_URL}/Todos/${id}`, body);
      } catch (error) {
        console.log("error", error);
      }
    },
    async deleteTodo(id: number) {
      try {
        const response = await axios.delete(`${BASE_URL}/Todos/${id}`);
      } catch (error) {
        console.log("error", error);
      }
    },
    statusColor(index: string) {
      if (this.todoList[index].status == "doing") {
        return "doing-status";
      } else if (this.todoList[index].status == "done") {
        return "done-status";
      } else {
        return "pending";
      }
    },
  },
});
