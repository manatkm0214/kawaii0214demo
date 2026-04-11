import { NextRequest, NextResponse } from "next/server";

type PlaceKind =
  | "budget"
  | "grocery"
  | "clothes"
  | "daily"
  | "home"
  | "drugstore"
  | "electronics"
  | "cafe"
  | "restaurant"
  | "beauty"
  | "bookstore"
  | "sports"
  | "baby";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSelectors(kind: PlaceKind, customQuery?: string) {
  const trimmedQuery = customQuery?.trim();
  if (trimmedQuery) {
    const escaped = escapeRegex(trimmedQuery);
    return [
      `node(around:RADIUS,LAT,LON)["name"~"${escaped}",i]`,
      `way(around:RADIUS,LAT,LON)["name"~"${escaped}",i]`,
      `node(around:RADIUS,LAT,LON)["shop"~"${escaped}",i]`,
      `way(around:RADIUS,LAT,LON)["shop"~"${escaped}",i]`,
      `node(around:RADIUS,LAT,LON)["amenity"~"${escaped}",i]`,
      `way(around:RADIUS,LAT,LON)["amenity"~"${escaped}",i]`,
    ];
  }

  const map: Record<PlaceKind, string[]> = {
    budget: [
      'node(around:RADIUS,LAT,LON)["shop"="supermarket"]',
      'node(around:RADIUS,LAT,LON)["shop"="discount"]',
      'node(around:RADIUS,LAT,LON)["shop"="convenience"]',
      'way(around:RADIUS,LAT,LON)["shop"="supermarket"]',
      'way(around:RADIUS,LAT,LON)["shop"="discount"]',
      'way(around:RADIUS,LAT,LON)["shop"="convenience"]',
    ],
    grocery: [
      'node(around:RADIUS,LAT,LON)["shop"="supermarket"]',
      'node(around:RADIUS,LAT,LON)["shop"="greengrocer"]',
      'node(around:RADIUS,LAT,LON)["shop"="convenience"]',
      'way(around:RADIUS,LAT,LON)["shop"="supermarket"]',
      'way(around:RADIUS,LAT,LON)["shop"="greengrocer"]',
      'way(around:RADIUS,LAT,LON)["shop"="convenience"]',
    ],
    clothes: [
      'node(around:RADIUS,LAT,LON)["shop"="clothes"]',
      'node(around:RADIUS,LAT,LON)["shop"="boutique"]',
      'way(around:RADIUS,LAT,LON)["shop"="clothes"]',
      'way(around:RADIUS,LAT,LON)["shop"="boutique"]',
    ],
    daily: [
      'node(around:RADIUS,LAT,LON)["shop"="convenience"]',
      'node(around:RADIUS,LAT,LON)["shop"="variety_store"]',
      'node(around:RADIUS,LAT,LON)["shop"="general"]',
      'way(around:RADIUS,LAT,LON)["shop"="convenience"]',
      'way(around:RADIUS,LAT,LON)["shop"="variety_store"]',
      'way(around:RADIUS,LAT,LON)["shop"="general"]',
    ],
    home: [
      'node(around:RADIUS,LAT,LON)["shop"="houseware"]',
      'node(around:RADIUS,LAT,LON)["shop"="furniture"]',
      'node(around:RADIUS,LAT,LON)["shop"="doityourself"]',
      'way(around:RADIUS,LAT,LON)["shop"="houseware"]',
      'way(around:RADIUS,LAT,LON)["shop"="furniture"]',
      'way(around:RADIUS,LAT,LON)["shop"="doityourself"]',
    ],
    drugstore: [
      'node(around:RADIUS,LAT,LON)["shop"="chemist"]',
      'node(around:RADIUS,LAT,LON)["amenity"="pharmacy"]',
      'way(around:RADIUS,LAT,LON)["shop"="chemist"]',
      'way(around:RADIUS,LAT,LON)["amenity"="pharmacy"]',
    ],
    electronics: [
      'node(around:RADIUS,LAT,LON)["shop"="electronics"]',
      'node(around:RADIUS,LAT,LON)["shop"="appliance"]',
      'node(around:RADIUS,LAT,LON)["shop"="mobile_phone"]',
      'way(around:RADIUS,LAT,LON)["shop"="electronics"]',
      'way(around:RADIUS,LAT,LON)["shop"="appliance"]',
      'way(around:RADIUS,LAT,LON)["shop"="mobile_phone"]',
    ],
    cafe: [
      'node(around:RADIUS,LAT,LON)["amenity"="cafe"]',
      'node(around:RADIUS,LAT,LON)["amenity"="coffee_shop"]',
      'way(around:RADIUS,LAT,LON)["amenity"="cafe"]',
      'way(around:RADIUS,LAT,LON)["amenity"="coffee_shop"]',
    ],
    restaurant: [
      'node(around:RADIUS,LAT,LON)["amenity"="restaurant"]',
      'node(around:RADIUS,LAT,LON)["amenity"="fast_food"]',
      'node(around:RADIUS,LAT,LON)["amenity"="food_court"]',
      'way(around:RADIUS,LAT,LON)["amenity"="restaurant"]',
      'way(around:RADIUS,LAT,LON)["amenity"="fast_food"]',
      'way(around:RADIUS,LAT,LON)["amenity"="food_court"]',
    ],
    beauty: [
      'node(around:RADIUS,LAT,LON)["shop"="beauty"]',
      'node(around:RADIUS,LAT,LON)["shop"="cosmetics"]',
      'node(around:RADIUS,LAT,LON)["shop"="hairdresser"]',
      'way(around:RADIUS,LAT,LON)["shop"="beauty"]',
      'way(around:RADIUS,LAT,LON)["shop"="cosmetics"]',
      'way(around:RADIUS,LAT,LON)["shop"="hairdresser"]',
    ],
    bookstore: [
      'node(around:RADIUS,LAT,LON)["shop"="books"]',
      'way(around:RADIUS,LAT,LON)["shop"="books"]',
    ],
    sports: [
      'node(around:RADIUS,LAT,LON)["shop"="sports"]',
      'way(around:RADIUS,LAT,LON)["shop"="sports"]',
    ],
    baby: [
      'node(around:RADIUS,LAT,LON)["shop"="baby_goods"]',
      'node(around:RADIUS,LAT,LON)["shop"="toys"]',
      'way(around:RADIUS,LAT,LON)["shop"="baby_goods"]',
      'way(around:RADIUS,LAT,LON)["shop"="toys"]',
    ],
  };

  return map[kind];
}

