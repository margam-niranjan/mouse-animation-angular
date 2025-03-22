import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private cursor!: HTMLElement;
  private cursorFollower!: HTMLElement;

  ngAfterViewInit() {
    this.cursor = document.querySelector('.cursor')!;
    this.cursorFollower = document.querySelector('.cursor-follower')!;

    this.cursor.style.setProperty('--cursor-scale', '1');

    document.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(var(--cursor-scale))`;

    this.cursorFollower.style.transition = 'transform 0.15s ease-out';
    this.cursorFollower.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px)`;
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.cursor.style.setProperty('--cursor-scale', '0.5');
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.cursor.style.setProperty('--cursor-scale', '1');
  }
}