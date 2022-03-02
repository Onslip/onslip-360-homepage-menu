<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-342c6706.js';
import { G as GetData } from './get-282952cd.js';

const menuComponentCss = ":host{display:block}.menu{font-family:sans-serif;font-size:14px;border:10px #faf8f61c solid}";
=======
import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
import { G as GetData } from './get-282952cd.js';

const menuComponentCss = ":host{display:block}.menu{font-family:sans-serif;border:10px #faf8f61c solid}";
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29

let MenuComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = 'http://localhost:8080';
    this.loading = true;
  }
  async componentWillLoad() {
    await GetData(this.url)
      .then(response => this.responsedata = response)
      .catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'));
  }
  render() {
    return (h(Host, null, this.responsedata.map(data => {
      return (h("ion-card", { color: "secondary", class: 'menu' }, h("category-component", { category: data.category }), data.products.map(product => { return (h("product-component", { class: 'menu-item', product: product })); })));
    })));
  }
};
MenuComponent.style = menuComponentCss;

export { MenuComponent as menu_component };
