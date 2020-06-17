import firebase from 'firebase'
export default {
  state: {
    targets: []
  },
  actions: {
    async fetchTargets ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const targets = (await firebase.database().ref(`/users/${uid}/targets`).once('value')).val() || {}
        const targs = Object.keys(targets).map(key => ({ ...targets[key], id: key }))
        commit('updateTargets', targs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTarget ({ commit, dispatch }, {
      title,
      comment,
      type,
      color,
      sectionId,
      groupId,
      expenses,
      entrances
    }) {
      try {
        const uid = await dispatch('getUid')
        const target = await firebase.database().ref(`/users/${uid}/targets`).push({
          title,
          comment,
          type,
          color,
          sectionId,
          groupId,
          expenses,
          entrances
        })
        return {
          id: target.key,
          title,
          comment,
          type,
          color,
          sectionId,
          groupId,
          expenses,
          entrances
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async editTarget ({ commit, dispatch }, {
      id,
      title,
      comment,
      type,
      color,
      sectionId,
      groupId,
      expenses,
      entrances
    }) {
      try {
        // console.log(
        //   id,
        //   title,
        //   comment,
        //   type,
        //   color,
        //   sectionId,
        //   groupId,
        //   expenses,
        //   entrances)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/targets`).child(id).update({
          id,
          title,
          comment,
          type,
          color,
          sectionId,
          groupId,
          expenses,
          entrances
        })
        return {
          id,
          title,
          comment,
          type,
          color,
          sectionId,
          groupId,
          expenses,
          entrances
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeTarget ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/targets/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateTargets ({ commit }, targets) {
      commit('updateTargets', targets)
    }
  },
  mutations: {
    updateTargets (state, targets) {
      state.targets = targets
    }
  },
  getters: {
    targets (state) {
      return state.targets
    }
  }
}
