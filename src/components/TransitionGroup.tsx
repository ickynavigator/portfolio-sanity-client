import { Box, Transition, MANTINE_TRANSITIONS, rem } from '@mantine/core';

type MantineTransitionName = keyof typeof MANTINE_TRANSITIONS;
type MantineTransitionStyles =
  (typeof MANTINE_TRANSITIONS)[MantineTransitionName];

const Transitions = {
  sliding: {
    in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
    out: { opacity: 0, transform: 'translate(-50%, -200%)' },
    common: {
      transformOrigin: 'center',
      top: '50%',
      left: '50%',
      position: 'absolute',
    },
    transitionProperty: 'transform, opacity',
  },
} as const satisfies Record<string, MantineTransitionStyles>;

interface ITransitionProps {
  show: boolean;
  timer: number;
  children: React.ReactNode;
  transition?: keyof typeof Transitions;
}

const TransitionButton = (props: ITransitionProps) => {
  const { show, timer, children, transition = 'sliding' } = props;

  return (
    <Transition
      mounted={show}
      transition={Transitions[transition]}
      duration={timer}
      timingFunction="ease"
    >
      {style => <Box style={style}>{children}</Box>}
    </Transition>
  );
};
interface ITransitionGroupProps {
  initial: React.ReactNode;
  final: React.ReactNode;

  timer?: number;
  status: boolean;

  transition?: keyof typeof Transitions;
}

const TransitionGroup = (props: ITransitionGroupProps) => {
  const { initial, final, status, transition, timer = 1000 } = props;

  return (
    <>
      <TransitionButton show={!status} timer={timer} transition={transition}>
        {initial}
      </TransitionButton>

      <TransitionButton show={status} timer={timer} transition={transition}>
        {final}
      </TransitionButton>
    </>
  );
};

export default TransitionGroup;
