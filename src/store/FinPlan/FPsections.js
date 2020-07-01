import firebase from 'firebase'
export default {
  state: {
    FPsections: [],
    FPsectionsList: [],
    FPsectionsSerial: [],
    FPsecGroups: []
  },
  actions: {
    async fetchFPSectionsSerial ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPsectionsSerial = (await firebase.database().ref(`/users/${uid}/FPsectionsSerial`).once('value')).val() || {}
        commit('UPDATE_FP_SECTIONS_SERIAL', FPsectionsSerial)
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
        commit('UPDATE_FP_SECTIONS', sects)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchFPsecGroups ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPsecGroups = (await firebase.database().ref(`/users/${uid}/FPsecGroups`).once('value')).val() || {}
        const FPsgps = Object.keys(FPsecGroups).map(key => ({ ...FPsecGroups[key], id: key }))
        commit('UPDATE_FP_SEC_GROUPS', FPsgps)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPSection ({ commit, dispatch }, {
      title,
      comment,
      color,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        const section = await firebase.database().ref(`/users/${uid}/FPsections`).push({
          title,
          comment,
          color,
          visible
        })
        return {
          id: section.key,
          title,
          comment,
          color,
          visible
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
        commit('UPDATE_FP_SECTIONS_SERIAL', FPsectionsSerial)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPsecGroup ({ commit, dispatch }, {
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPsecGroup = await firebase.database().ref(`/users/${uid}/FPsecGroups`).push({
          title,
          comment,
          rating,
          visible
        })
        return {
          id: FPsecGroup.key,
          title,
          comment,
          rating,
          visible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPsecGroup ({ commit, dispatch }, {
      id,
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPsecGroups`).child(id).update({
          id,
          title,
          comment,
          rating,
          visible
        })
        return {
          id,
          title,
          comment,
          rating,
          visible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPSection ({ commit, dispatch }, {
      id,
      title,
      comment,
      color,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPsections`).child(id).update({
          id,
          title,
          comment,
          color,
          visible
        })
        return {
          id,
          title,
          comment,
          color,
          visible
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
    async DBremoveFPsecGroup ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPsecGroups/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPSections ({ commit }, FPsections) {
      commit('UPDATE_FP_SECTIONS', FPsections)
    },
    updateFPSectionsList ({ commit }, preload) {
      commit('UPDATE_FP_SECTIONS_LIST', preload)
    },
    updateFPSectionsSerial ({ commit }, FPsectionsSerial) {
      commit('UPDATE_FP_SECTIONS_SERIAL', FPsectionsSerial)
    },
    updateFPsecGroups ({ commit }, FPsecGroups) {
      commit('UPDATE_FP_SEC_GROUPS', FPsecGroups)
    }
  },
  mutations: {
    UPDATE_FP_SECTIONS (state, preload) {
      state.FPsections = preload
    },
    UPDATE_FP_SECTIONS_LIST (state, preload) {
      state.FPsectionsList = [...preload]
    },
    UPDATE_FP_SECTIONS_SERIAL (state, FPsectionsSerial) {
      state.FPsectionsSerial = [...FPsectionsSerial]
    },
    UPDATE_FP_SEC_GROUPS (state, FPsecGroups) {
      state.FPsecGroups = [...FPsecGroups]
    },
    UPDATE_FP_SEC_GROUP (state, FPsecGroup) {
      // FPsecGroups.visible = !FPsecGroups.visible
      console.log(FPsecGroup)
      const idx = state.FPsecGroups.indexOf((item) => item.id === FPsecGroup.id)
      console.log(idx)
    }
  },
  getters: {
    FPsections (state) {
      return state.FPsections
    },
    FPsectionsList (state) {
      return state.FPsectionsList
    },
    FPsectionsSerial (state) {
      return state.FPsectionsSerial
    },
    FPsecGroups (state) {
      return state.FPsecGroups
    }
  }
}