function buildQuery(lat: number, lon: number, radius: number, kind: PlaceKind, customQuery?: string) {
  const selectors = buildSelectors(kind, customQuery);
  return `[out:json][timeout:20];
(
${selectors.join(";\n").replaceAll("RADIUS", String(radius)).replaceAll("LAT", String(lat)).replaceAll("LON", String(lon))};
);
out center tags 12;`;
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const rad = (value: number) => (value * Math.PI) / 180;
  const earth = 6371;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return earth * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocodeArea(area: string) {
  const query = new URLSearchParams({
    q: area,
    format: "jsonv2",
    limit: "1",
    countrycodes: "jp",
  });

  const response = await fetch(`${NOMINATIM_URL}?${query.toString()}`, {
    headers: {
      "User-Agent": "kakeibo-app/nearby-shops",
      "Accept-Language": "ja,en",
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as Array<{
    lat?: string;
    lon?: string;
    display_name?: string;
  }>;

  const top = payload[0];
  if (!top?.lat || !top?.lon) return null;

  return {
    lat: Number(top.lat),
    lon: Number(top.lon),
    label: top.display_name || area,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      lat?: number;
      lon?: number;
      radius?: number;
      kind?: PlaceKind;
      area?: string;
      customQuery?: string;
    };

    let lat = Number(body.lat);
    let lon = Number(body.lon);
    let sourceLabel = "";

    if ((!Number.isFinite(lat) || !Number.isFinite(lon)) && typeof body.area === "string" && body.area.trim()) {
      const geocoded = await geocodeArea(body.area.trim());
      if (!geocoded) {
        return NextResponse.json({ error: "area could not be resolved" }, { status: 404 });
      }
      lat = geocoded.lat;
      lon = geocoded.lon;
      sourceLabel = geocoded.label;
    }

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return NextResponse.json({ error: "lat/lon or area required" }, { status: 400 });
    }

    const radius = Number.isFinite(body.radius) ? Math.min(Math.max(Number(body.radius), 300), 5000) : 1600;
    const allowedKinds: PlaceKind[] = [
      "budget",
      "grocery",
      "clothes",
      "daily",
      "home",
      "drugstore",
      "electronics",
      "cafe",
      "restaurant",
      "beauty",
      "bookstore",
      "sports",
      "baby",
    ];
    const kind = allowedKinds.includes(body.kind as PlaceKind) ? (body.kind as PlaceKind) : "budget";

    const query = buildQuery(lat, lon, radius, kind, typeof body.customQuery === "string" ? body.customQuery : undefined);
    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: query,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "overpass fetch failed" }, { status: 502 });
    }

    const payload = (await response.json()) as {
      elements?: Array<{
        id: number;
        lat?: number;
        lon?: number;
        center?: { lat: number; lon: number };
        tags?: Record<string, string>;
      }>;
    };

    const items = (payload.elements ?? [])
      .map((entry) => {
        const entryLat = entry.lat ?? entry.center?.lat;
        const entryLon = entry.lon ?? entry.center?.lon;
        if (!Number.isFinite(entryLat) || !Number.isFinite(entryLon)) return null;
        return {
          id: String(entry.id),
          name: entry.tags?.name || entry.tags?.brand || "Unknown spot",
          kind: entry.tags?.shop || entry.tags?.amenity || kind,
          distanceKm: distanceKm(lat, lon, entryLat as number, entryLon as number),
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6);

    return NextResponse.json({ items, source: sourceLabel || null });
  } catch {
    return NextResponse.json({ error: "failed to fetch nearby shops" }, { status: 500 });
  }
}
