<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTodoStore } from '../stores/todos'
import type { Todo } from '@/models/todos.model';
import DeletePopup from '../components/DeletePopup.vue';

const todoStore = useTodoStore()
const deleteId: Ref<number> = ref(0)

const onclickDelete = async (id: number, todo: Todo) => {
    deleteId.value = id
    todoStore.selectTodoName = todo.name
    todoStore.isDeletePopup = true
}

const editStatus = async (id: number, todoData: Todo) => {

    try {
        const checkIsDone = todoData.status == "done" ? true : false
        const updateTodo: Todo = {
            name: todoData.name,
            description: todoData.description,
            status: todoData.status,
            isDone: checkIsDone,
            startDate: todoData.startDate,
            dueDate: todoData.dueDate
        }
        await todoStore.updateTodo(id, updateTodo)
        await todoStore.getTodo()
    } catch (error) {
        console.log("error", error)
    }
}

onMounted(async () => {
    await todoStore.getTodo()

})
</script>


<template>
    <div v-if="todoStore.isDeletePopup">
        <DeletePopup :id="deleteId"></DeletePopup>
    </div>

    <div class="my-todo">
        My Todo
    </div>

    <div class="create-todo-button">
        <router-link :to="{ name: 'create-todo' }">
            <div>New Todo</div>
        </router-link>
    </div>
    <div v-for="(todo, index) in todoStore.todoList" :key="todo.id">
        <div :class="['todo-card', { 'odd-card': index % 2 === 0, 'even-card': index % 2 !== 0 }]">
            <div class="todo-name">
                <b>
                    {{ todo.name }}
                </b>
            </div>

            <!-- <div class="todo-status">
                <select v-model="todo.status" @change="editStatus(parseInt(todo.id), todo)">
                    <option :value="status" v-for="status in todoStore.statuses"> {{ status }}</option>
                </select>
            </div> -->

            <span :class="todoStore.statusColor(index.toString())"></span>
            <div class="todo-edit-delete">
                <div class="card-edit-button">
                    <router-link :to="{ name: 'edit-todo', params: { id: todo.id } }">
                        <div>Edit</div>
                    </router-link>
                </div>
                <button @click="onclickDelete(parseInt(todo.id), todo)"> Delete</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.my-todo{
    text-align: center;
    margin: 20px;
    font-weight: bold;
}
a {
    color: black;
    text-decoration: none;
}

.create-todo-button {
    text-align: center;
    width: 100px;
    border-radius: 5px;
    padding: 5px;
    margin-block: 10px;
    background-color: #40C4FF;
    margin-right: 0;
    margin-left: auto;
}

.create-todo-button:hover {
    background-color: #0091EA;
}

.todo-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-block: 10px;
    margin-block: 10px;
}

.todo-name {
    width: 50%;
}

.todo-edit-delete {
    display: flex;
    flex-direction: row;
    margin-inline: 10px;
}

.todo-card {
    padding: 10px;
    margin: 5px 0;
}

.odd-card {
    background-color: #81D4FA;
}

.even-card {
    background-color: #E1F5FE;
}

.doing-status {
    background-color: #FFEA00;
    width: 60px;
    border-radius: 10px;
}

.done-status {
    background-color: #00E676;
    width: 60px;
    border-radius: 10px;
}
.card-edit-button{
    margin-right: 10px;
}
</style>