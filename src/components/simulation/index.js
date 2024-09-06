//@index('./*.vue', f=> `import ${f.name} from "${f.path}.vue";`)
import Base from "./Base.vue";
import Tab from "./Tab.vue";
import Web from "./Web.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  Tab,
  Web,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Simulation${f.name},`)
  Base as Simulation,
  Tab as SimulationTab,
  Web as SimulationWeb,
  //@endindex
};

// CTRL + SHIFT + P
