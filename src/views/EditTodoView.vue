<script setup lang="ts">
import type { Todo } from '@/models/todos.model';
import { useTodoStore } from '@/stores/todos';
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';




const route = useRoute()
const router = useRouter()
const todoId: Ref<number> = ref(0)
const todoStore = useTodoStore()
const todoName: Ref<string> = ref("")
const todoDesciptionLength: Ref<number> = ref(0)


onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    todoId.value = parseInt(route.params.id)
    todoDesciptionLength.value = todoStore.selectTodo.description.length
    todoName.value = todoStore.selectTodo.name
})

watch(() => [todoStore.selectTodo.name, todoStore.selectTodo.description], (newData) => {
    todoName.value = newData[0]
    todoDesciptionLength.value = newData[1].length

}, { deep: true })




const editTodo = async (todoData: Todo) => {
    try {
        const updateTodoData: Todo = {
            name: todoData.name,
            description: todoData.description,
            status: todoData.status,
            isDone: todoData.isDone,
            startDate: todoData.startDate,
            dueDate: todoData.dueDate,
        }
        await todoStore.updateTodo(todoId.value, updateTodoData)
        router.push("/Todos")
    } catch (error) {
        console.log("error", error)
    }
}

const disableButton = computed(() => {
    return todoName.value.trim() !== " " ? false : true
})

</script>

<template>
    <div class="back-button">
        <RouterLink to="/todos">Back</RouterLink>
    </div>
    <div class="create-card">
        <div class="card-title">Update Todo</div>
        <div class>
            <label>
                Title
            </label>
            <input type="text" v-model="todoStore.selectTodo.name">
        </div>

        <div>
            <label>
                Desciption ({{ todoDesciptionLength }} / 500)
                <textarea v-model="todoStore.selectTodo.description"></textarea>
            </label>
        </div>
        <div>
            <label>
                Status
            </label>
            <select v-model="todoStore.selectTodo.status">
                <option :value="status" v-for="status in todoStore.statuses"> {{ status }}</option>
            </select>
        </div>
        <div>
            <label>
                Due Date
            </label>
            <input type="date" v-model="todoStore.selectTodo.dueDate">
        </div>

        <div class="edit-submit-button">
            <button @click="editTodo(todoStore.selectTodo)" :disabled="disableButton">
                Update
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.back-button {
    margin: 10px;

    a {
        color: black;
        text-decoration: none;
    }
}

.create-card {
    display: flex;
    flex-direction: column;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #80D8FF;
    padding: 20px 20px;
    border-radius: 10px;
}

.card-title {
    text-align: center;
}

input[type=text],
select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #f0f0f0;

    &:focus {
        outline-color: #81D4FA;
    }
}

textarea {
    width: 100%;
    padding-inline: 20px;
    padding-block: 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: none;
    background-color: #f0f0f0;

    &:focus {
        outline-color: #81D4FA;
    }
}

input[type=date] {
    padding: 12px 20px;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    background-color: #f0f0f0;

}

.edit-submit-button {
    padding: 10px 10px;
    margin-top: 20px;
    align-self: center;

    button {
        background-color: #0091EA;
        border-radius: 10px;
        padding: 5px;

        &:hover {
            background-color: #4FC3F7;
        }

        &:disabled {
            background-color: #40C4FF;
        }
    }
}
</style>