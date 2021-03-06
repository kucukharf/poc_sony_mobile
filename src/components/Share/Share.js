import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import PropTypes from 'prop-types';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import _pickBy from 'lodash/fp/pickBy';
import _identity from 'lodash/fp/identity';
import styles from './styles';

const removeFalsy = _pickBy(_identity);

export default class ShareButton extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    activeOpacity: PropTypes.number,
    iconSize: PropTypes.number,
    message: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    dialogTitle: PropTypes.string,
    excludedActivityTypes: PropTypes.array,
    callback: PropTypes.func,
    onError: PropTypes.func,
    style: View.propTypes.style,
    iconStyle: Text.propTypes.style,
  };
  static defaultProps = {
    size: 30,
    activeOpacity: 0.8,
    iconSize: 15,
    callback: () => {},
    onError: console.log,
    iconStyle: undefined,
    style: undefined,
    dialogTitle: undefined,
    title: undefined,
    message: undefined,
    url: undefined,
    excludedActivityTypes: undefined,
  };
  onShareIconPress = () => {
    const {
      message, url, title, dialogTitle, callback, excludedActivityTypes, onError
    } = this.props;
    const shareProperties = removeFalsy({
      message,
      url,
      title
    });
    const extraProperties = removeFalsy({
      dialogTitle,
      excludedActivityTypes,
    });
    return Share
      .share(shareProperties, extraProperties)
      .then(callback)
      .catch(onError);
  };

  render() {
    const { size, activeOpacity } = this.props;
    return (
      <View
        style={
          [
            styles.shareWrapper.main,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            this.props.style
          ]}
      >
        <TouchableOpacity
          activeOpacity={activeOpacity}
          hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        }}
          onPress={this.onShareIconPress}
          style={styles.shareWrapper.disabled}
        >
          <SimpleLineIcon
            style={[styles.icon.shareWrapper, this.props.iconStyle]}
            name="share"
            size={this.props.iconSize}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
