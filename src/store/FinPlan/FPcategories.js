import firebase from 'firebase'
export default {
  state: {
    FPcatGroups: [],
    FPcategories: [],
    stdFPCatGroup: {}
  },
  actions: {
    async fetchFPCatGroups ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPcatGroups = (await firebase.database().ref(`/users/${uid}/FPcatGroups`).once('value')).val() || {}
        const FPcgps = Object.keys(FPcatGroups).map(key => ({ ...FPcatGroups[key], id: key }))
        commit('updateFPCatGroups', FPcgps)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPCatGroup ({ commit, dispatch }, {
      title,
      comment,
      rating
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPcatGroup = await firebase.database().ref(`/users/${uid}/FPcatGroups`).push({
          title,
          comment,
          rating
        })
        return {
          id: FPcatGroup.key,
          title,
          comment,
          rating
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPCatGroup ({ commit, dispatch }, {
      id,
      title,
      comment,
      rating
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcatGroups`).child(id).update({
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
    async DBremoveFPCatGroup ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcatGroups/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPCatGroups ({ commit }, FPcatGroups) {
      commit('updateFPCatGroups', FPcatGroups)
    },
    async fetchFPCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPcategories = (await firebase.database().ref(`/users/${uid}/FPcategories`).once('value')).val() || {}
        const FPctgs = Object.keys(FPcategories).map(key => ({ ...FPcategories[key], id: key }))
        commit('updateFPCategories', FPctgs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPCategory ({ commit, dispatch }, {
      title,
      FPcatGroupId,
      comment,
      expenses,
      entrances,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPcategory = await firebase.database().ref(`/users/${uid}/FPcategories`).push({
          title,
          FPcatGroupId,
          comment,
          expenses,
          entrances,
          visible
        })
        return {
          id: FPcategory.key,
          title,
          FPcatGroupId,
          comment,
          expenses,
          entrances,
          visible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPCategory ({ commit, dispatch }, {
      id,
      title,
      FPcatGroupId,
      comment,
      expenses,
      entrances,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcategories`).child(id).update({
          id,
          title,
          FPcatGroupId,
          comment,
          expenses,
          entrances,
          visible
        })
        return {
          id,
          title,
          FPcatGroupId,
          comment,
          expenses,
          entrances,
          visible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBremoveFPCategory ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcategories/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPCategories ({ commit }, FPcategories) {
      commit('updateFPCategories', FPcategories)
    },
    chgStdFPCatGroup ({ commit }, stdFPCatGroup) {
      commit('chgStdFPCatGroup', stdFPCatGroup)
    }
  },
  mutations: {
    updateFPCatGroups (state, FPcatGroups) {
      state.FPcatGroups = FPcatGroups
    },
    updateFPCategories (state, FPcategories) {
      state.FPcategories = FPcategories
    },
    chgStdFPCatGroup (state, stdFPCatGroup) {
      state.stdFPCatGroup = stdFPCatGroup
    }
  },
  getters: {
    FPcatGroups (state) {
      return state.FPcatGroups
    },
    FPcategories (state) {
      return state.FPcategories
    },
    stdFPCatGroup (state) {
      return state.stdFPCatGroup
    }
  }
}
