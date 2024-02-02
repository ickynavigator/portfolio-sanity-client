interface CheckIconProps {
  status: boolean | 'true' | 'false';
}

const CheckIcon = (props: CheckIconProps) => {
  const { status } = props;
  const EMOJIS = { true: '✅', false: '🚫' };

  return <span style={{ fontSize: '1.5rem' }}>{EMOJIS[`${status}`]}</span>;
};
export default CheckIcon;
