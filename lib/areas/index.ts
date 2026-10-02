import type { AreaPage } from "../content-types";
import { toronto } from "./toronto";
import { northYork } from "./north-york";
import { etobicoke } from "./etobicoke";
import { scarborough } from "./scarborough";
import { vaughan } from "./vaughan";
import { thornhill } from "./thornhill";
import { richmondHill } from "./richmond-hill";
import { markham } from "./markham";
import { mississauga } from "./mississauga";

export const areas: AreaPage[] = [
  toronto,
  northYork,
  etobicoke,
  scarborough,
  vaughan,
  thornhill,
  richmondHill,
  markham,
  mississauga,
];

export function getArea(slug: string): AreaPage | undefined {
  return areas.find((area) => area.slug === slug);
}

export function areaUrl(slug: string): string {
  return "/water-damage-restoration-" + slug;
}

export type { AreaPage } from "../content-types";
