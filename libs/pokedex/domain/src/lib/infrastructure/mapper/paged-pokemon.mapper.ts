
import { MapperFrom } from "@shared/util-pokedex-helper";
import { Page, Paginated, Pokemon } from "../../entities";
import { PaginatedDto, PokemonDto } from "../dto";


export const PagedPokemonMapper: MapperFrom<
  PaginatedDto<PokemonDto> & Page,
  Paginated<Pokemon>
> = {
  from: function (dto: PaginatedDto<PokemonDto> & Page): Paginated<Pokemon> {
    const { count, results: items, page, size, sizeOptions } = dto;

    return {
      page: { page, size, count, sizeOptions },
      items
    };
  }
}