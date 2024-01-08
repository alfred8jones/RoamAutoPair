const DEFAULT_TOGGLE = false;
const LOAD_DONE = 1;
const LOAD_UNDONE = 2;
const pairs = new Array("[", "(", "{");
var autoPairToggled = DEFAULT_TOGGLE;

const panelConfig = {
  tabTitle: "Auto Pair",
  settings: [{
    id: "auto-pair",
    name: "Auto Pair Toggle",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action: {
      type: "switch",
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
  alert("input!");
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
  // Check if this is the first load by seeing if our object exists in local storage
    if (localStorage.getItem('firstLoadDone') === null || localStorage.getItem('firstLoadDone') === LOAD_UNDONE) {
      // If it's the first load, set the flag in local storage to true and reload the page
      localStorage.setItem('firstLoadDone', LOAD_DONE);
      alert('This is the initial load');
    } else {
      alert('This is a page refresh');
    }
  
  extensionAPI.settings.panel.create(panelConfig);
  extensionAPI.settings.set("auto-pair", DEFAULT_TOGGLE);
  alert("loaded");
  console.log("loaded 'disable auto pair' plugin.")
}

function onunload() {
  localStorage.setItem('firstLoadDone', LOAD_UNDONE);
  alert("unloaded!: " + localStorage.getItem('firstLoadDone'));
  
  document.removeEventListener("input", removePair);
  console.log("unloaded 'disable auto pair' plugin.")
}

export default {
  onload,
  onunload
};
