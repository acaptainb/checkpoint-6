<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import EventArticle from '../components/EventArticle.vue';
import { logger } from '../utils/Logger.js';
import ModalWrapper from '../components/ModalWrapper.vue';
import CreateAlbumForm from '../components/CreateAlbumForm.vue';

const typeFilter = ref('all')

const types = ['all', 'digital', 'sport', 'concert', 'convention']
const events = computed(() => {
  if (typeFilter.value == 'all') {
    return AppState.events
  }
  return AppState.events.filter(event => event.type == typeFilter.value)
})



onMounted(() => {
  getAllEvents()
})
async function getAllEvents() {
  try {
    await eventService.getAllEvents()
  }
  catch (error) {
    Pop.toast('could not get the events', 'error', 'center');
    logger.error(error)
  }
}
</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 img-nav text-light">
        <h1>Find Events based on your interest</h1>
        <p>Based on the research, the Attendee Intent and Behaviour Report details four primary reasons why people
          attend events - Experience, Learning, Networking and Commerce. For each reason, the report offers deeper
          insights into what planners can do to stay relevant and appealing</p>
        <hr />
      </div>
    </section>
    <section class="row justify-content-around my-3">
      <div class="col-4 p-3 border bg-light text-dark"><i class=" fs-4 mdi mdi-magnify p-2"></i> Discover events in your
        community
        <br>
        <small> Browse through community hosted events for all the things you love </small>
      </div>
      <div data-bs-target="#create-event-modal" data-bs-toggle="modal" role="button"
        class="col-4 btn btn-success p-4 rounded text-center text-light fw-bold">
        Create +
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <h2>Explore top types</h2>
        <div class="d-flex flex-wrap gap-1">
          <div class="" v-for="type in types" :key="type">
            <button @click="typeFilter = type"
              class=" w-100 btn btn-success p-4 rounded text-center text-light fw-bold">
              {{ type }}
            </button>
          </div>
        </div>
        <hr>
        <div>
          <ModalWrapper id="create-event-modal">
            <CreateAlbumForm />
          </ModalWrapper>

        </div>
      </div>
    </section>
    <section class="row justify-content-center">
      <div class="col-12">
        <h2>Upcoming events</h2>
        <div class="row justify-content-between">
          <article class="col-12 col-md-4" v-for="Towerevent in events" :key="Towerevent.id">
            <EventArticle :Towerevent="Towerevent" />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.img-nav {
  background-image: url(https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 50dvh;
  background-position: center;

}
</style>
