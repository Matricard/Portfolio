import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  speedMultiplier: number;
  color: string;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  colorInner: string;
  colorOuter: string;
  speedMultiplier: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

interface AutumnLeaf {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmplitude: number;
  color: string;
  alpha: number;
  leafType: number; // 0 = érable (maple), 1 = chêne/bouleau (oak/birch)
  depth: number;
}

interface FoliageCluster {
  x: number;
  y: number;
  radius: number;
  colorInner: string;
  colorOuter: string;
  swayOffset: number;
  swaySpeed: number;
}

interface SunlightMote {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speedX: number;
  speedY: number;
}

@Component({
  selector: 'app-cosmic-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cosmic-bg-container fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050714] transition-colors duration-500" aria-hidden="true">
      <!-- High-DPI Parallax Canvas (Cosmic in Dark mode, Autumn in Light mode) -->
      <canvas #cosmicCanvas class="cosmic-canvas absolute inset-0 w-full h-full block"></canvas>

      <!-- Tech Grid Overlay -->
      <div class="absolute inset-0 tech-grid-layer opacity-30"></div>

      <!-- Contrast Vignette (Adapts smoothly to theme) -->
      <div class="cosmic-vignette absolute inset-0 bg-gradient-to-b from-[#0a0d14]/75 via-[#0a0d14]/40 to-[#0a0d14]/90 transition-all duration-500"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tech-grid-layer {
      background-size: 32px 32px;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    }

    :host-context(html.light) .cosmic-bg-container {
      background: linear-gradient(180deg, #fffcf8 0%, #fef8f0 40%, #fbf3e8 75%, #f6ece0 100%);
    }

    :host-context(html.light) .tech-grid-layer {
      opacity: 0.2;
      background-image:
        linear-gradient(to right, rgba(180, 83, 9, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(180, 83, 9, 0.04) 1px, transparent 1px);
    }

    :host-context(html.light) .cosmic-vignette {
      background: radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.12) 0%, transparent 55%),
                  linear-gradient(to bottom, rgba(255, 252, 248, 0.4) 0%, transparent 40%, rgba(246, 236, 224, 0.6) 100%);
    }
  `]
})
export class CosmicBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cosmicCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly ps = inject(PortfolioService);
  private readonly ngZone = inject(NgZone);
  private animationFrameId: number | null = null;
  private resizeListener?: () => void;

  // Space travelling parameters (horizontal drift from right to left with slight vertical tilt)
  private readonly travelSpeedX = -0.45;
  private readonly travelSpeedY = -0.15;

  // Dark Theme: Stars & Cosmos
  private stars: Star[] = [];
  private nebulae: NebulaCloud[] = [];
  private shootingStar: ShootingStar = { x: 0, y: 0, length: 0, speed: 0, angle: 0, opacity: 0, active: false };
  private shootingStarTimer = 0;

  // Light Theme: Autumn Leaves & Trees
  private leaves: AutumnLeaf[] = [];
  private treeClusters: FoliageCluster[] = [];
  private motes: SunlightMote[] = [];
  private time = 0;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.initUniverse();
      this.initAutumn();
      this.startEngine();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (typeof window !== 'undefined' && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initUniverse(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const setupDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    setupDimensions();
    this.resizeListener = () => {
      setupDimensions();
      this.populateStars();
      this.populateNebulae();
      this.populateAutumnLeaves();
      this.populateAutumnTrees();
      this.populateSunlightMotes();
    };
    window.addEventListener('resize', this.resizeListener);

    this.populateStars();
    this.populateNebulae();
  }

  private initAutumn(): void {
    this.populateAutumnLeaves();
    this.populateAutumnTrees();
    this.populateSunlightMotes();
  }

  private populateStars(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starCount = Math.floor((width * height) / 8500);

    const starPalettes = [
      'rgba(255, 255, 255, ',
      'rgba(215, 140, 255, ',
      'rgba(160, 195, 255, ',
      'rgba(240, 180, 255, '
    ];

    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      const depth = Math.random();
      let speedMultiplier = 0.3;
      let radius = Math.random() * 0.8 + 0.4;

      if (depth > 0.65) {
        speedMultiplier = 0.65;
        radius = Math.random() * 0.9 + 0.8;
      }
      if (depth > 0.9) {
        speedMultiplier = 1.0;
        radius = Math.random() * 1.2 + 1.2;
      }

      const baseAlpha = Math.random() * 0.6 + 0.3;

      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        speedMultiplier,
        color: starPalettes[Math.floor(Math.random() * starPalettes.length)]
      });
    }
  }

  private populateNebulae(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.nebulae = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.max(width, height) * 0.45,
        colorInner: 'rgba(143, 53, 255, 0.22)',
        colorOuter: 'rgba(143, 53, 255, 0)',
        speedMultiplier: 0.22
      },
      {
        x: width * 0.75,
        y: height * 0.45,
        radius: Math.max(width, height) * 0.52,
        colorInner: 'rgba(215, 56, 255, 0.18)',
        colorOuter: 'rgba(215, 56, 255, 0)',
        speedMultiplier: 0.28
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: Math.max(width, height) * 0.4,
        colorInner: 'rgba(52, 116, 255, 0.14)',
        colorOuter: 'rgba(52, 116, 255, 0)',
        speedMultiplier: 0.18
      },
      {
        x: width * 0.1,
        y: height * 0.7,
        radius: Math.max(width, height) * 0.35,
        colorInner: 'rgba(180, 80, 255, 0.16)',
        colorOuter: 'rgba(180, 80, 255, 0)',
        speedMultiplier: 0.25
      }
    ];
  }

  private populateAutumnLeaves(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const leafCount = Math.floor(Math.max(35, Math.min(65, (width * height) / 30000)));

    // Quebec autumn maple & oak palette:
    // Flamboyant orange, golden amber, crimson red, burnt copper, deep russet
    const leafColors = [
      '#ea580c', // Bright orange érable
      '#f97316', // Vibrant flame orange
      '#d97706', // Golden amber
      '#f59e0b', // Autumn yellow/gold
      '#dc2626', // Crimson maple red
      '#b91c1c', // Deep burgundy maple
      '#c2410c', // Burnt sienna
      '#9a3412', // Rust copper
    ];

    this.leaves = [];
    for (let i = 0; i < leafCount; i++) {
      const depth = Math.random(); // 0 (far/small) to 1 (near/large)
      const size = 12 + depth * 14; // 12px to 26px

      this.leaves.push({
        x: Math.random() * (width + 200) - 100,
        y: Math.random() * (height + 100) - 50,
        size,
        vx: (Math.random() * 0.8 + 0.4) * (0.8 + depth * 0.6), // gentle drift right
        vy: (Math.random() * 0.9 + 0.7) * (0.8 + depth * 0.8), // downward fall
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.04 + 0.02,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.015,
        swayAmplitude: 15 + Math.random() * 25,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        alpha: 0.65 + depth * 0.3,
        leafType: Math.random() > 0.35 ? 0 : 1, // 65% Canadian maple, 35% oak/birch
        depth
      });
    }
  }

  private populateAutumnTrees(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Stylized autumn tree foliage clumps on screen edges
    this.treeClusters = [
      // Left tree foliage (rising from bottom-left corner)
      { x: -20, y: height * 0.25, radius: 140, colorInner: 'rgba(234, 88, 12, 0.22)', colorOuter: 'rgba(234, 88, 12, 0)', swayOffset: 0, swaySpeed: 0.0015 },
      { x: width * 0.06, y: height * 0.18, radius: 160, colorInner: 'rgba(220, 38, 38, 0.24)', colorOuter: 'rgba(220, 38, 38, 0)', swayOffset: 1.2, swaySpeed: 0.0018 },
      { x: width * 0.02, y: height * 0.38, radius: 180, colorInner: 'rgba(245, 158, 11, 0.25)', colorOuter: 'rgba(245, 158, 11, 0)', swayOffset: 2.1, swaySpeed: 0.0012 },
      { x: -50, y: height * 0.5, radius: 200, colorInner: 'rgba(194, 65, 12, 0.2)', colorOuter: 'rgba(194, 65, 12, 0)', swayOffset: 0.8, swaySpeed: 0.0014 },

      // Right tree canopy foliage (top-right corner)
      { x: width + 20, y: height * 0.12, radius: 180, colorInner: 'rgba(234, 88, 12, 0.22)', colorOuter: 'rgba(234, 88, 12, 0)', swayOffset: 0.5, swaySpeed: 0.0016 },
      { x: width * 0.92, y: height * 0.08, radius: 150, colorInner: 'rgba(245, 158, 11, 0.26)', colorOuter: 'rgba(245, 158, 11, 0)', swayOffset: 1.8, swaySpeed: 0.0013 },
      { x: width * 0.95, y: height * 0.24, radius: 170, colorInner: 'rgba(220, 38, 38, 0.22)', colorOuter: 'rgba(220, 38, 38, 0)', swayOffset: 2.5, swaySpeed: 0.0017 },
      { x: width + 40, y: height * 0.35, radius: 190, colorInner: 'rgba(217, 119, 6, 0.18)', colorOuter: 'rgba(217, 119, 6, 0)', swayOffset: 3.0, swaySpeed: 0.0011 }
    ];
  }

  private populateSunlightMotes(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.motes = [];
    for (let i = 0; i < 30; i++) {
      this.motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.2) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3
      });
    }
  }

  private startEngine(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (document.hidden) {
        this.animationFrameId = requestAnimationFrame(render);
        return;
      }

      this.time++;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const isLight = this.ps.currentTheme() === 'light';

      if (isLight) {
        this.renderAutumnTheme(ctx, width, height);
      } else {
        this.renderCosmicTheme(ctx, width, height);
      }

      ctx.restore();
      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  }

  // =========================================================================
  // LIGHT THEME: SEASONAL AUTUMN (Arbres & Feuilles oranges qui tombent)
  // =========================================================================
  private renderAutumnTheme(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // 1. Soft Warm Ambient Sun Glow (Top-Right)
    const sunGrad = ctx.createRadialGradient(width * 0.88, height * 0.1, 0, width * 0.88, height * 0.1, Math.max(width, height) * 0.6);
    sunGrad.addColorStop(0, 'rgba(251, 191, 36, 0.16)');
    sunGrad.addColorStop(0.4, 'rgba(249, 115, 22, 0.08)');
    sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Artistic Autumn Trees Silhouettes (Left & Right Edges)
    this.drawAutumnTrees(ctx, width, height);

    // 3. Floating Sunlit Golden Motes (Gentle autumn breeze dust)
    for (const m of this.motes) {
      m.x += m.speedX + Math.sin(this.time * 0.01 + m.y) * 0.2;
      m.y += m.speedY;

      if (m.x < 0) m.x = width;
      if (m.x > width) m.x = 0;
      if (m.y < 0) m.y = height;
      if (m.y > height) m.y = 0;

      const shimmer = m.baseAlpha + Math.sin(this.time * 0.03 + m.x) * 0.15;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0.05, shimmer)})`;
      ctx.fill();
    }

    // 4. Falling Autumn Leaves (Physical sway, 3D tumbling flip, flutter)
    const globalWind = 0.6 + Math.sin(this.time * 0.003) * 0.4; // Periodic gusts

    for (const leaf of this.leaves) {
      // Natural sway offset
      leaf.swayPhase += leaf.swaySpeed;
      const sway = Math.sin(leaf.swayPhase) * leaf.swayAmplitude;

      // Advance positions
      leaf.x += leaf.vx * globalWind + (Math.cos(leaf.swayPhase) * 0.6);
      leaf.y += leaf.vy;

      // 3D Rotation and Tumbling Flip
      leaf.rotation += leaf.rotationSpeed;
      leaf.flipAngle += leaf.flipSpeed;

      // Wrap around when exiting bottom or sides
      if (leaf.y > height + 40) {
        leaf.y = -35;
        leaf.x = Math.random() * (width + 200) - 100;
        leaf.swayPhase = Math.random() * Math.PI * 2;
      }
      if (leaf.x > width + 60) {
        leaf.x = -40;
      }

      // 3D Perspective Scaling: flip along axis
      const flipScale = Math.cos(leaf.flipAngle);

      ctx.save();
      ctx.translate(leaf.x + sway, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.scale(1, flipScale); // Realistic 3D leaf tumble

      if (leaf.leafType === 0) {
        this.drawMapleLeaf(ctx, leaf.size, leaf.color, leaf.alpha);
      } else {
        this.drawOakLeaf(ctx, leaf.size, leaf.color, leaf.alpha);
      }

      ctx.restore();
    }
  }

  // Draw organic autumn tree silhouettes with branching & warm leaf foliage
  private drawAutumnTrees(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Ambient Foliage Clusters on edges with gentle sway
    for (const cluster of this.treeClusters) {
      const swayX = Math.sin(this.time * cluster.swaySpeed + cluster.swayOffset) * 8;
      const swayY = Math.cos(this.time * cluster.swaySpeed + cluster.swayOffset) * 4;

      const grad = ctx.createRadialGradient(
        cluster.x + swayX, cluster.y + swayY, 0,
        cluster.x + swayX, cluster.y + swayY, cluster.radius
      );
      grad.addColorStop(0, cluster.colorInner);
      grad.addColorStop(0.65, cluster.colorInner.replace(/[\d\.]+\)$/, '0.08)'));
      grad.addColorStop(1, cluster.colorOuter);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cluster.x + swayX, cluster.y + swayY, cluster.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stylized Tree Branches (Left side)
    ctx.save();
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.18)'; // Warm cedar/bark brown
    ctx.lineCap = 'round';

    // Main left trunk rising upwards
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-30, height * 0.7);
    ctx.quadraticCurveTo(width * 0.05, height * 0.45, width * 0.02, height * 0.2);
    ctx.stroke();

    // Left branch 1
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(width * 0.035, height * 0.48);
    ctx.quadraticCurveTo(width * 0.09, height * 0.38, width * 0.11, height * 0.32);
    ctx.stroke();

    // Left branch 2
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width * 0.025, height * 0.3);
    ctx.quadraticCurveTo(width * 0.07, height * 0.22, width * 0.08, height * 0.16);
    ctx.stroke();

    // Stylized Tree Branches (Right top corner)
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(width + 30, height * 0.05);
    ctx.quadraticCurveTo(width * 0.94, height * 0.14, width * 0.88, height * 0.18);
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width * 0.92, height * 0.15);
    ctx.quadraticCurveTo(width * 0.87, height * 0.24, width * 0.84, height * 0.28);
    ctx.stroke();

    ctx.restore();
  }

  // Authentic Canadian Maple Leaf (5-pointed silhouette with stem & central veins)
  private drawMapleLeaf(ctx: CanvasRenderingContext2D, size: number, color: string, alpha: number): void {
    const s = size / 22;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    // Draw delicate leaf shadow for tactile depth
    ctx.shadowColor = 'rgba(180, 83, 9, 0.2)';
    ctx.shadowBlur = 6 * s;
    ctx.shadowOffsetY = 3 * s;

    ctx.beginPath();
    // Stem base
    ctx.moveTo(0, 16 * s);
    ctx.lineTo(1 * s, 10 * s);

    // Bottom right lobe
    ctx.lineTo(8 * s, 12 * s);
    ctx.lineTo(6 * s, 8 * s);
    ctx.lineTo(12 * s, 6 * s);

    // Main right lobe
    ctx.lineTo(8 * s, 2 * s);
    ctx.lineTo(16 * s, 0);
    ctx.lineTo(10 * s, -4 * s);
    ctx.lineTo(14 * s, -10 * s);
    ctx.lineTo(6 * s, -8 * s);

    // Top center apex lobe
    ctx.lineTo(6 * s, -14 * s);
    ctx.lineTo(0, -20 * s); // main tip
    ctx.lineTo(-6 * s, -14 * s);

    // Main left lobe
    ctx.lineTo(-6 * s, -8 * s);
    ctx.lineTo(-14 * s, -10 * s);
    ctx.lineTo(-10 * s, -4 * s);
    ctx.lineTo(-16 * s, 0);
    ctx.lineTo(-8 * s, 2 * s);

    // Bottom left lobe
    ctx.lineTo(-12 * s, 6 * s);
    ctx.lineTo(-6 * s, 8 * s);
    ctx.lineTo(-8 * s, 12 * s);
    ctx.lineTo(-1 * s, 10 * s);
    ctx.closePath();
    ctx.fill();

    // Delicate inner leaf veins
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.moveTo(0, 16 * s);
    ctx.lineTo(0, -14 * s);
    ctx.moveTo(0, 0);
    ctx.lineTo(7 * s, -5 * s);
    ctx.moveTo(0, 0);
    ctx.lineTo(-7 * s, -5 * s);
    ctx.moveTo(0, 5 * s);
    ctx.lineTo(6 * s, 8 * s);
    ctx.moveTo(0, 5 * s);
    ctx.lineTo(-6 * s, 8 * s);
    ctx.stroke();

    ctx.restore();
  }

  // Smooth Birch / Oak Autumn Leaf
  private drawOakLeaf(ctx: CanvasRenderingContext2D, size: number, color: string, alpha: number): void {
    const s = size / 18;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    ctx.shadowColor = 'rgba(180, 83, 9, 0.18)';
    ctx.shadowBlur = 5 * s;
    ctx.shadowOffsetY = 2 * s;

    ctx.beginPath();
    ctx.moveTo(0, 14 * s);
    // Right side serrations
    ctx.bezierCurveTo(7 * s, 10 * s, 10 * s, 3 * s, 8 * s, -2 * s);
    ctx.bezierCurveTo(11 * s, -6 * s, 8 * s, -12 * s, 0, -18 * s);
    // Left side serrations
    ctx.bezierCurveTo(-8 * s, -12 * s, -11 * s, -6 * s, -8 * s, -2 * s);
    ctx.bezierCurveTo(-10 * s, 3 * s, -7 * s, 10 * s, 0, 14 * s);
    ctx.fill();

    // Veins
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.lineWidth = 0.9 * s;
    ctx.beginPath();
    ctx.moveTo(0, 14 * s);
    ctx.lineTo(0, -14 * s);
    ctx.moveTo(0, 2 * s);
    ctx.lineTo(5 * s, -2 * s);
    ctx.moveTo(0, 2 * s);
    ctx.lineTo(-5 * s, -2 * s);
    ctx.moveTo(0, -5 * s);
    ctx.lineTo(4 * s, -9 * s);
    ctx.moveTo(0, -5 * s);
    ctx.lineTo(-4 * s, -9 * s);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // DARK THEME: DEEP SPACE COSMOS (Étoiles, Filaments, Nébuleuses)
  // =========================================================================
  private renderCosmicTheme(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // 1. RENDER TRAVELING NEBULA CLOUDS
    ctx.globalCompositeOperation = 'screen';
    for (const neb of this.nebulae) {
      neb.x += this.travelSpeedX * neb.speedMultiplier;
      neb.y += this.travelSpeedY * neb.speedMultiplier;

      const pad = neb.radius;
      if (neb.x < -pad) neb.x = width + pad;
      if (neb.x > width + pad) neb.x = -pad;
      if (neb.y < -pad) neb.y = height + pad;
      if (neb.y > height + pad) neb.y = -pad;

      const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
      grad.addColorStop(0, neb.colorInner);
      grad.addColorStop(0.5, neb.colorInner.replace(/[\d\.]+\)$/, '0.08)'));
      grad.addColorStop(1, neb.colorOuter);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. RENDER CONSTELLATION FILAMENTS
    ctx.globalCompositeOperation = 'source-over';
    const nearStars = this.stars.filter(s => s.speedMultiplier >= 0.65);
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nearStars.length; i++) {
      for (let j = i + 1; j < nearStars.length; j++) {
        const dx = nearStars[i].x - nearStars[j].x;
        const dy = nearStars[i].y - nearStars[j].y;
        const dist = dx * dx + dy * dy;
        if (dist < 10000) {
          const alpha = (1 - Math.sqrt(dist) / 100) * 0.12;
          ctx.strokeStyle = `rgba(180, 110, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(nearStars[i].x, nearStars[i].y);
          ctx.lineTo(nearStars[j].x, nearStars[j].y);
          ctx.stroke();
        }
      }
    }

    // 3. RENDER TRAVELING STARS (PARALLAX LAYERS)
    for (const s of this.stars) {
      s.x += this.travelSpeedX * s.speedMultiplier;
      s.y += this.travelSpeedY * s.speedMultiplier;

      s.alpha += s.alphaSpeed;
      if (s.alpha > s.baseAlpha + 0.3 || s.alpha < s.baseAlpha - 0.25 || s.alpha < 0.15) {
        s.alphaSpeed = -s.alphaSpeed;
      }

      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.y < -10) s.y = height + 10;
      if (s.y > height + 10) s.y = -10;

      const currentAlpha = Math.max(0.1, Math.min(1, s.alpha));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color + currentAlpha + ')';
      ctx.fill();

      if (s.speedMultiplier >= 0.9) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = s.color + (currentAlpha * 0.15) + ')';
        ctx.fill();
      }
    }

    // 4. SUBTLE OCCASIONAL SHOOTING STAR
    this.shootingStarTimer++;
    if (this.shootingStarTimer > 400 && !this.shootingStar.active && Math.random() < 0.02) {
      this.shootingStarTimer = 0;
      this.shootingStar = {
        x: width * (0.4 + Math.random() * 0.5),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 8 + 12,
        angle: Math.PI * 0.85,
        opacity: 1,
        active: true
      };
    }

    if (this.shootingStar.active) {
      const ss = this.shootingStar;
      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, 'rgba(196, 60, 255, 0)');
      grad.addColorStop(0.7, `rgba(215, 140, 255, ${ss.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity * 0.9})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.opacity -= 0.015;

      if (ss.opacity <= 0 || ss.x < -100 || ss.y > height + 100) {
        ss.active = false;
      }
    }
  }
}
