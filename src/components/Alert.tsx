import { Alert as MantineAlert } from '@mantine/core';
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';

interface AlertProps {
  children: React.ReactNode;
}

export const SuccessAlert = ({ children }: AlertProps) => {
  return (
    <MantineAlert icon={<IconCircleCheckFilled />} color="green" my="sm">
      {children}
    </MantineAlert>
  );
};

export const ErrorAlert = ({ children }: AlertProps) => {
  return (
    <MantineAlert icon={<IconAlertCircleFilled />} color="red" my="sm">
      {children}
    </MantineAlert>
  );
};

const Alert = {
  Success: SuccessAlert,
  Error: ErrorAlert,
};

export default Alert;
