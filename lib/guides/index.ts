import type { Guide } from "../content-types";
import { firstHourAfterBasementFlood } from "./first-hour-after-basement-flood";
import { doesHomeInsuranceCoverWaterDamageOntario } from "./does-home-insurance-cover-water-damage-ontario";
import { waterDamageRestorationCostToronto } from "./water-damage-restoration-cost-toronto";
import { howLongToDryFloodedBasement } from "./how-long-to-dry-flooded-basement";
import { burstPipeVsSewerBackupWhatsCovered } from "./burst-pipe-vs-sewer-backup-whats-covered";

export const guides: Guide[] = [
  firstHourAfterBasementFlood,
  doesHomeInsuranceCoverWaterDamageOntario,
  waterDamageRestorationCostToronto,
  howLongToDryFloodedBasement,
  burstPipeVsSewerBackupWhatsCovered,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export type { Guide, GuideBlock } from "../content-types";
