import re
from Pokemon import Pokemon
import os
from tkinter import messagebox as mb
# Check Directories
directories = [
    "PBS FILES/abilities.txt",
    "PBS FILES/moves.txt",
    "PBS FILES/pokemon.txt",
    "PBS FILES/Export"
]

def check_directories(file_paths):
    for file_path in file_paths:
    # Extract the directory path from the file path
        directory = os.path.dirname(file_path)
        
        # Check if the directory exists, create it if not
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        # Now check if the file exists, create it if not
        if not os.path.isfile(file_path):
            with open(file_path, 'w') as file:
                pass  
check_directories(directories)

types = ['NORMAL', 'FIRE','WATER','ELECTRIC','GRASS','ICE','FIGHTING','POISON','GROUND','FLYING','PSYCHIC','BUG','ROCK','GHOST','DRAGON','DARK','STEEL','FAIRY']

gender_ratio = ['AlwaysMale','FemaleOneEighth','Female25Percent','Female50Percent','Female75Percent','FemaleSevenEighths','AlwaysFemale','Genderless']

growth_rate = ['Fast','Medium','Slow','Parabolic','Erratic','Fluctuating']

egg_groups = [
    'Monster',
    'Water1',
    'Bug',
    'Flying',
    'Field',
    'Fairy',
    'Grass',
    'Humanlike',
    'Water3',
    'Mineral',
    'Amorphous',
    'Water2',
    'Ditto',
    'Dragon',
    'Undiscovered'
]

color = [
    'Black',
    'Blue',
    'Brown',
    'Gray',
    'Green',
    'Pink',
    'Purple',
    'Red',
    'White',
    'Yellow'
]

body_shape = [
    'Head',
    'Serpentine',
    'Finned',
    'HeadArms',
    'HeadBase',
    'BipedalTail',
    'HeadLegs',
    'Quadruped',
    'Winged',
    'Multiped',
    'MultiBody',
    'Bipedal',
    'MultiWinged',
    'Insectoid'
]

habitat = [
    'None',
    'Cave',
    'Forest',
    'Grassland',
    'Mountain',
    'Rare',
    'RoughTerrain',
    'Sea',
    'Urban',
    'WatersEdge'
]

#function separates an array into chunks of any size.
def chunk_list(list,size):
    for i in range(0,len(list),size):
        yield list[i:i+size]

def get_abilities():
    list = []
    with open('PBS FILES/abilities.txt','r') as file:
        for line in file:
            #Finds all names within brackets.
            matches = re.findall(r'\[(.*?)\]', line)
            list.extend(matches)
        
        return list


def get_moves():
    list = []
    with open('PBS FILES/moves.txt','r') as file:
        for line in file:
            #Finds all names within brackets.
            matches = re.findall(r'\[(.*?)\]', line)
            list.extend(matches)
        
        return list


abilities = get_abilities()

moves = get_moves()

