import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  User,
  Heart,
  GraduationCap,
  Users,
  PawPrint,
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
  protected readonly iconPatte = PawPrint;
  protected readonly iconCoach = User;

  protected readonly coachs = [
    {
      nom: 'Lucas Bernard',
      specialite: 'Spécialiste Agility',
      texte: "15 ans d'expérience en éducation canine. Certifié en méthodes positives et comportement animal.",
    },
    {
      nom: 'Thomas Garcia',
      specialite: 'Spécialiste Obéissance',
      texte: 'Formateur certifié depuis 10 ans. Expert en éducation de base et comportements complexes.',
    },
    {
      nom: 'Camille Petit',
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
