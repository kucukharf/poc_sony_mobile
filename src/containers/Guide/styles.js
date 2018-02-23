import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 7,
    width: '100%',
    backgroundColor: colorPalette.som
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;
