const NAMESPACE = "AUTO-PAIR-EXT"; 
const DEFAULT_TOGGLE = false;
const pairs = new Array("[", "(", "{");

function writeToStorage(key, value) {
  const serializedData = localStorage.getItem(NAMESPACE);
  const data = serializedData ? JSON.parse(serializedData) : {};
  data[key] = value;
  localStorage.setItem(NAMESPACE, JSON.stringify(data));
}
 
function readFromStorage(key) {
  const serializedData = localStorage.getItem(NAMESPACE);
  const data = JSON.parse(serializedData);
  return data ? data[key] : undefined;
}


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
            {writeToStorage('autoPairToggled', "true");}
        else
            {writeToStorage('autoPairToggled', "false");}
      }}}]
};

function removePair(e) {
  if (extensionAPI.settings.get("auto-pair"))
  {
    alert("toggle: true");
  }
  if (extensionAPI.settings.get("auto-pair") == false)
  {
    alert("toggle: false");
    return;}
  
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

  // Check for extension initial load using local storage
  if (readFromStorage('firstLoadDone') == null || readFromStorage('firstLoadDone') == "unloaded")
  {
    extensionAPI.settings.set("auto-pair", DEFAULT_TOGGLE); // Toggle button on/off for first load
    // writeToStorage('autoPairToggled', DEFAULT_TOGGLE.toString());
    writeToStoarge('firstLoadDone', "loaded");
  }
  
  console.log("loaded 'disable auto pair' plugin.")
}

function onunload() {
  writeToStorage('firstLoadDone', "unloaded");
  document.removeEventListener("input", removePair);
  console.log("unloaded 'disable auto pair' plugin.")
}

export default {
  onload,
  onunload
};
