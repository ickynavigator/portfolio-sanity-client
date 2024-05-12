import { Box, Transition, type MantineTransition } from '@mantine/core';

interface ITransitionProps {
  show: boolean;
  timer: number;
  children: React.ReactNode;
  transition?: MantineTransition;
}

const TransitionButton = (props: ITransitionProps) => {
  const { show, timer, children, transition = 'fade' } = props;

  return (
    <Transition
      mounted={show}
      transition={transition}
      duration={timer}
      timingFunction="ease"
    >
      {style => (
        <Box
          style={style}
          ml="auto"
          mr="auto"
          left={0}
          right={0}
          pos="absolute"
        >
          {children}
        </Box>
      )}
    </Transition>
  );
};

const Transitions = {
  'fade-horizontal': { initial: 'fade-left', final: 'fade-right' },
  'fade-vertical': { initial: 'fade-up', final: 'fade-down' },

  'slide-horizontal': { initial: 'slide-left', final: 'slide-right' },
  'slide-vertical': { initial: 'slide-up', final: 'slide-down' },
} as const satisfies Record<
  string,
  { initial: MantineTransition; final: MantineTransition }
>;

interface ITransitionGroupProps {
  initial: React.ReactNode;
  final: React.ReactNode;

  timer?: number;

  status: boolean;

  transitionType?: keyof typeof Transitions;
  reverse?: boolean;
}

const TransitionGroup = (props: ITransitionGroupProps) => {
  const {
    initial,
    final,
    status,
    transitionType = 'fade-horizontal',
    reverse = false,
    timer = 1000,
  } = props;

  const selectedTransition = Transitions[transitionType];

  const [initialTransition, finalTransition] = reverse
    ? [selectedTransition.final, selectedTransition.initial]
    : [selectedTransition.initial, selectedTransition.final];

  return (
    <>
      <TransitionButton
        show={!status}
        timer={timer}
        transition={initialTransition}
      >
        {initial}
      </TransitionButton>

      <TransitionButton
        show={status}
        timer={timer}
        transition={finalTransition}
      >
        {final}
      </TransitionButton>
    </>
  );
};

export default TransitionGroup;
