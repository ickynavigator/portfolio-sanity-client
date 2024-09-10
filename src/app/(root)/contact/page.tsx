'use client';

import {
  Alert,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';
import { useTransition } from 'react';
import { z } from 'zod';
import useAlertManager from '~/hooks/useAlertManager';
import formSubmit from './actions';

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(5).max(256),
});

const Page = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: zodResolver(formSchema),
  });

  const [formSuccess, toggleFormSuccess] = useAlertManager(false);
  const [formError, toggleFormError] = useAlertManager(false);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: typeof form.values) => {
    startTransition(async () => {
      toggleFormSuccess(false);
      toggleFormError(false);

      try {
        await formSubmit(values);

        form.reset();
        toggleFormSuccess(true);
      } catch (e) {
        console.error('from client', e);
        toggleFormError(true);
      }
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={2} mb="sm" ta="right">
        Contact Me
      </Title>

      {formSuccess && (
        <Alert icon={<IconCircleCheckFilled />} color="green" my="sm" fz="sm">
          Message sent successfully
        </Alert>
      )}

      {formError && (
        <Alert icon={<IconAlertCircleFilled />} color="red" my="sm" fz="sm">
          There was an issue. Please try again
        </Alert>
      )}

      <Stack align="stretch">
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter Email"
          {...form.getInputProps('email')}
        />
        <Textarea
          withAsterisk
          autosize
          minRows={4}
          label="Message"
          placeholder="Enter Message"
          {...form.getInputProps('message')}
        />
        <Group justify="flex-end">
          <Button type="submit" variant="outline" loading={isPending}>
            Send
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Page;
