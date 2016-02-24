# ractive.dragging.js

Native HTML5 Dragging ractive event definition. Handles all drag events but drop.

## Usage

After including [ractive](https://github.com/Rich-Harris/Ractive) and `ractive.dragging.js`:

**Template**

```html
<ul>
  {{#items:i}}
    <li on-dragging='dragging-item'>{{items[i]}}</li>
  {{/items}}
</ul>
```   

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
ractive.on('dragging-item', function (event) {
  console.log(event);
});
```

## Event Object

- `name` Event name
- `type` Event type
- `target` Element being dragged or dropped.
- `original` Native DOM Event