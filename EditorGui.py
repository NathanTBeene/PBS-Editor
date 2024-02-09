import tkinter as tk
import ttkbootstrap as ttk
import information as info
from tkinter import messagebox as mb
from tkinter import filedialog
from ImportDialog import ImportDialog

class GUI:
    def __init__(self, ROOT,):
      self.ROOT = ROOT
      self.ROOT.title("Pokemon PBS Editor")
      self.ROOT.iconbitmap('icon.ico')
      self.val_num_only = (self.ROOT.register(self._validate_num_only), '%P')
      self.val_num_float = (self.ROOT.register(self._validate_num_float_only), '%P')
      self.val_char_only = (self.ROOT.register(self._validate_char_only), '%P')

      # Menu #
      self.MENU = ttk.Menu(self.ROOT)
      self.FILE_MENU = ttk.Menu(self.MENU)
      self.MENU.add_cascade(label='File',menu=self.FILE_MENU)
      self.FILE_MENU.add_command(label="Open...",command=self.load_pokemon_list)
      self.FILE_MENU.add_command(label="Import...", command = lambda: self.controller.on_import())
      self.FILE_MENU.add_command(label="Export PBS...", command=lambda: self.controller.on_export())
      self.FILE_MENU.add_command(label="Exit", command=self.ROOT.destroy)
      self.MENU.add_command(label="Generate", command=lambda: self.controller.on_generate())
      self.MENU.add_command(label="More", command=lambda:self.controller.on_more())
      self.ROOT.config(menu=self.MENU)

      # Pokemon List #
      self.PLIST_FRAME = tk.Frame(self.ROOT)
      self.PLIST_FRAME.pack(side="left",fill="both",padx=10,pady=10)
      self.LIST_FRAME = ttk.Frame(self.PLIST_FRAME)

      self.PLIST_LIST = tk.Listbox(self.LIST_FRAME,height=10)
      self.PLIST_SCROLL = ttk.Scrollbar(self.LIST_FRAME)
      self.PLIST_LIST.bind("<<ListboxSelect>>",lambda event: self.controller.set_current_pokemon())
      
          #Configure Scrollwheel
      self.PLIST_LIST.config(yscrollcommand=self.PLIST_SCROLL.set)
      self.PLIST_SCROLL.config(command=self.PLIST_LIST.yview)

      self.LIST_FRAME.pack(expand=True,fill="y")
      self.PLIST_LIST.pack(side="left",expand=True,fill="y")
      self.PLIST_SCROLL.pack(side="left",expand=True,fill="y")
      
          #Adding and Removing Pokemon Buttons
      self.PLIST_BUTTON_ADD = tk.Button(self.PLIST_FRAME,text="Add New",command= lambda: self.controller.add_new_pokemon())
      self.PLIST_BUTTON_REMOVE = tk.Button(self.PLIST_FRAME,text="Remove", command= lambda: self.controller.remove_current_pokemon())
      self.PLIST_BUTTON_ADD.pack(padx=2.5,pady=2.5,side="left",fill="both")
      self.PLIST_BUTTON_REMOVE.pack(padx=2.5,pady=2.5,side="left",fill="both")

      # Change Screen #
      OPTIONS_FRAME = tk.Frame(self.ROOT)
      OPTIONS_FRAME.pack(expand=True,side="left",fill="both",padx=10,pady=10)

      # Notebook #
      NOTEBOOK = ttk.Notebook(OPTIONS_FRAME)
      REQUIRED_TAB = ttk.Frame(NOTEBOOK)
      MOVES_TAB = ttk.Frame(NOTEBOOK)
      OPTIONAL_TAB = ttk.Frame(NOTEBOOK)
      MISC_TAB = ttk.Frame(NOTEBOOK)
      NOTEBOOK.add(REQUIRED_TAB,text= "Required")
      NOTEBOOK.add(MOVES_TAB,text= "Moves")
      NOTEBOOK.add(OPTIONAL_TAB,text="Optional")
      NOTEBOOK.add(MISC_TAB,text="Misc")
      NOTEBOOK.pack(expand=True,fill="both")

      # Required Tab #
      REQ_FRAME = ttk.Frame(REQUIRED_TAB)

      REQ_FRAME.pack(side="left")

          # Name #
      self.gui_name = tk.StringVar(value="")
      NAME_FRAME = ttk.Frame(REQ_FRAME)
      NAME_LABEL = ttk.Label(NAME_FRAME,text='Name:')
      NAME_BOX = ttk.Entry(NAME_FRAME,textvariable=self.gui_name)
      self.gui_name.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      NAME_FRAME.pack(pady=5)
      NAME_LABEL.pack(side="left",padx= 5)
      NAME_BOX.pack(side="left")

          # Types #
      self.gui_type1 = tk.StringVar(value="")
      self.gui_type2 = tk.StringVar(value="")
      TYPES_FRAME = ttk.Frame(REQ_FRAME)
      TYPES_LABEL = ttk.Label(TYPES_FRAME,text="Types")
      TYPES_TYPE1 = ttk.Combobox(TYPES_FRAME,values=info.types, textvariable=self.gui_type1,state='readonly')
      TYPES_TYPE2 = ttk.Combobox(TYPES_FRAME,values=info.types, textvariable=self.gui_type2,state='readonly')
      self.gui_type1.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
      self.gui_type2.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      TYPES_FRAME.pack(pady=5)
      TYPES_LABEL.pack(side="left")
      TYPES_TYPE1.pack(side="left",padx=5)
      TYPES_TYPE2.pack(side="left",padx=5)

          # Base Stats #
      BASE_FRAME = ttk.Frame(REQ_FRAME)
      BASE_LABEL = ttk.Label(BASE_FRAME,text="Base Stats: ")
              # HP Stat #
      self.gui_hp = tk.StringVar(value="0")
      HP_FRAME = ttk.Frame(BASE_FRAME)
      HP_LABEL = ttk.Label(HP_FRAME, text="HP")
      HP_BOX = ttk.Spinbox(HP_FRAME,from_=0,to=255,width=3,textvariable=self.gui_hp,validate='key',validatecommand=self.val_num_only)
      self.gui_hp.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # ATK Stat #
      self.gui_atk = tk.StringVar(value="0")
      ATK_FRAME = ttk.Frame(BASE_FRAME)
      ATK_LABEL = ttk.Label(ATK_FRAME, text="ATK")
      ATK_BOX = ttk.Spinbox(ATK_FRAME,from_=0,to=255,width=3, textvariable=self.gui_atk,validate='key',validatecommand=self.val_num_only)
      self.gui_atk.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # DEF Stat #
      self.gui_def = tk.StringVar(value="0")
      DEF_FRAME = ttk.Frame(BASE_FRAME)
      DEF_LABEL = ttk.Label(DEF_FRAME, text="DEF")
      DEF_BOX = ttk.Spinbox(DEF_FRAME,from_=0,to=255,width=3, textvariable=self.gui_def,validate='key',validatecommand=self.val_num_only)
      self.gui_def.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPATK Stat #
      self.gui_spatk = tk.StringVar(value="0")
      SPATK_FRAME = ttk.Frame(BASE_FRAME)
      SPATK_LABEL = ttk.Label(SPATK_FRAME, text="Sp.ATK")
      SPATK_BOX = ttk.Spinbox(SPATK_FRAME,from_=0,to=255,width=3,textvariable=self.gui_spatk,validate='key',validatecommand=self.val_num_only)
      self.gui_spatk.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPDEF Stat #
      self.gui_spdef = tk.StringVar(value="0")
      SPDEF_FRAME = ttk.Frame(BASE_FRAME)
      SPDEF_LABEL = ttk.Label(SPDEF_FRAME, text="Sp.DEF")
      SPDEF_BOX = ttk.Spinbox(SPDEF_FRAME,from_=0,to=255,width=3,textvariable=self.gui_spdef,validate='key',validatecommand=self.val_num_only)
      self.gui_spdef.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPEED Stat #
      self.gui_speed = tk.StringVar(value="0")
      SPEED_FRAME = ttk.Frame(BASE_FRAME)
      SPEED_LABEL = ttk.Label(SPEED_FRAME, text="SPEED")
      SPEED_BOX = ttk.Spinbox(SPEED_FRAME,from_=0,to=255,width=3,textvariable=self.gui_speed,validate='key',validatecommand=self.val_num_only)
      self.gui_speed.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      BASE_FRAME.pack()
      BASE_LABEL.pack(side="left")
      HP_FRAME.pack(side="left")
      HP_LABEL.pack()
      HP_BOX.pack()
      ATK_FRAME.pack(side="left")
      ATK_LABEL.pack()
      ATK_BOX.pack()
      DEF_FRAME.pack(side="left")
      DEF_LABEL.pack()
      DEF_BOX.pack()
      SPATK_FRAME.pack(side="left")
      SPATK_LABEL.pack()
      SPATK_BOX.pack()
      SPDEF_FRAME.pack(side="left")
      SPDEF_LABEL.pack()
      SPDEF_BOX.pack()
      SPEED_FRAME.pack(side="left")
      SPEED_LABEL.pack()
      SPEED_BOX.pack()

          # EV Yield #
      EV_FRAME = ttk.Frame(REQ_FRAME)
      EV_LABEL = ttk.Label(EV_FRAME,text="EV Yield: ")
              # HP Stat #
      self.gui_ev_hp = tk.StringVar(value="0")
      EV_HP_FRAME = ttk.Frame(EV_FRAME)
      EV_HP_LABEL = ttk.Label(EV_HP_FRAME, text="HP")
      EV_HP_BOX = ttk.Spinbox(EV_HP_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_hp,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_hp.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # ATK Stat #
      self.gui_ev_atk = tk.StringVar(value="0")
      EV_ATK_FRAME = ttk.Frame(EV_FRAME)
      EV_ATK_LABEL = ttk.Label(EV_ATK_FRAME, text="ATK")
      EV_ATK_BOX = ttk.Spinbox(EV_ATK_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_atk,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_atk.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # DEF Stat #
      self.gui_ev_def = tk.StringVar(value="0")
      EV_DEF_FRAME = ttk.Frame(EV_FRAME)
      EV_DEF_LABEL = ttk.Label(EV_DEF_FRAME, text="DEF")
      EV_DEF_BOX = ttk.Spinbox(EV_DEF_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_def,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_def.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPATK Stat #
      self.gui_ev_spatk = tk.StringVar(value="0")
      EV_SPATK_FRAME = ttk.Frame(EV_FRAME)
      EV_SPATK_LABEL = ttk.Label(EV_SPATK_FRAME, text="Sp.ATK")
      EV_SPATK_BOX = ttk.Spinbox(EV_SPATK_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_spatk,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_spatk.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPDEF Stat #
      self.gui_ev_spdef = tk.StringVar(value="0")
      EV_SPDEF_FRAME = ttk.Frame(EV_FRAME)
      EV_SPDEF_LABEL = ttk.Label(EV_SPDEF_FRAME, text="Sp.DEF")
      EV_SPDEF_BOX = ttk.Spinbox(EV_SPDEF_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_spdef,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_spdef.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
              # SPEED Stat #
      self.gui_ev_speed = tk.StringVar(value="0")
      EV_SPEED_FRAME = ttk.Frame(EV_FRAME)
      EV_SPEED_LABEL = ttk.Label(EV_SPEED_FRAME, text="SPEED")
      EV_SPEED_BOX = ttk.Spinbox(EV_SPEED_FRAME,from_=0,to=255,width=3,textvariable=self.gui_ev_speed,validate='key',validatecommand=self.val_num_only)
      self.gui_ev_speed.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      EV_FRAME.pack()
      EV_LABEL.pack(side="left")
      EV_HP_FRAME.pack(side="left")
      EV_HP_LABEL.pack()
      EV_HP_BOX.pack()
      EV_ATK_FRAME.pack(side="left")
      EV_ATK_LABEL.pack()
      EV_ATK_BOX.pack()
      EV_DEF_FRAME.pack(side="left")
      EV_DEF_LABEL.pack()
      EV_DEF_BOX.pack()
      EV_SPATK_FRAME.pack(side="left")
      EV_SPATK_LABEL.pack()
      EV_SPATK_BOX.pack()
      EV_SPDEF_FRAME.pack(side="left")
      EV_SPDEF_LABEL.pack()
      EV_SPDEF_BOX.pack()
      EV_SPEED_FRAME.pack(side="left")
      EV_SPEED_LABEL.pack()
      EV_SPEED_BOX.pack()

          # Gender Ratio #
      self.gui_gender_ratio = tk.StringVar(value="")
      GR_FRAME = ttk.Frame(REQ_FRAME)
      GR_LABEL = ttk.Label(GR_FRAME,text="Gender Ratio: ")
      GR_ENTRY = ttk.Combobox(GR_FRAME,values=info.gender_ratio,textvariable=self.gui_gender_ratio,state='readonly')
      self.gui_gender_ratio.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      GR_FRAME.pack(pady=5)
      GR_LABEL.pack(side="left")
      GR_ENTRY.pack(side="left")


          # Growth Rate #
      self.gui_growth_rate = tk.StringVar(value="")
      GROWTH_FRAME = ttk.Frame(REQ_FRAME)
      GROWTH_LABEL = ttk.Label(GROWTH_FRAME,text="Growth Rate: ")
      GROWTH_ENTRY = ttk.Combobox(GROWTH_FRAME,values=info.growth_rate,textvariable=self.gui_growth_rate,state='readonly')
      self.gui_growth_rate.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      GROWTH_FRAME.pack(pady=5)
      GROWTH_LABEL.pack(side="left")
      GROWTH_ENTRY.pack(side="left")


          # Base XP #
      self.gui_base_xp = tk.StringVar(value="")
      BASEXP_FRAME = ttk.Frame(REQ_FRAME)
      BASEXP_LABEL = ttk.Label(BASEXP_FRAME,text="Base XP: ")
      BASEXP_ENTRY = ttk.Spinbox(BASEXP_FRAME,from_=0, to=225,width=6,textvariable=self.gui_base_xp,validate='key',validatecommand=self.val_num_only)
      self.gui_base_xp.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      BASEXP_FRAME.pack(pady=5)
      BASEXP_LABEL.pack(side="left")
      BASEXP_ENTRY.pack(side="left")


          # Catch Rate #
      self.gui_catch_rate = tk.StringVar(value="")
      CATCHRATE_FRAME = ttk.Frame(REQ_FRAME)
      CATCHRATE_LABEL = ttk.Label(CATCHRATE_FRAME,text="Catch Rate: ")
      CATCHRATE_ENTRY = ttk.Spinbox(CATCHRATE_FRAME,from_=0, to=225,width=6,textvariable=self.gui_catch_rate,validate='key',validatecommand=self.val_num_only)
      self.gui_catch_rate.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      CATCHRATE_FRAME.pack(pady=5)
      CATCHRATE_LABEL.pack(side="left")
      CATCHRATE_ENTRY.pack(side="left")


          # Happiness #
      self.gui_happiness = tk.StringVar(value="")
      HAPPINESS_FRAME = ttk.Frame(REQ_FRAME)
      HAPPINESS_LABEL = ttk.Label(HAPPINESS_FRAME,text="Happiness: ")
      HAPPINESS_ENTRY = ttk.Spinbox(HAPPINESS_FRAME,from_=0, to=225,width=6,textvariable=self.gui_happiness,validate='key',validatecommand=self.val_num_only)
      self.gui_happiness.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      HAPPINESS_FRAME.pack(pady=5)
      HAPPINESS_LABEL.pack(side="left")
      HAPPINESS_ENTRY.pack(side="left")


          # Hatch Steps #
      self.gui_hatch_steps = tk.StringVar(value="")
      HATCH_STEPS_FRAME = ttk.Frame(REQ_FRAME)
      HATCH_STEPS_LABEL = ttk.Label(HATCH_STEPS_FRAME,text="Hatch Steps: ")
      HATCH_STEPS_ENTRY = ttk.Spinbox(HATCH_STEPS_FRAME,from_=0, to=9999,width=6,textvariable=self.gui_hatch_steps,validate='key',validatecommand=self.val_num_only)
      self.gui_hatch_steps.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      HATCH_STEPS_FRAME.pack(pady=5)
      HATCH_STEPS_LABEL.pack(side="left")
      HATCH_STEPS_ENTRY.pack(side="left")


          # Height #
      self.gui_height = tk.StringVar(value="")
      HEIGHT_FRAME = ttk.Frame(REQ_FRAME)
      HEIGHT_LABEL = ttk.Label(HEIGHT_FRAME,text='Height:')
      HEIGHT_BOX = ttk.Entry(HEIGHT_FRAME,width=10,textvariable=self.gui_height,validate='key',validatecommand=self.val_num_float)
      self.gui_height.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      HEIGHT_FRAME.pack(pady=5)
      HEIGHT_LABEL.pack(side="left",padx= 5)
      HEIGHT_BOX.pack(side="left")


          # Weight #
      self.gui_weight = tk.StringVar(value="")
      WEIGHT_FRAME = ttk.Frame(REQ_FRAME)
      WEIGHT_LABEL = ttk.Label(WEIGHT_FRAME,text='Weight:')
      WEIGHT_BOX = ttk.Entry(WEIGHT_FRAME,width=10, textvariable=self.gui_weight,validate='key',validatecommand=self.val_num_float)
      self.gui_weight.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      WEIGHT_FRAME.pack(pady=5)
      WEIGHT_LABEL.pack(side="left",padx= 5)
      WEIGHT_BOX.pack(side="left")


          # Color #
      self.gui_color = tk.StringVar(value="")
      COLOR_FRAME = ttk.Frame(REQ_FRAME)
      COLOR_LABEL = ttk.Label(COLOR_FRAME,text="Color: ")
      COLOR_ENTRY = ttk.Combobox(COLOR_FRAME,values=info.color,width=8,textvariable=self.gui_color,state='readonly')
      self.gui_color.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      COLOR_FRAME.pack(pady=5)
      COLOR_LABEL.pack(side="left")
      COLOR_ENTRY.pack(side="left")


          # Shape #
      self.gui_shape = tk.StringVar(value="")
      SHAPE_FRAME = ttk.Frame(REQ_FRAME)
      SHAPE_LABEL = ttk.Label(SHAPE_FRAME,text="Shape: ")
      SHAPE_ENTRY = ttk.Combobox(SHAPE_FRAME,values=info.body_shape,width=15,textvariable=self.gui_shape,state='readonly')
      self.gui_shape.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      SHAPE_FRAME.pack(pady=5)
      SHAPE_LABEL.pack(side="left")
      SHAPE_ENTRY.pack(side="left")


          # Habitat #
      self.gui_habitat = tk.StringVar(value="")
      HABITAT_FRAME = ttk.Frame(REQ_FRAME)
      HABITAT_LABEL = ttk.Label(HABITAT_FRAME,text="Habitat: ")
      HABITAT_ENTRY = ttk.Combobox(HABITAT_FRAME,values=info.habitat,width=8,textvariable=self.gui_habitat,state='readonly')
      self.gui_habitat.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      HABITAT_FRAME.pack(pady=5)
      HABITAT_LABEL.pack(side="left")
      HABITAT_ENTRY.pack(side="left")


          # Category #
      self.gui_category = tk.StringVar(value="")
      CATEGORY_FRAME = ttk.Frame(REQ_FRAME)
      CATEGORY_LABEL = ttk.Label(CATEGORY_FRAME,text='The ')
      CATEGORY_BOX = ttk.Entry(CATEGORY_FRAME,width=25,textvariable=self.gui_category)
      CATEGORY_LABEL2 = ttk.Label(CATEGORY_FRAME,text='Pokemon')
      self.gui_category.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      CATEGORY_FRAME.pack(pady=5)
      CATEGORY_LABEL.pack(side="left",padx= 5)
      CATEGORY_BOX.pack(side="left")
      CATEGORY_LABEL2.pack(side="left",padx= 5)


          # Generation #
      self.gui_generation = tk.StringVar(value='0')
      GENERATION_FRAME = ttk.Frame(REQ_FRAME)
      GENERATION_LABEL = ttk.Label(GENERATION_FRAME,text="Generation: ")
      GENERATION_ENTRY = ttk.Spinbox(GENERATION_FRAME,from_=0, to=99,width=6,textvariable=self.gui_generation,validate='key',validatecommand=self.val_num_only)
      self.gui_generation.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      GENERATION_FRAME.pack(pady=5)
      GENERATION_LABEL.pack(side="left")
      GENERATION_ENTRY.pack(side="left")


          # Abilities #
      self.gui_ability1 = tk.StringVar(value="")
      self.gui_ability2 = tk.StringVar(value="")
      ABILITY_FRAME = ttk.Frame(REQ_FRAME)
      ABILITY_LABEL = ttk.Label(ABILITY_FRAME,text="Abilities: ")
      ABILITY_TYPE1 = ttk.Combobox(ABILITY_FRAME,values=info.abilities,textvariable=self.gui_ability1,state='readonly')
      ABILITY_TYPE2 = ttk.Combobox(ABILITY_FRAME,values=info.abilities,textvariable=self.gui_ability2,state='readonly')
      self.gui_ability1.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
      self.gui_ability2.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      ABILITY_FRAME.pack(pady=5)
      ABILITY_LABEL.pack(side="left")
      ABILITY_TYPE1.pack(side="left")
      ABILITY_TYPE2.pack(side="left")


          # Hidden Abilities #
      self.gui_hidden_ability1 = tk.StringVar(value="")
      self.gui_hidden_ability2 = tk.StringVar(value="")
      HABILITY_FRAME = ttk.Frame(REQ_FRAME)
      HABILITY_LABEL = ttk.Label(HABILITY_FRAME,text="Hidden Abilities: ")
      HABILITY_TYPE1 = ttk.Combobox(HABILITY_FRAME,values=info.abilities,textvariable=self.gui_hidden_ability1,state='readonly')
      HABILITY_TYPE2 = ttk.Combobox(HABILITY_FRAME,values=info.abilities,textvariable=self.gui_hidden_ability2,state='readonly')
      self.gui_hidden_ability1.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
      self.gui_hidden_ability2.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      HABILITY_FRAME.pack(pady=5)
      HABILITY_LABEL.pack(side="left")
      HABILITY_TYPE1.pack(side="left")
      HABILITY_TYPE2.pack(side="left")


          # Egg Groups #
      self.gui_egg_group1 = tk.StringVar(value="")
      self.gui_egg_group2 = tk.StringVar(value="")
      EGG_GROUP_FRAME = ttk.Frame(REQ_FRAME)
      EGG_GROUP_LABEL = ttk.Label(EGG_GROUP_FRAME,text="Egg Groups: ")
      EGG_GROUP_TYPE1 = ttk.Combobox(EGG_GROUP_FRAME,values=info.egg_groups,textvariable=self.gui_egg_group1,state='readonly')
      EGG_GROUP_TYPE2 = ttk.Combobox(EGG_GROUP_FRAME,values=info.egg_groups,textvariable=self.gui_egg_group2,state='readonly')
      self.gui_egg_group1.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))
      self.gui_egg_group2.trace_add('write',lambda x,y,z: self.controller.update_pokemon_from_gui(None,None))

      EGG_GROUP_FRAME.pack(pady=5)
      EGG_GROUP_LABEL.pack(side="left")
      EGG_GROUP_TYPE1.pack(side="left")
      EGG_GROUP_TYPE2.pack(side="left")



          # Moveset #
          
      gui_moveset_move = tk.StringVar(value="")
      gui_moveset_level = tk.IntVar(value=0)
      MOVESET_FRAME = ttk.Frame(MOVES_TAB)
      MOVESET_LABEL = ttk.Label(MOVESET_FRAME,text="Moveset")
      self.MOVESET_LIST = tk.Listbox(MOVESET_FRAME,width=40)
      MOVESET_BTN_FRAME = ttk.Frame(MOVESET_FRAME)
      MOVESET_BTN_ADD = ttk.Button(MOVESET_BTN_FRAME,text="Add",command=lambda: self.controller.add_move(gui_moveset_level.get(),gui_moveset_move.get()))
      MOVESET_BTN_REMOVE = ttk.Button(MOVESET_BTN_FRAME,text="Remove",command=lambda: self.controller.remove_move())
      MOVESET_MOVES_FRAME = ttk.Frame(MOVESET_FRAME)
      MOVESET_MOVES_LABEL = ttk.Label(MOVESET_MOVES_FRAME,text="Moves:")
      MOVESET_MOVES = ttk.Combobox(MOVESET_MOVES_FRAME,values=info.moves,textvariable=gui_moveset_move,state='readonly')
      MOVESET_LEVEL_FRAME = ttk.Frame(MOVESET_FRAME)
      MOVESET_LEVEL_LABEL = ttk.Label(MOVESET_LEVEL_FRAME,text="Level:")
      MOVESET_LEVEL = ttk.Spinbox(MOVESET_LEVEL_FRAME,from_=0,to=100, width=5,textvariable=gui_moveset_level,validate='key',validatecommand=self.val_num_only)

      MOVESET_FRAME.pack()
      MOVESET_LABEL.pack()
      self.MOVESET_LIST.pack()
      MOVESET_BTN_FRAME.pack()
      MOVESET_BTN_ADD.pack(side="left")
      MOVESET_BTN_REMOVE.pack(side="left")
      MOVESET_MOVES_FRAME.pack()
      MOVESET_MOVES_LABEL.pack(side="left")
      MOVESET_MOVES.pack(side="left")
      MOVESET_LEVEL_FRAME.pack()
      MOVESET_LEVEL_LABEL.pack(side="left")
      MOVESET_LEVEL.pack(side="left")


          # Tutor Moves #
          
      gui_tutor_moveset_move = tk.StringVar(value="")
      TUTOR_MOVESET_FRAME = ttk.Frame(MOVES_TAB)
      TUTOR_MOVESET_LABEL = ttk.Label(TUTOR_MOVESET_FRAME,text="Tutor Moveset")
      self.TUTOR_MOVESET_LIST = tk.Listbox(TUTOR_MOVESET_FRAME,width=40)
      TUTOR_MOVESET_BTN_FRAME = ttk.Frame(TUTOR_MOVESET_FRAME)
      TUTOR_MOVESET_BTN_ADD = ttk.Button(TUTOR_MOVESET_BTN_FRAME,text="Add",command=lambda: self.controller.add_tutor_move(gui_tutor_moveset_move.get()))
      TUTOR_MOVESET_BTN_REMOVE = ttk.Button(TUTOR_MOVESET_BTN_FRAME,text="Remove",command=lambda: self.controller.remove_tutor_move())
      TUTOR_MOVESET_MOVES_FRAME = ttk.Frame(TUTOR_MOVESET_FRAME)
      TUTOR_MOVESET_MOVES_LABEL = ttk.Label(TUTOR_MOVESET_MOVES_FRAME,text="Moves:")
      TUTOR_MOVESET_MOVES = ttk.Combobox(TUTOR_MOVESET_MOVES_FRAME,values=info.moves,textvariable=gui_tutor_moveset_move,state='readonly')

      TUTOR_MOVESET_FRAME.pack()
      TUTOR_MOVESET_LABEL.pack()
      self.TUTOR_MOVESET_LIST.pack()
      TUTOR_MOVESET_BTN_FRAME.pack()
      TUTOR_MOVESET_BTN_ADD.pack(side="left")
      TUTOR_MOVESET_BTN_REMOVE.pack(side="left")
      TUTOR_MOVESET_MOVES_FRAME.pack()
      TUTOR_MOVESET_MOVES_LABEL.pack(side="left")
      TUTOR_MOVESET_MOVES.pack(side="left")


          # Egg Moves #
          
      gui_egg_moveset_move = tk.StringVar(value="")
      EGG_MOVESET_FRAME = ttk.Frame(MOVES_TAB)
      EGG_MOVESET_LABEL = ttk.Label(EGG_MOVESET_FRAME,text="Egg Moveset")
      self.EGG_MOVESET_LIST = tk.Listbox(EGG_MOVESET_FRAME,width=40)
      EGG_MOVESET_BTN_FRAME = ttk.Frame(EGG_MOVESET_FRAME)
      EGG_MOVESET_BTN_ADD = ttk.Button(EGG_MOVESET_BTN_FRAME,text="Add",command=lambda: self.controller.add_egg_move(gui_egg_moveset_move.get()))
      EGG_MOVESET_BTN_REMOVE = ttk.Button(EGG_MOVESET_BTN_FRAME,text="Remove",command=lambda: self.controller.remove_egg_move())
      EGG_MOVESET_MOVES_FRAME = ttk.Frame(EGG_MOVESET_FRAME)
      EGG_MOVESET_MOVES_LABEL = ttk.Label(EGG_MOVESET_MOVES_FRAME,text="Moves:")
      EGG_MOVESET_MOVES = ttk.Combobox(EGG_MOVESET_MOVES_FRAME,values=info.moves,textvariable=gui_egg_moveset_move,state='readonly')

      EGG_MOVESET_FRAME.pack()
      EGG_MOVESET_LABEL.pack()
      self.EGG_MOVESET_LIST.pack()
      EGG_MOVESET_BTN_FRAME.pack()
      EGG_MOVESET_BTN_ADD.pack(side="left")
      EGG_MOVESET_BTN_REMOVE.pack(side="left")
      EGG_MOVESET_MOVES_FRAME.pack()
      EGG_MOVESET_MOVES_LABEL.pack(side="left")
      EGG_MOVESET_MOVES.pack(side="left")
      
      
      
      
      
      self.gui_details = {
          'name': self.gui_name,
          'types': {'type1':self.gui_type1,'type2':self.gui_type2},
          'base_stats': {'hp': self.gui_hp,'atk': self.gui_atk,'def': self.gui_def,'spatk': self.gui_spatk,'spdef': self.gui_spdef,'speed': self.gui_speed},
          'ev_stats': {'HP': self.gui_ev_hp,'ATTACK': self.gui_ev_atk,'DEFENSE': self.gui_ev_def,'SPECIAL_ATTACK': self.gui_ev_spatk,'SPECIAL_DEFENSE': self.gui_ev_spdef,'SPEED': self.gui_ev_speed,},
          'gender_ratio': self.gui_gender_ratio,
          'growth_rate': self.gui_growth_rate,
          'base_exp': self.gui_base_xp,
          'catch_rate': self.gui_catch_rate,
          'happiness': self.gui_happiness,
          'abilities': {'ability1':self.gui_ability1,'ability2':self.gui_ability2},
          'hidden_abilities': {'hidden_ability1':self.gui_hidden_ability1,'hidden_ability2':self.gui_hidden_ability2},
          'height': self.gui_height,
          'weight': self.gui_weight,
          'hatch_steps': self.gui_hatch_steps,
          'color': self.gui_color,
          'shape': self.gui_shape,
          'habitat': self.gui_habitat,
          'category': self.gui_category,
          'generation': self.gui_generation,
          'egg_groups': {'egg_group1':self.gui_egg_group1,'egg_group2':self.gui_egg_group2},
      }
    
    def _validate_num_only(self,P):
        return P.isdigit() or P == ""
    
    
    def _validate_char_only(self,P):
        return not P.isdigit()
    
    
    def _validate_num_float_only(self,P):
        if " " in P:
            return False
        # Allow empty input to enable clearing the field
        if P == "":
            return True
        # Try converting the input to a float
        try:
            float(P)
            return True
        except ValueError:
            return False
    
    def set_controller(self,controller):
        self.controller = controller
    
    def load_pokemon_list(self):
        file_path = filedialog.askopenfilename(filetypes=[("Text Files","*.txt")],initialdir='PBS FILES')
        if file_path:
            res=mb.askquestion('Overrite List', 'Are you sure you want to override the current list of Pokemon?')
            if res == 'yes' :
                self.controller.load_pokedex(file_path)
            else:
                return
    
    

            