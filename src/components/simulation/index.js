//@index('./*.vue', f=> `import ${f.name} from "${f.path}.vue";`)
import Base from "./Base.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Simulation${f.name},`)
  Base as Simulation,
  //@endindex
};

// CTRL + SHIFT + P