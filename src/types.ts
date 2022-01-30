export interface Army {
  id: string;
  name: string;
  number: string;
  category: "base" | "expansion";
  available: boolean;
  color: string;
  log: any[];
}
