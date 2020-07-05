import firebase from 'firebase'
export default {
  state: {
    FPtagGroups: [],
    FPtags: [],
    stdFPTagGroup: {}
  },
  actions: {
    async fetchFPTags ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPtags = (await firebase.database().ref(`/users/${uid}/FPtags`).once('value')).val() || {}
        const FPtgs = Object.keys(FPtags).map(key => ({ ...FPtags[key], id: key }))
        commit('UPDATE_FP_TAGS', FPtgs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchFPTagGroups ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const FPtagGroups = (await firebase.database().ref(`/users/${uid}/FPtagGroups`).once('value')).val() || {}
        const FPtgGs = Object.keys(FPtagGroups).map(key => ({ ...FPtagGroups[key], id: key }))
        commit('UPDATE_FP_TAG_GROUPS', FPtgGs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBcreateFPTagGroup ({ commit, dispatch }, {
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPtagGroup = await firebase.database().ref(`/users/${uid}/FPtagGroups`).push({
          title,
          comment,
          rating,
          visible
        })
        return {
          id: FPtagGroup.key,
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
    async DBeditFPTagGroup ({ commit, dispatch }, {
      id,
      title,
      comment,
      rating,
      visible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPtagGroups`).child(id).update({
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
    async DBremoveFPTagGroup ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPtagGroups/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPTagGroups ({ state, commit }, FPtagGroups) {
      commit('UPDATE_FP_TAG_GROUPS', FPtagGroups)
    },
    async DBcreateFPTag ({ commit, dispatch }, {
      title,
      parentId,
      comment
    }) {
      try {
        const uid = await dispatch('getUid')
        const FPtag = await firebase.database().ref(`/users/${uid}/FPtags`).push({
          title,
          parentId,
          comment
        })
        return {
          id: FPtag.key,
          title,
          parentId,
          comment
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBeditFPTag ({ commit, dispatch }, {
      id,
      title,
      parentId,
      comment,
      expenses,
      entrances,
      tagVisible
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPtags`).child(id).update({
          id,
          title,
          parentId,
          comment,
          expenses,
          entrances,
          tagVisible
        })
        return {
          id,
          title,
          parentId,
          comment,
          expenses,
          entrances,
          tagVisible
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async DBremoveFPTag ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/FPtags/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    updateFPTags ({ state, commit }, FPtags) {
      commit('UPDATE_FP_TAGS', FPtags)
    },
    chgStdFPTagGroup ({ commit }, stdFPTagGroup) {
      commit('CHG_STD_FP_TAG_GROUP', stdFPTagGroup)
    }
  },
  mutations: {
    UPDATE_FP_TAG_GROUPS (state, preload) {
      if (preload) {
        state.FPtagGroups = [...preload]
      } else {
        state.FPtagGroups = []
      }
    },
    UPDATE_FP_TAGS (state, preload) {
      if (preload) {
        const newFPtags = [...preload]
        state.FPtags = newFPtags
      } else {
        state.FPtag = []
      }
    },
    CHG_STD_FP_TAG_GROUP (state, preload) {
      state.stdFPTagGroup = preload
    }
  },
  getters: {
    FPtagGroups (state) {
      return state.FPtagGroups
    },
    FPtags (state) {
      return state.FPtags
    },
    stdFPTagGroup (state) {
      return state.stdFPTagGroup
    }
  }
}
