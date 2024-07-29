<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { commentservice } from '../services/CommentService.js';
import { logger } from '../utils/Logger.js';

const route = useRoute()

const commentData = ref({
    body: '',
    eventId: route.params.eventId
})

async function writeComment() {
    try {
        await commentservice.writeComment(commentData.value)
        Pop.success('yea you just wrote comment')
        resetValue()
    }
    catch (error) {
        Pop.toast('couldnt write comment');
        logger.log(error)
    }

    function resetValue() {
        commentData.value = {
            body: '',
            eventId: route.params.eventId
        }
    }
}
</script>


<template>
    <form @submit.prevent="writeComment()" class="form-floating">
        <textarea v-model="commentData.body" class="form-control" placeholder="Leave a comment here"
            name="event-comments" id="event-comments" style="height: 100px"></textarea>
        <label for="event-comments">Tell the people...</label>
        <button class="bg-success">Submit</button>

    </form>
</template>


<style lang="scss" scoped></style>