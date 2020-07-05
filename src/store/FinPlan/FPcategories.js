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
        commit('UPDATE_FP_CAT_GROUPS', FPcgps)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPCatGroup ({ commit, dispatch }, {
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPcatGroup = await firebase.database().ref(`/users/${uid}/FPcatGroups`).push({
          title,
          comment,
          rating,
          visible
        })
        return {
          id: FPcatGroup.key,
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
    async DBeditFPCatGroup ({ commit, dispatch }, {
      id,
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcatGroups`).child(id).update({
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
    async DBremoveFPCatGroup ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcatGroups/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPCatGroups ({ state, commit }, FPcatGroups) {
      commit('UPDATE_FP_CAT_GROUPS', FPcatGroups)
    },
    async fetchFPCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPcategories = (await firebase.database().ref(`/users/${uid}/FPcategories`).once('value')).val() || {}
        const FPctgs = Object.keys(FPcategories).map(key => ({ ...FPcategories[key], id: key }))
        commit('UPDATE_FP_CATEGORIES', FPctgs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPCategory ({ commit, dispatch }, {
      title,
      parentId,
      comment,
      expenses,
      entrances,
      catVisible
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPcategory = await firebase.database().ref(`/users/${uid}/FPcategories`).push({
          title,
          parentId,
          comment,
          expenses,
          entrances,
          catVisible
        })
        return {
          id: FPcategory.key,
          title,
          parentId,
          comment,
          expenses,
          entrances,
          catVisible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPCategory ({ commit, dispatch }, {
      id,
      title,
      parentId,
      comment,
      expenses,
      entrances,
      catVisible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPcategories`).child(id).update({
          id,
          title,
          parentId,
          comment,
          expenses,
          entrances,
          catVisible
        })
        return {
          id,
          title,
          parentId,
          comment,
          expenses,
          entrances,
          catVisible
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
      commit('UPDATE_FP_CATEGORIES', FPcategories)
    },
    chgStdFPCatGroup ({ commit }, stdFPCatGroup) {
      commit('CHG_STD_FP_CAT_GROUP', stdFPCatGroup)
    }
  },
  mutations: {
    UPDATE_FP_CAT_GROUPS (state, preload) {
      state.FPcatGroups = [...preload]
    },
    UPDATE_FP_CATEGORIES (state, preload) {
      if (preload) {
        state.FPcategories = preload
      } else {
        state.FPcategories = []
      }
    },
    CHG_STD_FP_CAT_GROUP (state, preload) {
      state.stdFPCatGroup = preload
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
