import httpCommon from './http-common'

class TutorialsProvider {
  getAll () {
    return httpCommon.get('tutorial')
  }

  findByTitle (title) {
    return httpCommon.get(`/tutorial?title=${title}`)
  }
}

export default TutorialsProvider