import { MapperFrom } from "@shared/util-pokedex-helper";

import { Pokemon } from "../../entities";
import { PokemonDto } from "../dto";

export const PokemonMapper: MapperFrom<PokemonDto, Pokemon> = {
  from: function (dto: PokemonDto): Pokemon {
    const { name, url } = dto;

    return { name, url };
  }
}