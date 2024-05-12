'use client';

import { Button, CopyButton, Tooltip } from '@mantine/core';
import { IconCopy, IconCopyCheck } from '@tabler/icons-react';
import React from 'react';
import TransitionGroup from '~/components/TransitionGroup';

interface ClipboardButtonProps {
  text: string;
  timer?: number;
  tooltip?: string;
  size?: string | number;
}

const ClipboardButton = (props: ClipboardButtonProps) => {
  const { text, timer = 1000, tooltip = 'Copy Text', size = 14 } = props;

  return (
    <CopyButton value={text} timeout={timer}>
      {({ copied, copy }) => (
        <Tooltip label={tooltip} closeDelay={500} withArrow>
          <Button
            color={copied ? 'teal' : 'blue'}
            onClick={copy}
            variant="outline"
            style={{ transition: `all ${timer}ms ease` }}
          >
            <TransitionGroup
              status={copied}
              timer={timer}
              initial={<IconCopy size={size} />}
              final={<IconCopyCheck size={size} />}
            />
          </Button>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default ClipboardButton;
