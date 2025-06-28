import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-crow-aircraft-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './crow-aircraft-section.component.html',
  styleUrl: './crow-aircraft-section.component.css',
})
export class CrowAircraftSectionComponent {
  applications: { title: string; description: string; icon: SafeHtml }[] = [];
  technicals: { title: string; description: string }[] = [];

  constructor(private sanitizer: DomSanitizer) {
    this.applications = [
      {
        title: '',
        description:
          'Commute above traffic in minutes instead of hours.<br>Land anywhere — rooftops, parking spots, backyards — no need for runways or vertiports.<br>Ideal for tech-savvy individuals, high-income professionals, or future-forward cities.',
        icon: this.sanitizer.bypassSecurityTrustHtml(` `),
      },
      {
        title: 'Intercity Transport',
        description:
          'With high range , CROW can travel between cities and countries — silently and sustainably.<br>Competes with regional flights but requires no airport.<br>Perfect for executives, emergency travel, or premium tourism.',
        icon: this.sanitizer.bypassSecurityTrustHtml(``),
      },
      {
        title: 'Medical & Emergency Response',
        description:
          'Reach remote or congested areas quickly in natural disasters, war zones, or pandemics.<br>Carries medical teams and equipment with minimal landing space needed.',
        icon: this.sanitizer.bypassSecurityTrustHtml(``),
      },
      {
        title: 'Cargo & Delivery',
        description:
          'With a 450 kg payload capacity and vertical landing, CROW can deliver time-critical packages (medical, high-value, industrial).<br>Hydrogen range makes it ideal for long-haul or remote logistics.',
        icon: this.sanitizer.bypassSecurityTrustHtml(``),
      },
      {
        title: 'Marine Rescue & Water Operations',
        description:
          'Can land on water, enabling missions around:<br>Oil rigs<br>Yachts<br>Disaster zones at sea<br>Hybrid drive lets it move on land too — fully amphibious.',
        icon: this.sanitizer.bypassSecurityTrustHtml(` `),
      },
      {
        title: 'Tourism & Adventure',
        description:
          'Offer luxury aerial experiences with breathtaking views and smooth, quiet flights.<br>Accessible for small groups (up to 5 people).<br>Perfect for desert, island, or mountain regions where infrastructure is limited.',
        icon: this.sanitizer.bypassSecurityTrustHtml(` `),
      },
      {
        title: 'Security & Surveillance',
        description:
          'Operate above cities, borders, or sensitive sites for long durations.<br>Quiet operation and high agility allow for discreet, effective patrols.',
        icon: this.sanitizer.bypassSecurityTrustHtml(` `),
      },
    ];
    this.technicals = [
      {
        title: 'Vehicle Type',
        description: 'Hydrogen-Powered eVTOL (Flying Car)',
      },
      {
        title: 'Propulsion System',
        description: 'Humming Propulsion System (HPS)',
      },
      
      {
        title: 'Maximum Speed',
        description: '500 km/h',
      },
      
      {
        title: 'Maximum Altitude',
        description: '12,000 ft',
      },
      {
        title: 'Operational Range',
        description: '1,500 km per hydrogen tank',
      },
      {
        title: 'Power Source',
        description: 'Hydrogen Fuel Cells + Backup Batteries',
      },
      {
        title: 'Passenger Capacity',
        description: '5 passengers',
      },
      {
        title: 'Maximum Payload',
        description: '450 kg',
      },
      
      {
        title: 'Landing Capabilities',
        description: 'Vertical Takeoff & Landing (VTOL) + Water Landing',
      },
      {
        title: 'Ground Mobility',
        description: '360° rotating wheels – functions as a road vehicle',
      },
      {
        title: 'Structure Materials',
        description: 'Carbon Fiber + Natural Bamboo Composite + Aluminium',
      },
      
      {
        title: 'Vehicle Dimensions',
        description: '5.5 m (L) × 2.6 m (W) × 1.6 m (H)',
      },
      {
        title: 'Noise Level',
        description: '65 dB at 5 meters',
      },
   
      {
        title: 'Pilot License Requirement',
        description: 'None',
      },
      {
        title: 'Emergency Systems',
        description:
          '10 safety systems including:<br>* Aerospike rocket-powered emergency landing<br>* Power balancing for single-unit failure<br>* Redundant battery backup',
      },
      {
        title: 'emergency landing',
        description:
          ' equipped with a cutting-edge Aerospike Rocket Engine System designed specifically for last-resort emergency landings, ensuring maximum safety when all other systems fail.',
      },
    ];
  }
}
