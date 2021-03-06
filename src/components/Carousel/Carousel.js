import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, Image, Animated, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import _last from 'lodash/last';
import Tag from '../Tag';
import withLoadingBar from '../../hocs/WithLoadingBar';
import styles from './styles';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

@withLoadingBar
class Carousel extends PureComponent {
  static propTypes = {
    images: PropTypes.array,
    routes: PropTypes.array.isRequired,
    page: PropTypes.number,
    setCarouselPage: PropTypes.func.isRequired,
    resetCarousel: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
    page: 0,
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    this.state = {
      numItems: this.props.images.length,
      layout: {
        width: initialWidth,
        height: initialHeight,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images && nextProps.images.length !== this.state.numItems) {
      this.setState({ numItems: nextProps.images.length });
    }
  }

  componentWillUnmount() {
    if (this.props.page !== 0) {
      this.props.resetCarousel();
    }
  }


  onScroll = () => Animated.event(
    [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
    { useNativeDriver: true }
  );

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      layout: {
        width,
        height,
      }
    });
  };

  handlePageChange = (e) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset) {
      const page = Math.round(offset.x / this.state.layout.width);
      if (this.props.page !== page) {
        this.props.setCarouselPage(page);
      }
    }
  };

  handleCarouselPress = (programId) => {
    const { routeName: currentRoute } = _last(this.props.routes);
    this.props.push('Program', currentRoute, { id: programId });
  };

  render() {
    if (!this.props.images || _.isEmpty(this.props.images)) {
      return null;
    }
    const currentSelection = this.props.images[this.props.page];
    const { translate } = this.props;
    return (
      <View style={styles.mainContainer} onLayout={this.onLayout}>
        <Animated.ScrollView
          style={styles.scrollContainer}
          horizontal
          pagingEnabled
          scrollEventThrottle={10}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={this.onScroll}
        >
          {
            this.props.images
              .map(({ global_image_url, id, program_id }) => (
                <TouchableWithoutFeedback
                  onPress={() => this.handleCarouselPress(program_id)}
                  key={id}
                >
                  <View key={id + 1}>
                    <Image
                      style={[styles.image, { width: this.state.layout.width }]}
                      source={{ uri: global_image_url }}
                    />
                    <View
                      style={[styles.innerFrame, { width: this.state.layout.width }]}
                    />
                  </View>
                </TouchableWithoutFeedback>
            ))
          }
        </Animated.ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.mainHeaderContainer}>
            <Text style={styles.mainHeader}>{currentSelection.name}</Text>
            { currentSelection.tags &&
              currentSelection.tags
                .slice(0, 2)
                .map((tag, i) => (
                  <Tag
                    key={`${tag}-${i}`}
                    type={tag}
                    text={this.props.translate(tag)}
                    style={[styles.tag, i === 0 && styles.tagFirstChild]}
                  />
              ))
            }
          </View>
          <View style={[styles.subContainer, { width: this.state.layout.width }]}>
            <Text style={styles.subHeader}>{
              currentSelection.type === 'movie' ?
                ' ' : `${translate('season')} ${currentSelection.season} - ${translate('episode')} ${currentSelection.episode_number}`
            }
            </Text>
            <Indicator activeIndex={this.props.page} count={this.state.numItems} />
          </View>
        </View>
      </View>
    );
  }
}

const Indicator = ({ activeIndex, count, ...props }) => (
  <View {...props} style={styles.indicatorContainer}>
    {_.times(count, num =>
      (<View
        key={num.toString()}
        style={[styles.indicator,
          num === activeIndex && styles.indicatorActive,
          num === 0 && styles.indicatorFirstChild]}
      />))}
  </View>
);

Indicator.propTypes = {
  activeIndex: PropTypes.number,
  count: PropTypes.number,
};

Indicator.defaultProps = {
  activeIndex: 0,
  count: 0,
};

export default Carousel;
