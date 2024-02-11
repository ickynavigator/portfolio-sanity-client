import { Badge } from '@mantine/core';
import { SanityValues } from '../../sanity.config';

interface Props {
  tags?: Pick<SanityValues['category'], '_id' | 'title'>[] | null;
}
const CategoryList = (props: Props) => {
  const { tags } = props;

  return tags?.map(tag => {
    return (
      <Badge variant="outline" key={tag._id} size="lg">
        {tag.title}
      </Badge>
    );
  });
};

export default CategoryList;
