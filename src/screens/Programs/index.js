import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _last from 'lodash/last';
import { Dimensions, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import ProgramTypeTabSelector from '../../containers/ProgramTypeTabSelector';
import { actions as programActions } from '../../reducers/programs';
import ImageWrapper from '../../components/Image';
import { push } from '../../reducers/nav';

const deviceWidth = Dimensions.get('window').width;
const imageWidth = (deviceWidth - 40) / 4;

@withTranslation
@connect(
  state => ({
    selectedType: state.programs.selectedType,
    programs: state.programs.programs,
    isLoading: state.programs.isLoading,
    channelId: state.app.channelId,
    routes: state.nav.routes,
  }),
  programActions,
)
export default class Programs extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    programs: PropTypes.array.isRequired,
    routes: PropTypes.array.isRequired,
    selectedType: PropTypes.string.isRequired,
    channelId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getPrograms: PropTypes.func.isRequired,
    setProgramType: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPrograms(this.props.channelId);
  }

  navigateToProgram = id => () => {
    const { routeName: currentRoute } = _last(this.props.routes);
    this.props.navigation.dispatch(push('Program', currentRoute, { id }));
  };

  render() {
    const { programs, selectedType } = this.props;
    return (
      <View style={styles.container}>
        <ProgramTypeTabSelector
          selectedType={selectedType}
          setProgramType={this.props.setProgramType}
          translate={this.props.translate}
        />
        <View style={styles.programsContainer}>
          {
            <ProgramList
              onProgramClick={this.navigateToProgram}
              getPrograms={this.props.getPrograms}
              isLoading={this.props.isLoading}
              programs={programs.filter(x => x.type === selectedType)}
            />
          }
        </View>
      </View>
    );
  }
}

const ImageItem = ({ onPress, image, id }) => {
  return (
    <TouchableOpacity onPress={onPress(id)} style={styles.program}>
      <ImageWrapper
        uri={image}
        height={imageWidth * 1.5}
        width={imageWidth}
      />
    </TouchableOpacity>
  )
};
ImageItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

class ProgramList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    programs: PropTypes.array.isRequired,
    getPrograms: PropTypes.func.isRequired,
    onProgramClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
  }

  onScroll = () => Animated.event(
    [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
    { useNativeDriver: true }
  );

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <ImageItem
      id={item.id}
      onPress={this.props.onProgramClick}
      image={item.tmdbImagePath}
    />
  );

  render() {
    return (
      <FlatList
        onScroll={this.onScroll}
        scrollEventThrottle={10}
        onRefresh={() => this.props.getPrograms(this.props.channelId)}
        refreshing={this.props.isLoading}
        numColumns={4}
        data={this.props.programs}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
