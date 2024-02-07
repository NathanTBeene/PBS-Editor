class Pokemon:
    def __init__(self, name=None,form_name=None, types=None,base_stats=None,gender_ratio=None,growth_rate=None,base_exp=None,ev_stats=None,catch_rate=None,happiness=None,abilities=None,hidden_abilities=None,moves=None,tutor_moves=None,egg_moves=None,egg_groups=None,hatch_steps=None,height=None,weight=None,color=None,shape=None,habitat=None,category=None,pokedex_entry=None,generation=None,evolutions=None, flags=None, wild_item_common=None,wild_item_uncommon=None,wild_item_rare=None,offspring=None,incense=None):
      self.name = name if name is not None else ""
      self.form_name = form_name if form_name is not None else ""
      self.types = types if types is not None else {
        'type1': "",
        'type2': ""
      }
      self.base_stats = base_stats if base_stats is not None else {
        'hp': '0',
        'atk': '0',
        'def': '0',
        'spatk': '0',
        'spdef': '0',
        'speed': '0',
      }
      self.gender_ratio = gender_ratio if gender_ratio is not None else ""
      self.growth_rate = growth_rate if growth_rate is not None else ""
      self.base_exp = base_exp if base_exp is not None else '0'
      self.ev_stats = ev_stats if ev_stats is not None else {
        'HP': '0',
        'ATTACK': '0',
        'DEFENSE': '0',
        'SPECIAL_ATTACK': '0',
        'SPECIAL_DEFENSE': '0',
        'SPEED': '0',
      }
      self.catch_rate = catch_rate if catch_rate is not None else '0'
      self.happiness = happiness if happiness is not None else '0'
      self.abilities = abilities if abilities is not None else {
        'ability1': "",
        'ability2': ""
      }
      self.hidden_abilities = hidden_abilities if hidden_abilities is not None else {
        'hidden_ability1': "",
        'hidden_ability2': ""
      }
      self.moves = moves if moves is not None else {'1':['TACKLE']}
      self.tutor_moves = tutor_moves if tutor_moves is not None else []
      self.egg_moves = egg_moves if egg_moves is not None else []
      self.egg_groups = egg_groups if egg_groups is not None else {
        'egg_group1': "",
        'egg_group2': ""
      }
      self.hatch_steps = hatch_steps if hatch_steps is not None else '0'
      self.height = height if height is not None else '0.0'
      self.weight = weight if weight is not None else '0.0'
      self.color = color if color is not None else ""
      self.shape = shape if shape is not None else ""
      self.habitat = habitat if habitat is not None else ""
      self.category = category if category is not None else ""
      self.pokedex_entry = pokedex_entry if pokedex_entry is not None else ""
      self.generation = generation if generation is not None else '0'
      self.evolutions = evolutions if evolutions is not None else []
      self.flags = flags if flags is not None else []
      self.wild_item_common = wild_item_common if wild_item_common is not None else []
      self.wild_item_uncommon = wild_item_uncommon if wild_item_uncommon is not None else []
      self.wild_item_rare = wild_item_rare if wild_item_rare is not None else []
      self.offspring = offspring if offspring is not None else []
      self.incense = incense if incense is not None else []