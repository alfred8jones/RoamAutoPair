const pairs = new Array("[", "(", "{");
var autoPairBrackets = true;

const panelConfig = {
  tabTitle: "Auto Pair",
  settings: [{
    id: "auto-pair",
    name: "Auto Pair Toggle",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action: {
      type: "switch",
      onChange: (evt) => {
        autoPairBrackets = !autoPairBrackets;
        alert(autoPairBrackets);
      }}}]
};


document.addEventListener('input', function removePair(e) {
  if (!autoPairBrackets)
  {return;}
  
  // Don't modify when text is deleted
  if (e.inputType === "deleteContentBackward"
      || e.inputType === "deleteContentForward"
      || e.inputType === "deleteContent")
  {return;}

  alert("should work now");
  
  const pos = e.target.selectionStart;
  const elementAsArr = [...e.target.value];

  alert("element as arr: " + elementAsArr);
  
  const inputFirstCh = e.target.value[pos-1];
  const isPair = pairs.indexOf(inputFirstCh) == -1 ? false : true;

  alert("input char: " + inputFirstCh + "isPair: " + isPair);
  
  if (isPair) {
    editedLine = elementAsArr.toSpliced(pos, 1).join('');
    
    e.target.value = editedLine;
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
