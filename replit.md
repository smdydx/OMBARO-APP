# Spa Management Application

## Overview
This is a comprehensive Spa Management application built with Expo and React Native. The application provides a multi-platform solution supporting web, iOS, and Android with features for managing spa operations, bookings, therapists, vendors, and customers.

## Project Type
- **Framework**: Expo SDK 53 with React Native 0.79
- **Platform**: Multi-platform (Web, iOS, Android)
- **Routing**: Expo Router for file-based navigation
- **Styling**: TailwindCSS with NativeWind

## Current State
- ✅ Successfully configured for Replit environment
- ✅ Running on web platform at port 5000
- ✅ All dependencies installed
- ✅ Development server configured with proper host settings
- ✅ Deployment configuration set to autoscale

## Recent Changes (November 15, 2025)
1. Migrated project from GitHub import
2. Restructured files from spa-master to root directory
3. Configured Expo CLI for Replit environment:
   - Updated npm start script to use port 5000 with LAN host
   - Set EXPO_DEVTOOLS_LISTEN_ADDRESS to 0.0.0.0 for proper binding
4. Updated .gitignore for Node.js/Expo projects
5. Configured workflow for web development server
6. Set up deployment configuration for production

## Project Architecture

### Application Structure
The app uses Expo Router for file-based routing with multiple user roles:

#### User Roles
1. **Customer** - Browse and book spa services
2. **Admin** - Manage overall spa operations
3. **Employee** - Handle daily operations and tasks
4. **Therapist** - Manage appointments and schedules
5. **Vendor** - Manage services and therapist assignments
6. **Partner** - Business partnership management
7. **Department** - Departmental access

#### Main Features
- **Bookings**: Schedule and manage spa appointments
- **Map Integration**: Location-based services with expo-location
- **Profile Management**: User profiles with addresses, payment methods, favorites
- **Authentication**: Phone-based registration with OTP verification
- **Payment**: Integrated payment processing
- **Employee Management**: Attendance, leave requests, performance reviews
- **Vendor Dashboard**: Analytics, bookings, services, therapist management

### Technology Stack
- **Core**: React 19, React Native 0.79
- **Navigation**: Expo Router, React Navigation
- **UI Components**: Lucide React Native icons, Expo Vector Icons
- **Camera**: Expo Camera, Expo Image Picker
- **Location**: Expo Location
- **Storage**: AsyncStorage
- **Styling**: TailwindCSS 3.4
- **Build**: Metro bundler

## Development

### Running Locally
The application runs automatically when you open this Repl. The workflow is configured to:
- Start Expo development server on port 5000
- Bind to 0.0.0.0 for Replit proxy compatibility
- Use Metro bundler for web platform

### Available Scripts
- `npm start` - Start Expo web development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Start web development server
- `npm run lint` - Run ESLint

### Port Configuration
- **Frontend**: Port 5000 (configured for Replit webview)
- **Host**: LAN mode with EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

## Deployment
The application is configured for autoscale deployment, which:
- Automatically scales based on traffic
- Is suitable for stateless web applications
- Runs the `npm start` command in production

## Known Dependencies to Update
The following packages have version mismatches with Expo SDK 53:
- @react-native-async-storage/async-storage (currently 2.2.0, expected 2.1.2)
- @react-native-community/datetimepicker (currently 8.5.0, expected 8.4.1)
- @react-native-picker/picker (currently 2.11.4, expected 2.11.1)
- expo-image-picker (currently 17.0.8, expected 16.1.4)
- expo-location (currently 19.0.7, expected 18.1.6)
- react-native (currently 0.79.5, expected 0.79.6)

These versions are working but may be downgraded for better compatibility if needed.

## Assets
The project includes:
- Spa logo and branding assets
- Service category images (facial, hair, massage, nail treatments)
- Stock images for wedding, salon, nail art, spa, skincare, wellness
- Android app icons and splash screens

## Code Security
- Certificates stored in `certs/` directory
- Expo Updates configured with code signing
- Private keys excluded from git via .gitignore

## User Preferences
None documented yet - will be added as preferences are expressed.

## Notes
- TypeScript setup is disabled (EXPO_NO_TYPESCRIPT_SETUP=1) per project configuration
- The project uses the new React Native architecture (newArchEnabled: true)
- Expo Updates are enabled with production channel configuration
