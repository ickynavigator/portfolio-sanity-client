import { Anchor, Blockquote, Code, List, Text, Title } from '@mantine/core';
import { PortableTextReactComponents } from '@portabletext/react';

const portableTextCustomComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <Text>{children}</Text>,
    h1: ({ children }) => <Title order={1}>{children}</Title>,
    h2: ({ children }) => <Title order={2}>{children}</Title>,
    h3: ({ children }) => <Title order={3}>{children}</Title>,
    h4: ({ children }) => <Title order={4}>{children}</Title>,
    h5: ({ children }) => <Title order={5}>{children}</Title>,
    h6: ({ children }) => <Title order={6}>{children}</Title>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
    unstyled: ({ children }) => children,
  },

  list: {
    bullet: ({ children }) => <List type="ordered">{children}</List>,
    number: ({ children }) => <List type="ordered">{children}</List>,
  },

  listItem: ({ children }) => <List.Item>{children}</List.Item>,

  marks: {
    em: ({ children }) => <Text component="em">{children}</Text>,
    strong: ({ children }) => <Text component="strong">{children}</Text>,
    underline: ({ children }) => (
      <Text component="span" td="underline">
        {children}
      </Text>
    ),
    link: ({ children, value }) => (
      <Anchor href={value?.href}>{children}</Anchor>
    ),
    'strike-through': ({ children }) => <Text component="del">{children}</Text>,
    code: ({ children }) => <Code>{children}</Code>,
  },
};

export default portableTextCustomComponents;
