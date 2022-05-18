import Vue from "vue";
import Vuex from "vuex";

// Importer votre module ici et l'ajouter au Store (ligne 19)

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks: {
        namespaced: true,
        state: () => ({
          dishes: localStorage.getItem("dishes") ? JSON.parse(localStorage.getItem("dishes")) : [
            {
              id: 1,
              image: "https://i.imgur.com/0umadnY.jpg",
              nom: "Burger",
              description:
                "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
              note: 4
            },
            {
              id: 2,
              image: "https://i.imgur.com/b9zDbyb.jpg",
              nom: "Pizza",
              description:
                "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
              note: 5
            },
            {
              id: 3,
              image: "https://i.imgur.com/RbKjUjB.jpg",
              nom: "Petits choux",
              description:
                "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
              note: 1
            },
            {
              id: 4,
              image: "https://i.imgur.com/xAuhNVg.jpg",
              nom: "BBQ Ribs",
              description:
                "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
              note: 5
            }
          ]
        }),
        mutations: {
          /**
           *
           * @param state
           * @param payload - dishe
           * @param {number} payload.id
           * @param {string} payload.nom
           * @param {string} payload.image
           * @param {string} payload.description
           * @param {number} payload.rate
           */
          addDishe(state, payload) {
            state.dishes.push({
              id: Math.max(...state.dishes.map(dishe => dishe.id) + 1),
              ...payload
            });
            localStorage.setItem('dishes', JSON.stringify(state.dishes));
          },
          /**
           *
           * @param state
           * @param payload - dishe
           * @param {number} payload.id
           * @param {string} payload.nom
           * @param {string} payload.image
           * @param {string} payload.description
           * @param {number} payload.note
           */
          editDishe(state, payload) {
            const dishesIndex = state.dishes.findIndex((dishe) => dishe.id === payload.id)
            state.dishes.splice(dishesIndex, 1, payload);
            localStorage.setItem('dishes', JSON.stringify(state.dishes));
          },
          deleteDishe(state, disheId) {
            state.dishes.splice(state.dishes.findIndex((dishe) => dishe.id === disheId), 1);
            localStorage.setItem('dishes', JSON.stringify(state.dishes));
          }
        },
        actions: {
          addDishe(state, dishe) {
            state.commit("addDishe", dishe)
          },
          editDishe(state, dishe) {
            state.commit("editDishe", dishe)
          },
          deleteDishe(state, disheId) {
            state.commit("deleteDishe", disheId)
          }
        },
        getters: {
          dishes (state) {
            return state.dishes
          }
        },
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
