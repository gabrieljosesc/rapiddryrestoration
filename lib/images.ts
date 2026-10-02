/**
 * Site imagery.
 *  - /images/*.jpg are brand renders generated for this build (technician,
 *    flooded basement, drying equipment, burst pipe). Replace with real job-site
 *    photography as the crew collects it.
 *  - Unsplash photos (free licence) fill the rest; each URL was HTTP-verified.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  /** Technician running an extractor in a flooded living room (brand render). */
  hero: "/images/hero-extraction.jpg",
  extraction: "/images/hero-extraction.jpg",
  /** Dripping chrome tap. */
  leakDetection: u("1517646287270-a5a9ca602e5c"),
  /** Burst copper pipe under a sink (brand render). */
  burstPipes: "/images/burst-pipe.jpg",
  /** Unfinished basement with standing water (brand render). */
  floodedBasement: "/images/flooded-basement.jpg",
  /** Exposed pipework on a brick wall. */
  sewerBackup: u("1607472586893-edb57bdc0e39"),
  /** Gutted room with exposed studs. */
  tearOut: u("1517581177682-a085bb7ffb15"),
  /** Air movers and dehumidifier on a stripped floor (brand render). */
  drying: "/images/drying-equipment.jpg",
  /** Worker in mask and gloves cleaning a window frame. */
  mould: u("1581578731548-c64695cc6952"),
  /** Hands signing a document. */
  insuranceDocs: u("1450101499163-c8848c66ca85"),
  /** Two people reviewing a claim at a laptop. */
  insuranceMeeting: u("1600880292203-757bb62b4baf"),
  /** Brick two-storey homes on a GTA-style subdivision street. */
  houseSuburban: u("1605276374104-dee2a0ed3cd6"),
  /** Modern two-storey house at dusk. */
  houseModern: u("1494526585095-c41746248156"),
  /** Bright living room. */
  houseInterior: u("1560448204-e02f11c3d0e2"),
  kitchen: u("1556912172-45b7abe8b7e1"),
  bathroom: u("1552321554-5fefe8c9ef14"),
  /** Rain on a window at night. */
  rain: u("1515694346937-94d85e41e6f0"),
  /** Rain hitting a puddle. */
  water: u("1428592953211-077101b2021b"),
  /** Technician in hard hat at an electrical panel. */
  team: u("1621905251189-08b45d6a269e"),
  /** Classic Toronto-style bungalow in autumn. */
  cityToronto: u("1572120360610-d971b9d7767c"),
  /** White house with a wraparound porch. */
  cityGeneric: u("1570129477492-45c003edd2be"),
} satisfies Record<string, string>;

export type ImageKey = keyof typeof images;

export function img(key: ImageKey): string {
  return images[key];
}
