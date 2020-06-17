import firebase from 'firebase'
export default {
  state: {
    catGroups: []
  },
  actions: {
    async fetchCatGroups ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const catGroups = (await firebase.database().ref(`/users/${uid}/catGroups`).once('value')).val() || {}
        const cgps = Object.keys(catGroups).map(key => ({ ...catGroups[key], id: key }))
        commit('updateCatGroups', cgps)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateCatGroup ({ commit, dispatch }, {
      title,
      comment,
      rating
    }) {
      try {
        const uid = await dispatch('getUid')
        const catGroup = await firebase.database().ref(`/users/${uid}/catGroups`).push({
          title,
          comment,
          rating
        })
        return {
          id: catGroup.key,
          title,
          comment,
          rating
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditCatGroup ({ commit, dispatch }, {
      id,
      title,
      comment,
      rating
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/catGroups`).child(id).update({
          id,
          title,
          comment,
          rating
        })
        return {
          id,
          title,
          comment,
          rating
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBremoveCatGroup ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/catGroups/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateCatGroups ({ commit }, catGroups) {
      commit('updateCatGroups', catGroups)
    }
  },
  mutations: {
    updateCatGroups (state, catGroups) {
      state.catGroups = catGroups
    }
  },
  getters: {
    catGroups (state) {
      return state.catGroups
    }
  }
}
