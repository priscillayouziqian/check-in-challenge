import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Icon } from 'react-native-elements';

const ShareAppScreen = () => {
  const handleShare = async () => {
    try {
      const message = "Check out this amazing app - Check-in Challenge!\n\n" +
        "Track your 100-day/hour challenges with this well designed app. " +
        "Perfect for building habits and achieving your goals.\n\n" +
        "Download here: <App Store URL>\n\n" +
        "Developed by Zhaoyi";

      const result = await Share.share({
        message,
        title: 'Share Check-in Challenge App',
        url: 'app store url' //not ready yet
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Share the App</Text>
        <Text style={styles.subtitle}>
          Help others discover Check-in Challenge!
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Icon
            name="share-alt"
            type="font-awesome"
            color="#FFFFFF"
            size={24}
            containerStyle={styles.iconContainer}
          />
          <Text style={styles.shareButtonText}>Share with Friends</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Share this app with your friends and family to help them:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Track daily progress</Text>
            <Text style={styles.bulletPoint}>• Build lasting habits</Text>
            <Text style={styles.bulletPoint}>• Achieve their goals</Text>
            <Text style={styles.bulletPoint}>• Stay motivated</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginRight: 10,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 15,
  },
  bulletPoints: {
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#1F2937',
    marginVertical: 5,
  },
});

export default ShareAppScreen; 