def create_pokemon_list(file_path):
    mandatory_attributes = [
        "Name", "Types", "BaseStats", "GenderRatio", "GrowthRate", 
        "BaseExp", "EVs", "CatchRate", "Abilities", "Moves", 
        "Height", "Weight", "Color", "Shape", "Pokedex"
    ]
    with open(file_path,'r') as file:
        content = file.read()
        
        pokemon_sections = content.split('#-------------------------------')
        # Remove the first section because it contains type.
        pokemon_sections.remove(pokemon_sections[0])
        
        pokemon_list = {}
        line_counter = 0
        for each in pokemon_sections:
            
            lines = each.strip().split('\n')
            pattern = r"\[(.*?)\]"
            pokemon = Pokemon()
            
            for attribute in mandatory_attributes:
                if attribute not in each:
                    pokemon_list_error(lines[0],attribute)
                    return None
            
            for line in lines:
                line_counter += 1
                
                if 'Name =' in line and not 'FormName' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.name = value
                    continue
                    
                elif 'FormName =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.form_name = value
                    continue
                    
                elif 'Types =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(",")
                    pokemon.types = {
                        'type1': value[0],
                        'type2': value[1] if len(value) == 2 else ""
                    }
                    continue
                    
                elif 'BaseStats =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(",")
                    stats = {
                        'hp': value[0],
                        'atk': value[1],
                        'def': value[2],
                        'spatk': value[3],
                        'spdef': value[4],
                        'speed': value[5],
                    }
                    pokemon.base_stats = stats
                    continue
                    
                elif 'GenderRatio =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.gender_ratio = value
                    continue
                    
                elif 'GrowthRate =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.growth_rate = value
                    continue
                    
                elif 'BaseExp =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.base_exp = value
                    continue
                    
                elif 'EVs =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    format = {
                        'HP': '0',
                        'ATTACK': '0',
                        'DEFENSE': '0',
                        'SPECIAL_ATTACK': '0',
                        'SPECIAL_DEFENSE': '0',
                        'SPEED': '0'
                        }
                    dictionary = {value[i]: value[i + 1] for i in range(0, len(value), 2)}
                    for key,value in format.items():
                        if key in dictionary:
                            format[key] = dictionary[key]
                        
                    pokemon.ev_stats = format
                    continue
                    
                elif 'CatchRate =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.catch_rate = value
                    continue
                    
                elif 'Happiness =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.happiness = value
                    continue
            
                elif 'Abilities =' in line and not 'HiddenAbilities' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.abilities = {
                        'ability1': value[0],
                        'ability2': value[1] if len(value) == 2 else ""
                    }
                    continue
            
                elif 'HiddenAbilities =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.hidden_abilities = {
                        'hidden_ability1': value[0],
                        'hidden_ability2': value[1] if len(value) == 2 else ""
                    }
                    continue
                    
                elif 'Moves =' in line and not 'EggMoves =' in line and not 'TutorMoves =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    value = list(chunk_list(value,2))
                    pokemon.moves = create_moves_list(value)
                    continue
                    
                elif 'EggMoves =' in line:
                    key,value = line.split('=',1)
                    value = value.strip().split(',')
                    pokemon.egg_moves = value
                    continue
                    
                elif 'TutorMoves =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.tutor_moves = value
                    continue
                    
                elif 'EggGroups =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.egg_groups = {
                        'egg_group1': value[0],
                        'egg_group2': value[1] if len(value) == 2 else ""
                    }
                    continue
                    
                elif 'HatchSteps =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.hatch_steps = value
                    continue
                    
                elif 'Height =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.height = value
                    continue
                    
                elif 'Weight =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.weight = value
                    continue
                    
                elif 'Color =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.color = value
                    continue
                    
                elif 'Shape =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.shape = value
                    continue
                    
                elif 'Habitat =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.habitat = value
                    continue
                    
                elif 'Category =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.category = value
                    continue
                    
                elif 'Pokedex =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.pokedex_entry = value
                    continue
                    
                elif 'Generation =' in line:
                    key,value = line.split("=",1)
                    value = value.strip()
                    pokemon.generation = value
                    continue
                    
                elif 'Evolutions =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    value = list(chunk_list(value,3))
                    pokemon.evolutions = value
                    continue
                    
                elif 'Flags =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.flags = value
                    continue
                    
                elif 'WildItemCommon =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.wild_item_common = value
                    continue
                    
                elif 'WildItemUncommon =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.wild_item_uncommon = value
                    continue
                    
                elif 'WildItemRare =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.wild_item_rare = value
                    continue
                    
                elif 'Offspring =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.offspring = value
                    continue
                    
                elif 'Incense =' in line:
                    key,value = line.split("=",1)
                    value = value.strip().split(',')
                    pokemon.incense = value
                    continue
            
            pokemon_list[pokemon.name] = pokemon
        return pokemon_list
    
def create_moves_list(moves):
    tempdict = {}
    for move in moves:
        level = int(move[0])
        name = move[1]
        if level in tempdict:
            tempdict[level].append(name)
        else:
            tempdict[level] = [name]
    return tempdict


