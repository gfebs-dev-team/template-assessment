//@index('./*.vue', f=> `//import ${f.name} from '${f.path}.vue';`)
//import SimulationSandbox from './SimulationSandbox.vue';
//@endindex
//@index('./*/*.vue', f=> `import ${f.path.replace('.','').split('/').reverse()[0].slice(0,1)+ f.path.replace('.','').split('/')[1] + f.path.replace('.','').split('/')[2].slice(1)} from "${f.path}.vue";`)
import A0101 from "./01/A01.vue";
import S0101 from "./01/S01.vue";
import S0102 from "./01/S02.vue";
//@endindex
export default {
  //@index('./*.vue', f=> `//${f.name},`)
  //SimulationSandbox,
  //@endindex
  //@index('./*/*.vue', f=> `${f.path.replace('.','').split('/').reverse()[0].slice(0,1)+ f.path.replace('.','').split('/')[1] + f.path.replace('.','').split('/')[2].slice(1)},`)
  A0101,
  S0101,
  S0102,
  //@endindex
};

// CTRL + SHIFT + P
