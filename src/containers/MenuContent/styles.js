import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const fontSize = 14;

const styles = StyleSheet.create({
  menuContentWrapper: {
    flex: 1,
  },
  menuItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    height: 50,
    backgroundColor: colorPalette.grayBg4,
  },
  menuItemWrapperWithImage: {
    height: 60,
  },
  menuItemChildren: {
    backgroundColor: colorPalette.grayBg5,
  },
  menuItemChildrenOpen: {
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 50 },
    shadowOpacity: 1,
  },
  menuItemBordered: {
    borderBottomColor: colorPalette.grayBg5,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  menuItemBorderedBlack: {
    borderBottomColor: colorPalette.grayBorder1,
  },
  menuItemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItemTextWrapperMultipleText: {
    justifyContent: 'space-between',
  },
  menuItemTextLeft: {
    fontSize,
    color: colorPalette.white,
  },
  menuItemTextRight: {
    fontSize,
    color: colorPalette.white,
  },
  channelInfoText: {
    paddingLeft: 15,
  },
  selectedMenuItem: {
    flex: 1,
    width: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colorPalette.red,
  },
  menuSection: {
    margin: 0,
  },
  menuSectionHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuSectionHeaderText: {
    fontSize: 12,
    color: colorPalette.white,
  },
});
export default styles;
