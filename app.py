import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox as mb
import ttkbootstrap as ttk
import information as info
from EditorGui import GUI
from PokedexController import Controller
import os

#Setup Initials
root = ttk.Window(themename='darkly')
gui = GUI(root)
controller = Controller()

# Establish References
gui.set_controller(controller)
controller.set_gui(gui)

def main():
    root.mainloop()


if __name__ == "__main__":
    main()
    
    
    