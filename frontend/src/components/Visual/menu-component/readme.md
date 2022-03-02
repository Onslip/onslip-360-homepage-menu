# menu-component



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [homepage-menu-component](../homepage-menu-component)

### Depends on

- ion-card
- [category-component](../category-component)
- [product-component](../product-component)

### Graph
```mermaid
graph TD;
  menu-component --> ion-card
  menu-component --> category-component
  menu-component --> product-component
  ion-card --> ion-ripple-effect
  category-component --> ion-card-header
  category-component --> ion-card-title
  product-component --> ion-card-content
  product-component --> ion-row
  product-component --> ion-col
  homepage-menu-component --> menu-component
  style menu-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
