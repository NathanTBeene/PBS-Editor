from Pokedex import Pokedex
from Pokemon import Pokemon
from ImportDialog import ImportDialog
import tkinter as tk
from tkinter import simpledialog
from tkinter import filedialog
from tkinter import messagebox as mb
import information as info

is_programmatic_update = False

class Controller:
    def __init__(self,):
        self.manager = Pokedex()
        self.current_pokemon = ""
    
    
    def no_current_pokemon_message():
        mb.showerror("No pokemon", "There is no selected Pokemon. Please select a pokemon before continuing.")
        return
    
    
    def set_gui(self,gui):
        self.gui = gui
    
    
    def load_pokedex(self,file_path):
        list = info.create_pokemon_list(file_path)
        if list != None:
            self.manager.pokedex = list
            self.gui.PLIST_LIST.delete(0,'end')
            for key in self.manager.pokedex:
                self.gui.PLIST_LIST.insert('end',self.manager.pokedex[key].name)
            
            
    def refresh_pokemon_list(self):
        listbox = self.gui.PLIST_LIST
        pokedex = self.manager.pokedex
        index = 0
        for key,value in pokedex.items():
            if value.name != listbox.get(index):
                listbox.delete(index)
                listbox.insert(index,value.name)
            index += 1
    
    def clear_pokemon_list(self):
        listbox = self.gui.PLIST_LIST
        listbox.delete(0,'end')
    
    def add_new_pokemon(self):
        listbox = self.gui.PLIST_LIST
        name = simpledialog.askstring('Name', 'Please provide a name for the new Pokemon')
        new = Pokemon(name=f"{name}")
        self.manager.add_pokemon(new)
        self.refresh_pokemon_list()
        list_size = listbox.size()
        for i in range(list_size):
            if listbox.get(i) == name:
                listbox.selection_clear(0,'end')
                listbox.selection_set(i)
                listbox.activate(i)
        self.set_current_pokemon()
    
    
    def remove_current_pokemon(self):
        if self.current_pokemon:
            name = self.current_pokemon
            res=mb.askquestion('Remove Pokemon', f'Are you sure you want to remove {name} from the current list of Pokemon?')
            if res == 'yes' :
                self.manager.pokedex.pop(name)
                self.manager.refresh_pokedex()
                self.clear_pokemon_list()
                self.refresh_pokemon_list()
                self.current_pokemon = None
            else:
                return
        else:
            self.no_current_pokemon_message()
        
    
        
    def set_current_pokemon(self):
        global is_programmatic_update
        is_programmatic_update = True
        selection = self.gui.PLIST_LIST.curselection()
        if selection:
            index = selection[0]
            name = self.gui.PLIST_LIST.get(index)
        
            #Sets the current pokemon based on a string name
            if name in self.manager.pokedex:
                self.current_pokemon = self.manager.pokedex[name].name
                self.update_gui_with_selected_pokemon(self.gui.gui_details,self.manager.pokedex[self.current_pokemon].__dict__)
            else:
                print("Name not in collection")
                return None
            is_programmatic_update = False
        
        
    def update_gui_with_selected_pokemon(self,gui_details,class_attributes):
        for key,value in class_attributes.items():
            if key in gui_details:
                if isinstance(value,dict) and isinstance(gui_details[key],dict):
                    self.update_gui_with_selected_pokemon(gui_details[key],value)
                else:
                    if isinstance(gui_details[key],tk.Variable):
                        gui_details[key].set(value)
                    else:
                        gui_details[key] = value
            if key == 'moves':
                print('updating moves')
                self.update_moves_gui()
            elif key == 'tutor_moves':
                print('updating tutor moves')
                self.update_tutor_moves_gui()
            elif key == 'egg_moves':
                print('updating egg moves')
                self.update_egg_moves_gui()
                
        
    
    
    def update_moves_gui(self):
        current_pokemon = self.current_pokemon
        list = self.gui.MOVESET_LIST
        moves_dict = self.manager.pokedex[current_pokemon].moves
        list.delete(0,'end')
        
        if moves_dict:
            for level,moves in moves_dict.items():
                for move in moves:
                    list.insert('end',f"{level}, {move}")
    
    
    def update_tutor_moves_gui(self):
        current_pokemon = self.current_pokemon
        list = self.gui.TUTOR_MOVESET_LIST
        moves_list = self.manager.pokedex[current_pokemon].tutor_moves
        list.delete(0,'end')
        
        if moves_list:
            for move in moves_list:
                list.insert('end',move)
    
    
    def update_egg_moves_gui(self):
        current_pokemon = self.current_pokemon
        print(current_pokemon)
        list = self.gui.EGG_MOVESET_LIST
        moves = self.manager.pokedex[current_pokemon].egg_moves
        if moves:
            for move in moves:
                list.insert('end',move)
        
        
    
    
    def update_pokemon_from_gui(self,gui_details,class_attributes):
        if self.current_pokemon:
            global is_programmatic_update
            gui_details = self.gui.gui_details if gui_details == None else gui_details
            class_attributes = self.manager.pokedex[self.current_pokemon].__dict__ if class_attributes == None else class_attributes
            if not is_programmatic_update:
                for key,value in gui_details.items():
                    if key in class_attributes:
                        if isinstance(value,dict) and isinstance(class_attributes[key],dict):
                            self.update_pokemon_from_gui(value,class_attributes[key])
                        else:
                            if isinstance(gui_details[key], tk.Variable):
                                #Check if instances are already equal. If so, ignore set
                                if  class_attributes[key] != gui_details[key].get():
                                    print(f"{key} changed from {class_attributes[key]} to {gui_details[key].get()}")
                                    class_attributes[key] = gui_details[key].get()
                                    self.manager.refresh_pokedex()
                                    selection = self.gui.PLIST_LIST.curselection()
                                    if selection:
                                        index = selection[0]
                                        self.refresh_pokemon_list()
                                        name = self.gui.PLIST_LIST.get(index)
                                        self.gui.PLIST_LIST.selection_set(index)
                                        self.gui.PLIST_LIST.activate(index)
                                        self.current_pokemon = name
        else:
            mb.showerror("No pokemon", "There is no selected Pokemon. Please select a pokemon before continuing.")  
    
        
    def get_current_pokemon(self):
        #Get instance of current pokemon.
        if self.current_pokemon:
            return self.manager.get_pokemon(self.current_pokemon)
        else:
            print("No current pokemon selected")
            return None
        
        
    def add_move(self,level,move):
        if self.current_pokemon:
            if move == "":
                mb.showerror("No Move Selected",'You are trying to add without selecting a move. Please select a move.')
            else:
                pokemon = self.manager.pokedex[self.current_pokemon]
                if level in pokemon.moves:
                    pokemon.moves[level].append(move)
                else:
                    pokemon.moves[level] = [move]
                print(f"Move {move} learned at level {level} added.")
                self.update_moves_gui()
        else:
            self.no_current_pokemon_message()
            
    def remove_move(self):
        if self.current_pokemon:
            moves = self.manager.pokedex[self.current_pokemon].moves
            listbox = self.gui.MOVESET_LIST
            selection = listbox.curselection()
            if selection:
                index = selection[0]
                name = listbox.get(index)
                split = name.strip().split(',')
                level = int(split[0])
                move_to_remove = split[1].strip()
                for move in moves[level]:
                    if move == move_to_remove:
                        moves[level].remove(move)
                        self.update_moves_gui()
            else:
                mb.showerror("No Move Selected",'You have not selected a move to remove. Please select a move before trying to remove it from the list.')

        else:
            self.no_current_pokemon_message()


    def add_tutor_move(self,move):
        if self.current_pokemon:
            if move == "":
                mb.showerror("No Move Selected",'You are trying to add without selecting a move. Please select a move.')
            else:
                pokemon = self.manager.pokedex[self.current_pokemon]
                if move in pokemon.tutor_moves:
                    mb.showwarning("Move already in list", 'The chosen move is already in the list.')
                else:
                    print(f"Move {move} added to tutor moveset.")
                    pokemon.tutor_moves.append(move)
                self.update_tutor_moves_gui()
        else:
            self.no_current_pokemon_message()
       
            
    def remove_tutor_move(self):
        if self.current_pokemon:
            moves = self.manager.pokedex[self.current_pokemon].tutor_moves
            listbox = self.gui.TUTOR_MOVESET_LIST
            selection = listbox.curselection()
            if selection:
                index = selection[0]
                name = listbox.get(index)
                if name in moves:
                    moves.remove(name)
                    self.update_tutor_moves_gui()
            else:
                mb.showerror("No Move Selected",'You have not selected a move to remove. Please select a move before trying to remove it from the list.')

        else:
            self.no_current_pokemon_message()


    def add_egg_move(self,move):
        if self.current_pokemon:
            if move == "":
                mb.showerror("No Move Selected",'You are trying to add without selecting a move. Please select a move.')
            else:
                pokemon = self.manager.pokedex[self.current_pokemon]
                if move in pokemon.egg_moves:
                    mb.showwarning("Move already in list", 'The chosen move is already in the list.')
                else:
                    print(f"Move {move} added to egg moveset.")
                    pokemon.egg_moves.append(move)
                self.update_egg_moves_gui()
        else:
            self.no_current_pokemon_message()
       
            
    def remove_egg_move(self):
        if self.current_pokemon:
            moves = self.manager.pokedex[self.current_pokemon].egg_moves
            listbox = self.gui.EGG_MOVESET_LIST
            selection = listbox.curselection()
            if selection:
                index = selection[0]
                name = listbox.get(index)
                if name in moves:
                    moves.remove(name)
                    self.update_egg_moves_gui()
            else:
                mb.showerror("No Move Selected",'You have not selected a move to remove. Please select a move before trying to remove it from the list.')

        else:
            self.no_current_pokemon_message()
    
    
    def on_import(self):
        file_path = filedialog.askopenfilename(filetypes=[("Text Files","*.txt")],initialdir='PBS FILES')
        if file_path:
            pokemon_list = info.create_pokemon_list(file_path)
            options = []
            if pokemon_list:
                for key,value in pokemon_list.items():
                    options.append(key)
                dialog = ImportDialog(self.gui.ROOT,"Import Options",options)
                
                if dialog.result:
                    pokemon_to_import = dialog.result
                    for name in pokemon_to_import:
                        self.manager.pokedex[name] = pokemon_list[name]
                    self.refresh_pokemon_list()
    
    def on_export(self):
        if self.gui.PLIST_LIST.size() <= 0:
            mb.showerror("No Pokemon to Export", "There are no Pokemon in the list to export. Please create a Pokemon before trying to export.")
            return
        else:
            export_path = filedialog.askdirectory(initialdir='PBS FILES/Export')
            if export_path:
                info.export_pokemon(export_path,self.manager.pokedex)
        
    
    def on_generate(self):
        mb.showinfo("No Implementation", "This feature has not been implemented yet. Please check the forums for updates.")
        
        
    def on_more(self):
        mb.showinfo("No Implementation", "This feature has not been implemented yet. Please check the forums for updates.")