<template>
  <div
    v-if="formData"
    class="edit-form">
    <p class="headline mt-5">Edit Tutorial</p>
    <v-form ref="form">
      <v-text-field
        v-model="formData.title"
        label="Title"
        :rules="textBoxRules" />
      <v-text-field
        v-model="formData.description"
        label="Description" />
      <div class="d-flex flex-row align-center">
        <v-switch
          v-model="formData.published"
          flat
          color="success" />
        {{ formData.published ? 'Published' : 'Pending' }}
      </div>
      <v-btn
        class="mr-1"
        color="primary"
        @click="updateTutorial()">
        Update
      </v-btn>
      <v-btn
        color="error"
        @click="deleteTutorial()">
        Delete
      </v-btn>
    </v-form>
  </div>
  <div v-else>
    <p>Please click on Tutorials...</p>
  </div>
</template>

<script>
import TutorialsProvider from '../../services/tutorials'

const TutorialsService = new TutorialsProvider()

export default {
  data () {
    return {
      formData: null,
      textBoxRules: [
        (v) => !!v || 'Field require!'
      ]
    }
  },
  mounted () {
    this.getTutorial()
  },
  methods: {
    async getTutorial () {
      try {
        if (this.$route.params.id) {
          const { data } = await TutorialsService.findById(this.$route.params.id)
          this.formData = data[0]
        } else {
          throw Error('ID not found!')
        }
      } catch (error) {
        console.error('getTutorial', error)
        alert('Error!')
      }
    },
    async updateTutorial () {
      try {
        const validate = await this.$refs.form.validate()

        if (validate) {
          await TutorialsService.updateTutorial(this.formData)
          this.getTutorial()
          alert('Update success!')
        }
      } catch (error) {
        console.error('updatePublish', error)
        alert('Error!')
      }
    },
    async deleteTutorial () {
      try {
        if (confirm('Are you sure?')) {
          await TutorialsService.deleteTutorial(this.$route.params.id)
          this.$router.push({ name: 'Tutorials' })
          alert('Delete success!')
        }
      } catch (error) {
        console.error('deleteTutorial', error)
        alert('Error!')
      }
    }
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>