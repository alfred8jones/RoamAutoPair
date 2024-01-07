const pairs = new Array("[", "(", "{");
var autoPairToggle = true;
var test = 0;

const panelConfig = {
  tabTitle: "Auto Pair",
  settings: [{
    id: "auto-pair",
    name: "Auto Pair Toggle",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action: {
      type: "switch",
      //checked=false;
      onChange: (evt) => {
        if (evt.target.checked)
            {autoPairToggle = true;}
        else
            {autoPairToggle = false;}
      }}}]
};

function removePair(e) {
  if (!autoPairToggle)
  {return;}
  
  // Don't modify when text is deleted
  if (e.inputType === "deleteContentBackward"
      || e.inputType === "deleteContentForward"
      || e.inputType === "deleteContent")
  {return;}

  // alert(test);
  
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
  myTest = extensionAPI.settings.panel.get("auto-pair");
  extensionAPI.settings.panel.set(myTest.checked, true);
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
