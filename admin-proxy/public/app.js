import { EditorView, BasicSetup } from 'Codemirror';
import { javascript } from 'Codemirror/lang-javascript';
import { dracula } from '@codemirror/view";

// 1. Sett opp CodeMirror-editoren
const editorContainer = document.getElementById('editor-container');
const initialCode = `// Skriv din JavaScript-kode her
console.log('Hei fra lekegrinden!');

const fruits = ['Eple', 'Banan', 'Appelsin'];

fruits.forEach(fruit => {
  console.log(\`Jeg liker \${fruit}!\`);
});
`;

const editor = new EditorView({
  doc: initialCode,
  extensions: [
    BasicSetup,
    javascript(),
    dracula, // Mørkt tema, likner på mange VS Code-temaer
  ],
  parent: editorContainer,
});

// 2. Hent referanser til knappen og output-feltet
const runButton = document.getElementById('run-btn');
const outputContainer = document.getElementById('output-container');

// 3. Funksjon for å kjøre koden
function runCode() {
  const code = editor.state.doc.toString();
  outputContainer.textContent = ''; // Tøm forrige output

  // Omdirigerer console.log for å fange output
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    const output = args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
      .join(' ');
    outputContainer.textContent += `> ${output}\n`;
  };

  try {
    // Bruker new Function() som er tryggere enn eval()
    new Function(code)();
  } catch (error) {
    outputContainer.textContent += `Feil: ${error.message}`;
  } finally {
    // Gjenopprett original console.log
    console.log = originalConsoleLog;
  }
}

// 4. Legg til event listener på knappen
runButton.addEventListener('click', runCode);
