import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  useColorScheme,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppTheme from '../theme/AppTheme';
import PrimaryButton from './PrimaryButton';
import GlassButton from './GlassButton';

const CreatePostModal = ({ visible, onClose, onPost }) => {
  const isDark = useColorScheme() === 'dark';
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Meets & Events');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const categories = [
    'Meets & Events',
    'Modifications',
    'Track Days',
    'For Sale',
    'General',
  ];

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleAddImage = () => {
    setSelectedImages([...selectedImages, `image_${selectedImages.length + 1}.jpg`]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handlePost = () => {
    const postData = {
      caption,
      location,
      category: selectedCategory,
      images: selectedImages,
      isPublic,
      timestamp: new Date(),
    };
    onPost?.(postData);
    onClose();
    // Reset form
    setCaption('');
    setLocation('');
    setSelectedImages([]);
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY }] },
          ]}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(28, 28, 30, 0.95)', 'rgba(44, 44, 46, 0.95)']
                : ['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']
            }
            style={styles.modalContent}>
            {/* Header */}
            <View style={[styles.header, {
              borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }]}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="times" size={28} color={isDark ? '#FFFFFFB3' : '#00000099'} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000' }]}>
                New Post
              </Text>
              <View style={{ width: 28 }} />
            </View>

            {/* Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {/* Images Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#000' }]}>
                  Photos
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {/* Add Image Button */}
                  <TouchableOpacity
                    style={[styles.addImageButton, {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#E0E0E0',
                      borderColor: `${AppTheme.colors.primaryBlue}50`,
                    }]}
                    onPress={handleAddImage}>
                    <Icon name="plus" size={32} color={AppTheme.colors.primaryBlue} />
                    <Text style={[styles.addImageText, { color: AppTheme.colors.primaryBlue }]}>
                      Add Photo
                    </Text>
                  </TouchableOpacity>

                  {/* Selected Images */}
                  {selectedImages.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                      <View style={[styles.imagePlaceholder, {
                        backgroundColor: `${AppTheme.colors.primaryBlue}30`,
                      }]}>
                        <Icon
                          name="image"
                          size={32}
                          color={`${AppTheme.colors.primaryBlue}80`}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveImage(index)}>
                        <Icon name="times" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Caption */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#000' }]}>
                  Caption
                </Text>
                <TextInput
                  style={[styles.textInput, {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: isDark ? '#FFF' : '#000',
                  }]}
                  placeholder="Write a caption..."
                  placeholderTextColor={isDark ? '#FFFFFF99' : '#00000099'}
                  value={caption}
                  onChangeText={setCaption}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Location */}
              <View style={styles.section}>
                <View style={styles.locationHeader}>
                  <Icon name="map-marker-alt" size={18} color={AppTheme.colors.primaryBlue} />
                  <Text style={[styles.sectionTitle, { marginLeft: 6, marginBottom: 0, color: isDark ? '#FFF' : '#000' }]}>
                    Location
                  </Text>
                </View>
                <TextInput
                  style={[styles.textInput, {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: isDark ? '#FFF' : '#000',
                  }]}
                  placeholder="Add location"
                  placeholderTextColor={isDark ? '#FFFFFF99' : '#00000099'}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Category */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#000' }]}>
                  Category
                </Text>
                <View style={styles.categoriesContainer}>
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <TouchableOpacity
                        key={category}
                        style={[
                          styles.categoryChip,
                          {
                            backgroundColor: isSelected
                              ? 'transparent'
                              : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)'),
                            borderColor: isSelected
                              ? AppTheme.colors.primaryBlue
                              : 'rgba(255, 255, 255, 0.2)',
                            borderWidth: isSelected ? 2 : 1,
                          },
                        ]}
                        onPress={() => setSelectedCategory(category)}>
                        {isSelected && (
                          <LinearGradient
                            colors={AppTheme.gradients.primary}
                            style={StyleSheet.absoluteFillObject}
                          />
                        )}
                        <Text
                          style={[
                            styles.categoryText,
                            {
                              color: isSelected
                                ? '#FFFFFF'
                                : (isDark ? '#FFFFFFB3' : '#000'),
                              fontWeight: isSelected ? '600' : '400',
                            },
                          ]}>
                          {category}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Privacy Toggle */}
              <View style={[styles.privacyContainer, {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }]}>
                <View style={styles.privacyInfo}>
                  <Icon
                    name={isPublic ? 'globe' : 'lock'}
                    size={20}
                    color={AppTheme.colors.primaryBlue}
                  />
                  <View style={styles.privacyText}>
                    <Text style={[styles.privacyTitle, { color: isDark ? '#FFF' : '#000' }]}>
                      {isPublic ? 'Public' : 'Private'}
                    </Text>
                    <Text style={[styles.privacySubtitle, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                      {isPublic ? 'Everyone can see' : 'Only followers'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={isPublic}
                  onValueChange={setIsPublic}
                  trackColor={{ true: AppTheme.colors.primaryBlue, false: '#999' }}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <PrimaryButton
                  text="Share Post"
                  icon="share"
                  onPress={handlePost}
                  height={54}
                  style={styles.shareButton}
                />
                <GlassButton
                  text="Save as Draft"
                  icon="save"
                  onPress={() => {}}
                  width="100%"
                  height={50}
                  style={styles.draftButton}
                />
              </View>

              <View style={{ height: 40 }} />
            </ScrollView>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '90%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  modalContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  addImageButton: {
    width: 120,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addImageText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    ...AppTheme.shadows.card,
  },
  textInput: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    fontSize: 15,
    minHeight: 100,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  categoryText: {
    fontSize: 13,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  privacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    marginLeft: 12,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  privacySubtitle: {
    fontSize: 12,
  },
  actionButtons: {
    marginTop: 4,
  },
  shareButton: {
    marginBottom: 12,
  },
  draftButton: {
    marginBottom: 12,
  },
});

export default CreatePostModal;
