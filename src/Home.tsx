import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Analytics, Notifications } from 'aws-amplify';
import {
  InAppMessagingEvent,
  InAppMessageInteractionEvent,
} from '@aws-amplify/notifications';

import Button from './Button';
import {
  AD_HOC_MESSAGE,
  DEFAULT_INAPPMESSAGING_EVENT,
  USER_ID,
  USER_INFO,
} from './constants';
import EventEditor from './EventEditor';
import Section from './Section';

interface Listeners {
  onReceivedListener?: any;
  onDisplayedListener?: any;
  onDismissedListener?: any;
  onActionTakenListener?: any;
}

const { InAppMessaging } = Notifications;

const Home = () => {
  const [event, setEvent] = useState<InAppMessagingEvent>(
    DEFAULT_INAPPMESSAGING_EVENT,
  );
  const [listeners, setListeners] = useState<Listeners>({});

  const addListener = (interactionEvent: InAppMessageInteractionEvent) => {
    switch (interactionEvent) {
      case InAppMessageInteractionEvent.MESSAGE_RECEIVED: {
        const onReceivedListener = InAppMessaging.onMessageReceived(message => {
          console.log(`[MESSAGE RECEIVED] ${JSON.stringify(message)}`);
        });
        setListeners({ ...listeners, onReceivedListener });
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_DISPLAYED: {
        const onDisplayedListener = InAppMessaging.onMessageDisplayed(
          message => {
            console.log(`[MESSAGE DISPLAYED] ${JSON.stringify(message)}`);
          },
        );
        setListeners({ ...listeners, onDisplayedListener });
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_DISMISSED: {
        const onDismissedListener = InAppMessaging.onMessageDismissed(
          message => {
            console.log(`[MESSAGE DISMISSED] ${JSON.stringify(message)}`);
          },
        );
        setListeners({ ...listeners, onDismissedListener });
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN: {
        const onActionTakenListener = InAppMessaging.onMessageActionTaken(
          message => {
            console.log(`[MESSAGE ACTION TAKEN] ${JSON.stringify(message)}`);
          },
        );
        setListeners({ ...listeners, onActionTakenListener });
        break;
      }
    }
  };
  const removeListener = (interactionEvent: InAppMessageInteractionEvent) => {
    switch (interactionEvent) {
      case InAppMessageInteractionEvent.MESSAGE_RECEIVED: {
        listeners.onReceivedListener?.remove();
        delete listeners.onReceivedListener;
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_DISPLAYED: {
        listeners.onDisplayedListener?.remove();
        delete listeners.onDisplayedListener;
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_DISMISSED: {
        listeners.onDismissedListener?.remove();
        delete listeners.onDismissedListener;
        break;
      }
      case InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN: {
        listeners.onActionTakenListener?.remove();
        delete listeners.onActionTakenListener;
        break;
      }
    }
    setListeners({ ...listeners });
  };

  return (
    <ScrollView>
      <Section header="Sync or Clear Messages">
        <View style={styles.row}>
          <Button onPress={InAppMessaging.syncMessages} title="Sync Messages" />
          <Button
            onPress={InAppMessaging.clearMessages}
            title="Clear Messages"
            variant="negative"
          />
        </View>
      </Section>
      <Section header="Event Editor">
        <EventEditor event={event} setEvent={setEvent} />
      </Section>
      <Section header="Record or Dispatch Event">
        <View style={styles.row}>
          <Button
            onPress={() => {
              Analytics.record({});
            }}
            title="Record Analytics"
          />
          <Button
            onPress={InAppMessaging.clearMessages}
            title="Dispatch Event"
            variant="secondary"
          />
        </View>
      </Section>
      <Section header="Interaction Event Listeners">
        <View style={styles.row}>
          {listeners.onReceivedListener ? (
            <Button
              onPress={() => {
                removeListener(InAppMessageInteractionEvent.MESSAGE_RECEIVED);
              }}
              title="Remove onReceived"
              variant="negative"
            />
          ) : (
            <Button
              onPress={() => {
                addListener(InAppMessageInteractionEvent.MESSAGE_RECEIVED);
              }}
              title="Add onReceived"
              variant="secondary"
            />
          )}
          {listeners.onDisplayedListener ? (
            <Button
              onPress={() => {
                removeListener(InAppMessageInteractionEvent.MESSAGE_DISPLAYED);
              }}
              title="Remove onDisplayed"
              variant="negative"
            />
          ) : (
            <Button
              onPress={() => {
                addListener(InAppMessageInteractionEvent.MESSAGE_DISPLAYED);
              }}
              title="Add onDisplayed"
              variant="secondary"
            />
          )}
        </View>
        <View style={styles.row}>
          {listeners.onDismissedListener ? (
            <Button
              onPress={() => {
                removeListener(InAppMessageInteractionEvent.MESSAGE_DISMISSED);
              }}
              title="Remove onDismissed"
              variant="negative"
            />
          ) : (
            <Button
              onPress={() => {
                addListener(InAppMessageInteractionEvent.MESSAGE_DISMISSED);
              }}
              title="Add onDismissed"
              variant="secondary"
            />
          )}
          {listeners.onActionTakenListener ? (
            <Button
              onPress={() => {
                removeListener(
                  InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN,
                );
              }}
              title="Remove onActionTaken"
              variant="negative"
            />
          ) : (
            <Button
              onPress={() => {
                addListener(InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN);
              }}
              title="Add onActionTaken"
              variant="secondary"
            />
          )}
        </View>
      </Section>
      <Section header="Notify Interaction Event">
        <View style={styles.row}>
          <Button
            onPress={() => {
              InAppMessaging.notifyMessageInteraction(
                AD_HOC_MESSAGE,
                InAppMessageInteractionEvent.MESSAGE_RECEIVED,
              );
            }}
            title="Message Received"
          />
          <Button
            onPress={() => {
              InAppMessaging.notifyMessageInteraction(
                AD_HOC_MESSAGE,
                InAppMessageInteractionEvent.MESSAGE_DISPLAYED,
              );
            }}
            title="Message Displayed"
          />
        </View>
        <View style={styles.row}>
          <Button
            onPress={() => {
              InAppMessaging.notifyMessageInteraction(
                AD_HOC_MESSAGE,
                InAppMessageInteractionEvent.MESSAGE_DISMISSED,
              );
            }}
            title="Message Displayed"
          />
          <Button
            onPress={() => {
              InAppMessaging.notifyMessageInteraction(
                AD_HOC_MESSAGE,
                InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN,
              );
            }}
            title="Message Action Taken"
          />
        </View>
      </Section>
      <Section header="Identify User">
        <View style={styles.row}>
          <Button
            onPress={() => {
              InAppMessaging.identifyUser(USER_ID, USER_INFO);
            }}
            title="Identify User"
          />
        </View>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default Home;
