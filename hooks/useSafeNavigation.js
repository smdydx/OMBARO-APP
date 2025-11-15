// hooks/useSafeNavigation.js
import { useState } from 'react';
import { useRouter } from 'expo-router'; // Or next/router, etc.

export function useSafeNavigation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Safely navigates to a new route, preventing multiple clicks
   * and providing a loading state.
   * @param {string} route - The path to navigate to.
   */
  const navigate = async (route) => {
    // 1. If already navigating, do nothing.
    if (isNavigating) return;

    // 2. Set the loading state
    setIsNavigating(true);

    try {
      // 3. Wait for the navigation to complete
      await router.push(route);
      
    } catch (error) {
      // 4. Log any errors
      console.error("Navigation failed:", error);
      
    } finally {
      // 5. Re-enable navigation *after* it has
      // succeeded or failed. This is crucial for shallow
      // routes or navigation failures.
      setIsNavigating(false);
    }
  };

  // Return the loading state AND the navigation function
  return { isNavigating, navigate };
}