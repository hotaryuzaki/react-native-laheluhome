import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Constants } from '@/constants/Constants';

const width = Dimensions.get('window').width; // SCREEN WIDTH SIZE

export default StyleSheet.create({
  // THIS IS ORIGINALLY FOR Collapsible
  headingCollapsible: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contentCollapsible: {
    marginTop: Constants.spacingXS4,
    marginLeft: Constants.spacingLG3,
  },

  // THIS IS ORIGINALLY FOR CollapsibleMenu
  containerCollapsibleMenu: {
    flex: 1,
    borderBottomColor: 'white',
  },
  headingCollapsibleMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  contentCollapsibleMenu: {
    marginTop: Constants.spacingXS4,
    marginLeft: Constants.spacingLG3,
  },

  // THIS IS ORIGINALLY FOR Header
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconLahelu: {
    width: Constants.imageWidthLahelu,
    height: Constants.imageHeightLahelu,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  tabContainerActive: {
    flex: 1,
    justifyContent: 'space-evenly',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.tabIconSelected,
  },
  tabText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: Colors.dark.tabIconSelected,
    fontWeight: 'bold',
  },

  // THIS IS ORIGINALLY FOR ImageAvatar
  postHeaderAvatar: {
    width: Constants.imageWidthAvatar,
    aspectRatio: 1,
    borderRadius: Constants.borderRadiusCircle,
  },

  // THIS IS ORIGINALLY FOR ImageLaheluIcon
  circleContainer: {
    width: Constants.imageWidthLaheluIcon,
    aspectRatio: 1,
    borderRadius: Constants.borderRadiusCircle,
    overflow: 'hidden',
    backgroundColor: Colors.dark.background,
  },
  laheluIcon: {
    flex: 1,
    aspectRatio: 1,
  },

  // THIS IS ORIGINALLY FOR ImagePost
  postImageContainer: {
    flex: 1,
    backgroundColor: Colors.dark.mediaBackground,
  },
  postImage: {
    width: width,
    height: width,
  },

  // THIS IS ORIGINALLY FOR ImageTagSmall
  imageTagSmall: {
    width: Constants.imageWidthTagSmall,
    aspectRatio: 1,
    borderRadius: Constants.borderRadiusSM,
  },

  // THIS IS ORIGINALLY FOR InlineIcon
  inlineIcon: {
    padding: 0,
    margin: 0,
  },

  // THIS IS ORIGINALLY FOR ListView
  listView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Constants.spacingLG,
    paddingVertical: Constants.spacingXS3,
    backgroundColor: 'red',
  },

  // THIS IS ORIGINALLY FOR ParallaxScrollView
  containerParallaxScrollView: {
    flex: 1,
  },
  headerParallaxScrollView: {
    height: 250,
    overflow: 'hidden',
  },
  contentParallaxScrollView: {
    flex: 1,
    padding: Constants.spacingLG3,
    gap: 16,
    overflow: 'hidden',
  },

  // THIS IS ORIGINALLY FOR ThemedButton
  defaultThemedButton: {
    height: Constants.buttonHeightMD,
    padding: 0,
    justifyContent: 'space-evenly',
    borderRadius: Constants.borderRadiusSM,
  },
  signInGoogleButton: {
    borderWidth: 1,
    borderColor: Colors.dark.borderGrey,
    backgroundColor: Colors.dark.background,
  },
  logInButton: {
    width: Constants.buttonWidthSM,
    alignSelf: 'center',
    borderRadius: Constants.borderRadiusCircle,
  },

  // THIS IS ORIGINALLY FOR ThemedDrawer
  containerThemedDrawer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentThemedDrawer: {
    paddingVertical: Constants.spacingSM2,
  },
  notLoginContainer: {
    padding: Constants.spacingMD2,
    margin: Constants.spacingMD2,
    borderRadius: Constants.borderRadiusMD,
    borderWidth: 1,
    borderColor: Colors.dark.borderGrey,
  },
  notLoginTitle: {
    textAlign: 'center',
    marginBottom: Constants.spacingSM2,
  },
  notLoginText: {
    textAlign: 'center',
    marginBottom: Constants.spacingSM2,
  },
  menuContainer: {
    paddingVertical: Constants.spacingXS3,
  },
  menuContainerWithBorder: {
    paddingVertical: Constants.spacingXS3,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.dark.text,
    marginTop: Constants.spacingXS,
  },
  footerContainer: {
    paddingVertical: Constants.spacingXS3,
    marginVertical: Constants.spacingSM2,
  },
  footerLinks: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Constants.spacingLG,
    gap: 15,
  },
  drawerHeaderContainer: {
    height: Constants.drawerHeaderHeight,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constants.spacingMD2,
    paddingVertical: Constants.spacingXS3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.dark.text,
  },
  input: {
    height: Constants.inputHeightMD,
    color: Colors.dark.text,
    fontSize: Constants.textXL,
    alignItems: 'center',
    marginHorizontal: Constants.spacingMD2,
    marginVertical: Constants.spacingSM3,
    padding: Constants.spacingSM3,
    borderColor: Colors.dark.inputBorder,
    borderRadius: Constants.borderRadiusMD,
    borderWidth: 1,
    backgroundColor: Colors.dark.inputBackground,
  },
  tagMenu: {
    flex: 1,
    marginLeft: Constants.spacingXS4,
    paddingHorizontal: Constants.spacingXS4,
  },
  starContainer: {
    width: Constants.buttonWidthXS,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: Constants.borderRadiusSM,
    backgroundColor: Colors.dark.background,
  },

  // THIS IS ORIGINALLY FOR ThemedText
  default: {
    fontSize: Constants.textLG,
    lineHeight: Constants.lineHeightXS,
  },
  defaultSemiBold: {
    fontSize: Constants.textLG,
    fontWeight: '600',
    lineHeight: Constants.lineHeightXS,
  },
  title: {
    fontSize: Constants.textXL3,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Constants.textXL2,
    fontWeight: 'bold',
  },
  link: {
    color: '#0a7ea4',
    fontSize: Constants.textLG,
    lineHeight: Constants.lineHeightSM,
  },
  menuDrawerActive: {
    fontSize: Constants.textXL,
    fontWeight: 'bold',
    lineHeight: Constants.lineHeightSM,
  },
  menuDrawer: {
    fontSize: Constants.textXL,
    fontWeight: '400',
    lineHeight: Constants.lineHeightSM,
  },
  tab: {
    fontSize: Constants.textLG,
    textAlign: 'center',
    paddingHorizontal: Constants.spacingXS4,
  },
  postUsername: {
    fontSize: Constants.textMD,
    fontWeight: 'bold',
  },
  postTime: {
    color: Colors.dark.textTertiary,
    fontSize: Constants.textMD,
    paddingHorizontal: Constants.spacingXS4,
  },
  postTitle: {
    fontSize: Constants.textXL,
    fontWeight: 'bold',
  },
  postTag: {
    fontSize: Constants.textLG,
    fontWeight: 'bold',
    paddingHorizontal: Constants.spacingXS4,
  },
  postCounter: {
    fontSize: Constants.textLG,
    fontWeight: 'bold',
    marginLeft: Constants.spacingXS3,
  },
  modalTitle: {
    fontSize: Constants.textXL3,
    textAlign: 'center',
  },
  modalText: {
    color: Colors.dark.textTertiary,
    fontSize: Constants.textMD,
    textAlign: 'center',
  },
  signInGoogle: {
    color: Colors.dark.textTertiary,
    fontSize: Constants.textMD,
    textAlign: 'center',
  },
  logIn: {
    fontSize: Constants.textXL,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuBottomSheetTitle: {
    fontSize: Constants.textXL3,
    fontWeight: 'bold',
  },
  menuBottomSheet: {
    fontSize: Constants.textXL,
    paddingLeft: Constants.spacingSM2,
  },
  menuBottomSheetRed: {
    fontSize: Constants.textXL2,
    color: Colors.dark.textReport,
    paddingLeft: Constants.spacingSM2,
  },
  nsfwTitle: {
    fontSize: Constants.textXL3,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: Constants.lineHeightMD,
  },
  nsfwText: {
    color: Colors.dark.textSecondary,
    fontSize: Constants.textLG,
    textAlign: 'center',
  },
  nsfwLink: {
    color: Colors.dark.tint,
    fontSize: Constants.textLG,
    textAlign: 'center',
    lineHeight: Constants.lineHeightMD,
  },

  // THIS IS ORIGINALLY FOR VideoPlayer
  postVideoContainer: {
    width: width,
    aspectRatio: 1,
    backgroundColor: Colors.dark.mediaBackground,
  },
  postVideo: {
    flex: 1,
  },
  buttonPlayContainer: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlayCircle: {
    position: 'absolute',
    width: Constants.postPlayHeight,
    aspectRatio: 1,
    borderRadius: Constants.borderRadiusCircle,
    opacity: 0.8,
    backgroundColor: Colors.dark.background,
  },
  buttonMuteContainer: {
    position: 'absolute',
    width: Constants.buttonWidthXS,
    aspectRatio: 1,
    bottom: Constants.spacingMD2,
    right: Constants.spacingMD2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonMuteCircle: {
    position: 'absolute',
    width: Constants.buttonWidthXS,
    aspectRatio: 1,
    borderRadius: Constants.borderRadiusCircle,
    opacity: 0.5,
    backgroundColor: Colors.dark.background,
  },
  durationContainer: {
    display: 'none',
    position: 'absolute',
    flex: 1,
    bottom: Constants.postDurationBottom,
    alignSelf: 'center',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: Constants.postSliderHeight,
    bottom: 0,
  },
  trackStyle: {
    height: Constants.postSliderHeight,
    borderRadius: 0,
  },
  thumbStyle: {
    width: Constants.postSliderThumbHeight,
    height: Constants.postSliderThumbHeight,
    backgroundColor: Colors.dark.mediaTimeIndicatorProgress,
  },
});
