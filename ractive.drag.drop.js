/**
 * Drag N' Drop Ractive Event
 * 
 * @param  {Object}   node DOM Node
 * @param  {Function} fire Method to fire back data to ractive.on
 * @return {Object}        Teardown method
 * @author  Nijiko Yonskai
 * @copyright  2013
 */
Ractive.events.dragndrop = function ( node, fire ) {
  var foreach = function (n, next) {
    if (n.length) Array.prototype.forEach.call(n, next);
  };

  var Drag = {
    event: function (name) {
      return function (event) {
        fire({
          node: node,
          name: name,
          type: name.split('_')[1],
          target: this,
          original: event
        });
      };
    }
  };

  var drag_start, drag_enter, drag_over, drag_leave, drag_drop, drag_end;

  foreach(node.children, function (el) {
    el.draggable = true;
    el.addEventListener('dragstart', drag_start = Drag.event('drag_start'));
    el.addEventListener('dragenter', drag_enter = Drag.event('drag_enter'));
    el.addEventListener('dragover', drag_over = Drag.event('drag_over'));
    el.addEventListener('dragleave', drag_leave = Drag.event('drag_leave'));
    el.addEventListener('drop', drag_drop = Drag.event('drag_drop'));
    el.addEventListener('dragend', drag_end = Drag.event('drag_end'));
  });

  return {
    teardown: function () {
      foreach(node.children, function (el) {
        el.draggable = true;
        el.removeEventListener('dragstart', drag_start);
        el.removeEventListener('dragenter', drag_enter);
        el.removeEventListener('dragover', drag_over);
        el.removeEventListener('dragleave', drag_leave);
        el.removeEventListener('drop', drag_drop);
        el.removeEventListener('dragend', drag_end);
      });
    }
  };
};