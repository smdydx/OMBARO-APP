import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  Clock3,
  Flower2,
  Heart,
  MapPin,
  Scissors,
  Search,
  Sparkles,
  Star
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeNavigation } from '../../hooks/useSafeNavigation';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768;

const COLORS = {
  primary: '#016B3A',
  primaryDark: '#1e40af',
  secondary: '#016B3A',
  white: '#FFFFFF',
  textDark: '#016B3A',
  textGray: '#6B7280',
  border: '#016B3A',
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroScrollRef = useRef(null);
  const searchInputRef = useRef(null);

  const { isNavigating, navigate } = useSafeNavigation();

  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [searchClicked,setSearchClicked] = useState(false);
  const [activeFilter, setActiveFilter] = useState('instant');

  const quickCategories = [
    {
      id: 1,
      name: 'Spa & Massage',
      icon: Sparkles,
      color: '#8b5cf6',
      image: require('../../assets/attached_assets/professional_spa_mas_338753fe.jpg'),
      tagline: 'Relax & detox'
    },
    {
      id: 2,
      name: 'Bridal Makeup',
      icon: Heart,
      color: '#ec4899',
      image: require('../../assets/attached_assets/bridal_makeup_weddin_12cc5e76.jpg'),
      tagline: 'Weddings & glam'
    },
    {
      id: 3,
      name: 'Hair Salon',
      icon: Scissors,
      color: '#3b82f6',
      image: require('../../assets/attached_assets/hair_salon_styling_h_0bb02c12.jpg'),
      tagline: 'Cuts & color'
    },
    {
      id: 4,
      name: 'Skincare',
      icon: Flower2,
      color: '#10b981',
      image: require('../../assets/attached_assets/skincare_facial_trea_613d6f55.jpg'),
      tagline: 'Skin wellness'
    },
  ];

  const heroSlides = [
    {
      id: 1,
      title: 'Premium Massage Therapy',
      subtitle: 'Relaxing Body Massage',
      description: 'Deep tissue, Swedish, Thai, and aromatherapy massages by expert therapists',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      badge: '50,000+ Happy Customers',
    },
    {
      id: 2,
      title: 'Luxury Spa Experience',
      subtitle: 'Rejuvenate Your Senses',
      description: 'Complete wellness packages with aromatherapy and personalized treatments',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
      badge: 'Rated 4.9 Stars',
    },
    {
      id: 3,
      title: 'Bridal Makeover',
      subtitle: 'Your Special Day',
      description: 'Professional bridal makeup and styling for your perfect wedding look',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg',
      badge: 'Expert Stylists',
    },
  ];


  const salons = [
    {
      id: 1,
      name: 'Serenity Spa & Wellness',
      badge: 'Premium',
      rating: 4.8,
      reviews: 324,
      address: 'MG Road, Bangalore',
      distance: '0.8km',
      duration: '30 min',
      image: require('../../assets/attached_assets/professional_spa_mas_338753fe.jpg'),
      services: ['Deep Tissue Massage', 'Aromatherapy'],
      moreServices: 2,
      isOpen: true
    },
    {
      id: 2,
      name: 'Bliss Beauty Studio',
      badge: 'Popular',
      rating: 4.9,
      reviews: 512,
      address: 'Koramangala, Bangalore',
      distance: '1.2km',
      duration: '25 min',
      image: require('../../assets/attached_assets/bridal_makeup_weddin_12cc5e76.jpg'),
      services: ['Bridal Makeup', 'Hair Styling'],
      moreServices: 3,
      isOpen: true
    },
    {
      id: 3,
      name: 'Glamour Hair Lounge',
      badge: 'Trending',
      rating: 4.7,
      reviews: 289,
      address: 'Indiranagar, Bangalore',
      distance: '2.1km',
      duration: '35 min',
      image: require('../../assets/attached_assets/hair_salon_styling_h_0bb02c12.jpg'),
      services: ['Haircut & Styling', 'Hair Coloring'],
      moreServices: 4,
      isOpen: true
    },
    {
      id: 4,
      name: 'Glow Skincare Clinic',
      badge: 'Premium',
      rating: 4.6,
      reviews: 198,
      address: 'Whitefield, Bangalore',
      distance: '3.5km',
      duration: '40 min',
      image: require('../../assets/attached_assets/skincare_facial_trea_613d6f55.jpg'),
      services: ['Facial Treatment', 'Skin Analysis'],
      moreServices: 5,
      isOpen: true
    },
    {
      id: 5,
      name: 'Nail Art Paradise',
      badge: 'New',
      rating: 4.5,
      reviews: 156,
      address: 'HSR Layout, Bangalore',
      distance: '1.8km',
      duration: '28 min',
      image: require('../../assets/attached_assets/nail_art_manicure_pe_994f18e3.jpg'),
      services: ['Nail Art', 'Manicure & Pedicure'],
      moreServices: 2,
      isOpen: false
    },
    {
      id: 6,
      name: 'Zen Wellness Studio',
      badge: 'Premium',
      rating: 4.9,
      reviews: 445,
      address: 'Jayanagar, Bangalore',
      distance: '2.8km',
      duration: '38 min',
      image: require('../../assets/attached_assets/wellness_yoga_medita_db974ec2.jpg'),
      services: ['Yoga Sessions', 'Meditation'],
      moreServices: 3,
      isOpen: true
    },
  ];


  const discoveryFilters = [
    { id: 'instant', label: 'Instant booking', icon: Sparkles },
    { id: 'top-rated', label: 'Top rated', icon: Star },
    { id: 'nearby', label: 'Nearby 2km', icon: MapPin },
    { id: 'bridal', label: 'Bridal experts', icon: Heart },
    { id: 'wellness', label: 'Wellness day', icon: Flower2 },
  ];



  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar backgroundColor="#012B17" barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
      >
        <LinearGradient
          colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGrad}
        >
          <View style={styles.headerRow}>
            <View style={styles.locRow}>
              <View style={styles.locIconBox}>
                <MapPin size={20} color="#fff" strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.locLabel}>Current Location</Text>
                <Text style={styles.locCity}>Bangalore, Karnataka</Text>
              </View>
            </View>

            <View style={styles.headerBtns}>
              <TouchableOpacity
                onPress={() => {
                  setSearchClicked(!searchClicked);
                  setSearchBarFocused(true);
                  searchInputRef.current?.focus();
                }}
                style={styles.headerBtn}
                activeOpacity={0.7}
              >
                <Search size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
                <Bell size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>


          {
            searchClicked && (
              <View style={styles.greetingWrap}>
                <Text style={styles.greetingTitle}>Refresh your routine</Text>
                <Text style={styles.greetingSub}>Handpicked salons & therapists near you</Text>
              </View>
            )
          }

          {
            searchClicked && (
              <View style={[styles.searchBar, searchBarFocused && styles.searchBarActive]}>
                <Search size={20} color={searchBarFocused ? COLORS.primary : COLORS.textGray} strokeWidth={2.5} />
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder="Search salons, services..."
                  placeholderTextColor={COLORS.textGray}
                  value={searchText}
                  onChangeText={setSearchText}
                  onFocus={() => setSearchBarFocused(true)}
                  onBlur={() => setSearchBarFocused(false)}
                  returnKeyType="search"
                />
                <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
                  <Search size={14} color="#fff" strokeWidth={2.5} />
                  <Text style={{color:'white'}}>
                    Search
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }

        </LinearGradient>

        <View style={styles.filterChipsWrapper}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterHeading}>Refine your mood</Text>
            <Sparkles size={16} color={COLORS.primary} strokeWidth={2.5} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChipsRow}
          >
            {discoveryFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = filter.id === activeFilter;
              return (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  activeOpacity={0.85}
                >
                  <Icon
                    size={14}
                    color={isActive ? COLORS.primary : COLORS.textGray}
                    strokeWidth={2.5}
                  />
                  <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.heroSection}>
          <FlatList
            ref={heroScrollRef}
            data={heroSlides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const cardWidth = width - (isSmallDevice ? 32 : isMediumDevice ? 40 : 48);
              const index = Math.round(e.nativeEvent.contentOffset.x / (cardWidth + (isSmallDevice ? 32 : isMediumDevice ? 40 : 48)));
              setActiveHeroIndex(index);
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: slide }) => (
              <View style={styles.heroCardWrapper}>
                <LinearGradient
                  colors={['rgba(30, 58, 138, 0.95)', 'rgba(59, 130, 246, 0.85)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.heroCard}
                >
                  <Image source={{ uri: slide.image }} style={styles.heroBg} blurRadius={3} />
                  <View style={styles.heroOverlay} />
                  <View style={styles.heroContent}>
                    <View>
                      <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>{slide.badge}</Text>
                      </View>
                      <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>
                      <Text style={styles.heroTitle}>{slide.title}</Text>
                      <Text style={styles.heroDescription}>{slide.description}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.heroButton}
                      activeOpacity={0.8}
                      onPress={() => navigate('/booking')}
                      disabled={isNavigating}
                    >
                      <Text style={styles.heroButtonText}>Book Now</Text>
                      <Text style={styles.heroButtonArrow}>→</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}
            snapToInterval={width - (isSmallDevice ? 0 : isMediumDevice ? 0 : 0)}
            decelerationRate="fast"
            nestedScrollEnabled={false}
            scrollEnabled={true}
          />

          <View style={styles.paginationDots}>
            {heroSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activeHeroIndex ? COLORS.primary : '#cbd5e1' },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Quick Categories</Text>
          <Text style={styles.sectionSubtitle}>Curated experiences for every mood.</Text>
          <View style={styles.categoriesGrid}>
            {quickCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.9}
                // onPress={() => router.push('/booking')}
                onPress={() => navigate('/Customer/CommingSoon')}
                disabled={isNavigating}

              >
                <View style={styles.categoryImageContainer}>
                  <Image
                    source={category.image}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                    style={styles.categoryImageOverlay}
                  />
                  <View style={styles.categoryTextWrap}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryTagline}>{category.tagline}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Salons & Spas</Text>
            <TouchableOpacity onPress={() => navigate('/booking')}
               disabled={isNavigating}
               activeOpacity={0.7}>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Trusted by the community around Bangalore.</Text>
          <View style={styles.servicesGrid}>
            {salons.map((salon) => (
              <TouchableOpacity
                key={salon.id}
                style={styles.salonCard}
                activeOpacity={0.9}
                disabled={isNavigating}
                onPress={() => navigate('/booking')}
              >
                <View style={styles.salonImageContainer}>
                  <Image source={salon.image} style={styles.salonImage} resizeMode="cover" />
                  <View style={styles.salonBadge}>
                    <Text style={styles.salonBadgeText}>{salon.badge}</Text>
                  </View>
                  <View style={[styles.statusDot, { backgroundColor: salon.isOpen ? '#22c55e' : '#ef4444' }]} />
                </View>

                <View style={styles.salonInfo}>
                  <Text style={styles.salonName}>{salon.name}</Text>

                  <View style={styles.salonMetaRow}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <Text style={styles.ratingValue}>{salon.rating}</Text>
                      <Text style={styles.reviewCount}>({salon.reviews})</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                      <MapPin size={12} color="#6b7280" />
                      <Text style={styles.distanceText}>{salon.distance}</Text>
                    </View>
                  </View>

                  <View style={styles.addressRow}>
                    <Text style={styles.addressText} numberOfLines={1}>{salon.address}</Text>
                    <View style={styles.durationPill}>
                      <Clock3 size={12} color="#0f172a" />
                      <Text style={styles.durationText}>{salon.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.servicesRow}>
                    {salon.services.map((service, index) => (
                      <View key={index} style={styles.serviceTag}>
                        <Text style={styles.serviceTagText}>{service}</Text>
                      </View>
                    ))}
                    {salon.moreServices > 0 && (
                      <View style={styles.moreServicesTag}>
                        <Text style={styles.moreServicesText}>+{salon.moreServices} more</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 3 }
    : {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 }
    };

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  scroll: {
    flex: 1
  },
  container: {
    flex: 1
  },

  headerGrad: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingTop: isSmallDevice ? 12 : 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 12 : 16
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  locIconBox: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locLabel: {
    fontSize: isSmallDevice ? 11 : 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  locCity: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '700',
    color: '#fff'
  },
  headerBtns: {
    flexDirection: 'row',
    gap: 12,
  },
  headerBtn: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingWrap: {
    marginBottom: isSmallDevice ? 14 : 16
  },
  greetingTitle: {
    fontSize: isSmallDevice ? 16 : 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4
  },
  greetingSub: {
    fontSize: isSmallDevice ? 14 : 15,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: isSmallDevice ? 6 : 8,
    marginBottom: isSmallDevice ? 18 : 22,
    borderWidth: 1,
    borderColor: 'rgba(1, 107, 58, 0.15)',
    ...CARD_SHADOW,
  },
  searchBarActive: {
    borderColor: COLORS.primary,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: isSmallDevice ? 14 : 15,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  filterBtn: {
    width: 80,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    gap:2,
    flexDirection:"row",
    alignItems:"center"
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: isSmallDevice ? 12 : 14,
    marginBottom: 20,
    ...CARD_SHADOW,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  statValue: {
    fontSize: isSmallDevice ? 18 : 20,
    color: '#fff',
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginTop: 4,
  },
  statDetail: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  filterChipsWrapper: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingTop: 16,
    paddingBottom: 4,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  filterChipsRow: {
    paddingRight: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: 'rgba(1, 107, 58, 0.1)',
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  filterChipTextActive: {
    color: COLORS.primary,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  heroScroll: {
    marginBottom: 16,
  },
  heroCardWrapper: {
    width: width,
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  },
  heroCard: {
    width: width - (isSmallDevice ? 32 : isMediumDevice ? 40 : 48),
    height: isSmallDevice ? 240 : isMediumDevice ? 320 : 360,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    ...CARD_SHADOW,
  },
  heroBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  heroContent: {
    flex: 1,
    padding: isSmallDevice ? 16 : isMediumDevice ? 20 : 28,
    justifyContent: 'space-between',
    minHeight: isSmallDevice ? 260 : isMediumDevice ? 300 : 340,
  },
  heroSubtitle: {
    fontSize: isSmallDevice ? 11 : isMediumDevice ? 12 : 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: isSmallDevice ? 4 : 6,
    opacity: 0.95,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 20 : isMediumDevice ? 26 : 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: isSmallDevice ? 6 : isMediumDevice ? 8 : 10,
    lineHeight: isSmallDevice ? 24 : isMediumDevice ? 30 : 40,
  },
  heroDescription: {
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 13 : 15,
    color: '#FFFFFF',
    marginBottom: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
    opacity: 0.95,
    lineHeight: isSmallDevice ? 18 : isMediumDevice ? 20 : 22,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
    paddingHorizontal: isSmallDevice ? 20 : isMediumDevice ? 24 : 28,
    borderRadius: isSmallDevice ? 10 : 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...CARD_SHADOW,
  },
  heroButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: isSmallDevice ? 10 : isMediumDevice ? 12 : 14,
    paddingVertical: isSmallDevice ? 6 : 8,
    borderRadius: 24,
    marginBottom: isSmallDevice ? 8 : 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 11 : 12,
    fontWeight: '700',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  categoriesSection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingTop: 6,
    paddingBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  categoryCard: {
    width: (width - (isSmallDevice ? 44 : 52)) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...CARD_SHADOW,
  },
  categoryImageContainer: {
    width: '100%',
    height: isSmallDevice ? 120 : 140,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryTextWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  categoryTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  sectionSubtitle: {
    fontSize: isSmallDevice ? 13 : 14,
    color: COLORS.textGray,
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 20,
  },

  servicesSection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingVertical: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  servicesGrid: {
    gap: 16,
  },
  salonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...CARD_SHADOW,
  },
  salonImageContainer: {
    width: '100%',
    height: isSmallDevice ? 180 : 200,
    position: 'relative',
  },
  salonImage: {
    width: '100%',
    height: '100%',
  },
  salonBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#016B3A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  salonBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  statusDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  salonInfo: {
    padding: 14,
  },
  salonName: {
    fontSize: isSmallDevice ? 16 : 17,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  salonMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  reviewCount: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    flex: 1,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '700',
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#016B3A',
  },
  serviceTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#016B3A',
  },
  moreServicesTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  moreServicesText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },


});
