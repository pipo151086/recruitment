import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './src/database/appSchema';
import * as contextModels from './src/database/common/model';

AppRegistry.registerComponent(appName, () => App);


const adapter = new SQLiteAdapter({
    dbName: 'RecruitmentDB',
    schema,
});

global.database = new Database({
    adapter,
    modelClasses: [
        ...Object.values(contextModels)
    ]    
});
