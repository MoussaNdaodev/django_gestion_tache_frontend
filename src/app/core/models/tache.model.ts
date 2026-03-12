import { Projet } from './projet.model';
import { Utilisateur } from './utilisateur.model';

export interface Tache {
  id: number;
  titre: string;
  description: string;
  date_limite: string;
  statut: 'a_faire' | 'en_cours' | 'termine'; // permet de filtrer les valeur qu'il peut prendre
  priorite: 'basse' | 'moyenne' | 'haute';
  date_creation: string;
  projet: Projet;
  assigne_a: Utilisateur;
  assigne_a_detail: Utilisateur;
}
