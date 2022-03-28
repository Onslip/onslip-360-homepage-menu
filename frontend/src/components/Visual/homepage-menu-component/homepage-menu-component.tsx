// import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
// import { config } from '../../utils/utils';
// import { GetData } from '../../utils/get';
// import { loadImage } from '../../utils/image';


// import '@ionic/core'

// @Component({
//   tag: 'homepage-menu-component',
//   styleUrl: 'homepage-menu-component.css',
//   shadow: true,
//   assetsDirs: ['../../../assets'],
// })
// export class HomepageMenuComponent {

//   @State() private imageurl: string = 'http://localhost:8080/background';
//   @State() private bannerUrl: string = 'http://localhost:8080/banner';
//   @State() private logoUrl: string = 'http://localhost:8080/logo';
//   @State() private locationUrl: string = 'http://localhost:8080/location';
//   @Element() element: HTMLElement;
//   @State() loading: boolean = true;
//   @State() toggle: boolean = true;

//   async componentWillLoad() {
//     if (config?.background?.enabled == false) {
//       GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
//     }
//     if (config?.banner == true) {
//       GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
//     }

//     if (config?.Logo == true) {
//       if (config?.banner == true) {
//         GetData(this.logoUrl).then(response => this.LoadLogo(response, '.header')).catch(err => err);
//       }
//       else {
//         GetData(this.logoUrl).then(response => this.LoadLogo(response, '.no-banner')).catch(err => err);

//       }

//     }
//     else {
//       GetData(this.locationUrl).then(response => {
//         console.log(this.element.shadowRoot.querySelector('.header'));

//         const node = document.createElement("h1");
//         node.innerText = response;
//         if (config?.banner == true) {
//           this.element.shadowRoot.querySelector('.header').appendChild(node);
//         }
//         else {
//           const divnode = document.createElement("div");
//           divnode.className = "no-banner";
//           this.element.shadowRoot.querySelector('.menuContainer').appendChild(divnode);
//           this.element.shadowRoot.querySelector('.no-banner').appendChild(node);
//         }

//       })
//         .catch(err => console.log(err))
//     }
//   }

//   private async LoadConfig(element, element1) {
//     const component = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-component');
//     component.shadowRoot.querySelector(element).style.fontFamily = config?.font?.fontFamily;
//     if (config?.font.fontWeight == true) {
//       component.shadowRoot.querySelector(element).style.fontWeight = 'bold';
//     }
//     if (config?.font.fontStyle == true) {
//       component.shadowRoot.querySelector(element).style.fontStyle = 'italic';
//     }
//     document.querySelector(element1).style.fontSize = config.font.fontSize;

//     component.shadowRoot.querySelector(element).style.background = config?.menuBackground;
//     if (config?.font.fontOutline) {
//       component.shadowRoot.querySelector(element).style.textShadow = "-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
//     }
//     if (config?.background.enabled == true) {
//       document.querySelector('body').style.background = config?.background.color;
//     }
//   }

//   async componentDidLoad() {
//     this.LoadConfig('.menuContainer', ':root');
//   }

//   private async LoadBackground(image) {
//     const loadedImage = await loadImage(image).catch(err => err)
//     document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
//   }

//   private async LoadLogo(image, element) {
//     const loadedImage = await loadImage(image).catch(() => {

//     })
//     if (config.Logo) {
//       const img = document.createElement('img');
//       img.src = loadedImage.toString();

//       this.element.shadowRoot.querySelector(element).appendChild(img);
//     }
//   }

//   private async LoadBanner(image, element) {
//     const loadedImage = await loadImage(image).catch(err => err);
//     if (config.banner) {
//       this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;
//     }
//   }

//   change() {
//     if (this.toggle) {
//       this.toggle = false;
//     }
//     else {
//       this.toggle = true;
//     }
//   }

//   render() {
//     return (
//       <Host>
//         <div class='menuContainer' data-status={config?.preset}>
//           <div class={config?.banner ? 'header' : 'no-banner'}>

//           </div>

//           <menu-component toggle={this.toggle}></menu-component>
//         </div>

//         <div class='logoDiv'>
//           <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
//         </div>
//       </Host>
//     )
//   }
// }

