/**
 * Geolocation Service (100% Free - Browser API)
 * No API keys required
 */

/**
 * Get user's current location
 * @returns {Promise<Object>} - {latitude, longitude, accuracy}
 */
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
};

/**
 * Calculate distance between two points (Haversine formula)
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const toRad = (degrees) => degrees * (Math.PI / 180);

/**
 * Find nearest items by location
 * @param {Object} userLocation - {latitude, longitude}
 * @param {Array} items - Array of items with location
 * @param {number} maxDistance - Maximum distance in km (default 50)
 * @returns {Array} - Sorted by distance
 */
export const findNearby = (userLocation, items, maxDistance = 50) => {
    return items
        .map(item => {
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                item.latitude || item.location?.latitude,
                item.longitude || item.location?.longitude
            );
            return { ...item, distance };
        })
        .filter(item => item.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};

/**
 * Format distance for display
 * @param {number} distance - Distance in km
 * @returns {string} - Formatted string
 */
export const formatDistance = (distance) => {
    if (distance < 1) {
        return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
};

/**
 * Get location from division/district (approximate coordinates)
 * Free alternative to geocoding API
 */
export const getDivisionCoordinates = (division) => {
    const coordinates = {
        'dhaka': { latitude: 23.8103, longitude: 90.4125 },
        'chattogram': { latitude: 22.3569, longitude: 91.7832 },
        'rajshahi': { latitude: 24.3745, longitude: 88.6042 },
        'khulna': { latitude: 22.8456, longitude: 89.5403 },
        'barishal': { latitude: 22.7010, longitude: 90.3535 },
        'sylhet': { latitude: 24.8949, longitude: 91.8687 },
        'rangpur': { latitude: 25.7439, longitude: 89.2752 },
        'mymensingh': { latitude: 24.7471, longitude: 90.4203 }
    };
    return coordinates[division.toLowerCase()] || coordinates['dhaka'];
};

/**
 * Request location permission
 * @returns {Promise<string>} - Permission state
 */
export const requestLocationPermission = async () => {
    try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        return result.state; // 'granted', 'denied', 'prompt'
    } catch (error) {
        return 'unknown';
    }
};

/**
 * Watch user location (real-time tracking)
 * @param {Function} callback - Called on location update
 * @returns {number} - Watch ID (use to stop watching)
 */
export const watchLocation = (callback) => {
    if (!navigator.geolocation) return null;
    
    return navigator.geolocation.watchPosition(
        (position) => {
            callback({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            });
        },
        (error) => {
            console.error('Location watch error:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
};

/**
 * Stop watching location
 * @param {number} watchId - Watch ID from watchLocation
 */
export const stopWatchingLocation = (watchId) => {
    if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }
};
