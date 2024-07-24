<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';

const route = useRoute()
const activeEvent = computed(() => AppState.activeEvents)

onMounted(() => {
    geteventById()
})

async function geteventById() {
    try {
        await eventService.getEventById(route.params.eventId)
        console.log('is it id ', route.params.eventId);
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <div v-if="activeEvent != null">

        {{ activeEvent.capacity }}
        <img :src="activeEvent.coverImg" alt="">
    </div>
</template>


<style lang="scss" scoped></style>