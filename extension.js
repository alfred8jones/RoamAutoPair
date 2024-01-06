const pairs = new Array("[", "(", "{");
var autoPairToggle = true;

const panelConfig = {
  tabTitle: "Auto Pair",
  settings: [{
    id: "auto-pair",
    name: "Auto Pair Toggle",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action: {
      type: "switch",
      onChange: (evt) => {
        autoPairToggle = !autoPairToggle;
      }}}]
};


document.addEventListener('input', function removePair(e) {
  alert("toggle: " + autoPairToggle);
  
  if (autoPairToggle == false)
  {return;}
  
  // Don't modify when text is deleted
  if (e.inputType === "deleteContentBackward"
      || e.inputType === "deleteContentForward"
      || e.inputType === "deleteContent")
  {return;}
  
  const pos = e.target.selectionStart;
  const elementAsArr = [...e.target.value];
  
  const inputFirstCh = e.target.value[pos-1];
  const isPair = pairs.indexOf(inputFirstCh) == -1 ? false : true;

  alert("input char: " + inputFirstCh);
  alert("isPair: " + isPair);
  
  if (isPair == true) {
    editedLine = elementAsArr.toSpliced(pos, 1).join('');

    alert("element as arr: " + elementAsArr);

    alert("e.target.value: " + e.target.value);
    // e.target.value = editedLine;
    e.target.value = "b";
    e.target.selectionEnd = pos;
  }
});


function onload({extensionAPI}) {
  console.log("loaded disable auto pair plugin");
  extensionAPI.settings.panel.create(panelConfig)
}

function onunload(){
  console.log("unloaded disable auto pair plugin");
  document.removeEventListener("input", removePair)
}

export default {
  onload,
  onunload
}; 
