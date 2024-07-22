import {makeScene2D, Code} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <Code
      ref={code}
      fontSize={28}
      offsetX={-1}
      x={-600}
    />,
  );

  code().code.append(`extends CharacterBody3D\n\n`);
  yield* code().code.append('# Variables\n@export var obstacleAvoidance : ObstacleAvoidance\n@export var targetPos : Node3D\n@export var targetDistance : float = 0.5\n@export var speed : float = 2\n@export var rotateSpeed : float = 3\n@export var avoidanceSmoothing : float = 0/4', 0.6);
  yield* code().code.append('\n\nfunc _process(delta):\n    _calculate_movement()\n\n\n', 0.6);
  yield* code().code.append('func _calculate_movement() -> void:\n  if global_position.distance_to(targetPos.global_position) < targetDistance:\n       return\n\n', 0.6);
  yield* code().code.append('   var avoidanceVector : Vector3 = vecloty - obstacleAvoidance.calculate_avoidance\n                                           (targetPos.global_position)\n\n', 0.6);
  yield* code().code.append('   velocity = vecloty.lerp(avoidanceVector, avoidanceSmoothing)\n   velocity = velocity.normalized()\n   velocity *= speed\n   move_and_slide()\n\n', 0.6);
  yield* code().code.append('   if velocity != Vector3.ZERO:\n      rotation.y = lerp_angle(rotation.y, -atan2(-velocity.x, velocity.z),\n                  rotateSpeed * get_process_delta_time())', 0.6);
});