import { Prime } from "./prime.model";
import { Statistique } from "./statistique.model";

export interface StatsDashboard {
  nb_taches_total: number;
  nb_taches_terminees_delai: number;
  taux_realisation: number;
  annee: number;
  trimestre: number;
  primes: Prime[];
  historique_trimestriel: Statistique[];
}
