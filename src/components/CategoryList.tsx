import { Badge } from '@mantine/core';
import { Category } from '../../schema';

interface Props {
  tags?: Category[];
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
