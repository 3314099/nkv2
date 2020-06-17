import firebase from 'firebase'
export default {
  state: {
    sections: [],
    sectionsSerial: []
  },
  actions: {
    async fetchSectionsSerial ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const sectionsSerial = (await firebase.database().ref(`/users/${uid}/sectionsSerial`).once('value')).val() || {}
        commit('updateSectionsSerial', sectionsSerial)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSections ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const sections = (await firebase.database().ref(`/users/${uid}/sections`).once('value')).val() || {}
        const sects = Object.keys(sections).map(key => ({ ...sections[key], id: key }))
        commit('updateSections', sects)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateSection ({ commit, dispatch }, {
      title,
      comment,
      color
    }) {
      try {
        const uid = await dispatch('getUid')
        const section = await firebase.database().ref(`/users/${uid}/sections`).push({
          title,
          comment,
          color
        })
        return {
          id: section.key,
          title,
          comment,
          color
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditSectionsSerial ({ commit, dispatch }, {
      sectionsSerial
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}`).update({
          sectionsSerial
        })
        commit('updateSectionsSerial', sectionsSerial)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditSection ({ commit, dispatch }, {
      id,
      title,
      comment,
      color
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/sections`).child(id).update({
          id,
          title,
          comment,
          color
        })
        return {
          id,
          title,
          comment,
          color
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBremoveSection ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/sections/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateSections ({ commit }, sections) {
      commit('updateSections', sections)
    },
    updateSectionsSerial ({ commit }, sectionsSerial) {
      commit('updateSections', sectionsSerial)
    }
  },
  mutations: {
    updateSections (state, sections) {
      state.sections = sections
    },
    updateSectionsSerial (state, sectionsSerial) {
      state.sectionsSerial = sectionsSerial
    }
  },
  getters: {
    sections (state) {
      return state.sections
    },
    sectionsSerial (state) {
      return state.sectionsSerial
    }
  }
}
