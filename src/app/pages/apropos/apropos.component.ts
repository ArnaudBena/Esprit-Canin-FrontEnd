import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  LucideAngularModule,
  Heart,
  GraduationCap,
  Users,
} from 'lucide-angular';

@Component({
  selector: 'app-apropos',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './apropos.component.html',
  styleUrl: './apropos.component.css',
})
export class AproposComponent {
  private auth = inject(AuthService);
  protected readonly estConnecte = computed(() => this.auth.jwtInfo() !== null);
  protected espaceUrl(): string {
    return this.auth.espaceUrl();
  }

  protected readonly coachs = [
    {
      nom: 'Lucas Bernard',
      photo: '/assets/coachs/LucasBernard.webp',
      specialite: 'Spécialiste Agility',
      texte: "15 ans d'expérience en éducation canine. Certifié en méthodes positives et comportement animal.",
    },
    {
      nom: 'Thomas Garcia',
      photo: '/assets/coachs/ThomasGarcia.webp',
      specialite: 'Spécialiste Obéissance',
      texte: 'Formateur certifié depuis 10 ans. Expert en éducation de base et comportements complexes.',
    },
    {
      nom: 'Camille Petit',
      photo: '/assets/coachs/CamillePetit.webp',
      specialite: 'Spécialiste Pistage & Socialisation',
      texte: "Passionnée par le travail olfactif et les dynamiques de groupe. 8 ans d'expérience.",
    },
  ];

  protected readonly valeurs = [
    {
      icon: Heart,
      titre: 'Bienveillance',
      texte: 'Nous utilisons exclusivement des méthodes positives et respectueuses du bien-être animal. Chaque chien progresse à son rythme.',
    },
    {
      icon: GraduationCap,
      titre: 'Expertise',
      texte: 'Nos coachs sont certifiés et formés en continu aux dernières avancées en comportement canin.',
    },
    {
      icon: Users,
      titre: 'Communauté',
      texte: 'Plus qu’un club, une famille. Nous créons des liens durables entre propriétaires partageant la même passion.',
    },
  ];
}
