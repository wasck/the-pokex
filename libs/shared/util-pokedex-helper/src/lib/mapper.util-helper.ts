export interface Mapper<dto, model> 
  extends MapperFrom<dto, model>,MapperTo<model, dto> {};

export interface MapperFrom<dto, model> {
  from: (dto: dto) => model
}

export interface MapperTo<model, dto> {
  to: (model: model) => dto
}