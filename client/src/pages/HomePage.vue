<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import EventArticle from '../components/EventArticle.vue';
import { logger } from '../utils/Logger.js';

const Allevents = computed(() => AppState.events)

onMounted(() => {
  getAllEvents()
})
async function getAllEvents() {
  try {
    await eventService.getAllEvents()
  }
  catch (error) {
    Pop.toast('could not get the events', 'error', 'center');
    logger.log(error)
  }
}
</script>

<template>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <h1>Find Events based on your interest</h1>
        <hr />
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <h2>Upcoming events</h2>
        <div class="row">

          <!-- <article v-for="event in Allevents" :key="event.">
            <EventArticle /> -->

          <!-- </article> -->
          {{ Allevents }}
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
