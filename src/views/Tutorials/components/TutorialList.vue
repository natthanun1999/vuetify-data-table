<template>
  <v-row
    align="center"
    class="list px-3 pt-5 mx-auto"
    justify="space-between">
    <v-col
      cols="12"
      md="10">
      <v-text-field
        v-model="title"
        label="Search by Title" />
    </v-col>
    <v-col
      cols="12"
      md="auto">
      <v-btn small>
        Search
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      sm="12">
      <v-card
        class="mx-auto"
        tile>
        <v-card-title>Tutorials</v-card-title>
        <v-data-table
          :headers="headers"
          :items="tutorials"
          hide-default-footer>
          <template #[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              small
              @click="editTutorial(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteTutorial(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TutorialsProvider from '../../../services/tutorials'

const TutorialsService = new TutorialsProvider()

export default {
  data () {
    return {
      tutorials: [],
      title: '',
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false
        },
        {
          text: 'Status',
          value: 'published',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.retrieveTutorials()
  },
  methods: {
    async retrieveTutorials () {
      try {
        const { data } = await TutorialsService.getAll()
        this.tutorials = data.map((t) => {
          return {
            id: t.id,
            title: t.title.length > 30 ? t.title.substr(0, 30) + '...' : t.title,
            description: t.description.length > 30 ? t.description.substr(0, 30) + '...' : t.description,
            published: t.published ? 'Published' : 'Pending'
          }
        })
      } catch (error) {
        console.error(error)
        alert('Error!')
      }
    }
  }
}
</script>

<style>
.list {
  max-width: 750px;
}
</style>