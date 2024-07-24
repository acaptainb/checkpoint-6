<script setup>
import { RouterLink } from 'vue-router';
import { Event } from '../models/Event.js';

defineProps({ Towerevent: Event })
</script>


<template>
    <section>
        <div class="row">
            <div class="col-4 ">
                <RouterLink :to="{ name: 'Event Details', params: { eventId: Towerevent.id } }">
                    <div class="myCard my-2">
                        <div class="innerCard">
                            <div class="frontSide">
                                <p class="title"> {{ Towerevent.name }}</p>
                                <img :src="Towerevent.coverImg" class="img-fluid rounded" alt="">
                                <p>{{ Towerevent.location }} {{ Towerevent.capacity }} People Attending</p>
                            </div>
                            <div class="backSide">
                                <p class="titleback">{{ Towerevent.description.slice(0, 200) + '...' }}</p>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
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