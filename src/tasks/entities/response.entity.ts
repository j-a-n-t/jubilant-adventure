import { createUnionType } from '@nestjs/graphql';
import { ResponseTaskEntity } from './response.task.entity';
import { ResponseTasksEntity } from './response.tasks.entity';

const responseEntity: ResponseTaskEntity | ResponseTasksEntity = createUnionType({
  name: 'responseEntity',
  description: 'Response Entity union',
  types: () => [ResponseTasksEntity, ResponseTaskEntity],
  resolveType: (value: ResponseTasksEntity | ResponseTaskEntity) => {
    if (Array.isArray(value.data)) {
      return ResponseTasksEntity;
    } else {
      return ResponseTaskEntity;
    }
  },
});

export { responseEntity };
