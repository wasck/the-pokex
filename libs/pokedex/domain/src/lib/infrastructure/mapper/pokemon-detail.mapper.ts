import { MapperFrom } from "@shared/util-pokedex-helper";
import { PokemonDetail } from "../../entities";
import { PokemonDetailDto } from "../dto/pokemon-detailed.dto";

export const PokemonDetailMapper: MapperFrom<PokemonDetailDto, PokemonDetail> = {
  from: function (dto: PokemonDetailDto): PokemonDetail {
    const { id, order, name, sprites, height} = dto;

    return {
      id,
      order,
      name,
      image: sprites.front_default,
      height
    }
  }
}