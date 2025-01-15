import { Lawyer } from "@/app/(booking)/booking/page";
import { useLoadScript, GoogleMap, MarkerF, Circle } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { MdMyLocation } from "react-icons/md";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#08304b" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#0c4152" }, { lightness: 5 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#021019" }],
    },
  ],
};

interface MapSectionProps {
  lawyers: Lawyer[];
}

interface Location {
  lat: number;
  lng: number;
}

// Add interface extension for window
declare global {
  interface Window {
    scrollToLawyer: (lawyerId: string) => void;
  }
}

const MapSection = ({ lawyers }: MapSectionProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update mapCenter initialization with proper type checking
  const [mapCenter, setMapCenter] = useState<Location>(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("userLocation");
        if (saved) {
          const parsed = JSON.parse(saved) as Location;
          return parsed;
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
    // Default coordinates if no saved location
    return {
      lat: -6.2088,
      lng: 106.8456,
    };
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBl12-VCiWi3n1L5Z4QVG6O_oSVYfLMMLg",
  });

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);

          if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(16);
          }

          localStorage.setItem("userLocation", JSON.stringify(location));
          setIsLoading(false);
        },
        (error) => {
          console.error("Error:", error);
          alert("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
          setIsLoading(false);
        },
        options
      );
    }
  };

  // Fungsi utk scroll ke map & zoom ke lokasi lawyer
  const scrollToLawyer = (lawyerId: string) => {
    const lawyer = lawyers.find((l) => l._id === lawyerId);
    if (!lawyer || !mapRef.current) return;

    setSelectedLawyer(lawyerId);

    // Scroll ke map
    const mapElement = document.getElementById("lawyer-map");
    mapElement?.scrollIntoView({ behavior: "smooth" });

    // Zoom ke lokasi lawyer
    if (lawyer.lat && lawyer.lng) {
      mapRef.current.panTo({ lat: lawyer.lat, lng: lawyer.lng });
    }
    mapRef.current.setZoom(15);

    setTimeout(() => setSelectedLawyer(null), 3000);
  };

  // Update the scrollToLawyer assignment
  if (typeof window !== "undefined") {
    window.scrollToLawyer = scrollToLawyer;
  }

  if (!isLoaded)
    return (
      <div className="w-full h-[500px] bg-slate-800 rounded-xl animate-pulse">
        <div className="h-full flex items-center justify-center text-gray-400">Loading Map...</div>
      </div>
    );

  return (
    <section className="py-12" id="lawyer-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Lokasi Pengacara</h2>
          <p className="text-gray-400">Temukan pengacara terdekat di lokasi Anda</p>
        </div>

        <div className="bg-slate-800 p-1 rounded-xl relative">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {userLocation && (
              <>
                <MarkerF
                  position={userLocation}
                  icon={{
                    path: 0,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 8,
                  }}
                />
                <Circle
                  center={userLocation}
                  radius={50}
                  options={{
                    fillColor: "#4285F4",
                    fillOpacity: 0.1,
                    strokeColor: "#4285F4",
                    strokeOpacity: 0.3,
                    strokeWeight: 2,
                  }}
                />
              </>
            )}
            {lawyers.map((lawyer) =>
              lawyer.lat && lawyer.lng ? (
                <MarkerF
                  key={lawyer._id}
                  position={{
                    lat: Number(lawyer.lat),
                    lng: Number(lawyer.lng),
                  }}
                  title={lawyer.name}
                  animation={selectedLawyer === lawyer._id ? google.maps.Animation.BOUNCE : undefined}
                />
              ) : null
            )}
          </GoogleMap>
          <div className="absolute bottom-6 left-6">
            <button
              onClick={getCurrentLocation}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 
              transition-all duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              <MdMyLocation className={`text-2xl text-blue-600 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
