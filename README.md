# ractive.drag.drop.js

Native HTML5 Drag N' Drop ractive event definition.

## Usage

After including [ractive](https://github.com/Rich-Harris/Ractive) and `ractive.drag.drop.js`:

**Template**

```html
<ul>
  {{#items:i}}
    <li on-dragndrop='dragndrop-items' dragndrop-copy>{{items[i]}}</li>
  {{/items}}
</ul>
```   

By default it uses "move" for event.dataTransfer.effectAllowed ; To change this to "copy", add dragndrop-copy attribute to the element.

**Code**

Ractive Boilerplate

```js
ractive = new Ractive({
  el: containerElement,
  template: templateElement,
  data: {
    items: [
      'One', 'Two', 'Three'
    ]
  }
});
```

Now any drag / drop action can be caught:

```js
ractive.on('dragndrop-items', function (event) {
  console.log(event);
});
```

## Event Object

- `name` Event name, underscore seperated: `drag_start`, `drag_enter`, `drag_over`, `drag_leave`, `drag_drop`, `drag_end`
- `type` Event type: `start`, `enter`, `over`, `leave`, `drop`, `end`
- `target` Element being dragged or dropped.
- `original` Native DOM Event
