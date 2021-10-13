import { tableSchema } from '@nozbe/watermelondb';

export default [
  tableSchema({
    name: 'contexts',
    columns: [
      { name: 'context', type: 'string' },
      { name: 'lastTimeAccessed', type: 'string' },
      { name: 'theme', type: 'string' },      
    ],
  })
];
