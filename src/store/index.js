import Vue from 'vue'
import Vuex from 'vuex'
import Layer from '@/models/layer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layers: [
      {name: 'layer1', parent: 'group1'}, 
      {name: 'layer2', parent: 'group2'},
      {name: 'layer3', parent: 'group2'}
    ],
    groups: [
      {name: 'group1'},
      {name: 'group2'},
      {name: 'group3'},
      {name: 'group4'},
    ]
  },
  getters: {
    groupLayers(state) {
      return state.groups
    }
  },
  mutations: {
    
  },
  actions: {
    addLayer({ state }, layer) {
      const newLayer = new Layer(layer.name, 'layer', layer.parent)
      state.layers.unshift(newLayer)
    },
    removeLayer({ state }, i) {
      state.layers.splice(i, 1)
    },
    addGroup({ state }, name) {
      const group = new Layer(name)
      state.groups.unshift(group)
    },
    removeGroup({ state }, i) {
      state.groups.splice(i, 1)
    }
  }
})