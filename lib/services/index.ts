import type { ServicePage } from "../content-types";
import { leakDetection } from "./leak-detection";
import { emergencyWaterExtraction } from "./emergency-water-extraction";
import { burstFrozenPipes } from "./burst-frozen-pipes";
import { floodedBasements } from "./flooded-basements";
import { sewerBackup } from "./sewer-backup";
import { tearOut } from "./tear-out";
import { structuralDryingDehumidification } from "./structural-drying-dehumidification";
import { mouldPrevention } from "./mould-prevention";

export const services: ServicePage[] = [
  leakDetection,
  emergencyWaterExtraction,
  burstFrozenPipes,
  floodedBasements,
  sewerBackup,
  tearOut,
  structuralDryingDehumidification,
  mouldPrevention,
];

export function getService(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export type { ServicePage } from "../content-types";
