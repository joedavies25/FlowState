global.fetch = require('jest-fetch-mock');

jest.mock('@expo/vector-icons'); // to avoid errors for Icon rendering
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper'); // to avoid warnings about NativeAnimatedHelp
