/**
 * Drag N' Drop Ractive Event
 *
 * @param  {Object} node DOM Node
 * @param  {Function} fire Method to fire back data to ractive.on
 * @return {Object} Teardown method
 * @author  Nijiko Yonskai, https://github.com/sigod, Bogdan Pop
 * @copyright  2016
 */
Ractive.events.dragndrop = function(node, fire) {

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
          event.dataTransfer.effectAllowed = this.hasAttribute("dragndrop-copy") ? "copy" : "move";
          event.dataTransfer.setData('Text', this.id);
        }

        fire({
          node: node,
          name: name,
          type: name.split('_')[1],
          target: this,
          original: event
        });
      }
    },
    _tearDown: function() {

      node.draggable = false;
      props._forEach(props.events, function(element, key) {
        node.removeEventListener(element, props._dragEvent(element));
      }, 0);

    },
    events: ["drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "dragstart", "drop"]
  }

  node.draggable = true;
  props._forEach(props.events, function(element, key) {
    node.addEventListener(element, props._dragEvent(element));
  }, 0);

  return props._tearDown;
};