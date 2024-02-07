import tkinter as tk
import ttkbootstrap as ttk
from tkinter import messagebox as mb
from tkinter import simpledialog

class ImportDialog(simpledialog.Dialog):
    def __init__(self, parent, title, options):
        self.options = options
        super().__init__(parent, title=title)
        
        
    def body(self,master):
        self.listbox = tk.Listbox(master,selectmode=tk.MULTIPLE)
        self.listbox.pack()
        
        for item in self.options:
            self.listbox.insert('end', item)
            
        return self.listbox

    def apply(self):
        self.result = [self.listbox.get(i) for i in self.listbox.curselection()]
