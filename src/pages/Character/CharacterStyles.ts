import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCCCCC7F',
    borderRadius: 7,
  },
  pictureContainer: {
    maxWidth: '48%',
  },
  profilePicture: {
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  comicsCard: {
    marginBottom: 30,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionText: {
    //
  },
  profileCard: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
});

export default styles;
