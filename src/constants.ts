import {
  InAppMessage,
  InAppMessagingEvent,
  UserInfo,
} from '@aws-amplify/notifications';

export const DEFAULT_INAPPMESSAGING_EVENT: InAppMessagingEvent = {
  name: 'bug-bash-event',
  attributes: {
    hobbies: 'cooking',
  },
  metrics: {
    purchasedItem: 10,
  },
};

export const AD_HOC_MESSAGE: InAppMessage = {
  id: 'some-message-id',
  layout: 'TOP_BANNER',
  content: [
    {
      container: { style: { backgroundColor: '#FFF' } },
      header: {
        content: 'Header content',
        style: { color: '#000', textAlign: 'left' },
      },
      body: {
        content: 'Body content',
        style: { color: '#000', textAlign: 'left' },
      },
      image: {
        src: 'https://via.placeholder.com/500',
      },
      primaryButton: {
        title: 'Close',
        action: 'CLOSE',
        style: {
          backgroundColor: '#FF3860',
          borderRadius: 4,
          color: '#FFF',
        },
      },
      secondaryButton: {
        title: 'Link',
        action: 'LINK',
        url: 'https://aws.amazon.com/amplify/',
        style: {
          backgroundColor: '#3273DC',
          borderRadius: 4,
          color: '#FFF',
        },
      },
    },
  ],
};

export const USER_ID = 'some-user-id';

export const USER_INFO: UserInfo = {
  attributes: {
    favoriteFoods: ['pizza', 'sushi'],
    hobbies: ['cooking', 'knitting'],
  },
  metrics: {
    purchasedItem: 12,
  },
  // demographic: {
  //   appVersion: '',
  //   locale: '',
  //   make: '',
  //   model: '',
  //   modelVersion: '',
  //   platform: '',
  //   platformVersion: '',
  //   timezone: '',
  // },
  // location: {
  //   city: '',
  //   country: '',
  //   latitude: 0,
  //   longitude: 0,
  //   postalCode: '',
  //   region: '',
  // },
};
