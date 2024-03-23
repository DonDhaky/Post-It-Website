<script setup>
import { ref } from 'vue';

const apiUrl = "http://mattmcm.fr:7754/notes";
const newNote = ref({
  title: "Type your title here",
  content: ["Type your content here"]
});

const fetchNotes = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data && data.notes && Array.isArray(data.notes)) {
      notes.value = data.notes;
    } else {
      console.error('Bad data format received from API');
    }
  } catch (error) {
    console.error('A problem has been encountered while trying to fetch the notes:', error);
  }
};

const createNote = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote.value),
    });
    if (!response.ok) {
      throw new Error('Failed to create new post-it');
    }
    console.log('New post-it created.');
    await fetchNotes();
    alert("Your note has been created mon gourmand !");
  } catch (error) {
    console.error(error);
  }
};

</script>


<template>
   <div @click="createNote">Create a post-it</div>
</template>


<style>

</style>