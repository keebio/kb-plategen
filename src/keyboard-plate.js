import makerjs from "makerjs";
var kle = require("@ijprest/kle-serial");

/*
let testKleRawData = `
[{a:7},"","","","","","","","","","","","","",{w:2},""],
[{w:1.5},"","","","","","","","","","","","","",{w:1.5},""],
[{w:1.75},"","","","","","","","","","","","",{w:2.25},""],
[{w:2.25},"","","","","","","","","","","",{w:2.75},""],
[{w:1.25},"",{w:1.25},"",{w:1.25},"",{w:6.25},"",{w:1.25},"",{w:1.25},"",{w:1.25},"",{w:1.25},""]`;
*/
let kleJson = [
  [
    "~\n`",
    "!\n1",
    "@\n2",
    "#\n3",
    "$\n4",
    "%\n5",
    "^\n6",
    "&\n7",
    "*\n8",
    "(\n9",
    ")\n0",
    "_\n-",
    "+\n=",
    {
      "w": 2,
    },
    "Backspace",
  ],
  [
    {
      "w": 1.5,
    },
    "Tab",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "{\n[",
    "}\n]",
    {
      "w": 1.5,
    },
    "|\n\\",
  ],
  [
    {
      "w": 1.75,
    },
    "Caps Lock",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ":\n;",
    "\"\n'",
    {
      "w": 2.25,
    },
    "Enter",
  ],
  [
    {
      "w": 2.25,
    },
    "Shift",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<\n,",
    ">\n.",
    "?\n/",
    {
      "w": 2.75,
    },
    "Shift",
  ],
  [
    {
      "w": 1.25,
    },
    "Ctrl",
    {
      "w": 1.25,
    },
    "Win",
    {
      "w": 1.25,
    },
    "Alt",
    {
      "a": 7,
      "w": 6.25,
    },
    "",
    {
      "a": 4,
      "w": 1.25,
    },
    "Alt",
    {
      "w": 1.25,
    },
    "Win",
    {
      "w": 1.25,
    },
    "Menu",
    {
      "w": 1.25,
    },
    "Ctrl",
  ],
];

function SwitchPlate() {
  let keyboard = kle.Serial.deserialize(kleJson);

  console.log(keyboard);

  this.units = makerjs.unitType.Millimeter;
  this.origin = [0, 0];
  this.models = {};
  var i = 1;
  for (var key of keyboard.keys) {
    this.models["switch" + i] = new MXSwitch(key);
    i++;
  }
  console.log(this.origin);
}

function MXSwitch(key) {
  this.units = makerjs.unitType.Millimeter;

  let hSpacing = 19.05;
  let wSpacing = 19.05;
  let x_mm = (key.x + key.width / 2) * wSpacing - wSpacing / 2;
  let y_mm = (key.y + key.height / 2) * -hSpacing - hSpacing / 2;

  this.origin = [x_mm, y_mm];
  this.models = {
    switch: new makerjs.models.RoundRectangle(14, 14, 0.5),
  };
  console.log(this.origin);
}

export default SwitchPlate;
