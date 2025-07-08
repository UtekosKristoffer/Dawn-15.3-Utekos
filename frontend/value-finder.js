const section = document.getElementById(`MetaObjectFilter-{{ section.id }}`);
const originsJson = section.dataset.origins;
const origins = JSON.parse(originsJson);

console.log(origins);
