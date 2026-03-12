export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  avatar?: string;
  role: 'etudiant' | 'professeur';
}
