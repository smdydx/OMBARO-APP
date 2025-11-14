import { Link, Stack, useLocalSearchParams, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const pathname = usePathname(); // <-- get the broken path
  const params = useLocalSearchParams(); // <-- includes token, id etc if present

  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Page Not Found' }} />

      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist:</Text>

        <Text style={styles.pathText}>
          {pathname}
        </Text>

        {/* Show query params if needed */}
        {Object.keys(params).length > 0 && (
          <Text style={styles.paramText}>
            Params: {JSON.stringify(params)}
          </Text>
        )}

        <Link href="/" style={styles.link}>
          <Text style={styles.homeLink}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  pathText: {
    fontSize: 16,
    color: '#ff4444',
    marginBottom: 10,
  },
  paramText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  homeLink: {
    color: '#007aff',
    fontSize: 16,
  },
});
