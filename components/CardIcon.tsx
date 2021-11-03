import React from 'react';
import Tooltip from './Tooltip';

interface T {
  id: string;
  tip: string;
  icon: Element | string | any;
  url: string | undefined;
  visibility: boolean | undefined;
}
const CardIcon: React.FC<T> = props => {
  const { id, tip, url, icon, visibility } = props;

  const tipString =
    visibility || url ? `View ${tip}` : `Unavailable at the moment`;
  return (
    <a
      type="button"
      className="btn btn__secondary"
      href={visibility ? url : '#'}
      key={`${id}-${tip}`}
    >
      <Tooltip tip={tipString} className="p-3">
        {icon}
      </Tooltip>
    </a>
  );
};

export default CardIcon;
