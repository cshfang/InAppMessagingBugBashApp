import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Amplify, Notifications } from 'aws-amplify';
import {
  InAppMessagingProvider,
  InAppMessageDisplay,
  // @ts-ignore
} from 'aws-amplify-react-native';

import config from './src/aws-exports';
import Home from './src/Home';

Amplify.configure(config);

const { InAppMessaging } = Notifications;

const App = () => {
  useEffect(() => {
    InAppMessaging.syncMessages();
  }, []);

  return (
    <SafeAreaView>
      <InAppMessagingProvider>
        <Home />
        <InAppMessageDisplay />
      </InAppMessagingProvider>
    </SafeAreaView>
  );
};

export default App;
