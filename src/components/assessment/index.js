//@index('./*.vue', f=> `import ${f.name} from "${f.path}.vue";`)
import Disclaimer from "./Disclaimer.vue";
import Header from "./Header.vue";
import Navigation from "./Navigation.vue";
import Progress from "./Progress.vue";
import Sidebar from "./Sidebar.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Disclaimer,
  Header,
  Navigation,
  Progress,
  Sidebar,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Assessment${f.name},`)
  Disclaimer as AssessmentDisclaimer,
  Header as AssessmentHeader,
  Navigation as AssessmentNav,
  Progress as AssessmentProgress,
  Sidebar as AssessmentSidebar,
  //@endindex
};

// CTRL + SHIFT + P
