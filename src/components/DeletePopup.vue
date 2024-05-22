<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useTodoStore } from '@/stores/todos';

const todoStore = useTodoStore()

defineProps({
    id: Number
})

onMounted(() => {
})

const deleteTodo = async (id: Number | any) => {
    await todoStore.deleteTodo(id)
    await todoStore.getTodo()
    todoStore.isDeletePopup = false
}
</script>

<template>
    <div class="delete-background">

        <div class="delete-card">
            Are you sure to delete <b>{{ todoStore.selectTodoName }}</b>
            <div class="card-button">
                <div class="card-button-ok">
                    <button @click="deleteTodo(parseInt(id))">Ok</button>
                </div>

                <div>
                    <button @click="todoStore.isDeletePopup = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.delete-background {
    width: 100vw;
    height: 100vh;
    background-color: rgba(31, 31, 31, 0.5);
    ;
    position: absolute;
    z-index: 2;
}

.delete-card {
    padding: 20px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}

.card-button {
    display: flex;
    justify-content: flex-end;
}
.card-button-ok{
    margin-right: 10px;
}
</style>