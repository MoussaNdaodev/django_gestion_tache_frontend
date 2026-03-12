import { Tache } from './tache.model';
import { Utilisateur } from './utilisateur.model';
import { Equipe } from './equipe.model';



export interface Projet {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
  date_fin?: string;
  fichiers?: string;
  images?: string;
  createur: number;
  // equipes?: Equipe[];
  // taches?: Tache[];
  stats?: {
    total: number;
    a_faire: number;
    en_cours: number;
    termine: number;
  };
}

