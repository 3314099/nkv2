import firebase from 'firebase'
export default {
  state: {
    FPsections: [],
    FPsectionsSerial: []
  },
  actions: {
    async fetchFPSectionsSerial ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPsectionsSerial = (await firebase.database().ref(`/users/${uid}/FPsectionsSerial`).once('value')).val() || {}
        commit('updateFPSectionsSerial', FPsectionsSerial)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchFPSections ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPsections = (await firebase.database().ref(`/users/${uid}/FPsections`).once('value')).val() || {}
        const sects = Object.keys(FPsections).map(key => ({ ...FPsections[key], id: key }))
        commit('updateFPSections', sects)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPSection ({ commit, dispatch }, {
      title,
      comment,
      color
    }) {
      try {
        const uid = await dispatch('getUid')
        const section = await firebase.database().ref(`/users/${uid}/FPsections`).push({
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
    async DBeditFPSectionsSerial ({ commit, dispatch }, {
      FPsectionsSerial
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}`).update({
          FPsectionsSerial
        })
        commit('updateFPSectionsSerial', FPsectionsSerial)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPSection ({ commit, dispatch }, {
      id,
      title,
      comment,
      color
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPsections`).child(id).update({
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
    async DBremoveFPSection ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPsections/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPSections ({ commit }, FPsections) {
      commit('updateFPSections', FPsections)
    },
    updateFPSectionsSerial ({ commit }, FPsectionsSerial) {
      commit('updateFPSectionsSerial', FPsectionsSerial)
    }
  },
  mutations: {
    updateFPSections (state, FPsections) {
      state.FPsections = FPsections
    },
    updateFPSectionsSerial (state, FPsectionsSerial) {
      state.FPsectionsSerial = FPsectionsSerial
    }
  },
  getters: {
    FPsections (state) {
      return state.FPsections
    },
    FPsectionsSerial (state) {
      return state.FPsectionsSerial
    }
  }
}
