import os
import sys
import json

with open('./package/versions.json', 'r', encoding='utf-8') as ver:
    data = json.load(ver)



game_ver = input('Type your game version:')



for i in data:
    print(i[game_ver])

# print(data)