import {makeScene2D, Code, CODE, word, lines} from '@motion-canvas/2d';
import {createRef, DEFAULT, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  const readyFunction = CODE`func _ready():
    area_entered.connect(_hit_obstacle)
    area_exited.connect(_left_obstacle)`;

  const hitObstacleFunction = CODE`func _hit_obstacle(_obstacle : Area3D) -> void:
    if !obstacles.has(_obstacle):
      obstacles.append(_obstacle)
    else:
      printerr("TRYING TO ADD OBSTACLE TWICE")`;
  
  const leftObstacleFunction = CODE`func _left_obstacle(_obstacle : Area3D) -> void:
    if obstacle.has(_obstacle):
      obstacles.erase(_obstacle)
    else:
      printerr("TRIED TO REMOVE NOT STORED OBSTACLE")`;

  view.add(
    <Code
      ref={code}
      fontSize={28}
      offsetX={-1}
      x={-400}
    />,
  );

  code().code.append(`extends Area3D`);
  yield* code().code.append('\nclass_name ObstacleAvoidance', 0.6);
  yield* code().code.append(`\n`, 0.6);
  yield* code().code.append(`\n# Variables`, 0.6);
  yield* code().code.append(`\n@export var ai : Node3D\n@export var threshold : float = 1.5\n@export var lookaheadTime : float = 0.5\n\nvar obstacles : Array[Area3D] = []`, 0.6);
  yield* code().code.append('\n\n', 0.6);
  yield* code().selection(code().findAllRanges(`@export var threshold : float = 1.5`), 0.6);
  yield* waitFor(0.6);
  yield* code().selection(code().findAllRanges(`@export var lookaheadTime : float = 0.5`), 0.6);
  yield* waitFor(0.6);
  yield* code().selection(DEFAULT, 0.6);
  yield* code().code.append('func _ready():\n', 0.6);
  yield* code().code.append('   pass', 0.6);
  yield* code().code.append('\n\n', 0.6);
  yield* code().code.append(hitObstacleFunction, 0.6);
  yield* code().code.append('\n\n\n', 0.6);
  yield* code().code.append(leftObstacleFunction, 0.6);
  yield* code().code.replace(lines(11), '  area_entered.connect(_hit_obstacle)\n  area_exited.connect(_left_obstacle)\n\n', 0.6);
});