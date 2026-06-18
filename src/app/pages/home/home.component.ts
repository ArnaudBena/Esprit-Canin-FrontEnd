import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  LucideAngularModule,
  UserPlus,
  CalendarDays,
  GraduationCap,
  Zap,
  Search,
  Users,
  Star,
  PawPrint,
  Check,
  Heart,
  Quote,
  X,
  Clock,
  Award,
  BookOpen,
} from 'lucide-angular';

interface Temoignage {
  nom: string;
  cours: string;
  note: number;
  texte: string;
  auteur: string;
  initiales: string;
  intro: string;
  citation: string;
  duree: string;
  resultats: string;
  niveau: string;
  race: string;
  photo: string;
}

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private auth = inject(AuthService);
  protected readonly estConnecte = computed(() => this.auth.jwtInfo() !== null);
  protected espaceUrl(): string {
    return this.auth.espaceUrl();
  }

  protected readonly iconStar = Star;
  protected readonly iconCheck = Check;
  protected readonly iconHeart = Heart;
  protected readonly iconQuote = Quote;
  protected readonly iconClose = X;
  protected readonly iconClock = Clock;
  protected readonly iconResultats = Award;
  protected readonly iconNiveau = BookOpen;
  protected readonly iconRace = PawPrint;
  protected readonly etoiles = [1, 2, 3, 4, 5];

  protected readonly etapes = [
    {
      icon: UserPlus,
      titre: 'Inscrivez-vous',
      texte: 'Créez votre compte en quelques instants et ajoutez le profil de votre chien.',
      points: ['Création de compte rapide', 'Ajout du profil chien', 'Choix de vos préférences', 'Accès à toutes les séances'],
      borderClass: 'border-l-primaire',
      iconClass: 'bg-primaire-light text-primaire',
    },
    {
      icon: CalendarDays,
      titre: 'Réservez',
      texte: 'Parcourez les séances disponibles et inscrivez votre chien en un clic.',
      points: ['Agility', 'Obéissance', 'Pistage', 'Socialisation'],
      borderClass: 'border-l-secondaire',
      iconClass: 'bg-primaire-light text-secondaire',
    },
    {
      icon: GraduationCap,
      titre: 'Participez',
      texte: 'Venez aux séances et progressez avec votre compagnon à quatre pattes.',
      points: ['Suivi de progression', 'Conseils personnalisés', 'Coachs certifiés', 'Ambiance conviviale'],
      borderClass: 'border-l-accent',
      iconClass: 'bg-badge-complet-bg text-accent',
    },
  ];

  protected readonly cours = [
    { icon: Zap, nom: 'Agility', texte: 'Parcours d’obstacles ludiques pour développer l’agilité et la complicité avec votre chien.' },
    { icon: GraduationCap, nom: 'Obéissance', texte: 'Éducation de base et avancée pour un chien bien éduqué au quotidien.' },
    { icon: Search, nom: 'Pistage', texte: 'Développez les capacités olfactives de votre chien à travers des exercices de recherche.' },
    { icon: Users, nom: 'Socialisation', texte: 'Séances en groupe pour apprendre à votre chien à interagir avec ses congénères.' },
  ];

  protected readonly temoignages: Temoignage[] = [
    {
      nom: 'Sophie et Max', cours: 'Agility', note: 5,
      texte: 'Max a pris énormément d’assurance, et l’ambiance des séances est super conviviale.',
      auteur: 'Sophie Durand', initiales: 'SD',
      intro: 'Après 6 mois de cours d’agility, Max est passé d’un chien craintif à un compagnon épanoui et confiant.',
      citation: 'Le Club Canin a transformé notre quotidien. Les coachs sont exceptionnels et vraiment à l’écoute.',
      duree: '6 mois', resultats: 'Excellents', niveau: 'Intermédiaire', race: 'Border Collie',
      photo: '/assets/temoignages/SophieMax.webp',
    },
    {
      nom: 'Pierre et Luna', cours: 'Obéissance', note: 5,
      texte: 'En quelques semaines, Luna est devenue beaucoup plus calme à la maison.',
      auteur: 'Pierre Martin', initiales: 'PM',
      intro: 'Luna tirait sans cesse en laisse. Après 3 mois d’obéissance, les promenades sont enfin un vrai plaisir.',
      citation: 'Un encadrement patient et bienveillant. Je recommande les yeux fermés.',
      duree: '3 mois', resultats: 'Très bons', niveau: 'Débutant', race: 'Berger Australien',
      photo: '/assets/temoignages/PierreLuna.webp',
    },
    {
      nom: 'Marie et Rex', cours: 'Pistage', note: 5,
      texte: 'Une activité qui canalise enfin l’énergie de Rex. On adore nos séances du week-end.',
      auteur: 'Marie Leroy', initiales: 'ML',
      intro: 'Rex débordait d’énergie. Le pistage lui a donné un vrai exutoire et nous a beaucoup rapprochés.',
      citation: 'Voir Rex aussi concentré et heureux pendant les exercices, ça n’a pas de prix.',
      duree: '4 mois', resultats: 'Excellents', niveau: 'Intermédiaire', race: 'Beauceron',
      photo: '/assets/temoignages/MarieRex.webp',
    },
  ];

  temoignageOuvert = signal<Temoignage | null>(null);

  ouvrir(t: Temoignage): void {
    this.temoignageOuvert.set(t);
  }

  fermer(): void {
    this.temoignageOuvert.set(null);
  }

  @HostListener('document:keydown.escape')
  fermerSurEchap(): void {
    this.temoignageOuvert.set(null);
  }
}
