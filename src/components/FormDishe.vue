<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-input
          filled
          ref="name"
          v-model="dishe.nom"
          label="Nom (Burger)"
          class="col"
          :rules="[
            val => val && val.length > 0 || 'Veuillez renseigner le nom',
            val => val && val.length <= 20 || 'Le nom ne peu dépasser 20 caractères',
          ]"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          ref="description"
          v-model="dishe.description"
          label="Description"
          type="textarea"
          class="col"
          :rules="[
            val => val.length < 135 || 'la description doit faire au maximum 135 caractères'
          ]"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          ref="image"
          v-model="dishe.image"
          label="URL de l'image"
          class="col"
        />
        <q-img
          :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="dishe.note" size="2em" color="orange" ref="rate"/>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn label="Sauver" type="submit" color="primary" @click="onSubmit"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import dishe from "./Dishe";

const config = {
  NEW: "Nouveau",
  UPDATE: "Modifier"
};



export default {
  props: ["action", "onClose", "editedDishe"],
  data() {
    const dishe = this.$props.editedDishe ? { ...this.$props.editedDishe } : {
      name: "",
      description: "",
      note: 1,
      image: ""
    };
    return { dishe };
  },
  methods:{
    onSubmit () {
      this.$refs.name.validate();
      this.$refs.description.validate();

      if (this.$refs.name.hasError || this.$refs.description.hasError) {
        return false;
      } else {
        const payload = {
          image: this.$refs.image.value,
          nom: this.$refs.name.value,
          description: this.$refs.description.value,
          note: this.$refs.rate.value
        }

        if(this.$props.action === config.NEW) {
          this.$store.dispatch("tasks/addDishe", payload);
        }
        if(this.$props.action === config.UPDATE) {
          this.$store.dispatch("tasks/editDishe", { id: this.$props.editedDishe.id, ...payload });
        }

        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: this.$props.action === config.NEW ? "Plat ajouté" : "Plat modifié"
        })
        if(this.$props.onClose) {
          this.$props.onClose();
        }
        return true;
      }
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
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
