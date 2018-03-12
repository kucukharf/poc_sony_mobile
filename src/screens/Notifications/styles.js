import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.grayBg4,
  },
  emptyContainer: {
    width: '100%',
    flexGrow: 0,
    flexBasis: 80,
    flexShrink: 0,
    borderBottomColor: colorPalette.red,
    borderBottomWidth: 2,
  }
});
export default styles;