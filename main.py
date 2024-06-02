import os
import threading

import tkinter

import requests as requests
import webview
import eel

from win32api import GetSystemMetrics
from pynput import keyboard, mouse

version = 0.1

# Unfinished
settings = {
    'KeyStrokes': True,
    'KeyStrokesPos': 0,

    'Crosshair': True,
    'ADSCrosshair': True,

    'ActionBar': True
}

width = GetSystemMetrics(0)
height = GetSystemMetrics(1)

held_keys = set()

def on_press(key):
    try: held_keys.add(str(key.char).upper())
    except AttributeError: held_keys.add(str(key.name).upper())

def on_release(key):
    try: held_keys.discard(str(key.char).upper())
    except AttributeError: held_keys.discard(str(key.name).upper())

def on_click(x, y, button, pressed):
    button_name = 'MOUSE.' + str(button).split('.')[1].upper()
    if pressed: held_keys.add(button_name)
    else: held_keys.discard(button_name)

@eel.expose()
def isShiftLocked(): return mouse.Controller().position == (round(GetSystemMetrics(0) / 2), round(GetSystemMetrics(1) / 2))

@eel.expose()
def getHeldKeys(): return list(held_keys)

# Render HTML
def render():
    eel.init("screen")
    eel.start('index.html', port=1337, block=True, mode=False)

listener = keyboard.Listener(on_press=on_press, on_release=on_release)
listener.start()

mouse_listener = mouse.Listener(on_click=on_click)
mouse_listener.start()

threading.Thread(target=render).start()
webview.create_window(f'ROverlay {version}', 'http://localhost:1337/index.html',
                      width=width, height=height,
                      easy_drag=False, frameless=True, transparent=True,
                      on_top=True, fullscreen=True)

os.system(f'title ROverlay {version}')

print("Checking For Updates...")
sv = float(requests.get('https://shadowocto.dev/roverlay/version').text)

if sv > version: print("A new version is avaliable! Download at https://github.com/ShadowOcto/ROverlay")
else: print("No Updates Found!")
os.system('title ROverlay Console')

webview.start()
print("Closing...")