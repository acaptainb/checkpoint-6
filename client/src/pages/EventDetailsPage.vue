<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import CreateComment from '../components/CreateComment.vue';
import { commentservice } from '../services/CommentService.js';

const route = useRoute()
const activeEvent = computed(() => AppState.activeEvents)
const eventComments = computed(() => AppState.comments)

onMounted(() => {
    geteventById()
    getCommentsbyEvent()
})

async function getCommentsbyEvent() {
    try {
        await commentservice.getEventcomments(route.params.eventId)
    }
    catch (error) {
        Pop.toast('couldnt get event comments');
    }
}

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
    <div class="container-container" v-if="activeEvent != null">
        <section class="row justify-content-center">
            <div class="col-11 img-fluid text-center border-outline rounded">
                <img class="img-fix" :src="activeEvent.coverImg" :alt="activeEvent.name">
            </div>
        </section>
        <section class="row justify-content-center">
            <div class="col-7">
                <h1>{{ activeEvent.name }} <span
                        class="border rounded bg-primary fs-6 fst-italic text-decoration-underline"> {{ activeEvent.type
                        }}</span></h1>
                <p class="fs-3">{{ activeEvent.description }}</p>
                <h1>Date and Time</h1>
                <p class="fs-4"> <i class=" text-primary mdi mdi-calendar"></i> Starts {{ activeEvent.createdAt }}</p>
                <h2>Location</h2>
                <p class="fs-4"> <i class=" text-primary mdi mdi-map-marker"></i>{{ activeEvent.location }}</p>
                <hr>
                <br>
                <div>
                    <h2>See what folks are saying about this {{ activeEvent.name }}</h2>
                    <CreateComment />
                    <p>{{ eventComments }}</p>
                </div>
            </div>
            <div class="col-4">

            </div>
        </section>

    </div>
</template>


<style lang="scss" scoped>
.img-fix {
    background-position: center;
    object-fit: 1/1;
    background-size: cover;
    height: 58vh;
    width: 100%;
}
</style>