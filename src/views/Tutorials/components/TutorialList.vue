<template>
  <v-row
    align="center"
    class="list px-3 pt-5 mx-auto">
    <v-col cols="12">
      <form @submit.prevent="retrieveTutorials()">
        <v-row
          justify="space-between"
          align="baseline">
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
            <v-btn
              small
              @click="retrieveTutorials()">
              Search
            </v-btn>
          </v-col>
        </v-row>
      </form>
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
          <template #[`item.add`]="{ item }">
            <v-btn
              color="success"
              icon
              @click="addToCart(item.id)">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              class="mr-2"
              icon
              @click="editTutorial(item.id)">
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              color="error"
              icon
              @click="deleteTutorial(item.id)">
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
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
          text: '',
          align: 'center',
          sortable: false,
          value: 'add'
        },
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
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.retrieveTutorials()
  },
  methods: {
    addToCart (tutorialId) {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
      }

      const item = this.tutorials.find((item) => item.id === tutorialId)
      const cartItems = JSON.parse(localStorage.getItem('cart'))
      const itemInCart = cartItems.findIndex((cartItem) => cartItem.id === item.id)

      if (itemInCart !== -1) {
        cartItems[itemInCart].amount += 1
      } else {
        cartItems.push({
          ...item,
          amount: 1
        })
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems))
    },
    async retrieveTutorials () {
      try {
        const { data } = await TutorialsService.findByTitle(this.title)
        this.tutorials = data.map((t) => {
          return {
            id: t.id,
            title: t.title.length > 30 ? t.title.substr(0, 30) + '...' : t.title,
            description: t.description.length > 30 ? t.description.substr(0, 30) + '...' : t.description,
            published: t.published ? 'Published' : 'Pending'
          }
        })
      } catch (error) {
        console.error('retrieveTutorials', error)
        alert('Error!')
      }
    },
    editTutorial (id) {
      this.$router.push({ name: 'TutorialDetail', params: { id } })
    },
    async deleteTutorial (id) {
      try {
        if (confirm('Are you sure?')) {
          await TutorialsService.deleteTutorial(id)
          alert('Delete success!')
        }
        this.retrieveTutorials()
      } catch (error) {
        console.error('deleteTutorial', error)
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