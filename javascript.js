const selectInput = document.getElementById('weapon');
const upgradeInput = document.getElementById('upgrade');
const strInput = document.getElementById('str')
const dexInput = document.getElementById('dex');
const bossInput = document.getElementById('boss');
const calculationButton = document.querySelector('.calculate');
const showNumber = document.querySelector('div.result');
let baseAttack;
let bossHp;
let index;

let weaponDict = {
    "Short Sword": [102, 107, 113, 119, 125, 131, 137, 143, 149, 155, 161, 167, 172, 178, 184, 190, 196, 202, 208, 214, 220, 226, 232, 238, 243, 249],
    "Longsword": [110, 116, 122, 129, 135, 141, 148, 154, 161, 167, 173, 180, 186, 192, 199, 205, 212, 218, 224, 231, 237, 243, 250, 256, 263, 269],
    "Broadsword": [117, 123, 130, 137, 144, 150, 157, 164, 171, 178, 184, 191, 198, 205, 212, 218, 225, 232, 239, 245, 252, 259, 266, 273, 279, 286],
    "Weathered Straight Sword": [103, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198, 204, 210, 216, 222, 228, 234, 240, 246, 252],
    "Lordsworn's Straight Sword": [115, 121, 128, 135, 141, 148, 155, 161, 168, 175, 181, 188, 195, 201, 208, 215, 221, 228, 235, 241, 248, 255, 261, 268, 275, 281],
    "Noble's Slender Sword": [101, 106, 112, 118, 124, 130, 136, 142, 147, 153, 159, 165, 171, 177, 183, 188, 194, 200, 206, 212, 218, 224, 229, 235, 241, 247],
    "Cane Sword": [96, 101, 107, 112, 118, 123, 129, 134, 140, 146, 151, 157, 162, 168, 173, 179, 185, 190, 196, 201, 207, 212, 218, 224, 229, 235],
    "Warhawk's Talon": [101, 106, 112, 118, 124, 130, 136, 142, 147, 153, 159, 165, 171, 177, 183, 188, 194, 200, 206, 212, 218, 224, 229, 235, 241, 247],
    "Lazuli Glintstone Sword": [79 + 94, 90 + 107, 101 + 121, 113 + 134, 124 + 148, 136 + 162, 147 + 175, 159 + 189, 170 + 203, 182 + 216, 193 + 230],
    "Lazuli Glintstone Sword": [79 + 94, 90 + 107, 101 + 121, 113 + 134, 124 + 148, 136 + 162, 147 + 175, 159 + 189, 170 + 203, 182 + 216, 193 + 230],
    "Carian Knight's Sword": [88 + 88, 100 + 100, 113 + 113, 126 + 126, 139 + 139, 151 + 151, 164 + 164, 177 + 177, 190 + 190, 202 + 202, 215 + 215],
    "Crystal Sword": [106 + 68, 121 + 77, 136 + 87, 152 + 97, 167 + 107, 182 + 117, 198 + 127, 213 + 137, 228 + 146, 244 + 156, 259 + 166],
    "Rotten Crystal Sword": [102 + 66, 116 + 75, 131 + 85, 146 + 94, 161 + 104, 175 + 113, 190 + 123, 205 + 132, 220 + 142, 235 + 152, 249 + 161],
    "Miquellan Knight's Sword": [105, 120, 135, 150, 165, 181, 196, 211, 226, 242, 257],
    "Ornamental Straight Sword": [101, 115, 130, 144, 159, 174, 188, 203, 218, 232, 247],
    "Golden Epitaph": [85, 97, 109, 121, 134, 146, 158, 171, 183, 195, 208],
    "Sword of St Trina": [107 + 32, 122 + 36, 138 + 41, 153 + 45, 169 + 50, 184 + 55, 200 + 59, 215 + 64, 231 + 69, 246 + 73, 262 + 78],
    "Regalia of Eochaid": [89 + 57, 101 + 65, 114 + 73, 127 + 81, 140 + 90, 153 + 98, 166 + 106, 179 + 114, 192 + 123, 205 + 131, 218 + 139],
    "Sword of Night and Flame": [87 + 56 + 56, 99 + 64 + 64, 112 + 72 + 72, 124 + 80 + 80, 137 + 88 + 88, 150 + 96 + 96, 162 + 104 + 104, 175 + 112 + 112, 187 + 120 + 120, 200 + 129 + 129, 213 + 137 + 137],
};
let bossDict = {
    "Godrick the Grafted": 6080,
    "Rennala, Queen of the Full Moon": (3493 + 4097),
    "Starscourge Radahn": 9572,
    "Morgott, The Omen King": 10399,
    "Rykard, Lord of Blasphemy": 59174,
    "Mohg, Lord of Blood": 18389,
    "Malenia, Blade of Miquella": 33251,
    "Lichdragon Fortissax": 12903,
    "Beast Clergyman": 10620,
    "Maliketh, The Black Blade": 10620,
    "Astel, Naturalborn of the Void": 11170,
    "Regal Ancestor Spirit": 6301,
    "Radagon of the Golden Order": 13339,
    "Elden Beast": 22127,
    "Godfrey, First Elden Lord": 21903,
    "Fire Giant": 43263,
    "Dragonlord Placidusax": 26651,
}


function hitsCalculating() {
    let bossHp = bossDict[bossInput.value];
    index = upgradeInput.value;
    let baseAttack = weaponDict[selectInput.value][index];

    if ((selectInput.value == "Lazuli Glintstone Sword" || selectInput.value == "Carian Knight's Sword" || selectInput.value == "Crystal Sword" || selectInput.value == "Rotten Crystal Sword" || selectInput.value == "Miquellan Knight's Sword" || selectInput.value == "Ornamental Straight Sword" || selectInput.value == "Golden Epitaph" || selectInput.value == "Sword of St Trina" || selectInput.value == "Regalia of Eochaid" || selectInput.value == "Sword of Night and Flame") && upgradeInput.value > 10) {
        return showNumber.textContent = "Incorrect upgrade value";
    }
    if (strInput.value > 99 || dexInput.value > 99) {
        return showNumber.textContent = "Incorrect stats value";
    }

    showNumber.textContent = `You will need ${Math.floor(bossHp / (baseAttack + Number(strInput.value) + Number(dexInput.value))) + 1} hits`;
}

calculationButton.addEventListener("click", hitsCalculating);
