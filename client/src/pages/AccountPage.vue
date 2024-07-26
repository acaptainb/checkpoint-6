<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';

const account = computed(() => AppState.account)
const eventTicket = computed(() => AppState.ticketEvent)

onMounted(() => {
  getaccountticketevent()
})


async function getaccountticketevent() {
  try {
    await ticketService.getaccountticketevent()
  }
  catch (error) {
    Pop.toast('could not get account event tickets');
    logger.log(error)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded imga" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <section class="container">
    <div class="row">
      <h1>Upcoming events</h1>
      <div v-for="eventTicket in eventTicket" :key="eventTicket.id" class="col-4  ">
        <RouterLink :to="{ name: 'Event Details', params: { eventId: eventTicket.event.id } }">
          <div class="myCard my-2">
            <div class="innerCard">
              <div class="frontSide">
                <p class="title"> {{ eventTicket.event.name }}</p>
                <img :src="eventTicket.event.coverImg" class="img-fluid rounded" alt="">
                <p>{{ eventTicket.event.location }} {{ eventTicket.event.capacity }} People Attending</p>
              </div>
              <div class="backSide">
                <p class="titleback">{{ eventTicket.event.description.slice(0, 200) + '...' }}</p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.imga {
  max-width: 100px;
}

.myCard {
  background-color: transparent;
  width: 220px;
  height: 300px;
  // perspective: 1000px;
}

.title {
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
}

.titleback {
  font-size: 1em;
  font-weight: 400;
  text-align: center;
  margin: 0;
}

.innerCard {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.9s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.myCard:hover .innerCard {
  transform: rotateY(180deg);
}

.frontSide,
.backSide {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  color: white;
  // box-shadow: 0 0 0.3em rgba(255, 255, 255, 0.5);
  font-weight: 700;
}

.frontSide,
.frontSide::before {
  background: linear-gradient(43deg, rgb(13, 22, 66) 0%, rgb(194, 178, 193) 46%, rgb(69, 228, 207) 100%);
}

.backSide,
.backSide::before {
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
}

.backSide {
  transform: rotateY(180deg);
}

.frontSide::before,
.backSide::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: '';
  width: 110%;
  height: 110%;
  position: absolute;
  z-index: -1;
  border-radius: 1em;
  filter: blur(20px);
  animation: animate 5s linear infinite;
}

@keyframes animate {
  0% {
    opacity: 0.3;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
}
</style>
