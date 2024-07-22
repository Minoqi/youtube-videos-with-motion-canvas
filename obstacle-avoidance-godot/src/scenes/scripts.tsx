import {makeScene2D, Code} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <Code
      ref={code}
      fontSize={28}
      offsetX={-1}
      x={-200}
    />,
  );

  code().code.append(`Scripts\n`);
  yield* code().code.append('└─ AI.gdscript\n', 0.6);
  yield* code().code.append('└─ ObstacleAvoidance.gdscript', 0.6);
});