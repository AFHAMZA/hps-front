import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';
@Component({
  selector: 'app-innovation-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './innovation-section.component.html',
  styleUrl: './innovation-section.component.css',
})
export class InnovationSectionComponent {


  constructor(private soundService: SoundService) {}

  playHoverSound() {
    this.soundService.playSound('/assets/sounds/1.wav');
  }

  advantages = [
    {
      id: 1,
      title: 'Inspired by Nature',
      description:
        'Mimics the wing dynamics of hummingbirds, enabling precise and powerful multi-directional thrust.',
    },
    {
      id: 2,
      title: 'Dual-Motion Mechanism',
      description:
        'Combines rotational motion (from axial flux electric motors) with a controlled oscillating (flapping) motion.<br>This allows each propulsion unit to adjust angle of attack at every degree of rotation.',
    },
    {
      id: 3,
      title: 'Precision Thrust Vectoring',
      description:
        'Enables 6 degrees of freedom (DoF) without tilting the vehicle body.<br>Allows for fine-tuned movement in any direction — forward, backward, vertical, lateral, pitch, yaw, and roll — with no need for large control surfaces.',
    },
    {
      id: 4,
      title: 'Drag Reduction Technology',
      description:
        'Constantly adjusts the wing angle to minimize aerodynamic drag, which boosts energy efficiency by over 25% compared to traditional propeller systems.',
    },
    {
      id: 5,
      title: 'High-Speed Raxial Flux Motors',
      description:
        'Uses lightweight, high-torque axial flux electric motors spinning up to 8,500 RPM, delivering exceptional power-to-weight performance.',
    },
    {
      id: 6,
      title: 'Modular & Scalable Design',
      description:
        'The system is fully scalable, meaning it can power:<br>Small drones<br>Personal flying cars<br>Heavy-lift cargo aircraft<br>Even large airborne platforms like flying hotels',
    },
    {
      id: 7,
      title: 'Hydrogen-Compatible Power Source',
      description:
        'Designed to work optimally with hydrogen fuel cells, ensuring long range, zero emissions, and sustainable energy use.',
    },
    {
      id: 8,
      title: 'Quiet Operation',
      description:
        'Thanks to optimized motion and low rotational drag, HPS produces sound levels under 65 dB — comparable to a modern car.',
    },
    {
      id: 9,
      title: 'Fail-Safe Redundancy',
      description:
        'Redundant control and power paths ensure safety even if one propulsion unit fails.',
    },
  ];

  advantages2 = [
    {
      title: '25% Higher Efficiency',
      description:
        'Reduces drag by dynamically adjusting angle of attack.<br>Uses less energy for more thrust compared to traditional propellers.',
    },
    {
      title: '6 Degrees of Freedom (DoF)',
      description:
        'Provides full control in all directions without tilting the aircraft.<br>Enhances stability, maneuverability, and passenger comfort.',
    },
    {
      title: 'Ultra-Quiet Operation',
      description:
        'Generates less than 65 dB at 5 meters — quieter than helicopters or traditional drones.<br>Enables urban use without disturbing communities.',
    },
    {
      title: 'Tilt-Free Navigation',
      description:
        'No mechanical tilting of wings or rotors needed.<br>Simplifies mechanical structure and improves control accuracy.',
    },
    {
      title: 'Compact & Scalable Design',
      description:
        'Easily integrated into a wide range of vehicles:<br>Drones<br>Flying cars (like CROW)<br>Cargo aircraft<br>Airborne hotels<br>Reduces footprint while maintaining performance.',
    },
    {
      title: 'Hydrogen-Ready & Eco-Friendly',
      description:
        'Designed to pair with hydrogen fuel cells for long range and zero emissions.<br>Supports the global transition to clean aviation.',
    },
    {
      title: 'Fewer Moving Parts = Lower Maintenance',
      description:
        'Eliminates complex tilt mechanisms and reduces wear-and-tear.<br>More reliable and cost-effective in long-term operation.',
    },
    {
      title: 'Built-in Safety & Redundancy',
      description:
        'Power balancing system allows safe landing even with one propulsion unit offline.<br>Emergency rocket landing system ensures survivability in full failure scenarios.',
    },
  ];
}
