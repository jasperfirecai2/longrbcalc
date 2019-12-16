import math
import pandas as pd


datadict = pd.read_csv("vars.csv", index_col=0, header=None, squeeze=True).to_dict()
print(datadict)
Boosts = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
index = Boosts.index(int(datadict['largestboost']))
summ = 0
for b in Boosts[index:]:
    summ += b
recycling = summ / datadict['largestboost']
base_blood = [50.0, 40.0, 30.0, 20.0, 15.0, (250/18), (320/25)]  # how much more blood the next ritual gives
base_blood.reverse()
adv_perks = [[100, 0.001], [1000, 0.001], [10000, 0.0005], [100000, 0.0005], [1000000, 0.0005]]
current = int(datadict['current'])
basetoughness = datadict['basetoughness']

def ATstats(x: int):
    return math.pow(x, 0.4) * 10


def BEARdstats(x: int):
    return math.pow(x, 0.3) * 125.9 * 10


def NGUastats(x: int):
    return math.sqrt(x) * 3.17


def eNGUastats(x: int):
    return math.pow(x, 0.25) * 8.8945


def NGUbstats(x: int):
    return math.pow(x, 0.4) * 1.894


def eNGUbstats(x: int):
    return math.pow(x, 0.25) * 2.6675


def cubegains(value, time_in_pod, cube_wish=0, base_cube_ratio=0.01, idle_cd=0.8):
    cube_ratio = base_cube_ratio * (1 + cube_wish * 0.05)
    cube_equivalent = value * recycling * cube_ratio
    gains = time_in_pod/(respawn + idle_cd) * 0.14 * cube_equivalent
    return gains


def fruitgains(firstHarvest=1, yggyield_equip=1.63, tier=24, blueheart=1.1, poop=1.5, **kwargs):
    return math.ceil(math.pow(tier, 1.5)) * (poop * blueheart) * math.pow(basetoughness, 0.2) * datadict['nguygg'] * yggyield_equip * firstHarvest


def ironpill(time_making_blood=11.5*60*60):
    blood_spent = datadict['bps'] * time_making_blood
    temp = datadict['bps']
    for b in base_blood:
        temp = temp / b
        blood_spent += temp * time_making_blood
    return math.pow(blood_spent, 0.25) * datadict['ironpillsucks1'] * datadict['ironpillsucks2']


def ppgains(time_in_pod, idle_cd=0.8):
    pp = math.floor(time_in_pod/(respawn+idle_cd) * datadict['ppppk'] / 1000000)
    perklevels = math.floor(pp/adv_perks[int(datadict['adv_perk'])-1][0])
    return adv_perk_current_bonus + adv_perks[int(datadict['adv_perk'])-1][1] * perklevels


# this is crap
# subtotal = float(input("Input your current subtotal stats in BILLIONS (power + toughness)\n>")) * 1000000000
# basetoughness = int(input("Input your current base toughness\n>"))
# nguygg = float(input("Input your current ngu YGG modifier (as percentage/100)\n>"))
# fruitquirk = float(input("Input the level of your faster fruit quirk\n>"))
# boostvalue = float(input("Input your current total value for your 5k boost (the script calculates recycling)\n>"))
# respawn = float(input("Input your current respawn in your currently equipped gear (in seconds)\n>"))
# current = int(input("Input your current AT/BEARd levels\n>"))
# currentNGUa = int(input("Input your current NGU a levels\n>"))
# currenteNGUa = int(input("Input your current evil NGU a levels\n>"))
# currentNGUb = int(input("Input your current NGU b levels\n>"))
# currenteNGUb = int(input("Input your current evil NGU b levels\n>"))
# goalmulti = int(input("How much larger do you want your P/T?\n>"))


respawn = math.ceil(50*(4*datadict['respawn']/100))/50
adv_perk_current_bonus = 1 + adv_perks[int(datadict['adv_perk'])-1][1] * datadict['adv_perk_levels']
currentAT = ATstats(current)
currentBEARd = BEARdstats(current)
totalmulti = currentBEARd * currentAT * \
             eNGUastats(datadict['currenteNGUa']) * \
             NGUastats(datadict['currentNGUa']) * \
             eNGUbstats(datadict['currenteNGUb']) * \
             NGUbstats(datadict['currentNGUb']) * \
             adv_perk_current_bonus

for i in range(current+50, current * 100, 50 * 60):
    start = i - current
    if start / 60 / 60 / 11.5 >= 1:
        harvests = math.floor(start / 60 / (60 - datadict['fruitquirk']) / 24)
        ironpills = math.floor(start / 60 / 60 / 11.5)
        if harvests == 1:
            fruit = fruitgains()
        else:
            fruit = fruitgains() + (harvests-1) * fruitgains(firstHarvest=0)
        ironstats = ironpill() * ironpills
        basetoughness = datadict['basetoughness'] + fruit + ironstats
    else:
        fruit = 0
        ironstats = 0.0
    cube = cubegains(datadict['boostvalue'], ((i - current) / 50), 20, 0.02)
    perks = ppgains(((i - current) / 50))
    statincrease = (datadict['subtotal'] + fruit + ironstats + cube) / datadict['subtotal']
    ttemp = ATstats(i) * \
           BEARdstats(i) * \
           NGUastats(start + datadict['currentNGUa']) * \
           eNGUastats(start + datadict['currenteNGUa']) * \
           NGUbstats(start + datadict['currentNGUb']) * \
           eNGUbstats(start + datadict['currenteNGUb']) * \
           perks * \
           statincrease
    if ttemp >= totalmulti * datadict['goalmulti']:
        ttime = (i - current) / (50*60*60*24)
        print(f'\n\nYou would need {ttime} days (estimate)\n\n\n'
              f'This script currently still does not account for:\n'
              f'Money pit (and probably won\'t cuz it\'s rng\n'
              f'Buying base stats\n'
              f'Cube softcap\n'
              f'Non-adv NGU gains\n'
              f'Pretty much anything sadistic\n'
              f'This script DOES account for:\n'
              f'Cube gains\n'
              f'Adv perk levels\n'
              f'Fruit of adventure (lol)(first harvest assumed for first one)\n'
              f'Iron pills\n'
              f'Ngu (a, b, evil, normal)\n'
              f'AT/BEARd levels\n')
        break

