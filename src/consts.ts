// src/consts.ts

export const PERIOD_FILTERS = {
  ALL: { literal: 'Todos', value: '' },
  CRETACEOUS: { literal: 'Cretácico', value: 'Cretácico' },
  JURASSIC: { literal: 'Jurásico', value: 'Jurásico' },
  TRIASSIC: { literal: 'Triásico', value: 'Triásico' }
} as const;

export const DIET_FILTERS = {
  ALL: { literal: 'Todos', value: '' },
  CARNIVORE: { literal: 'Carnívoro', value: 'Carnívoro' },
  HERBIVORE: { literal: 'Herbívoro', value: 'Herbívoro' },
  OMNIVORE: { literal: 'Omnívoro', value: 'Omnívoro' }
} as const;

export const REGION_FILTERS = {
  ALL: { literal: 'Todas', value: '' },
  NORTH_AMERICA: { literal: 'Norteamérica', value: 'Norteamérica' },
  SOUTH_AMERICA: { literal: 'Sudamérica', value: 'Sudamérica' },
  ASIA: { literal: 'Asia', value: 'Asia' },
  EUROPE: { literal: 'Europa', value: 'Europa' },
  AFRICA: { literal: 'África', value: 'África' }
} as const;

export const CATEGORY_FILTERS = {
  ALL: { literal: 'Todas', value: '' },
  THEROPODS: { literal: 'Terópodos', value: 'Terópodo' },
  SAUROPODS: { literal: 'Saurópodos', value: 'Saurópodo' },
  ORNITHISCHIANS: { literal: 'Ornitísquios', value: 'Ornitísquio' },
  ORNITHOPODS: { literal: 'Ornitópodos', value: 'Ornitópodo' },
  CERATOPSIA: { literal: 'Ceratopsios', value: 'Ceratopsia' }
} as const;

export type PeriodValue = typeof PERIOD_FILTERS[keyof typeof PERIOD_FILTERS]['value'];
export type DietValue = typeof DIET_FILTERS[keyof typeof DIET_FILTERS]['value'];
export type RegionValue = typeof REGION_FILTERS[keyof typeof REGION_FILTERS]['value'];
export type CategoryValue = typeof CATEGORY_FILTERS[keyof typeof CATEGORY_FILTERS]['value'];