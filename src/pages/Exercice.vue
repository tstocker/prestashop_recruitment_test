<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

      <add-button @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <form-dishe v-bind:onClose="onClose" action="Nouveau" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dishes: this.$store.getters["tasks/dishes"],
      showFormDishe: false
    };
  },
  methods: {
    onClose() { this.showFormDishe = false; }
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  }
};
</script>
