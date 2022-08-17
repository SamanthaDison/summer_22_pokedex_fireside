<template>
  <div class="row pokedex">
    <div
      class="col-4 bg-danger pt-4 d-flex flex-column justify-content-between"
    >
      <div class="row">
        <div class="col-6 text-center" v-for="p in pokemon" :key="p.name">
          <button
            @click="setActive(p.url)"
            class="btn btn-outline-light text-uppercase my-2 w-75"
          >
            {{ p.name }}
          </button>
        </div>
      </div>
      <div class="row mb-5 pb-5">
        <div class="col-6 text-end">
          <button
            @click="changePage(previousPage)"
            class="btn btn-outline-light w-50"
            :disabled="!previousPage"
          >
            Previous
          </button>
        </div>

        <div class="col-6">
          <button
            @click="changePage(nextPage)"
            class="btn btn-outline-light w-50"
            :disabled="!nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div class="col-8 bg-light">
      <div class="row h-75">
        <div
          v-if="activePokemon"
          class="
            col-12
            d-flex
            flex-column
            align-items-center
            justify-content-around
          "
        >
          <h1 class="text-uppercase">{{ activePokemon?.name }}</h1>
          <img class="h-50" :src="activePokemon?.img" alt="" />
          <div>
            <p class="fs-3">
              Height: {{ activePokemon?.height }} | Weight:
              {{ activePokemon?.weight }} | Types:
              <span
                class="me-2"
                v-for="t in activePokemon?.types"
                :key="t.slot"
              >
                {{ t.type.name }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { pokemonService } from "../services/PokemonService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await pokemonService.getPokemon();
      } catch (error) {
        // logger.log(error);
      }
    });
    return {
      pokemon: computed(() => AppState.pokemon),
      activePokemon: computed(() => AppState.activePokemon),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      async setActive(url) {
        try {
          await pokemonService.setActive(url);
        } catch (error) {
          // logger.log(error);
        }
      },
      async changePage(url) {
        try {
          await pokemonService.changePage(url);
        } catch (error) {}
      },
    };
  },
};
</script>

<style scoped lang="scss">
.pokedex {
  min-height: 100vh;
}
</style>
