//@index('./*.vue', f=> `//import ${f.name} from '${f.path}.vue';`)
//import SimulationSandbox from './SimulationSandbox.vue';
//@endindex
//@index('./*/*.vue', f=> `import ${f.path.replaceAll('/', '').replace('.','')} from '${f.path}.vue';`)
import S0A1ScenarioDemo from "./S0/A1ScenarioDemo.vue";
import S0Q1ClickDemoSimulation from "./S0/Q1ClickDemoSimulation.vue";
import S0Q2InputDemoSimulation from "./S0/Q2InputDemoSimulation.vue";
//@endindex
export default {
  //@index('./*.vue', f=> `//${f.name},`)
  //SimulationSandbox,
  //@endindex
  //@index('./*/*.vue', f=> `${f.path.replaceAll('/', '').replace('.','')},`)
  S0A1ScenarioDemo,
  S0Q1ClickDemoSimulation,
  S0Q2InputDemoSimulation,
  //@endindex
};

// CTRL + SHIFT + P -> Generate Index
