import { appSchema, tableSchema } from '@nozbe/watermelondb';
import commonSchema from './common/schema';

const dbVersion = 2;

export default appSchema({
    version: dbVersion,
    tables: [...commonSchema],
});
