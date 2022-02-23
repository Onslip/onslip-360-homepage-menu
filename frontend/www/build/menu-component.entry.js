import { r as registerInstance, h, i as Host } from './index-fdd6f247.js';
import { G as GetData } from './get-89eae738.js';

const menuComponentCss = ":host{display:block}.menu{font-family:sans-serif;font-size:14px}";

let MenuComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = 'http://localhost:8080';
    this.loading = true;
  }
  async componentWillLoad() {
    this.responsedata = await GetData(this.url).catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'));
  }
  render() {
    return (h(Host, null, this.responsedata.map(data => {
      return (h("ion-card", { color: "secondary", class: 'menu' }, h("category-component", { category: data.category }), data.products.map(product => { return (h("product-component", { class: 'menu-item', product: product })); })));
    })));
  }
  static get assetsDirs() { return ["assets"]; }
};
MenuComponent.style = menuComponentCss;

export { MenuComponent as menu_component };
