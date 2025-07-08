import { SectionId } from '../utils/section-id.js';

const someId = 'template--22224696705326__main';
const sectionName = SectionId.parseSectionName(someId); // -> 'main'

console.log(sectionName, someId);
