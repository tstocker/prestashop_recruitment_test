<template>
  <q-card class="card">
    <q-img v-if="dishe.image.length" :src="dishe.image" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.nom }}
      </div>
    </q-img>
    <q-img v-else src="statics/image-placeholder.png" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.nom }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section v-if="dishe.description.length">
      {{ dishe.description }}
    </q-card-section>
    <q-card-section v-else class="text-italic">
      Aucune description fournie
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDishe = true" icon="edit" color="blue" flat>Modifier</q-btn>
      <q-btn @click="showDeleteDishe = true" icon="delete" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog v-model="showDeleteDishe">
      <delete-dishe v-bind:disheId="dishe.id" />
    </q-dialog>

    <q-dialog v-model="showFormDishe">
      <form-dishe v-bind:onClose="onClose" v-bind:editedDishe="dishe" action="Modifier" />
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  props: ["dishe"],
  data() {
    return {
      showFormDishe: false,
      showDeleteDishe: false
    };
  },
  methods: {
    onClose() { this.showFormDishe = false; }
  },
  components: {
    "form-dishe": require("components/FormDishe.vue").default,
    "delete-dishe": require("components/DeleteDishe.vue").default
  }
};
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
