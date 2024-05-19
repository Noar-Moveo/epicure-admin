import AWS from 'aws-sdk';

declare module 'aws-sdk-react-native' {
    import * as AWS from 'aws-sdk';
    export = AWS;
}
