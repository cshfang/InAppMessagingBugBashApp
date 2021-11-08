import React, { Dispatch, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InAppMessagingEvent } from '@aws-amplify/notifications';

import Button from './Button';

interface Props {
  event: InAppMessagingEvent;
  setEvent: Dispatch<InAppMessagingEvent>;
}

const EventEditor = ({ event, setEvent }: Props) => {
  const [attributeKey, onChangeAttributeKey] = useState('');
  const [attribute, onChangeAttribute] = useState('');
  const [metricKey, onChangeMetricKey] = useState('');
  const [metric, onChangeMetric] = useState('');

  const onChangeName = (name: string) => {
    setEvent({ ...event, name });
  };

  const addAttribute = () => {
    if (!attributeKey || !attribute) {
      return;
    }
    setEvent({
      ...event,
      attributes: {
        ...event.attributes,
        [attributeKey]: attribute,
      },
    });
    onChangeAttributeKey('');
    onChangeAttribute('');
  };

  const addMetric = () => {
    const float = parseFloat(metric);
    if (!metricKey || !metric || Number.isNaN(float)) {
      return;
    }
    setEvent({
      ...event,
      metrics: {
        ...event.metrics,
        [metricKey]: float,
      },
    });
    onChangeMetricKey('');
    onChangeMetric('');
  };

  return (
    <View style={styles.view}>
      <View style={styles.item}>
        <TextInput
          autoCapitalize="none"
          onChangeText={onChangeName}
          placeholder="Event name"
          style={styles.textInput}
          value={event.name}
        />
      </View>
      {Object.entries(event.attributes ?? {}).map(([key, value]) => (
        <View key={`attribute-${key}`} style={styles.item}>
          <View style={styles.col}>
            <Text numberOfLines={1} style={styles.display}>
              {key}
            </Text>
          </View>
          <View style={styles.col}>
            <Text numberOfLines={1} style={styles.display}>
              {value}
            </Text>
          </View>
          <View style={styles.col}>
            <View style={styles.buttonView}>
              <Button
                onPress={() => {
                  delete event.attributes?.[key];
                  setEvent({ ...event });
                }}
                title="Remove"
                variant="negative"
              />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.item}>
        <View style={styles.col}>
          <TextInput
            autoCapitalize="none"
            onChangeText={onChangeAttributeKey}
            placeholder="Attribute Key"
            style={styles.textInput}
            value={attributeKey}
          />
        </View>
        <View style={styles.col}>
          <TextInput
            autoCapitalize="none"
            onChangeText={onChangeAttribute}
            placeholder="Attribute Value"
            style={[styles.textInput, styles.textInputValue]}
            value={attribute}
          />
        </View>
        <View style={styles.col}>
          <View style={styles.buttonView}>
            <Button
              onPress={addAttribute}
              title="Add Attribute"
              variant="secondary"
            />
          </View>
        </View>
      </View>
      {Object.entries(event.metrics ?? {}).map(([key, value]) => (
        <View key={`metric-${key}`} style={styles.item}>
          <View style={styles.col}>
            <Text numberOfLines={1} style={styles.display}>
              {key}
            </Text>
          </View>
          <View style={styles.col}>
            <Text numberOfLines={1} style={styles.display}>
              {value}
            </Text>
          </View>
          <View style={styles.col}>
            <View style={styles.buttonView}>
              <Button
                onPress={() => {
                  delete event.metrics?.[key];
                  setEvent({ ...event });
                }}
                title="Remove"
                variant="negative"
              />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.item}>
        <View style={styles.col}>
          <TextInput
            autoCapitalize="none"
            onChangeText={onChangeMetricKey}
            placeholder="Metric Key"
            style={styles.textInput}
            value={metricKey}
          />
        </View>
        <View style={styles.col}>
          <TextInput
            autoCapitalize="none"
            onChangeText={onChangeMetric}
            placeholder="Metric Value"
            style={[styles.textInput, styles.textInputValue]}
            value={metric}
          />
        </View>
        <View style={styles.col}>
          <View style={styles.buttonView}>
            <Button
              onPress={addMetric}
              title="Add Metric"
              variant="secondary"
            />
          </View>
        </View>
      </View>
      <View style={styles.preview}>
        <Text style={styles.previewHeader}>Event Preview</Text>
        <Text style={styles.previewText}>{JSON.stringify(event, null, 2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    // alignSelf: 'flex-end',
    marginRight: -4,
  },
  col: {
    flex: 1,
  },
  display: {
    lineHeight: 40,
  },
  item: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 4,
  },
  preview: {
    alignContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginTop: 8,
    padding: 4,
  },
  previewHeader: {
    color: '#B5B5B5',
    fontSize: 12,
    marginRight: 4,
    position: 'absolute',
    top: 4,
    right: 4,
  },
  previewText: {
    fontSize: 12,
  },
  textInput: {
    borderColor: '#3273DC',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 40,
    padding: 8,
  },
  textInputValue: {
    marginLeft: 4,
  },
  view: {
    alignSelf: 'stretch',
    backgroundColor: '#F5F5F5',
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
});

export default EventEditor;
