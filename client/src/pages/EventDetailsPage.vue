<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import CreateComment from '../components/CreateComment.vue';
import { commentservice } from '../services/CommentService.js';
import { ticketService } from '../services/TicketService.js';
import { logger } from '../utils/Logger.js';


const route = useRoute()
const account = computed(() => AppState.account)
const activeEvent = computed(() => AppState.activeEvents)
const eventComments = computed(() => AppState.comments)
const ticketProfiles = computed(() => AppState.ticketProfile)
// const hasTicket = computed(() => AppState.ticketProfile.find(tp => tp.accountId == AppState.account.id))
const hasTicket = computed(() => AppState?.account?.id ? AppState.ticketProfile?.find(tp => tp.accountId === AppState.account.id) : false);
// NOTE sometimes appstates is null how do we keep it from accessing .id until the acc is there
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

async function cancelEvent(eventId) {
    try {
        let event = AppState.activeEvents
        await eventService.cancelEvent(event.id)
        AppState.activeEvents.isCanceled = true
        Pop.success('Event Canceled.')
    } catch (error) {
        Pop.error(error)
    }
}

async function deleteTicket(ticketId) {
    try {
        const choise = await Pop.confirm("are you sure!", 'question')
        if (choise == false) {
            Pop.toast("Ok! ", 'info', 'center')
            return
        }
        await ticketService.deleteTicket(ticketId)
        Pop.success("Ticket Deleted!")
    } catch (error) {
        Pop.toast("Can't not delete, you should have a ticket!", 'error')
        logger.error(error)
    }
}

async function getTicket() {
    try {
        const ticketdata = { eventId: route.params.eventId }

        await ticketService.getTickets(ticketdata)
    }
    catch (error) {
        Pop.toast('couldnt join the event');
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

async function removeComment(commentId) {
    try {
        await commentservice.removeComments(commentId)
    }
    catch (error) {
        Pop.toast('couldnt delete comment');
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

        <section class="row justify-content-center" v-if="!activeEvent.isCanceled">
            <div class="col-12  text-center border-outline rounded">
                <img class="img-fix" :src="activeEvent.coverImg" :alt="activeEvent.name">
            </div>
            <div class="col-7">
                <h1>{{ activeEvent.name }} <span
                        class="border rounded bg-primary fs-6 fst-italic text-decoration-underline"> {{ activeEvent.type
                        }}</span></h1>
                <p class="fs-3">{{ activeEvent.description }}</p>
                <h1>Date and Time</h1>
                <p class="fs-4"> <i class=" text-primary mdi mdi-calendar"></i> Starts {{
                    activeEvent.startDate.toLocaleString() }}</p>
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
                            <div class="row ">
                                <div class="col-2 ">
                                    <img class="rounded-pill" :src="comment.creator.picture" alt="">
                                    <p class="fs-6"> <small>{{ comment.creator.name }}</small></p>
                                </div>
                                <div class="col-9 text-start">
                                    <p>{{ comment.body }}</p>
                                </div>
                                <div class="col-1"><button @click="removeComment(comment.id)" class="btn bg-success"><i
                                            class="mdi mdi-trash-can"></i></button></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-4 text center">
                <div v-if="activeEvent" class="row justify-content-center my-3 ">
                    <div class="col-8">
                        <div class="text-center border rounded pt-3">
                            <div class="border bg-success rounded-pill" v-if="hasTicket"> Your have a ticket , man
                            </div>
                            <!-- v-if="activeEvent.creatorId == account.id" -->
                            <div class="text-center">
                                <button @click="cancelEvent(activeEvent.id)" class="btn btn-warning mb-3"
                                    title="Cancel Event">Cancel
                                    Event</button>
                            </div>
                            <div v-if="activeEvent.capacity - activeEvent.ticketCount <= 0">Sold out</div>

                            <h2>Interested in going?</h2>
                            <p>Grab a ticket</p>
                            <button :disabled="activeEvent.capacity - activeEvent.ticketCount <= 0" @click="getTicket()"
                                v-if="activeEvent.capacity >= 1" class="btn bg-success">Attend</button>
                            <p class="text-end">{{ activeEvent.capacity }} tickets left
                            <p>{{ activeEvent.ticketCount }} people are attending</p>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row mt-5">
                    <h1>Attendees</h1>
                    <hr>
                    <div class="col-12 border rounded my-1" v-for="profiles in ticketProfiles" :key="profiles.id">
                        <img class="rounded-pill img-fluid img-fixing" :src="profiles.profile.picture" alt="">
                        <span> {{ profiles.profile.name }}</span>
                        <span class="mx-5 px-5"> <button @click="deleteTicket(profiles.id)"
                                class="mx-5 btn btn-outline-success rounded-pill"><i
                                    class="mdi mdi-trash-can"></i></button></span>
                    </div>
                </div>

            </div>
        </section>

        <section v-else>
            This event was canceled
        </section>
    </div>
</template>


<style lang="scss" scoped>
.img-fix {
    background-position: center;
    // aspect-ratio: 1/1;
    background-size: cover;
    height: 58vh;
    width: 130vh;
}

.img-fixing {
    height: 8dvh;
}
</style>