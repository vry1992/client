export function convertLng(lng, width, bounds) {
    return (lng - bounds.topLng) * width / (bounds.bottomLng - bounds.topLng);
}

export function convertLat(lat, height, bounds) {
    return (bounds.topLat - lat) * height / (bounds.topLat - bounds.bottomLat);
}

export function reverseLng(x, width, bounds) { // => from mouse pos to geo pos
    return (((bounds.bottomLng - bounds.topLng) * x) / width) + bounds.topLng;
}

export function reverseLat(y, height, bounds) { // => from mouse pos to geo pos
    return 90 - ((y * (180 / height)));
}

export function lngToPixels(lng, width, bounds) {
    return ((lng - bounds.topLng) * width) / (bounds.bottomLng - bounds.topLng)
}

export function latToPixels(lat, height) {
    return (((lat - 90) * height) / 180) * -1
}