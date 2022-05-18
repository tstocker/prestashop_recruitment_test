<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">Suppression</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <div class="text-black">Etes vous sur de vouloir supprimer ce plat ?</div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn label="Supprimer" color="primary" @click="deleteDishe" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
// TODO component to factorise with other confirmation dialogs
export default {
  props: ["disheId"],
  methods: {
    deleteDishe() {
      this.$store.dispatch("tasks/deleteDishe", this.$props.disheId);
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
</style>
