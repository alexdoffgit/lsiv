import gulp from 'gulp';
import { execa } from 'execa'
const { series } = gulp;

function svelte() {
    execa('npm run dev')
}

function artisan() {
    execa('php artisan serve')
}

export default series(svelte, artisan)