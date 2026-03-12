
import { Projet } from './projet.model';
import { Utilisateur } from './utilisateur.model';

export interface Equipe {
  id: number;
  nom_equipe: string;
  projet: Projet;
  membres: Utilisateur[];
  nombre_membres?: number;
}
