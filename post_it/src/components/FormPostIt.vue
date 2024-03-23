<script setup>

import { ref } from 'vue'

let id = 0

const postIt = ref('')
const allPostIt = ref([])

function addPostIt() {
  allPostIt.value.push({ id: id++, text: postIt.value })
  postIt.value = ''
}

function removePostIt(postIt) {
  allPostIt.value = allPostIt.value.filter((t) => t !== postIt)
}


</script>

<template>
  <form @submit.prevent="addPostIt">
    <textarea v-model="postIt" required placeholder="Your post-it"  id="post-it-content" name="post-it-content" rows="10" cols="60"></textarea><br>
    <button>Add a post-it via textarea</button>
  </form>
  <ul>
    <li v-for="postIt in allPostIt" :key="postIt.id">
      {{ postIt.text }}
      <button @click="displayPostIt(postIt)">Details</button>
      <button @click="editPostIt(postIt)">Edit</button>
      <button @click="removePostIt(postIt)">Delete</button>
    </li>
    
  </ul>
</template>