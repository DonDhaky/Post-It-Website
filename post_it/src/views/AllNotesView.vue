<script setup>
import { ref, onMounted } from 'vue';
import CreatePostIt from '../components/CreatePostIt.vue'
// import { useRouter } from 'vue-router';


const apiUrl = "http://mattmcm.fr:7754/notes";
const notes = ref([]);
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

const saveChanges = async (note) => {
  try {
    if (typeof note.content === 'string') {
      note.content = [note.content];
    }
    const response = await fetch(`${apiUrl}/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to save changes');
    }
    console.log('Changes saved successfully.');
    alert('Changes saved successfully.')
  } catch (error) {
    console.error(error);
  }
};

const deleteNote = async (note) => {
  try {
    const response = await fetch(`${apiUrl}/${note._id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
    console.log('Note deleted successfully.');
    await fetchNotes();
    alert("Your note has been deleted, so sad...");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchNotes();
});


</script>

<template>
  <div class="all">
    <br><br>
    <h1 class="titre">GOLD NOTES</h1><br>
    <!-- <p class="instrus">To modify your notes, edit the fields and click "Save changes" !</p>
    <p class="instrus">To enter into a note, click on "Details" !</p>
    <p class="instrus">To delete your notes, click on "Delete" !</p> -->
    <div class="notes-grid">
      <div><CreatePostIt class="button-53" role="button"/></div>
      <div v-for="note in notes" :key="note._id" class="note">
        <div>
          <label for="title">Title :</label>
          <input type="text" v-model="note.title" id="title">
        </div>
        <div>
          <label for="content">Content :</label>
          <textarea cols="21" rows="10" v-model="note.content" id="content" class="content-area"></textarea>
        </div>
        <div class="button-container">
        <button class="save-button" @click="saveChanges(note)">Save Changes</button>
        <button class="detail-button" @click="showNote(note)">Details</button>
        <button class="delete-button" @click="deleteNote(note)">Delete</button>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
.content-area {
  resize: none;
  max-height: 500px;
}
label {
  color: white;
  font-size: larger;
}

.button-53 {
  text-align: center;
  margin-top: 60%;
  background-color: rgb(105, 93, 62);
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}


.button-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.save-button, .detail-button, .delete-button {
  width: 100%;
}
.titre {
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 50px;
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px rgb(155, 134, 82),
    0 0 82px rgb(155, 134, 82);
}
.instrus {
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.notes-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  gap: 20px;
}

.note {
  text-align: center;
  margin-top: 10%;
  background-color: rgb(105, 93, 62);
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #ffffff;
  display: grid;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-radius: 10px;
  padding: 10px;
}

.note h3 {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.note p {
  margin-top: 0;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>