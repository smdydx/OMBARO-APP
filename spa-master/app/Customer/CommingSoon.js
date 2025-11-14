import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommingSoon = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#012B17' }}>
      <StatusBar backgroundColor="#012B17" barStyle="light-content" />
      <LinearGradient
        colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
        locations={[0, 0.25, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        <View style={styles.contentBox}>
          <Text style={styles.title}>🚀 Coming Soon</Text>
          <Text style={styles.subtitle}>
            We’re building something.
          </Text>
          <Text style={styles.caption}>
            Stay tuned — this feature will be available in the next major release.
          </Text>
        </View>

        <Text style={styles.footer}>Powered by ROPDY • Ramestta Ecosystem</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00FF87',
    textShadowColor: 'rgba(0, 255, 135, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#C6F6D5',
    textAlign: 'center',
    marginBottom: 6,
  },
  caption: {
    fontSize: 14,
    color: '#99BFA7',
    textAlign: 'center',
    maxWidth: 300,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 13,
    color: '#00FF87',
    opacity: 0.8,
  },
});

export default CommingSoon;
