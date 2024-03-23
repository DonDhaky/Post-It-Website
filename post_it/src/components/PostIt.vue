<script setup>

import { ref, watch } from 'vue'

const postItTitle = ref('');
const postItContent = ref('');

function savePostIt() {
  const postItData = {
    title: postItTitle.value,
    content: postItContent.value
  };
  localStorage.setItem('currentPostIt', JSON.stringify(postItData));
}

watch([postItTitle, postItContent], () => {
  savePostIt();
});

const savedPostIt = localStorage.getItem('currentPostIt');
if (savedPostIt) {
  const { title, content } = JSON.parse(savedPostIt);
  postItTitle.value = title;
  postItContent.value = content;
}

</script>

<template>
    <div>
        <form @submit.prevent>
    <input type="text" v-model="postItTitle" placeholder="Your post-it's title"><br>
    <textarea v-model="postItContent" placeholder="Your notes..." rows="5" cols="30"></textarea><br>
    <button @click="savePostIt">Save</button><br><br><br><br>
        </form>
    </div>
</template>