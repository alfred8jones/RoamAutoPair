var autoPairBrackets = true;

const panelConfig = {
  tabTitle: "Auto Pair Toggle",
  settings: [{
    id:      "auto-pair",
    name:    "Auto Pair",
    description: "Disables the automatically-created pairs for: square brackets, curly brackets and parentheses",
    action:    {
      type:   "switch",
      onChange: (evt) => {
      autoPairBrackets = true;}}}
      ]
};

function onload({extensionAPI}) {
  console.log("loaded disable auto pair plugin");
  extensionAPI.settings.panel.create(panelConfig);
}

function onunload(){
  console.log("unloaded disable auto pair plugin");
}

export default {
  onload,
  onunload
};

const pairs = new Array("[", "(", "{", "z");
 document.addEventListener('input', function (e) {

   if (!autoPairBrackets)
   {return;}
   
   // Don't modify when text is deleted
   if (e.inputType === "deleteContentBackward"|| e.inputType === "deleteContentForward" || e.inputType === "deleteContent")
   {return;}

    const pos = e.target.selectionStart;
    const elementAsArr = [...e.target.value];

   const inputFirstCh = e.target.value[pos-1];
   const isPair = pairs.indexOf(inputFirstCh) == -1 ? false : true;

    if (isPair) {   
      editedLine = elementAsArr.toSpliced(pos, 1).join('');
      
      e.target.value = editedLine;
      e.target.selectionEnd = pos;
    }
});
