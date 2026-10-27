<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <meta name="theme-color" content="#f05a22">

        <link rel="icon" href="/favicon.ico?v=2" sizes="any">
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        @if ($page['component'] === 'welcome')
            {{-- Écran de chargement de la page d'accueil, retiré une fois la page chargée --}}
            <style>
                #page-loader {
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 28px;
                    background: #f7f7f4;
                    transition: opacity 0.7s ease, visibility 0.7s ease;
                }

                #page-loader.is-hidden {
                    opacity: 0;
                    visibility: hidden;
                }

                #page-loader img {
                    width: 180px;
                    mix-blend-mode: multiply;
                    animation: loader-breathe 2.4s ease-in-out infinite;
                }

                #page-loader .loader-bar {
                    position: relative;
                    width: 120px;
                    height: 3px;
                    overflow: hidden;
                    border-radius: 9999px;
                    background: rgb(0 0 0 / 0.07);
                }

                #page-loader .loader-bar::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    width: 40%;
                    border-radius: inherit;
                    background: linear-gradient(90deg, #f05a22, #fbb417);
                    animation: loader-slide 1.6s ease-in-out infinite;
                }

                @keyframes loader-breathe {
                    0%, 100% { opacity: 0.7; transform: scale(0.98); }
                    50% { opacity: 1; transform: scale(1); }
                }

                @keyframes loader-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(250%); }
                }

                @media (prefers-reduced-motion: reduce) {
                    #page-loader img,
                    #page-loader .loader-bar::after {
                        animation: none;
                    }
                }
            </style>
            <div id="page-loader" aria-hidden="true">
                <img src="/images/eleeo-logo.jpg" alt="">
                <div class="loader-bar"></div>
            </div>
            <script>
                (function () {
                    var start = Date.now();

                    window.addEventListener('load', function () {
                        setTimeout(function () {
                            var loader = document.getElementById('page-loader');

                            if (!loader) {
                                return;
                            }

                            loader.classList.add('is-hidden');
                            setTimeout(function () { loader.remove(); }, 800);
                        }, Math.max(0, 900 - (Date.now() - start)));
                    });
                })();
            </script>
        @endif
        <x-inertia::app />
    </body>
</html>
