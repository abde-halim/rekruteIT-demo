package com.springboot.rekruteIT.utils;

import java.util.Collection;
import java.util.List;

public interface DtoMapper<TDto, TEntity> {

    List<TDto> toDtos(final Collection<TEntity> entityList);

    TDto toDto(final TEntity source);

    List<TDto> toDtosDozer(final Collection<TEntity> entityList);

    TDto toDtoDozer(final TEntity source);

    List<TEntity> toEntities(final Collection<TDto> entityList);

    TEntity toEntity(final TDto source);

    void addConfiguration();

    void addDozerConfiguration();

    /******************* Full  *******************/

    List<TDto> toDtosFull(final Collection<TEntity> entityList);

    TDto toDtoFull(final TEntity source);

    List<TEntity> toEntitiesFull(final Collection<TDto> entityList);

    TEntity toEntityFull(final TDto source);

    void addConfigurationFull();

}
