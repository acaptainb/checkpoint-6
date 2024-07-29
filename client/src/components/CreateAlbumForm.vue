<script setup>
import { ref } from 'vue';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const EventData = ref({
    name: '',
    coverImg: '',
    description: '',
    location: '',
    capacity: 0,
    type: '',
    startDate: '',
})

async function createEvent() {
    try {
        const newEvent = await eventService.createEvent(EventData.value)
        Pop.success(`Yes Yes Yes you did it man. You created ${EventData.value.name}`)
        resetForm()
        Modal.getOrCreateInstance('#create-event-modal').hide()
        router.push({ name: 'Event Details', params: { eventId: newEvent.id }, })
        // this.$router.push(`${route.params.eventId}`)
    }
    catch (error) {
        Pop.error(error);
    }
}

function resetForm() {
    EventData.value = {
        name: '',
        coverImg: '',
        description: '',
        location: '',
        capacity: 0,
        type: '',
        startDate: ''
    }
}
</script>


<template>
    <form class="container-fluid" @submit.prevent="createEvent()">
        <p class="fs-2">Create an Event</p>
        <section class="row">
            <div class="mb-2 col-6">
                <label for="event-name">Name</label>
                <input v-model="EventData.name" class="form-control" type="text" id="event-name" name="event-name"
                    minlength="3" maxlength="50" required>
            </div>
            <div class="mb-2 col-6">
                <label for="event-cover-img">Cover Image</label>
                <input v-model="EventData.coverImg" class="form-control" type="url" id="event-cover-img"
                    name="event-cover-img" required>
            </div>
            <div class="mb-2 col-6">
                <label for="event-location">location</label>
                <input v-model="EventData.location" class="form-control" type="text" id="event-location"
                    name="event-location" minlength="1" maxlength="500" required>
            </div>
            <div class="mb-2 col-6">
                <label for="event-capacity">Capacity</label>
                <input v-model="EventData.capacity" class="form-control" min="1" max="5000" type="number"
                    id="event-capacity" name="event-capacity" required>
            </div>
            <div class="mb-2 col-6">
                <label for="event-startDate">Date</label>
                <input v-model="EventData.startDate" class="form-control" type="Date" id="event-startDate"
                    name="event-startDate" required>
            </div>
            <div class="mb-2 col-12">
                <label for="event-description">Description</label>
                <textarea v-model="EventData.description" minlength="15" maxlength="1000" class="form-control"
                    name="event-description" id="event-description"></textarea>
            </div>
            <div class="mb-2 col-12">
                <label for="event-type">Type</label>
                <select v-model="EventData.type" required class="form-control" name="event-type" id="event-type">
                    <option value="" disabled>Please Select A Type</option>
                    <option value="concert">Concert</option>
                    <option value="sport">Sport</option>
                    <option value="convention">Convention</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
            <div class="col-12 text-end">
                <button type="button" @click="resetForm()"> clear </button>
                <button class="btn btn-success">Submit</button>
            </div>
        </section>
    </form>
</template>


<style lang="scss" scoped></style>