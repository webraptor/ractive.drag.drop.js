/**
 * Dragging Ractive Event
 *
 * @param  {Object} node DOM Node
 * @param  {Function} fire Method to fire back data to ractive.on
 * @return {Object} Teardown method
 * @author Bogdan Pop
 * previous work by Nijiko Yonskai, https://github.com/sigod, 
 * @copyright  2016
 */
Ractive.events.dragging = function(node, fire) {

  var props = {
    _forEach: function(a, callback, index) {
      // iterates Array, Object or FileList
      // TODO - check if index numeric and at least 0
      index = index || 0;
      var objectType = Object.prototype.toString.call(a);
      if (objectType === '[object Object]') {
        var keys = Object.keys(a);
        if (index < keys.length) {
          callback(a[keys[index]], keys[index], index);
          this._forEach(a, callback, index + 1);
        }
      } else if (objectType === '[object Array]' || objectType === "[object FileList]") {
        if (index < a.length) {
          callback(a[index], index);
          this._forEach(a, callback, index + 1);
        }
      }
    },
    _dragEvent: function(name) {
      return function(event) {    
        if (event.type === "dragstart") {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData('Text', this.id);
        }   
        if (event.type==="dragover") event.preventDefault(); // allowing drops https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations

        fire({
          node: node,
          name: name,
          type: name.split('_')[1],
          target: this,
          original: event
        });
      }
    },
    _tearDown: { 
      teardown: function() {

        node.draggable = false;
        props._forEach(props.events, function(element, key) {
          node.removeEventListener(element, props._dragEvent(element));
        }, 0);
      }
    },
    events: ["drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "dragstart"]
  }

  node.draggable = true;
  props._forEach(props.events, function(element, key) {
    node.addEventListener(element, props._dragEvent(element));
  }, 0);

  return props._tearDown;
};