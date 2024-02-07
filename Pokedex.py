import information as info

class Pokedex:
    def __init__(self,):
        self.pokedex = {}
    
    def add_pokemon(self,pokemon):
        #Adds a new pokemon to the current pokedex.
        self.pokedex[pokemon.name] = pokemon
    
    def get_pokemon(self,name):
        return self.pokedex[name]
    
    def update_pokemon(self,current_pokemon,**updates):
        if current_pokemon in self.pokedex:
            for property_name, new_value in updates.items():
                if hasattr(self.pokedex[current_pokemon],property_name):
                    setattr(self.pokedex[current_pokemon],property_name,new_value)
                    print(f"Property {property_name} changed to {new_value}")
                else:
                    print(f"{property_name} is not a valid attribute.")
        else:
            print("No current Pokemon selected.")

    def refresh_pokedex(self):
        tempdict = {}
        for key,value in self.pokedex.items():
            if key == value.name:
                tempdict[key] = value
            else:
                tempdict[value.name] = value
        self.pokedex = tempdict