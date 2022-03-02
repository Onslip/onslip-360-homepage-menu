# selector-component



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute   | Description | Type       | Default     |
| ---------------- | ----------- | ----------- | ---------- | ----------- |
| `DropDownvalues` | --          |             | `string[]` | `undefined` |
| `IconName`       | `icon-name` |             | `string`   | `undefined` |
| `element`        | `element`   |             | `string`   | `undefined` |
| `type`           | `type`      |             | `string`   | `undefined` |
| `value`          | `value`     |             | `string`   | `undefined` |


## Dependencies

### Used by

 - [toolbar-component](../toolbar-component)

### Depends on

- ion-row
- ion-select
- ion-select-option
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  selector-component --> ion-row
  selector-component --> ion-select
  selector-component --> ion-select-option
  selector-component --> ion-button
  selector-component --> ion-icon
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-label
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  toolbar-component --> selector-component
  style selector-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
