<template>
  <div class="add-form">
    <p class="headline mt-5">Add Tutorial</p>
    <v-form
      ref="form"
      @submit.prevent="createTutorial()">
      <v-text-field
        v-model="formData.title"
        label="Title"
        :rules="textBoxRules" />
      <v-text-field
        v-model="formData.description"
        label="Description" />
      <v-btn
        type="submit"
        color="primary">
        Add
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import TutorialsProvider from '../../services/tutorials'

const TutorialsService = new TutorialsProvider()

export default {
  data () {
    return {
      formData: {
        title: '',
        description: ''
      },
      textBoxRules: [
        (v) => !!v || 'Field require!'
      ]
    }
  },
  methods: {
    async createTutorial () {
      try {
        const validate = await this.$refs.form.validate()

        if (validate) {
          await TutorialsService.createTutorial(this.formData)
          alert('Add success!')
          this.$router.push({ name: 'Tutorials' })
        }
      } catch (error) {
        console.error('createTutorial', error)
        alert('Error!')
      }
    }
  }
}
</script>

<style scoped>
.add-form {
  max-width: 300px;
  margin: auto;
}
</style>