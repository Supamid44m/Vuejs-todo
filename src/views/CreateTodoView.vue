<script setup lang="ts">

import { useTodoStore } from "@/stores/todos";
import type { Todo } from "../models/todos.model"
import type { Ref, onMounted } from "vue"
import { ref, reactive, watch } from "vue"
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

const todoStore = useTodoStore()
const router = useRouter()

const currentDate = Date.now()
const date = new Date(currentDate)

const todoName: Ref<String> = ref('')
const desciptionText: Ref<String> = ref('')
const dueDate: Ref<string> = ref('')

let isLoading: Ref<Boolean> = ref(false)

const todoData: Todo = reactive({
    name: "",
    description: "",
    status: "",
    isDone: false,
    startDate: date,
    dueDate: date || null
})

const disableButton = computed(() => {
    if (todoData.name.trim() != '') {
        return false
    }
    return true
})

const submitData = async () => {
    isLoading.value = true
    setTimeout(async () => {
        await todoStore.createTodo(todoData)
        isLoading.value = false
        router.push({ name: 'todos' })
    }, 1000)
}

watch([todoName, desciptionText, dueDate], (newData: any) => {
    todoData.name = newData[0]
    todoData.description = newData[1]
    todoData.dueDate = new Date(newData[2])

    if (newData[0].trim() !== "" && newData[1].trim() !== "" && newData[2].trim() !== "") {

    }
})

</script>

<template>
    <div class="back-button">
        <RouterLink to="/todos">Back</RouterLink>
    </div>
    <div class="create-card">
        <div class="card-title">Create Todo</div>
        <div>
            <label>
                Title
            </label>
            <input type="text" v-model="todoName">
        </div>
        <div>
            <label>
                Desciption ({{ desciptionText.length }} / 500)
            </label>
            <textarea type="text" v-model="desciptionText" maxlength="500"></textarea>
        </div>

        <div class="create-todo-dueDate">
            <label>
                Due Date
            </label>
            <input type="date" v-model="dueDate">
        </div>

        <div v-if="isLoading">
            <span>
                Loading...
            </span>
        </div>
        <div class="create-submit-button">
            <button @click="submitData()" :disabled="disableButton">Create</button>
        </div>
    </div>
</template>

<style scoped lang="scss">

.back-button{
    margin: 10px;
    a{
        color: black;
        text-decoration: none;
    }
}
.card-title {
    text-align: center;
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

input[type=text] {
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
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    padding: 12px 20px;
}

.create-submit-button {
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