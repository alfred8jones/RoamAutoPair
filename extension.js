let API;
let TARGET;
let TEXTT = "bb";
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
      }}]
};

function removePair(e) {
  if (API.settings.get("auto-pair") == false) // Check if switch is toggled off
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
    
    //e.target.value = "a"; // necessary to prevent a small bug
    //e.setAttribute('target.value', "ab"); // = "ab";
    //e.target.innerHTML = "<p>Hi</p>";
    //e.target.innerText = "ab";
    //e.target.value = e.target.value + "a"; // necessary to prevent a small bug
    // e.target.value.slice(0, -1);
    // e.target.value = e.target.value.toString().slice(0, -1);
    //e.target.value = e.target.value - "a"; // necessary to prevent a small bug
    
    
    // e.target.selectionEnd = pos;

    
    //alert(e.target.text);
    var tar = e.target || e.srcElement;

    //TARGET = e.target;
    //TARGET.value = TEXTT;
    //e.target.value = TEXTT;
    //TARGET = "bb";
    //tar['value'] = "a";
    //tar['innerHTML'] = "b";
    //tar['textContent'] = "c";

    // tar.value += "b";
    e.target.value = "kbj";
    e.target.defaultValue = "kbj";
    
    const attrs = e.target.getAttributeNames().reduce((acc, name) => {
      
  return {...acc, [name]: e.target.getAttribute(name)};
}, {}); 
    
    alert(e.target.value);
    alert(e.target.innerHTML);
    alert(e.target.textContent);
    //alert(e.target.defaultValue);

    //var attris = e.target.getAttributeNames();

    for (let attr of e.target.dataset) {
  //const value = e.target.getAttribute(name);
      //alert(attr.name + ", " + attr.value);
      alert(attr);
    }
    //alert(e.target.getAttributeNames());

    

    
    //alert(e.target.attributes);
    //alert(e.target.nodeValue);
    //
    // alert(e.target.getAttribute('innerText').toString());
    //e.target.value = "cd";
    //alert(e.srcElement.value);
    //alert(e.target.data);
    //e.target.selectionEnd = pos - 1; 
    //alert(e.target.value);
    //e.target.selectionEnd = pos - 2;
    //alert(e.target.attributes);
  }
}


// Main line..
document.addEventListener('input', removePair);


function onload({extensionAPI}) {
  API = extensionAPI;
  API.settings.panel.create(panelConfig);

  // Check for extension initial load using local storage
  if (readFromStorage('loadState') == null || readFromStorage('loadState') == "unloaded")
  {
    API.settings.set("auto-pair", DEFAULT_TOGGLE); // Toggle button on/off for first load
    writeToStoarge('loadState', "loaded");
  }
  
  console.log("loaded 'disable auto pair' plugin.")
}

function onunload() {
  writeToStorage('loadState', "unloaded");
  document.removeEventListener("input", removePair);
  console.log("unloaded 'disable auto pair' plugin.")
}

export default {
  onload,
  onunload
};
