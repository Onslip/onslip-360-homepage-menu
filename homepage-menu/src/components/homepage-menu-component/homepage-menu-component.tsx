import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
})
export class HomepageMenuComponent {
  private url = 'http://localhost:8080'
  @State() responsedata

  fetchdata() {
    fetch(this.url)
      .then(rsp => rsp.json())
      .then(data => this.responsedata = data)
  }

  componentWillLoad() {
    this.fetchdata()
  }

  render() {
    return (
      <html>
        <ul>
          {
            this.responsedata
          }
        </ul>
      </html>
    );
  }
}

// interface DBproduct {
//   name: string,
//   price: string,
//   description: string
// }