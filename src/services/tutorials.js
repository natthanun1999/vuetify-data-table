import httpCommon from './http-common'

class TutorialsProvider {
  getAll () {
    return httpCommon.get('tutorial')
  }

  findById (id) {
    return httpCommon.get(`/tutorial/${id}`)
  }

  findByTitle (title) {
    return httpCommon.get(`/tutorial?title=${title}`)
  }

  createTutorial (payload) {
    return httpCommon.post('/tutorial/', payload)
  }

  updateTutorial (payload) {
    return httpCommon.put(`/tutorial/${payload.id}`, payload)
  }

  deleteTutorial (id) {
    return httpCommon.delete(`/tutorial/${id}`)
  }
}

export default TutorialsProvider