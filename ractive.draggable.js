/**
 * Drag N' Drop Ractive Event
 * 
 * @param  {Object}   node DOM Node
 * @param  {Function} fire Method to fire back data to ractive.on
 * @return {Object}        Teardown method
 * @author  Nijiko Yonskai
 * @copyright  2013
 */
Ractive.events.draggable = function ( node, fire ) {
  var $self = Ractive.events.draggable;

  var Drag = {
    event: function (name) {
      return function (event) {
        if (name === 'drag_start') 
          $self.current = node;

        fire({
          node: $self.current || node,
          source: node,
          name: name,
          type: name.split('_')[1],
          target: this,
          original: event,
          previous: $self.previous
        });

        if (name === 'drag_enter')
          $self.previous = node;

        if (name === 'drag_end') 
          $self.current = null;
      };
    }
  };

  var drag_start, drag_enter, drag_over, drag_leave, drag_drop, drag_end;

  node.draggable = true;
  node.addEventListener('dragstart', drag_start = Drag.event('drag_start'));
  node.addEventListener('dragenter', drag_enter = Drag.event('drag_enter'));
  node.addEventListener('dragover', drag_over = Drag.event('drag_over'));
  node.addEventListener('dragleave', drag_leave = Drag.event('drag_leave'));
  node.addEventListener('drop', drag_drop = Drag.event('drag_drop'));
  node.addEventListener('dragend', drag_end = Drag.event('drag_end'));

  return {
    teardown: function () {
      node.draggable = true;
      node.removeEventListener('dragstart', drag_start);
      node.removeEventListener('dragenter', drag_enter);
      node.removeEventListener('dragover', drag_over);
      node.removeEventListener('dragleave', drag_leave);
      node.removeEventListener('drop', drag_drop);
      node.removeEventListener('dragend', drag_end);
    }
  };
};

Ractive.events.draggable.current = null;
Ractive.events.draggable.previous = null;