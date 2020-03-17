import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
} from '@angular/animations';

const animationSlide = [
    query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out',
                style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out',
                style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
    ])
];

const animationSlideInverse = [
    query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out',
                style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out',
                style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
    ])
];

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('home => *', animationSlide),
        transition('login => *', animationSlide),
        transition('signup => *', animationSlide),
        transition('signup => login', animationSlideInverse),
        transition('home => login', animationSlideInverse),
    ]);