def export_pokemon(export_path, pokedex):
    export_list = list(pokedex.values())
    base_filename = f"{export_path}/pokemon"
    unique_filename = generate_unique_filename(base_filename)
    with open(unique_filename,'w') as file:
        file.write("# See the documentation on the wiki to learn how to edit this file.")
        for pokemon in export_list:
            ev_stats = (f",HP,{pokemon.ev_stats['HP']}" if pokemon.ev_stats['HP'] != "0" else "")+(f",ATTACK,{pokemon.ev_stats['ATTACK']}" if pokemon.ev_stats['ATTACK'] != "0" else "")+(f",DEFENSE,{pokemon.ev_stats['DEFENSE']}" if pokemon.ev_stats['DEFENSE'] != "0" else "")+(f",SPECIAL_ATTACK,{pokemon.ev_stats['SPECIAL_ATTACK']}" if pokemon.ev_stats['SPECIAL_ATTACK'] != "0" else "")+(f",SPECIAL_DEFENSE,{pokemon.ev_stats['SPECIAL_DEFENSE']}" if pokemon.ev_stats['SPECIAL_DEFENSE'] != "0" else "")+(f",SPEED,{pokemon.ev_stats['SPEED']}" if pokemon.ev_stats['SPEED'] != "0" else "")
            file.write(f"""
#-------------------------------
[{pokemon.name.upper()}]
Name = {pokemon.name}
Types = {pokemon.types['type1']}{f",{pokemon.types['type2']}" if pokemon.types['type2'] != "" else ""}
BaseStats = {pokemon.base_stats['hp']},{pokemon.base_stats['atk']},{pokemon.base_stats['def']},{pokemon.base_stats['spatk']},{pokemon.base_stats['spdef']},{pokemon.base_stats['speed']}
GenderRatio = {pokemon.gender_ratio}
GrowthRate = {pokemon.growth_rate}
BaseExp = {pokemon.base_exp}
EVs = {ev_stats[1:]}
CatchRate = {pokemon.catch_rate}
Happiness = {pokemon.happiness}
Abilities = {pokemon.abilities['ability1']}{f",{pokemon.abilities['ability2']}" if pokemon.abilities['ability2'] != "" else ""}
HiddenAbilities = {pokemon.hidden_abilities['hidden_ability1']}{f",{pokemon.hidden_abilities['hidden_ability2']}" if pokemon.hidden_abilities['hidden_ability2'] != "" else ""}
Moves = {format_moves_list(pokemon.moves)}
TutorMoves = {','.join(pokemon.tutor_moves)}{f"\nEggMoves = {','.join(pokemon.egg_moves)}" if len(pokemon.egg_moves) > 0 else ""}
EggGroups = {pokemon.egg_groups['egg_group1']}{f",{pokemon.egg_groups['egg_group2']}" if pokemon.egg_groups['egg_group2'] != "" else ""}
HatchSteps = {pokemon.hatch_steps}
Height = {pokemon.height}
Weight = {pokemon.weight}
Color = {pokemon.color}
Shape = {pokemon.shape}
Habitat = {pokemon.habitat}
Category = {pokemon.category}
Pokedex = {pokemon.pokedex_entry}
Generation = {pokemon.generation}
Evolutions = 
                       """)
    

def generate_unique_filename(base_filename, extension='.txt'):
    counter = 1
    # Check if the base file name exists
    new_filename = f"{base_filename}{extension}"
    while os.path.exists(new_filename):
        # If it exists, append a counter to create a unique file name
        new_filename = f"{base_filename}_{counter}{extension}"
        counter += 1
    return new_filename

def format_moves_list(moves_list):
    formatted_lines = []
    if len(moves_list) != 0:
        for level,moves in moves_list.items():
            for move in moves:
                formatted_lines.append(f"{level},{move}")
        return ",".join(formatted_lines)
    else:
        return ""
    
def pokemon_list_error(section,attribute):
    mb.showerror(f"Error with {section}", f"There was an error parsing the file. The section {section} is missing the mandatory attribute {attribute}.\nPlease fix before continuing.")