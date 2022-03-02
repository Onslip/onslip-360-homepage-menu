# menu-editor-component



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [homepage-menu-editor-component](../homepage-menu-editor-component)

### Depends on

- ion-card
- [category-editor-component](../category-editor-component)
- [product-editor-component](../product-editor-component)

### Graph
```mermaid
graph TD;
  menu-editor-component --> ion-card
  menu-editor-component --> category-editor-component
  menu-editor-component --> product-editor-component
  ion-card --> ion-ripple-effect
  category-editor-component --> ion-card-header
  category-editor-component --> ion-card-title
  product-editor-component --> ion-card-content
  product-editor-component --> ion-row
  product-editor-component --> ion-col
  homepage-menu-editor-component --> menu-editor-component
  style menu-editor-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
