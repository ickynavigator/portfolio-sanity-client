import {
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';
import { z } from 'zod';
import Alert from '../../components/Alert';
import MetaHead from '../../components/MetaHead';
import { useAlertManager } from '../../hooks';
import projectConfig from '../../lib/project.config';
import { postToSanity } from '../../lib/sanity';
import type { ContactForms } from '../../schema';

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(5).max(256),
});

const Index: NextPage = () => {
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    toggleFormSuccess(false);
    toggleFormError(false);
    setLoading(true);

    try {
      const { name, email, message } = values;
      const res = await postToSanity<ContactForms, ContactForms>({
        _type: 'contactForms',
        name,
        email,
        message,
      });

      if (res.status === 200) {
        form.reset();
        toggleFormSuccess(true);

        await axios.post(
          `api/mail/contact`,
          { ...res.data },
          { headers: { 'Content-type': 'application/json' } },
        );
      }
    } catch (error) {
      toggleFormError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaHead title={`Contact ${projectConfig.name}`} />
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Title order={2} mb="sm" align="right">
          Contact Me
        </Title>
        {formSuccess && (
          <Alert.Success>Message sent successfully</Alert.Success>
        )}
        {formError && (
          <Alert.Error>There was an issue. Please try again</Alert.Error>
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
          <Group position="right">
            <Button type="submit" variant="outline" loading={loading}>
              Send
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default Index;
