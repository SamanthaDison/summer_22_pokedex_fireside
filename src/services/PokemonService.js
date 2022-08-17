import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api, pokeApi } from "./AxiosService"
import { Pokemon } from "../models/Pokemon"

class PokemonService {

    async getPokemon() {
        const res = await pokeApi.get('')
        logger.log(res.data)
        AppState.pokemon = res.data.results
        AppState.nextPage = res.data.next
        AppState.previousPage = res.data.previous
        logger.log('next page', AppState.nextPage)
        logger.log('previous page', AppState.previousPage)
    }


    async setActive(url) {
        const res = await api.get(url)
        logger.log(res.data)
        AppState.activePokemon = new Pokemon(res.data)
        logger.log(AppState.activePokemon)
    }

    async changePage(url) {
        // debugger
        const res = await api.get(url)
        logger.log(res.data)
        AppState.pokemon = res.data.results
        AppState.nextPage = res.data.next
        AppState.previousPage = res.data.previous
    }
}

export const pokemonService = new PokemonService