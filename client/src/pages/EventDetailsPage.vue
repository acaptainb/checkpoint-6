<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import CreateComment from '../components/CreateComment.vue';
import { commentservice } from '../services/CommentService.js';
import { ticketService } from '../services/TicketService.js';

const route = useRoute()
const activeEvent = computed(() => AppState.activeEvents)
const eventComments = computed(() => AppState.comments)
const ticketProfiles = computed(() => AppState.ticketProfile)

onMounted(() => {
    geteventById()
    getCommentsbyEvent()
    getEventTicketsforEvent()
})

async function getCommentsbyEvent() {
    try {
        await commentservice.getEventcomments(route.params.eventId)
    }
    catch (error) {
        Pop.toast('couldnt get event comments');
    }
}

async function getEventTicketsforEvent() {
    try {
        await ticketService.getEventTicketsforEvent(route.params.eventId)
    }
    catch (error) {
        Pop.toast('could not get event tickets for event');
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
                </div>
                <section class="row">
                    <div class="col-12 ">
                        <div v-for="comment in eventComments" :key="comment.id" class="border">
                            <div class="row">
                                <div class="col-2 ">
                                    <img class="rounded-pill" :src="comment.creator.picture" alt="">
                                    <p class="fs-6"> <small>{{ comment.creator.name }}</small></p>
                                </div>
                                <div class="col-10 text-start">
                                    <p>{{ comment.body }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-4 text center">
                <div class="row justify-content-center my-3">
                    <div class="col-8">
                        <div class="text-center border rounded pt-3">
                            <h2>Interested in going?</h2>
                            <p>Grab a ticket</p>
                            <button class="btn bg-success">Attend</button>
                            <p class="text-end">{{ activeEvent.capacity }} tickets left
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row mt-5">
                    <h1>Attendees</h1>
                    <hr>
                    <div class="col-10 border rounded" v-for="profiles in ticketProfiles" :key="profiles.id">
                        <img class="rounded-pill img-fluid img-fixing" :src="profiles.profile.picture" alt="">
                        <span>{{ profiles.profile.name }}</span>
                    </div>
                </div>

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

.img-fixing {
    height: 8dvh;
}
</style>