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

  code().code.append(`func calculate_avoidance(_targetPos : Vector3) -> Vector3:\n`);
  yield* code().code.append('   if obstacles.size() == 0:\n         return _targetPos.direction_to(ai.global_position).normalized()\n\n', 0.6);
  yield* code().code.append('   var totalAdjustments : Vector3 = Vector.ZERO\n   var totalWeight : float = 0\n\n', 0.6);
  yield* code().code.append('   var futurePos = ai.global_position + ai.velocity * lookaheadTime\n\n', 0.6);
  yield* code().code.append('   for i in range(0, obstacles.size()):\n', 0.6);
  yield* code().code.append('       var direction = obstacles[i].get_owner().global_position.direction_to(futurePos)\n', 0.6);
  yield* code().code.append('       var length : float = direction.length()\n\n', 0.6);
  yield* code().code.append('       var adjustment = direction\n       var difference = threshold - length\n       adjustment = adjustment.normalized()\n\n', 0.6);
  yield* code().code.append('       var weight : float = 1 / length\n', 0.6);
  yield* code().code.append('       adjustment *= difference * weight\n\n', 0.6);
  yield* code().code.append('       var adjustment = -adjustment * difference\n       totalAdjustments += adjustment\n       totalWeight += weight\n\n', 0.6);
  yield* code().code.append('   if totalWeight > 0:\n       totalAdjustments /= totalWeight\n\n', 0.6);
  yield* code().code.append('   return totalAdjustments', 0.6);
});