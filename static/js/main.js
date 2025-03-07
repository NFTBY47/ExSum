import { initNumberSystems } from './numberSystems.js';
import { initQuadratic } from './quadratic.js';
import { initMatrix } from './matrix.js';

// Переключение между разделами
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.calculator-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        document.getElementById(this.dataset.section).classList.add('active');
    });
});

// Инициализация всех модулей
document.addEventListener('DOMContentLoaded', () => {
    initNumberSystems();
    initQuadratic();
    initMatrix();
}); 