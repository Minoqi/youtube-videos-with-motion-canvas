import {makeScene2D, Code} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <Code
      ref={code}
      fontSize={28}
      offsetX={-1}
      x={-400}
    />,
  );

  code().code.append(`Scenes\n`);
  yield* code().code.append('└─ AI (CharacterBody3D)\n', 0.6);
  yield* code().code.append('   └─ Model (MeshInstance3D)\n', 0.6);
  yield* code().code.append('   └─ AICollider (CollisionShape3D)\n', 0.6);
  yield* code().code.append('   └─ ObstacleAvoidanceCollider (Area3D)[+ObstacleAvoidance.gd]\n', 0.6);
  yield* code().code.append('       └─ ObstacleAvoidanceColliderShape (CollisionShape3D)\n', 0.6);
  yield* code().code.append('└─ Obstacle (MeshInstance3D)\n', 0.6);
  yield* code().code.append('   └─ ObstacleCollider (Area3D)\n', 0.6);
  yield* code().code.append('       └─ ObstacleColliderShape (CollisionShape3D)\n', 0.6);
  yield* code().code.append('└─ Trophy (Target Position) (MeshInstance3D)\n', 0.6);
});