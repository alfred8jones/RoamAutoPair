var autoPairToggled = false; 
const pairs = new Array("[", "(", "{");
const ids = new Map([
  ["autoPairToggle", "auto-pair"]
  ]);


const panelConfig = {
  tabTitle: "Auto Pair",
  settings: [{
    id: ids["autoPairToggle"],
    name: "Auto Pair Toggle",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action: {
      type: "switch",
      onLoad: (ev) => {
        ev.target.checked = true;
      }
      onChange: (evt) => {
        if (evt.target.checked)
            {autoPairToggled = true;}
        else
            {autoPairToggled = false;}
      }}}]
};

function removePair(e) {
  if (!autoPairToggled)
  {return;}
  
  // Don't modify when text is deleted
  if (e.inputType === "deleteContentBackward"
      || e.inputType === "deleteContentForward"
      || e.inputType === "deleteContent")
  {return;}
  
  var editedLine;
  const pos = e.target.selectionStart;
  const elementAsArr = [...e.target.value];
  
  const inputFirstCh = e.target.value[pos-1];
  const isPair = pairs.indexOf(inputFirstCh) == -1 ? false : true;

  if (isPair) {
    elementAsArr.splice(pos, 1);
    editedLine = elementAsArr.join('');
    
    e.target.value = editedLine;
    e.target.selectionEnd = pos;
  }
}


// Main line..
document.addEventListener('input', removePair);


function onload({extensionAPI}) {
  extensionAPI.settings.panel.create(panelConfig);
  extensionAPI.settings.set(ids["autoPairToggle"], true);
  console.log("loaded disable auto pair plugin")
}

function onunload() {
  document.removeEventListener("input", removePair);
  console.log("unloaded disable auto pair plugin")
}

export default {
  onload,
  onunload
}; 
