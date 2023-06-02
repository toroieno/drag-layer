<template>
  <div class="list">
    <div class="header">
      <v-btn @click="createGroup = true">create group</v-btn>
      <v-btn @click="createLayer = true">create layer</v-btn>
    </div>
    <div class="contents">
      <div class="group-layers">
        <draggable v-model="groupLayers">
            <transition-group>
              <v-card v-for="(group, i) in groupLayers" :key="i" class="group-layer">
                <v-card-title class="handle">
                  <span>{{ group.name }}</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="deleteGroup(i)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <div class="layers">
                    <draggable v-model="layers">
                      <transition-group>
                        <v-card v-for="(layer, i) in layers" :key="i" class="layer">
                          <v-card-title class="handle" v-if="layer.parent === group.name">
                            <span>{{ layer.name }}</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="deleteLayer(i)">
                              <v-icon>mdi-minus </v-icon>
                            </v-btn>
                          </v-card-title>
                        </v-card>
                      </transition-group>
                    </draggable>
                  </div>
                </v-card-text>
              </v-card>
            </transition-group>
        </draggable>
      </div>
    </div>
    <v-dialog v-model="createGroup" width="300">
      <v-card>
        <v-card-title class="text-h5">
          add group
        </v-card-title>
        <v-card-text>
          <v-text-field label="name" v-model="group_name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="createGroup = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="addNewGroup"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createLayer" width="300">
      <v-card>
        <v-card-title class="text-h5">
          add layer
        </v-card-title>
        <v-card-text>
          <v-text-field label="name" v-model="layer_name"></v-text-field>
          <v-select label="choose group" v-model="layer_parent" :items="groupLayers" item-text="name" item-value="name"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="createLayer = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="addNewLayer"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex' // eslint-disable-line

export default {
  name: 'list-view',
  data() {
    return {
      createGroup: false,
      createLayer: false,
      group_name: '',
      layer_name: '',
      layer_parent: ''
    }
  },
  components: {
    draggable,
  },
  computed: {
    groupLayers: {
      get() {
        return this.$store.state.groups
      },
      set(groups) {
        this.$store.state.groups = groups
      }
    },
    layers: {
      get() {
        return this.$store.state.layers
      },
      set(layers) {
        this.$store.state.layers = layers
      }
    }
  },
  methods: {
    ...mapActions(['addGroup', 'addLayer', 'removeGroup', 'removeLayer']),
    addNewGroup() {
      this.addGroup(this.group_name)
      this.createGroup = false
    },
    addNewLayer() {
      const layer = {
        name: this.layer_name,
        parent: this.layer_parent,
      }
      this.addLayer(layer)
      this.createLayer = false
    },
    deleteGroup(i) {
      this.removeGroup(i)
    },
    deleteLayer(i) {
      this.removeLayer(i)
    }
  }
}
</script>
<style scoped lang="scss">
.list {
  width: 300px;
}
.group-layers {
  padding: 20px;
  .group-layer {
    margin-bottom: 4px;
    .layer {
      margin-bottom: 2px;
    }
  }
}
.handle:hover {
  cursor:move;
}
</style>